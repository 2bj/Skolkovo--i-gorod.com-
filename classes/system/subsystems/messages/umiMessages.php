<?php
 class umiMessages extends singleton implements iSingleton, iUmiMessages {private static $messageTypes = Array('private', 'sys-event', 'sys-log');protected function __construct() {}public function getMessages($v3b8cb51bd8c4ef331893ce61e3f3bc39 = false, $vcddce64c174af26a6a96332151d4013c = false) {$v8e44f0089b076e18a718eb9ca3d94674 = $this->getCurrentUserId();$v3b8cb51bd8c4ef331893ce61e3f3bc39 = (int) $v3b8cb51bd8c4ef331893ce61e3f3bc39;$vb71a97a0f96cb8b238309d23a188ae98 = $v3b8cb51bd8c4ef331893ce61e3f3bc39 ? " AND m.`sender_id` = '{$v3b8cb51bd8c4ef331893ce61e3f3bc39}'" : "";$vb71a97a0f96cb8b238309d23a188ae98 = $vcddce64c174af26a6a96332151d4013c ? " AND mi.`is_opened` = 0" : "";$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
SELECT m.`id`
	FROM `cms3_messages` m, `cms3_messages_inbox` mi
		WHERE mi.`recipient_id` = '{$v8e44f0089b076e18a718eb9ca3d94674}' AND m.`id` = mi.`message_id` {$vb71a97a0f96cb8b238309d23a188ae98}
			ORDER BY m.`create_time` DESC
SQL;   $result = l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);$vde70938849b75d3db63bba421c93e018 = Array();while(list($v009bc6ca542405d9097ae589731691fb) = mysql_fetch_row($result)) {$vde70938849b75d3db63bba421c93e018[] = new umiMessage($v009bc6ca542405d9097ae589731691fb);}return $vde70938849b75d3db63bba421c93e018;}public function getSendedMessages($vf971c32bc4e78145496d6fc158959139 = false) {$v8e44f0089b076e18a718eb9ca3d94674 = $this->getCurrentUserId();$vf971c32bc4e78145496d6fc158959139 = (int) $vf971c32bc4e78145496d6fc158959139;if($vf971c32bc4e78145496d6fc158959139) {$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
SELECT m.`id`
	FROM `cms3_messages` m, `cms3_messages_inbox` mi
		WHERE m.`sender_id` = '{$v8e44f0089b076e18a718eb9ca3d94674}' AND mi.`recipient_id` = '{$vf971c32bc4e78145496d6fc158959139}' AND m.`id` = mi.`message_id`
			ORDER BY m.`create_time` DESC
SQL;   }else {$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
SELECT m.`id`
	FROM `cms3_messages` m
		WHERE m.`sender_id` = '{$v8e44f0089b076e18a718eb9ca3d94674}'
			ORDER BY m.`create_time` DESC
SQL;   }$result = l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);$vde70938849b75d3db63bba421c93e018 = Array();while(list($v009bc6ca542405d9097ae589731691fb) = mysql_fetch_row($result)) {$vde70938849b75d3db63bba421c93e018[] = new umiMessage($v009bc6ca542405d9097ae589731691fb);}return $vde70938849b75d3db63bba421c93e018;}public static function getInstance() {return parent::getInstance(__CLASS__);}public function create($v599dcce2998a6b40b1e38e8c6006cb0a = 'private') {$v3b8cb51bd8c4ef331893ce61e3f3bc39 = $this->getCurrentUserId();if($this->checkMessageType($v599dcce2998a6b40b1e38e8c6006cb0a) == false) {throw new coreException('Unkown message type \"{$messageType}\"');}$v07cc694b9b3fc636710fa08b6922c42b = time();$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
INSERT INTO `cms3_messages` (`sender_id`, `create_time`, `type`)
	VALUES ('{$v3b8cb51bd8c4ef331893ce61e3f3bc39}', '{$v07cc694b9b3fc636710fa08b6922c42b}', '{$v599dcce2998a6b40b1e38e8c6006cb0a}')
SQL;   l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);$v009bc6ca542405d9097ae589731691fb = mysql_insert_id();return new umiMessage($v009bc6ca542405d9097ae589731691fb);}static public function getAllowedTypes() {return self::$messageTypes;}private function getCurrentUserId() {$permissions = permissionsCollection::getInstance();return $permissions->getUserId();}private function checkMessageType($v9cebbecc0f683775cabcd1c6dd3d70c7) {return in_array($v9cebbecc0f683775cabcd1c6dd3d70c7, self::getAllowedTypes());}};?>