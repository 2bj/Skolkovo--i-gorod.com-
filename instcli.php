<?php

	// check is cli mode
	if (isset($_SERVER['DOCUMENT_ROOT']) && strlen($_SERVER['DOCUMENT_ROOT'])) {
		die("Can't execute this installer from browser. Use console.");
	}


	// CLI MODE INSTALLER

	// CONST
	define("UMI_INSTALL_INI", "./install.ini");

	define("E_UMI_UNDEFINED", 10001);

	// SERVER SETTINGS ERRORS
	define("E_UMI_ENV_PHPVERSION", 10011);
	define("E_UMI_ENV_PHPSAFEMODE", 10012);
	define("E_UMI_ENV_DOCROOTREAD", 10013);
	define("E_UMI_ENV_DOCROOTWRITE", 10014);
	define("E_UMI_ENV_HTACCESS", 10015);
	define("E_UMI_ENV_ZENDOPTIMIZER", 10016);

	define("E_UMI_DB_CONNECTION", 10021);
	define("E_UMI_DB_NOTEXISTS", 10022);
	define("E_UMI_DB_INNODB", 10023);
	
	// ERRORS
	define("E_UMI_ALREADY_INSTALLED", 20020);

	define("E_UMI_XMLDRIVER_UNSUPPORTED", 20021);

	define("E_UMI_INI_NOTEXISTS", 20021);
	define("E_UMI_INI_EMPTY", 20022);
	define("E_UMI_INI_REQSECTION", 20024);
	define("E_UMI_INI_REQOPTION", 20025);

	// PACK ERRORS
	define("E_UMI_PACK_ERROR", 30031);




	error_reporting(E_ALL);
	ini_set("display_errors", "1");

	ini_set('include_path', str_replace("\\", "/", dirname(__FILE__)) . '/');
	$_SERVER['DOCUMENT_ROOT'] = dirname(__FILE__);

	// reporter
	function cliErrorReporter($iError, $sDesc="", $bBreak = true) {

		$sError = "";
		switch ($iError) {


			case E_UMI_ENV_PHPVERSION:
				$sError = "Для установки UMI.CMS необходим PHP 5 и выше"; break;
			case E_UMI_ENV_ZENDOPTIMIZER:
				$sError = "Для установки UMI.CMS необходим Zend Optimizer (www.zend.com)"; break;
			case E_UMI_ENV_PHPSAFEMODE:
				$sError = "Безопасный режим работы php должен быть выключен (safe_mode=off)"; break;
			case E_UMI_ENV_DOCROOTREAD:
			case E_UMI_ENV_DOCROOTWRITE:
				$sError = "На корневую директорию, в которую вы устанавливаете UMI.CMS дожны стоять права на чтение и запись"; break;
			case E_UMI_ENV_HTACCESS:
				$sError = "Файл .htaccess не доступен для записи"; break;


			case E_UMI_DB_CONNECTION:
				$sError = "Ошибка соединения с базой данных"; break;
			case E_UMI_DB_NOTEXISTS:
				$sError = "Указанная база данных не существует"; break;
			case E_UMI_DB_INNODB:
				$sError = "В текущих настройках MySql должна быть поддержка InnoDB"; break;

			case E_UMI_PACK_ERROR:
				$sError = "Ошибка в ucp-пакете"; break;

			case E_UMI_ALREADY_INSTALLED:
				$sError = "[{$iError}] UMI.CMS уже установлена. Для принудительной установки удалите файл installed из корневой директории сервера."; break;

			case E_UMI_XMLDRIVER_UNSUPPORTED:
				$sError = "[{$iError}] XML Driver не поддерживается, начиная с версии 2.8.0"; break;

			case E_UMI_INI_NOTEXISTS:
				$sError = "[{$iError}] Инструкции для установки \"" . UMI_INSTALL_INI. "\": не найдены."; break;
			case E_UMI_INI_EMPTY:
				$sError = "[{$iError}] Файл настроек \"" . UMI_INSTALL_INI. "\": пуст."; break;
			case E_UMI_INI_REQSECTION:
				$sError = "[{$iError}] Файл настроек должен иметь обязательную секцию"; break;
			case E_UMI_INI_REQOPTION:
				$sError = "[{$iError}] Файл настроек должен иметь обязательную опцию"; break;
			default:
				$sError = "[{$iError}] Неопределенная ошибка исполнения";

		}
		if (strlen($sDesc)) $sError .= " (" . $sDesc . ")";
		$sError .= "\r\n";
		fwrite(STDERR, $sError);
		if ($bBreak) exit($iError);
	}

	function getRequiredOpt($arrINISect, $sOptName, $sSect = "") {
		if (isset($arrINISect[$sOptName])) {
			return $arrINISect[$sOptName];
		} else {
			cliErrorReporter(E_UMI_INI_REQOPTION, "[$sSect]=>{$sOptName}");
		}
	}

	// 1. CHECK IS INSTALLED
	if(is_file("./installed")) cliErrorReporter(E_UMI_ALREADY_INSTALLED);

	// 2. GET SETTINGS
	// check is ini exists
	if (!file_exists(UMI_INSTALL_INI)) cliErrorReporter(E_UMI_INI_NOTEXISTS);
	$arrINI = parse_ini_file(UMI_INSTALL_INI, true);

	// check is ini empty
	if (!count($arrINI)) cliErrorReporter(E_UMI_INI_EMPTY);

	$UMI_SERVER = array();		// system settings
	$UMI_LICENSE = array();		// license info
	$UMI_DBSETTINGS = array();	// db info
	$UMI_PACKAGE = array();
	$UMI_SUPERVISOR = array();
	$UMI_BRAND = array();

	$UMI_DEMOSITE_PACKAGE = "demoold.zip";	// demo site info

	// [SYSTEM]
	$UMI_SERVER['phppath'] = 'php';
	$UMI_SERVER['phpini']  = '';
	if (isset($arrINI['SERVER'])) {
		if (isset($arrINI['SERVER']['phppath'])) $UMI_SERVER['phppath'] = $arrINI['SERVER']['phppath'];
		if (isset($arrINI['SERVER']['phpini']))  $UMI_SERVER['phpini']  = $arrINI['SERVER']['phpini'];
	}

	// check required sections and options
	// [LICENSE]
	if (isset($arrINI['LICENSE'])) {
		$arrSect = $arrINI['LICENSE'];
		$UMI_LICENSE['edition'] = isset($arrSect['edition']) ? $arrSect['edition'] : 'free';
		$UMI_LICENSE['domain']  = getRequiredOpt($arrSect, "domain", "LICENSE");
		$UMI_LICENSE['key']     = getRequiredOpt($arrSect, "key", "LICENSE");
		$UMI_LICENSE['ip']      = getRequiredOpt($arrSect, "ip", "LICENSE");
	} else {
		cliErrorReporter(E_UMI_INI_REQSECTION, "LICENSE");
	}
	
	// [PACKAGE]
	if (isset($arrINI['PACKAGE'])) {
		$arrSect = $arrINI['PACKAGE'];
		$UMI_PACKAGE['file'] = getRequiredOpt($arrSect, "file", "PACKAGE");
	} else {
		cliErrorReporter(E_UMI_INI_REQSECTION, "PACKAGE");
	}

	// [DB]
	if (isset($arrINI['DB'])) {
		$arrSect = $arrINI['DB'];
		$UMI_DBSETTINGS['host']     = getRequiredOpt($arrSect, "host", "DB");
		$UMI_DBSETTINGS['user']     = getRequiredOpt($arrSect, "user", "DB");
		$UMI_DBSETTINGS['password'] = getRequiredOpt($arrSect, "password", "DB");
		$UMI_DBSETTINGS['dbname']   = getRequiredOpt($arrSect, "dbname", "DB");
		$UMI_DBSETTINGS['driver']   = isset($arrSect['driver']) ? $arrSect['driver'] : 'default';
	} else {
		cliErrorReporter(E_UMI_INI_REQSECTION, "DB");
	}


	// [SUPERVISOR]
	if (isset($arrINI['SUPERVISOR'])) {
		$arrSect = $arrINI['SUPERVISOR'];
		$UMI_SUPERVISOR['login']    = getRequiredOpt($arrSect, "login", "SUPERVISOR");
		$UMI_SUPERVISOR['password'] = getRequiredOpt($arrSect, "password", "SUPERVISOR");
		$UMI_SUPERVISOR['fname']    = isset($arrSect['fname']) ? $arrSect['fname'] : "Supervisor";
		$UMI_SUPERVISOR['lname']    = isset($arrSect['lname']) ? $arrSect['lname'] : "";
		$UMI_SUPERVISOR['mname']    = isset($arrSect['mname']) ? $arrSect['mname'] : "";
		$UMI_SUPERVISOR['e-mail']   = isset($arrSect['e-mail']) ? $arrSect['e-mail'] : "admin@" . $UMI_DBSETTINGS['host'];
	} else {
		cliErrorReporter(E_UMI_INI_REQSECTION, "SUPERVISOR");
	}

	// [BRAND]
	if (isset($arrINI['BRAND'], $arrINI['BRAND']['buy-lbl'], $arrINI['BRAND']['buy-link'])) {
		$UMI_BRAND = $arrINI['BRAND'];
	}

	// [DEMOSITE]
	if (isset($arrINI['DEMOSITE'], $arrINI['DEMOSITE']['package'])) {
		$UMI_DEMOSITE_PACKAGE = $arrINI['DEMOSITE']['package'];
	}


	// 3. CHECK SERVER SETTINGS
	// php version
	if (version_compare(PHP_VERSION , "5.0.0", "<")) cliErrorReporter(E_UMI_ENV_PHPVERSION);

	// check document root perms
	$current_dir = trim(dirname(__FILE__));
	if (!is_readable($current_dir)) cliErrorReporter(E_UMI_ENV_DOCROOTREAD, $current_dir);
	if (!is_writeable($current_dir)) cliErrorReporter(E_UMI_ENV_DOCROOTWRITE, $current_dir);

	// zend optimizer
	//if (!function_exists("zend_loader_enabled")) cliErrorReporter(E_UMI_ENV_ZENDOPTIMIZER);


	// safe mode
	if ((int) ini_get('safe_mode')) cliErrorReporter(E_UMI_ENV_PHPSAFEMODE);


	if($UMI_DBSETTINGS['driver'] != 'xml') {
		// mysql connect
		if (!function_exists('mysql_connect')) {
			cliErrorReporter(E_UMI_DB_CONNECTION, 'MySQL is not enabled. Use the --with-mysql[=DIR] configure option to include MySQL support.');
		}
		$resDb = @mysql_connect($UMI_DBSETTINGS['host'], $UMI_DBSETTINGS['user'], $UMI_DBSETTINGS['password']);
		if (!$resDb) cliErrorReporter(E_UMI_DB_CONNECTION, mysql_error());
		if (!@mysql_select_db($UMI_DBSETTINGS['dbname'])) cliErrorReporter(E_UMI_DB_NOTEXISTS, mysql_error());
		
		// mysql settings
		mysql_query("SET NAMES utf8_general_ci");
		mysql_query("SET CHARSET utf8");

		mysql_query("SET CHARACTER SET utf8");
		mysql_query("SET SESSION collation_connection = 'utf8_general_ci'");


		// innodb
		$sql = "SHOW VARIABLES LIKE 'have_innodb'";
		$result = mysql_query($sql);
		list(,$have_innodb) = mysql_fetch_row($result);
		if (strtoupper($have_innodb) != "YES") cliErrorReporter(E_UMI_DB_INNODB);
	}



	// 4. INSTALLATION.........

	// create db config

