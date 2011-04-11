<?php
	$headers = unserialize(base64_decode('YTo0OntpOjA7czoyMzoiWC1Qb3dlcmVkLUJ5OiBQSFAvNS4yLjYiO2k6MTtzOjM4OiJFeHBpcmVzOiBUaHUsIDE5IE5vdiAxOTgxIDA4OjUyOjAwIEdNVCI7aToyO3M6Nzc6IkNhY2hlLUNvbnRyb2w6IG5vLXN0b3JlLCBuby1jYWNoZSwgbXVzdC1yZXZhbGlkYXRlLCBwb3N0LWNoZWNrPTAsIHByZS1jaGVjaz0wIjtpOjM7czoxNjoiUHJhZ21hOiBuby1jYWNoZSI7fQ=='));
	$session = unserialize(base64_decode('YTo0OntzOjc6InVzZXJfaWQiO3M6NDoiMjM3MyI7czo4OiJpc19hZG1pbiI7YToxOntpOjIzNzM7YjowO31zOjg6ImlzX2h1bWFuIjtpOjE7czoxOToib2xkX2xvZ2dlZF9pbl92YWx1ZSI7YjowO30='));
	
	if(is_array($headers)) {
		$cmp = strtolower("Set-Cookie");
		
		for($i = 0; $i < sizeof($headers); $i++) {
			if(substr(strtolower($headers[$i]), 0, strlen($cmp)) == $cmp) {
				continue;
			} else {
				header($headers[$i]);
			}
		}
	}
	if (!session_id()) session_start();
	$_SESSION = $session;
?>