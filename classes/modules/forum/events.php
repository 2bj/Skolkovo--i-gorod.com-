<?php
	// __sysevents.php - front-end mode events' handlers
	$oEventListener	= new umiEventListener('forum_message_post_do', "forum", "onDispatchChanges");
	$oEventListener	= new umiEventListener('forum_topic_post_do', "forum", "onAddTopicToDispatch");
	
	// -----
	new umiEventListener('forum_message_post_do', 'forum', 'onMessagePost');

	// __events_handlers.php - common modes events' handlers
	$o_listener_on_append	= new umiEventListener('systemCreateElementAfter', "forum", "onElementAppend");
	$o_listener_on_remove	= new umiEventListener('systemDeleteElement', "forum", "onElementRemove");
	$o_listener_on_activity	= new umiEventListener('systemSwitchElementActivity', "forum", "onElementActivity");
?>