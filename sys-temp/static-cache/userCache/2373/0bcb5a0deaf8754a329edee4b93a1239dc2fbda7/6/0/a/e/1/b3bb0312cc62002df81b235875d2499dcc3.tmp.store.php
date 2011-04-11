<?php
	$headers = unserialize(base64_decode('YTo0OntpOjA7czoyMzoiWC1Qb3dlcmVkLUJ5OiBQSFAvNS4yLjYiO2k6MTtzOjM4OiJFeHBpcmVzOiBUaHUsIDE5IE5vdiAxOTgxIDA4OjUyOjAwIEdNVCI7aToyO3M6Nzc6IkNhY2hlLUNvbnRyb2w6IG5vLXN0b3JlLCBuby1jYWNoZSwgbXVzdC1yZXZhbGlkYXRlLCBwb3N0LWNoZWNrPTAsIHByZS1jaGVjaz0wIjtpOjM7czoxNjoiUHJhZ21hOiBuby1jYWNoZSI7fQ=='));
	$session = unserialize(base64_decode('YTo4OntzOjc6InVzZXJfaWQiO3M6NDoiMjM3MyI7czo4OiJpc19hZG1pbiI7YToxOntpOjIzNzM7YjowO31zOjE5OiJvbGRfbG9nZ2VkX2luX3ZhbHVlIjtiOjA7czo0OiJzdGF0IjthOjg6e3M6MTE6ImlzU2VhcmNoQm90IjtiOjA7czoyOiJpZCI7czozMjoiNmI0ZDllYTVlMTI2NTI1Y2RmMDU4MWUzODQ4NjY5YmQiO3M6Nzoic2l0ZV9pZCI7czoxOiIxIjtzOjc6InVzZXJfaWQiO2k6MzYyNjtzOjc6InBhdGhfaWQiO2k6NDEzNDtzOjE0OiJudW1iZXJfaW5fcGF0aCI7aTozO3M6MTI6Imxhc3RfcGFnZV9pZCI7czoyOiI0NSI7czoxMjoicHJldl9wYWdlX2lkIjtzOjI6IjQ1Ijt9czoyNDoic2Vzc2lvbi1jcm9zc2RvbWFpbi1zeW5jIjtpOjE7czozMjoiMmYyMjkyYmI0NzYzMjI2NTkzMTU0MGI2MWY3YmFmZDgiO2E6Mzp7aTowO2E6Mzp7aTowO3M6NzoiY29udGVudCI7aToxO3M6MDoiIjtpOjI7czoyOiI1MCI7fWk6MTthOjM6e2k6MDtzOjc6ImNvbnRlbnQiO2k6MTtzOjA6IiI7aToyO3M6MjoiMTYiO31pOjI7YTozOntpOjA7czo3OiJjb250ZW50IjtpOjE7czowOiIiO2k6MjtzOjI6IjIzIjt9fXM6MTE6InVtaV9jYXB0Y2hhIjtzOjMyOiI5ODEwZmFjYmI5MDUyMjVlNmEzOTNmM2E1MGM4ZDdmYyI7czoxNzoidW1pX2NhcHRjaGFfcGxhaW4iO3M6NjoiODVweHdqIjt9'));
	
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