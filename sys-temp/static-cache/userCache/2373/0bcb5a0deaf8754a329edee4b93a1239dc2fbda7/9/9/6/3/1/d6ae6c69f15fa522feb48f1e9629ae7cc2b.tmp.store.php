<?php
	$headers = unserialize(base64_decode('YTo0OntpOjA7czoyMzoiWC1Qb3dlcmVkLUJ5OiBQSFAvNS4yLjYiO2k6MTtzOjM4OiJFeHBpcmVzOiBUaHUsIDE5IE5vdiAxOTgxIDA4OjUyOjAwIEdNVCI7aToyO3M6Nzc6IkNhY2hlLUNvbnRyb2w6IG5vLXN0b3JlLCBuby1jYWNoZSwgbXVzdC1yZXZhbGlkYXRlLCBwb3N0LWNoZWNrPTAsIHByZS1jaGVjaz0wIjtpOjM7czoxNjoiUHJhZ21hOiBuby1jYWNoZSI7fQ=='));
	$session = unserialize(base64_decode('YTo1OntzOjc6InVzZXJfaWQiO3M6NDoiMjM3MyI7czo4OiJpc19hZG1pbiI7YToxOntpOjIzNzM7YjowO31zOjE5OiJvbGRfbG9nZ2VkX2luX3ZhbHVlIjtiOjA7czo0OiJzdGF0IjthOjg6e3M6MTE6ImlzU2VhcmNoQm90IjtiOjA7czoyOiJpZCI7czozMjoiNmI0ZDllYTVlMTI2NTI1Y2RmMDU4MWUzODQ4NjY5YmQiO3M6Nzoic2l0ZV9pZCI7czoxOiIxIjtzOjc6InVzZXJfaWQiO2k6MzYyNjtzOjc6InBhdGhfaWQiO2k6NDEzNDtzOjE0OiJudW1iZXJfaW5fcGF0aCI7aToyO3M6MTI6Imxhc3RfcGFnZV9pZCI7czoxOiI3IjtzOjEyOiJwcmV2X3BhZ2VfaWQiO3M6MToiNyI7fXM6MjQ6InNlc3Npb24tY3Jvc3Nkb21haW4tc3luYyI7aToxO30='));
	
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