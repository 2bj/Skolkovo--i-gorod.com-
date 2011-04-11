<?php
	new umiEventListener('cron', 'config', 'runGarbageCollector');
	
	new umiEventListener('systemModifyObject', 'config', 'systemEventsNotify');
?>