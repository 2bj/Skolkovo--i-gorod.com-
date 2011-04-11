<?php
 class clusterCacheSync {protected $enabled = false, $nodeId, $loadedKeys = Array(), $modifiedKeys = Array();public static function getInstance() {static $v7123a699d77db6479a1d8ece2c4f1c16;if(!$v7123a699d77db6479a1d8ece2c4f1c16) {$v7123a699d77db6479a1d8ece2c4f1c16 = new clusterCacheSync;}return $v7123a699d77db6479a1d8ece2c4f1c16;}public function notify($v3c6e0b8a9c15224a8228b9a98ca1531d) {$v3c6e0b8a9c15224a8228b9a98ca1531d = (string) $v3c6e0b8a9c15224a8228b9a98ca1531d;if(!$v3c6e0b8a9c15224a8228b9a98ca1531d) return false;if(in_array($v3c6e0b8a9c15224a8228b9a98ca1531d, $this->modifiedKeys)) {return false;}else {$this->modifiedKeys[] = $v3c6e0b8a9c15224a8228b9a98ca1531d;return true;}}public function cleanup() {foreach($this->loadedKeys as $v865c0c0b4ab0e063e5caa3387c1a8741 => $v3c6e0b8a9c15224a8228b9a98ca1531d) {cacheFrontend::getInstance()->del();}}public function __destruct() {$this->saveKeys();}protected function __construct() {if(isset($_SERVER['SERVER_ADDR'])) {$this->enabled = true;$this->init();}}protected function getNodeId() {return $this->nodeId;}public function saveKeys() {if(empty($this->modifiedKeys)) return;$vd515995b533ca9885d38f38535debc73 = $this->getNodeId();$vac5c74b64b4b8352ef2f181affb5ac2a = "INSERT INTO `cms3_cluster_nodes_cache_keys` (`key`) VALUES ";$vb2021c4149dfd5dc85c88823b7df34bd = Array();foreach($this->modifiedKeys as $v3c6e0b8a9c15224a8228b9a98ca1531d) {$vb2021c4149dfd5dc85c88823b7df34bd[] = "('{$v3c6e0b8a9c15224a8228b9a98ca1531d}')";}$vac5c74b64b4b8352ef2f181affb5ac2a .= implode(", ", $vb2021c4149dfd5dc85c88823b7df34bd);l_mysql_query("START TRANSACTION");l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
INSERT INTO `cms3_cluster_nodes_cache_keys`
	(`node_id`, `key`)
		SELECT `n`.`id`, `nk`.`key`
			FROM `cms3_cluster_nodes_cache_keys` `nk`, `cms3_cluster_nodes` `n`
				WHERE `nk`.`node_id` = ''
SQL;   l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);l_mysql_query("DELETE FROM `cms3_cluster_nodes_cache_keys` WHERE `node_id` = ''");l_mysql_query("COMMIT");}public function init() {if(($this->loadNodeId()) == false) {$this->bringUp();$this->loadNodeId();}$this->loadKeys();$this->cleanup();}protected function loadKeys() {$v0fea6a13c52b4d4725368f24b045ca84 = cacheFrontend::getInstance();$vd515995b533ca9885d38f38535debc73 = $this->getNodeId();$vac5c74b64b4b8352ef2f181affb5ac2a = "SELECT DISTINCT `key` FROM `cms3_cluster_nodes_cache_keys` WHERE `node_id` = '{$vd515995b533ca9885d38f38535debc73}'";$result = mysql_unbuffered_query($vac5c74b64b4b8352ef2f181affb5ac2a);$v14f802e1fba977727845e8872c1743a7 = Array();while(list($v3c6e0b8a9c15224a8228b9a98ca1531d) = mysql_fetch_row($result)) {$v0fea6a13c52b4d4725368f24b045ca84->deleteKey($v3c6e0b8a9c15224a8228b9a98ca1531d, true);$v14f802e1fba977727845e8872c1743a7[] = $v3c6e0b8a9c15224a8228b9a98ca1531d;}mysql_free_result($result);$vc693ebc80e2b73b0d3bbece47c529399 = $this->getNodeId();$vac5c74b64b4b8352ef2f181affb5ac2a = "DELETE FROM `cms3_cluster_nodes_cache_keys` WHERE `node_id` = '{$vd515995b533ca9885d38f38535debc73}' AND `key` IN ('" . implode("', '", $v14f802e1fba977727845e8872c1743a7). "')";l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);}protected function loadNodeId() {$va2a378958abe1e16d9a95dd3ad727378 = mysql_real_escape_string($_SERVER['SERVER_ADDR']);$result = l_mysql_query("SELECT `id` FROM `cms3_cluster_nodes` WHERE `node_ip` = '{$va2a378958abe1e16d9a95dd3ad727378}'");if(mysql_num_rows($result)) {list($vd515995b533ca9885d38f38535debc73) = mysql_fetch_row($result);$this->nodeId = $vd515995b533ca9885d38f38535debc73;return true;}else {$vac5c74b64b4b8352ef2f181affb5ac2a = "INSERT INTO `cms3_cluster_nodes` (`node_ip`) VALUES ('{$va2a378958abe1e16d9a95dd3ad727378}')";l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);$this->nodeId = mysql_insert_id();return true;}}protected function bringUp() {$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
CREATE TABLE `cms3_cluster_nodes_cache_keys` (
	`node_id` INT DEFAULT NULL,
	`key` VARCHAR(255) NOT NULL,

	KEY `node_id` (`node_id`),
	KEY `key` (`key`)
) ENGINE=InnoDB
SQL;   l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
CREATE TABLE `cms3_cluster_nodes` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`node_ip` VARCHAR(16) NOT NULL,

	KEY `node_id` (`id`),
	KEY `node_ip` (`node_ip`)
) ENGINE=InnoDB
SQL;   l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);}};?>