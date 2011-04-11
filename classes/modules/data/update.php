<?php
 function checkMysqlError() {if($v56bd7107802ebe56c6918992f0608ec6 = mysql_error()) {echo $v56bd7107802ebe56c6918992f0608ec6, "<br />";}}function getAllParents($vb80bb7740288fda1f201890375a60c8f) {$vc68ad910ed49ac65f21f1bf2c5dbf912 = Array();while($vb80bb7740288fda1f201890375a60c8f) {$vac5c74b64b4b8352ef2f181affb5ac2a = "SELECT rel FROM cms3_hierarchy WHERE id = '{$vb80bb7740288fda1f201890375a60c8f}'";$result = mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);checkMysqlError();if(mysql_num_rows($result)) {list($vb80bb7740288fda1f201890375a60c8f) = mysql_fetch_row($result);if(!$vb80bb7740288fda1f201890375a60c8f) continue;if(in_array($vb80bb7740288fda1f201890375a60c8f, $vc68ad910ed49ac65f21f1bf2c5dbf912)) {break;}$vc68ad910ed49ac65f21f1bf2c5dbf912[] = $vb80bb7740288fda1f201890375a60c8f;}else {return false;}}return array_reverse($vc68ad910ed49ac65f21f1bf2c5dbf912);}function makeHierarchyRelationsTable($vb80bb7740288fda1f201890375a60c8f) {$vc68ad910ed49ac65f21f1bf2c5dbf912 = getAllParents($vb80bb7740288fda1f201890375a60c8f);$vc9e9a848920877e76685b2e4e76de38d = sizeof($vc68ad910ed49ac65f21f1bf2c5dbf912);$vac5c74b64b4b8352ef2f181affb5ac2a = "INSERT INTO cms3_hierarchy_relations (rel_id, child_id, level) VALUES (NULL, '{$vb80bb7740288fda1f201890375a60c8f}', '{$vc9e9a848920877e76685b2e4e76de38d}')";mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);checkMysqlError();foreach($vc68ad910ed49ac65f21f1bf2c5dbf912 as $v6be379826b20cc58475f636e33f4606b) {$vac5c74b64b4b8352ef2f181affb5ac2a = "INSERT INTO cms3_hierarchy_relations (rel_id, child_id, level) VALUES ('{$v6be379826b20cc58475f636e33f4606b}', '{$vb80bb7740288fda1f201890375a60c8f}', '{$vc9e9a848920877e76685b2e4e76de38d}')";mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);checkMysqlError();}}if(!defined("DB_DRIVER")) {$result = mysql_query("SELECT rel_id, child_id, level FROM cms3_hierarchy_relations LIMIT 1");if($v56bd7107802ebe56c6918992f0608ec6 = mysql_error()) {mysql_query("ALTER TABLE cms3_object_fields ADD is_required tinyint(1) default NULL");$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
DROP TABLE IF EXISTS cms3_hierarchy_relations
SQL;   mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);checkMysqlError();$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
CREATE TABLE `cms3_hierarchy_relations` (
	`rel_id` INT UNSIGNED DEFAULT NULL,
	`child_id` INT UNSIGNED,
	`level` INT UNSIGNED,
	
	KEY `rel_id` (`rel_id`),
	KEY `child_id` (`child_id`),
	KEY `level` (`level`),
	
	CONSTRAINT `Hierarchy relation by rel_id` FOREIGN KEY (`rel_id`) REFERENCES `cms3_hierarchy` (`id`) ON UPDATE CASCADE,
	CONSTRAINT `Hierarchy relation by child_id` FOREIGN KEY (`child_id`) REFERENCES `cms3_hierarchy` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8
SQL;   mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);checkMysqlError();$vac5c74b64b4b8352ef2f181affb5ac2a = "SELECT id FROM cms3_hierarchy";$result = mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);checkMysqlError();while(list($vb80bb7740288fda1f201890375a60c8f) = mysql_fetch_row($result)) {makeHierarchyRelationsTable($vb80bb7740288fda1f201890375a60c8f);}}}?>