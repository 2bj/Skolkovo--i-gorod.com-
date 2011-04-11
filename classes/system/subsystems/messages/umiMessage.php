<?php
 class umiMessage extends umiEntinty implements iUmiEntinty, iUmiMessage {protected $store_type = 'message', $title, $content, $senderId, $createTime, $type, $priority, $isSended;public function getTitle() {return $this->title;}public function setTitle($vd5d3db1765287eef77d7927cc956f50a) {$this->title = (string) $vd5d3db1765287eef77d7927cc956f50a;$this->setIsUpdated();}public function getContent() {return $this->content;}public function setContent($v9a0364b9e99bb480dd25e1f0284c8555) {$this->content = (string) $v9a0364b9e99bb480dd25e1f0284c8555;$this->setIsUpdated();}public function getSenderId() {return $this->senderId;}public function setSenderId($v3b8cb51bd8c4ef331893ce61e3f3bc39 = null) {$this->senderId = (int) $v3b8cb51bd8c4ef331893ce61e3f3bc39;$this->setIsUpdated();}public function getType() {return $this->type;}public function setType($v599dcce2998a6b40b1e38e8c6006cb0a) {if(in_array($v599dcce2998a6b40b1e38e8c6006cb0a, umiMessages::getAllowedTypes()) == false) {throw new coreException("Unkown message type \"{$v599dcce2998a6b40b1e38e8c6006cb0a}\"");}$this->type = (string) $v599dcce2998a6b40b1e38e8c6006cb0a;$this->setIsUpdated();}public function getPriority() {return $this->priority;}public function setPriority($vb988295c268025b49dfb3df26171ddc3 = 0) {$this->priority = (int) $vb988295c268025b49dfb3df26171ddc3;$this->setIsUpdated();}public function getCreateTime() {return $this->createTime;}public function setCreateTime($v07cc694b9b3fc636710fa08b6922c42b) {$this->createTime = ($v07cc694b9b3fc636710fa08b6922c42b instanceof umiDate) ? $v07cc694b9b3fc636710fa08b6922c42b : new umiDate($v07cc694b9b3fc636710fa08b6922c42b);$this->setIsUpdated();}public function getIsSended() {return $this->isSended;}public function getRecipients() {$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
SELECT `recipient_id` FROM `cms3_messages_inbox` WHERE `message_id` = '{$this->id}'
SQL;
INSERT INTO `cms3_messages_inbox`
	(`message_id`, `recipient_id`)
		SELECT '{$this->id}', `id` FROM `cms3_objects`
			WHERE `id` IN ({$vf39cb51688b94030135fa75837c55ac2})
SQL;
UPDATE `cms3_messages_inbox` SET `is_opened` = '{$v007be202b67f2d1fba402fe1b3b078e5}' WHERE `message_id` = '{$this->id}' AND `recipient_id` = '{$v8e44f0089b076e18a718eb9ca3d94674}'
SQL;
SELECT `title`, `content`, `sender_id`, `create_time`, `type`, `priority`, `is_sended`
	FROM `cms3_messages` WHERE `id` = '{$this->id}'
SQL;
UPDATE `cms3_messages`
	SET `title` = '{$vd5d3db1765287eef77d7927cc956f50a}', `content` = '{$v9a0364b9e99bb480dd25e1f0284c8555}',
		`create_time` = '{$v1ed2e1b19b6e55d52d2473be17a4afd9}', `priority` = '{$vb988295c268025b49dfb3df26171ddc3}',
		`type` = '{$v599dcce2998a6b40b1e38e8c6006cb0a}', `sender_id` = {$v3b8cb51bd8c4ef331893ce61e3f3bc39}, `is_sended` = '{$v9c014ff3d8d453a6273a3384feca7414}'
			WHERE `id` = '{$this->id}'
SQL;