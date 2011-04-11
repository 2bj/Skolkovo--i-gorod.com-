<?php
	require "./install-libs/packageInstaller.php";
	require "./install-libs/pclzip.lib.php";
	require "./install-libs/umiSimpleXML.php";
	
	require "./standalone.php";

	l_mysql_query('SET CHARSET utf8');
	
	$defaultDomain = domainsCollection::getInstance()->getDefaultDomain();
	$host = getServer('HTTP_HOST');
	if(substr($host, 0, 4) == 'www.') {
		$host = substr($host, 4);
	}
	
	if($defaultDomain && $host) {
		$defaultDomain->setHost($host);
		$defaultDomain->commit();
	}
	
	umiObjectProperty::$IGNORE_FILTER_INPUT_STRING = true;
?>