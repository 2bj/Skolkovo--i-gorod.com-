<?php
	header("Cache-Control: no-store, no-cache, must-revalidate");	// HTTP/1.1
	header("Cache-Control: post-check=0, pre-check=0", false);	// HTTP/1.1
	header("Pragma: no-cache");	// HTTP/1.0
	header("Date: " . gmdate("D, d M Y H:i:s") . " GMT");
	header("Expires: " . gmdate("D, d M Y H:i:s") . " GMT");
	header("X-XSS-Protection: 0"); //Disable new IE8 XSS filter
	header("Content-type: text/html; charset=utf-8");
	
	header("Content-type: text/xml; charset=utf-8");
	
	if(is_file("./installed")) {
		echo <<<XML
<response>
	<error code="104"><![CDATA[Повторная установка запрещена]]></error>
</response>
XML;
		exit();
	}
	
	if(function_exists("session_start")) {
		@session_start();
	}
	
	$do = (isset($_REQUEST['do'])) ? $_REQUEST['do'] : "unkown";
	
	echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
	switch($do) {
		case "check-settings": {
			doCheckSettings();
			break;
		}
		
		case "packages-list": {
			doPackagesList();
			break;
		}
		
		case "check-mysql": {
			doCheckMysql();
			break;
		}
		
		case "install-core": {
			doInstallCore();
			break;
		}
		
		case "save-sv": {
			doSaveSv();
			break;
		}
		
		case "get-demo-sites": {
			doGetDemoSites();
			break;
		}
		
		case "install-site": {
			doInstallSite();
			break;
		}
		
		case "cleanup-pages": {
			doCleanupPages();
			break;
		}
		
		case "finalize-installation": {
			doFinalizeInstallation();
			break;
		}
		
		default: {
			doUnkown();
		}
	}
	
	function doUnkown() {
		$do = isset($_REQUEST['do']) ? $_REQUEST['do'] : "";
		
		echo <<<XML
<response>
	<error code="100">Unknown request type "{$do}"</error>
</response>
XML;
	}
	
	function doCheckSettings() {
		$current_dir = trim(dirname(__FILE__));
		
		$htaccess = $current_dir . '/.htaccess';
		$htaccessWritable = !is_file($htaccess) || is_writable($htaccess);
		
		$settings = Array(
			'safe-mode' => !ini_get('safe_mode'),
			'root-readable' => is_readable($current_dir),
			'root-writable' => is_writable($current_dir),
			'htaccess-writable' => $htaccessWritable,
			'gd-lib' => function_exists("imagecopyresampled"),
			'xslt-lib' => class_exists ('XSLTProcessor')
		);
		
		echo "\n<response>\n";
		foreach($settings as $key => $val) {
			echo "\t<{$key} status=\"" . ($val ? "ok" : "failed") . "\" />\n";
		}
		echo "</response>";
	}
	
	function doPackagesList() {
		$packages = "";
		foreach(glob("packages/*.ucp") as $filePath) {
			$fileName = basename($filePath);
			
			$packages .= <<<XML
	<package>{$fileName}</package>
	
XML;
		}
		echo <<<XML
<response>
	{$packages}
</response>
XML;
	}
	
	function doCheckMysql() {
		$login = $_REQUEST['mysql-login'];
		$password = $_REQUEST['mysql-password'];
		$host = $_REQUEST['mysql-host'];
		$dbname = $_REQUEST['mysql-dbname'];
		$err = "";
		
		if(function_exists("mysql_connect")) {
			$r = @mysql_connect($host, $login, $password);
			if($r === false) {
				$err = "Не удалось подключиться к серверу базы данных ({$login}@{$host})";
			} else {
				$r = @mysql_select_db($dbname);
				if($r === false) {
					$err = "Не удалось подключиться к базе данных";
				} else {
					$result = mysql_query("SHOW VARIABLES LIKE 'have_innodb'");
					list(,$have_innodb) = mysql_fetch_row($result);
					if(strtoupper($have_innodb) != "YES") {
						$err = "В текущих настройках MySql отключена поддержка InnoDB. Попросите вашего хостинг-провайдера включить эту опцию.";
					} else {
						$err = "";
					}
				}
			}
		} else {
			$err = 'Mysql не установлен';
		}
		
		$resp = ($err) ? "<error code='200'>{$err}</error>" : "";
		
		$from = array('%db-core-host%', '%db-core-login%', '%db-core-password%', '%db-core-name%');
		$to = array($host, $login, $password, $dbname);
		
		$cont = file_get_contents("./config.ini.original");
		$cont = str_replace($from, $to, $cont);
		file_put_contents("./config.ini", $cont);
		chmod("./config.ini", 0777);


		$config_cont = <<<END
<?php
		error_reporting(~E_ALL);

		/* UMI.CMS mySQL - connection to database */
		mysql_connect('{$host}', '{$login}', '{$password}') or die(mysql_fatal());
		mysql_select_db('{$dbname}') or die(mysql_fatal());

		mysql_query("SET NAMES utf8_general_ci");
		mysql_query("SET CHARSET utf8");

		mysql_query("SET CHARACTER SET utf8");
		mysql_query("SET SESSION collation_connection = 'utf8_general_ci'");

		mysql_query("SET SESSION sql_mode = 'ANSI'");
?>
END;
		file_put_contents("./mysql.php", $config_cont);
		@chmod("./mysql.php", 0777);


		echo <<<XML
<response>
	{$resp}
</response>
XML;
	}
	
	function doInstallCore() {
		$login = $_REQUEST['mysql-login'];
		$password = $_REQUEST['mysql-password'];
		$host = $_REQUEST['mysql-host'];
		$dbname = $_REQUEST['mysql-dbname'];
		$useXmlDriver = $_REQUEST['use-xmldriver'];

		require "./install-libs/core-install.php";
		
		
		if($useXmlDriver && $_REQUEST['pos'] === "0") {
			$config_cont = <<<END
<?php
	error_reporting(~E_ALL);
	define("DB_DRIVER", "xml");
?>
END;
			file_put_contents("./mysql.php", $config_cont);
			@chmod("./mysql.php", 0777);
		}
		
		
		$package = "./packages/". $_REQUEST['package'];// . ".ucp";
		$size = filesize($package);
		$distr = new umiDistrReader($package);
		if(isset($_REQUEST['pos']) && $_REQUEST['pos']) {
			$pos = (int) $_REQUEST['pos'];
		} else {
			$pos = $distr->getCurrentPos();
		}
		
		$errors = "";
		$descr = "";
		for($i = 0; $i < 50; $i++) {
			$obj = $distr->getNextResource($pos);
			if(!$obj) continue;
			$descr = $obj->getDescription();
			$pos = $distr->getCurrentPos();
			
			if($obj instanceof umiDistrMySql) {
				if ($useXmlDriver) continue;
				require "mysql.php";
				
				mysql_query("SET AUTOCOMMIT=0");
				mysql_query("SET FOREIGN_KEY_CHECKS=0");
				
				try {
					$obj->restore();
					unset($obj);
				}  catch (Exception $e) {
					exit("ops, some errors...");
				}
				
				mysql_query("SET AUTOCOMMIT=1");
				mysql_query("SET FOREIGN_KEY_CHECKS=1");
				mysql_query("COMMIT");
				break;
			} else {
				try {
					$obj->restore();
					unset($obj);
				} catch (Exception $e) {
					$errMsg = $e->getMessage() . " on line " . $e->getLine();
					$errMsg = $errMsg;
					
					$errors .= $errMsg . "\n";
				}
			}
		}
		
		$is_done = 0;
		$proc = round($pos / $size * 100);
		if($pos == $size) {
			$is_done = 1;
		}
		
		if($errors) {
			echo <<<XML
<response>
	<status total='{$size}' position='{$pos}' proc='{$proc}' done='{$is_done}'>{$descr}</status>
	<!--<error>{$errors}</error>-->
</response>
XML;
			exit();
		}
		
		echo <<<XML
<response>
	<status total='{$size}' position='{$pos}' proc='{$proc}' done='{$is_done}'>{$descr}</status>
</response>
XML;
	}
	
	function doSaveSv() {
		require "./standalone.php";
		
		$login = getRequest('sv-login');
		$password = getRequest('sv-password');
		$keycode = getRequest('keycode');
		$fname = getRequest('fname');
		$lname = getRequest('lname');
		$email = getRequest('email');
		$license_type = getRequest('license_type');
		$license_code = getRequest('license_codename');
		$host = getServer('HTTP_HOST');
		
		if(substr($host, 0, 4) == 'www.') {
			$host = substr($host, 4);
		}

		if(defined('DB_DRIVER') && DB_DRIVER == 'xml') {
			XMLFactory::getInstance()->getProxy('domains.xml')->setElementValue('/umi/domains/domain[@id=1]', $host);
		} else {
			l_mysql_query("UPDATE cms3_domains SET host = '" . mysql_escape_string($host) . "' LIMIT 1");
		}

		$domain = domainsCollection::getInstance()->getDomain(1);
		$domain->setHost($host);
		$domain->commit();
		
		$regedit = regedit::getInstance();
		$regedit->setVar("//settings/keycode", $keycode);
		$regedit->setVar("//modules/autoupdate/system_edition", $license_code);
		
		$user = umiObjectsCollection::getInstance()->getObject(14);
		$user->setName($login);
		$user->setValue("login", $login);
		$user->setValue("password", md5($password));
		try {
			$user->setValue("e-mail", $email);
			$user->setValue("fname", $fname);
			$user->setValue("lname", $lname);
			$user->setValue("father_name", "");
		} catch (fieldRestrictionException $e) {}
		$user->commit();
		
		if(is_file("cache/registry")) unlink("cache/registry");
		if(is_file("cache/trash")) unlink("cache/trash");
		if(is_file("cache/engine")) unlink("cache/engine");
		file_put_contents("cache/engine", "");
		
		$_SESSION['cms_login'] = $login;
		$_SESSION['cms_pass'] = md5($password);
		$_SESSION['user_id'] = 14;
		
		echo <<<XML
<response>
</response>
XML;
exit;
	}
	
	
	function doGetDemoSites() {
		$resp = "";
		$sites = glob("sites/*.zip");
		foreach($sites as $site) {
			$filename = basename($site, ".zip");
			//$arr = pathinfo($filename);
			//$filename = $arr['filename'];
			$descrPath = "./sites/" . $filename . ".txt";
			if(is_file($descrPath)) {
				$descr = file_get_contents($descrPath);
			} else {
				$descr = "";
			}
			
			$resp .= <<<XML
	<site name="{$filename}.zip" photo="/sites/{$filename}.png"><![CDATA[{$descr}]]></site>

XML;
		}
		
		echo <<<XML
<response>
{$resp}
</response>
XML;
	}
	
	
	function doInstallSite() {
		$sitename = $_REQUEST['sitename'];

		require "./install-libs/site-install.php";
		
		if($sitename != 'demoblank') {
			l_mysql_query("DELETE FROM cms3_templates WHERE filename = 'sample.xsl'");
		}
		
		
		$installer = new packageInstaller("./sites/{$sitename}", realpath("."));
		$installer->install($status);

		$proc = $status['percent'];
		$descr = $status['part'];
		
		if($proc === NULL) {
			$proc = 100;
		}
		
		echo <<<XML
<response>
	<status proc="{$proc}"><![CDATA[{$descr}]]></status>
</response>
XML;
	}
	
	function doCleanupPages() {
		include "./standalone.php";
		$sel = new umiSelection;
		$sel->forceHierarchyTable();
			
		if(!isset($_SESSION['cleanup-total'])) {
			$total = sizeof(umiSelectionsParser::runSelection($sel));
			$_SESSION['cleanup-total'] = $total;
			$_SESSION['cleanup-current'] = 0;
			
			if($total == 0) {
				echo <<<XML
<response>
	<status proc="100"><![CDATA[]]></status>
</response>
XML;
				exit;
			}
		} else {
			 $total = $_SESSION['cleanup-total'];
		}
		
		$regedit = regedit::getInstance();
		$edition = $regedit->getVal("//modules/autoupdate/system_edition");
		$disabledModules = Array();
		switch ($edition) {
			case "soho":
			case "lite":
			case "free": {
				$disabledModules[] = 'forum';
				$disabledModules[] = 'webforms';
				$disabledModules[] = 'vote';
			}
			case "freelance": {
				$disabledModules[] = 'filemanager';
				$disabledModules[] = 'dispatches';
			}
			case "corporate": {
				$disabledModules[] = 'catalog';
				$disabledModules[] = 'photoalbum';
				$disabledModules[] = 'faq';
				$disabledModules[] = 'banners';
			}
			case "business": {
				$disabledModules[] = 'organization';
				$disabledModules[] = 'eshop';
				$disabledModules[] = 'comments';
			}
		}
		
		foreach($disabledModules as $moduleName) {
			$regedit->delVar("//modules/{$moduleName}");
			recRemoveDir("./classes/modules/{$moduleName}/");
		}
		
		$result = umiSelectionsParser::runSelection($sel);
		$_SESSION['cleanup-total'] = sizeof($result);
		$hierarchy = umiHierarchy::getInstance();
		
		$n = 0;
		for($i = $_SESSION['cleanup-current']; $i < sizeof($result); $i++) {
			if($n++ > 1) break;
			
			$_SESSION['cleanup-current'] = $i;
			$elementId = $result[$i];
			$element = $hierarchy->getElement($elementId, true, true);
			if($element instanceof umiHierarchyElement == false) continue;
			
			if(in_array($element->getModule(), $disabledModules)) {
				$hierarchy->delElement($elementId);
				$hierarchy->removeDeletedElement($elementId);
			}
		}

		$proc = ($total > 0) ? round(100 * $i / $total) : 100;
		if($proc > 100) $proc = 100;
		
		echo <<<XML
<response>
	<status proc="{$proc}"><![CDATA[]]></status>
</response>
XML;
		exit;
	}
	
	function doFinalizeInstallation() {
		touch("./installed");
		@chmod("./installed", 0777);
		unset($_SESSION['cleanup-current']);
		unset($_SESSION['cleanup-total']);
		unlink("./mysql.php");
		
		echo <<<XML
<response>
</response>
XML;
	}
	
	function __dbg() {}
	
	function recRemoveDir($path) {
		if(is_dir($path)) {
			if(is_writable($path)) {
				$dir = opendir($path);
				while($obj = readdir($dir)) {
					if($obj == "." || $obj == "..") continue;
					$objpath = $path . $obj;
					
					if(is_file($objpath)) {
						if(is_writable($objpath)) {
							unlink($objpath);
						}
					} else if (is_dir($objpath)) {
						recRemoveDir($objpath . '/');
					} else {
						continue;
					}
				}
				rmdir($path);
			}
		}
	}
?>