if($UMI_DBSETTINGS['driver'] == 'xml') {
	cliErrorReporter(E_UMI_XMLDRIVER_UNSUPPORTED);
} else {
	$from = array('%db-core-host%', '%db-core-login%', '%db-core-password%', '%db-core-name%');
	$to = array($UMI_DBSETTINGS["host"], $UMI_DBSETTINGS["user"], $UMI_DBSETTINGS["password"], $UMI_DBSETTINGS["dbname"]);
	
	$cont = file_get_contents("./config.ini.original");
	$cont = str_replace($from, $to, $cont);
	file_put_contents("./config.ini", $cont);
	chmod("./config.ini", 0777);

	
	$sDbConfig = <<<END
<?php
	error_reporting(~E_ALL);

	/* UMI.CMS mySQL - connection to database */
	mysql_connect('{$UMI_DBSETTINGS["host"]}', '{$UMI_DBSETTINGS["user"]}', '{$UMI_DBSETTINGS["password"]}') or die(mysql_fatal());
	mysql_select_db('{$UMI_DBSETTINGS["dbname"]}') or die(mysql_fatal());

	mysql_query("SET NAMES utf8_general_ci");
	mysql_query("SET CHARSET utf8");

	mysql_query("SET CHARACTER SET utf8");
	mysql_query("SET SESSION collation_connection = 'utf8_general_ci'");

END;
	
	$sDbConfig .= "\r\n?>";
	cms_mkfile("./mysql.php", $sDbConfig, true);
}
	// install package

	$bNextStep = true;
	$iCurrPos = 0;
	while($bNextStep) {
		$bNextStep = false;
		$sCmd = $UMI_SERVER['phppath'] . (strlen($UMI_SERVER['phpini']) ? " -c ".$UMI_SERVER['phpini'] : "") . " -f  instunpack.php {$UMI_PACKAGE['file']} " . $iCurrPos . " " . $UMI_DBSETTINGS['driver'];
		$vAnsw = shell_exec($sCmd);
		if (is_null($vAnsw)) {
			exit(E_UMI_PACK_ERROR);
		} elseif(intval($vAnsw) > 0) {
			$iCurrPos = intval($vAnsw);
			$bNextStep = true;
		}
	}


	$_SERVER['HTTP_HOST'] = $UMI_LICENSE['domain'];
	$_SERVER['SERVER_ADDR'] = $UMI_LICENSE['ip'];

	// put license
	include "./standalone.php";

	if($UMI_DBSETTINGS['driver'] == 'xml') {
		XMLFactory::getInstance()->getProxy('domains.xml')->setElementValue('/umi/domains/domain[@id=1]', $UMI_LICENSE['domain']);
		regedit::getInstance()->delVar("//modules/stat");
		regedit::getInstance()->delVar("//modules/search");
	} else {
		mysql_query("UPDATE cms3_domains SET host = '" . mysql_escape_string($UMI_LICENSE['domain']) . "' LIMIT 1");
	}

	regedit::getInstance()->setVar("//settings/keycode", $UMI_LICENSE['key']);
	regedit::getInstance()->setVar("//modules/autoupdate/system_edition", $UMI_LICENSE['edition']);

	// starting configure cms 
	$object_id = 14;
	$object = umiObjectsCollection::getInstance()->getObject($object_id);

	$object->setName($UMI_SUPERVISOR['login']);
	$object->setValue("login", $UMI_SUPERVISOR['login']);
	$object->setValue("password", md5($UMI_SUPERVISOR['password']));
	$object->setValue("lname", $UMI_SUPERVISOR['lname']);
	$object->setValue("fname", $UMI_SUPERVISOR['fname']);
	$object->setValue("father_name", $UMI_SUPERVISOR['mname']);
	$object->setValue("e-mail", $UMI_SUPERVISOR['e-mail']);
	$object->commit();

	// try put htaccess

	$htaccess_cont = <<<END

