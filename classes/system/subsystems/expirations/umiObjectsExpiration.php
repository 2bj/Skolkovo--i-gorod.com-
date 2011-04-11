<?php
 class umiObjectsExpiration extends singleton implements iSingleton, iUmiObjectsExpiration {protected $defaultExpires = 86400;protected function __construct() {}public static function getInstance() {return parent::getInstance(__CLASS__);}public function run() {$v07cc694b9b3fc636710fa08b6922c42b = time();$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
DELETE FROM `cms3_objects`
	WHERE `id` = (
		SELECT `obj_id`
			FROM `cms3_objects_expiration`
				WHERE (`entrytime` + `expire`) >= '{$v07cc694b9b3fc636710fa08b6922c42b}'
	)
SQL;   l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);}public function set($v16b2b26000987faccb260b9d39df1269, $v09bcb72d61c0d6d1eff5336da6881557 = false) {if($v09bcb72d61c0d6d1eff5336da6881557 == false) {$v09bcb72d61c0d6d1eff5336da6881557 = $this->defaultExpires;}$v16b2b26000987faccb260b9d39df1269 = (int) $v16b2b26000987faccb260b9d39df1269;$v09bcb72d61c0d6d1eff5336da6881557 = (int) $v09bcb72d61c0d6d1eff5336da6881557;$v07cc694b9b3fc636710fa08b6922c42b = time();$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
REPLACE INTO `cms3_objects_expiration`
	(`obj_id`, `entrytime`, `expire`)
		VALUES ('{$v16b2b26000987faccb260b9d39df1269}', '{$v07cc694b9b3fc636710fa08b6922c42b}', '{$v09bcb72d61c0d6d1eff5336da6881557}')
SQL;   l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);}public function clear($v16b2b26000987faccb260b9d39df1269) {$v16b2b26000987faccb260b9d39df1269 = (int) $v16b2b26000987faccb260b9d39df1269;$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
DELETE FROM `cms3_objects_expiration`
	WHERE `obj_id` = '{$v16b2b26000987faccb260b9d39df1269}'
SQL;   l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);}};?>