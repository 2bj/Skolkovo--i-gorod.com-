<?php
	if (regedit::getInstance()->getVal("//settings/lock_pages")) {
		$oContentBeginEdit = new umiEventListener("sysytemBeginPageEdit", "content", "systemLockPage");
		$oContentSave = new umiEventListener("systemModifyElement", "content", "systemUnlockPage");
	}
	
	if (regedit::getInstance()->getVal("//settings/expiration_control")) {
		$oSendNotification = new umiEventListener("cron", "content", "cronSendNotification");
		$oUnpublishPage = new umiEventListener("cron", "content", "cronUnpublishPage");
		$oAddUnpublishSave = new umiEventListener("systemCreateElementAfter", "content", "pageCheckExpirationAdd");	
		$oEditUnpublisSave = new umiEventListener("systemModifyElement", "content", "pageCheckExpiration");
	}
	// AntiSpam
	if((int) mainConfiguration::getInstance()->get('anti-spam', 'service.enabled')) {
		new umiEventListener("systemModifyPropertyValue", "content", "onModifyPoropertyAntispam");
		new umiEventListener("systemModifyElement", "content", "onModifyElementAntispam");
	}
?>