RewriteEngine On

RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^robots\.txt$  /sbots.php?path=$1%{QUERY_STRING} [L]

RewriteRule ^(.*)\.xml$ index.php?xmlMode=force&path=$1&%{QUERY_STRING} [L]

RewriteRule ^(udata|upage|uobject|ufs|usel):?(\/\/)?(.*)$ releaseStreams.php?scheme=$1&path=$3?%{QUERY_STRING} [L]


RewriteCond %{REQUEST_URI} !^styles
RewriteCond %{REQUEST_URI} !^css
RewriteCond %{REQUEST_URI} !\.css
RewriteCond %{REQUEST_URI} !^js
RewriteCond %{REQUEST_URI} !\.js
RewriteCond %{REQUEST_URI} !^images
RewriteCond %{REQUEST_URI} !^webstat
RewriteCond %{REQUEST_FILENAME} !-f

RewriteRule ^(.*)$ index.php?path=$1&%{QUERY_STRING} [L]

END;



	// install demosite
	define("UMI_TIME_LIMIT_DISABLED" , 1);

	require "./install-libs/packageInstaller.php";
	require "./install-libs/pclzip.lib.php";
	require "./install-libs/umiSimpleXML.php";
	

	function __dbg($s) {
		echo $s . "\r\n";
	}

	try {
		$installer = new packageInstaller("./sites/" . $UMI_DEMOSITE_PACKAGE, realpath("."));
		$installer->install();
	} catch (Exception $e) {
		fwrite(STDERR, $e->getMessage());
		exit($e->getCode());
	}
	

	cms_mkfile("./.htaccess", $htaccess_cont);
	cms_mkfile("./installed", "");
	if(!is_writable("./.htaccess")) cliErrorReporter(E_UMI_ENV_HTACCESS);


	// brand
	if (count($UMI_BRAND)) {
		$sRuLangFile = "./classes/modules/i18n.php";
		$sEnLangFile = "./classes/modules/i18n.en.php";
		if (is_file($sRuLangFile)) {
			$sLabels = <<<END

	// instcli autocreate ru-labels
	\$i18n["buy-umi-cms"]	= "{$UMI_BRAND['buy-lbl']}";
	\$i18n["buy-umi-cms-link"]	= "{$UMI_BRAND['buy-link']}";
	
END;
			$sF = file_get_contents($sRuLangFile);
			$sF = str_replace('?>', $sLabels."\r\n".'?>', $sF);
			file_put_contents($sRuLangFile, $sF);
		}

		if (isset($UMI_BRAND['en-buy-lbl'], $UMI_BRAND['en-buy-link']) && is_file($sEnLangFile)) {
			$sLabels = <<<END

	// instcli autocreate en-labels
	\$i18n["buy-umi-cms"]	= "{$UMI_BRAND['en-buy-lbl']}";
	\$i18n["buy-umi-cms-link"]	= "{$UMI_BRAND['en-buy-link']}";
	
END;

			$sF = file_get_contents($sEnLangFile);
			$sF = str_replace('?>', $sLabels."\r\n".'?>', $sF);
			file_put_contents($sEnLangFile, $sF);

		}

	}

	unlink(UMI_INSTALL_INI);



////////////////////////////////////////////////////////////////////////////////////////


	function cms_mkfile($pdir, $cont = "", $b_force = false) {
		if(!$pdir)
			return;
		if(!is_file($pdir) || $b_force) {
			file_put_contents($pdir, $cont);
			chmod($pdir, 0777);
		}
	}


?>