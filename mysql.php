<?php
	error_reporting(~E_ALL);

	/* UMI.CMS mySQL - connection to database */
	mysql_connect('localhost', 'igorod', 'innA1985') or die(mysql_fatal());
	mysql_select_db('igorod') or die(mysql_fatal());

	mysql_query("SET NAMES utf8_general_ci");
	mysql_query("SET CHARSET utf8");

	mysql_query("SET CHARACTER SET utf8");
	mysql_query("SET SESSION collation_connection = 'utf8_general_ci'");
	
	mysql_query("SET SESSION sql_mode = 'ANSI'");
?>