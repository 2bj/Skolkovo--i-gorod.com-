<?php
	$headers = unserialize(base64_decode('YTo0OntpOjA7czoyMzoiWC1Qb3dlcmVkLUJ5OiBQSFAvNS4yLjYiO2k6MTtzOjM4OiJFeHBpcmVzOiBUaHUsIDE5IE5vdiAxOTgxIDA4OjUyOjAwIEdNVCI7aToyO3M6Nzc6IkNhY2hlLUNvbnRyb2w6IG5vLXN0b3JlLCBuby1jYWNoZSwgbXVzdC1yZXZhbGlkYXRlLCBwb3N0LWNoZWNrPTAsIHByZS1jaGVjaz0wIjtpOjM7czoxNjoiUHJhZ21hOiBuby1jYWNoZSI7fQ=='));
	$session = unserialize(base64_decode('YToxMzp7czo3OiJ1c2VyX2lkIjtzOjQ6IjIzNzMiO3M6ODoiaXNfYWRtaW4iO2E6MTp7aToyMzczO2I6MDt9czoxOToib2xkX2xvZ2dlZF9pbl92YWx1ZSI7YjowO3M6NDoic3RhdCI7YTo4OntzOjExOiJpc1NlYXJjaEJvdCI7YjowO3M6MjoiaWQiO3M6MzI6ImM5NzRiNjhkZjkyNDEzYzQzNDA1MDYyZjBlN2U3MmNiIjtzOjc6InNpdGVfaWQiO3M6MToiMSI7czo3OiJ1c2VyX2lkIjtpOjM2MjU7czo3OiJwYXRoX2lkIjtpOjQxMzM7czoxNDoibnVtYmVyX2luX3BhdGgiO2k6NjtzOjEyOiJsYXN0X3BhZ2VfaWQiO3M6MjoiNzciO3M6MTI6InByZXZfcGFnZV9pZCI7czoyOiI3NyI7fXM6MzI6ImY1NjJmNzczMzY3ZDAwYmVmZDFkZDVmYTViNTU0NzIzIjthOjM6e2k6MDthOjM6e2k6MDtzOjc6ImNvbnRlbnQiO2k6MTtzOjA6IiI7aToyO3M6MToiMSI7fWk6MTthOjM6e2k6MDtzOjc6ImNvbnRlbnQiO2k6MTtzOjA6IiI7aToyO3M6MjoiMTYiO31pOjI7YTozOntpOjA7czo3OiJjb250ZW50IjtpOjE7czowOiIiO2k6MjtzOjI6IjIzIjt9fXM6MjQ6InNlc3Npb24tY3Jvc3Nkb21haW4tc3luYyI7aToxO3M6MTE6InVtaV9jYXB0Y2hhIjtzOjMyOiJlMWMwYzkwNjEyNzliNjFjOGE2YWIwZmMxZjk5YWVmNyI7czoxNzoidW1pX2NhcHRjaGFfcGxhaW4iO3M6NjoiZmdoMmM4IjtzOjEyOiJ1c2VyX2NhcHRjaGEiO3M6MzI6ImNmY2QyMDg0OTVkNTY1ZWY2NmU3ZGZmOWY5ODc2NGRhIjtzOjg6ImlzX2h1bWFuIjtpOjE7czozMjoiYWU4ODY4YTc4ZjhlMTMyZDA3YTIyODUzNTk3MDAzN2QiO2E6Mjp7aTowO2E6Mzp7aTowO3M6NzoiY29udGVudCI7aToxO3M6MDoiIjtpOjI7czoyOiIxNiI7fWk6MTthOjM6e2k6MDtzOjc6ImNvbnRlbnQiO2k6MTtzOjA6IiI7aToyO3M6MjoiMjMiO319czozMjoiZjUyODQ3YmQ4MDc2ZjFiOTQ1NGE4ZGViMzA3YTJkM2EiO2E6Mzp7aTowO2E6Mzp7aTowO3M6NDoibmV3cyI7aToxO3M6NDoiaXRlbSI7aToyO2k6MTQ0O31pOjE7YTozOntpOjA7czo3OiJjb250ZW50IjtpOjE7czowOiIiO2k6MjtzOjI6IjE2Ijt9aToyO2E6Mzp7aTowO3M6NzoiY29udGVudCI7aToxO3M6MDoiIjtpOjI7czoyOiIyMyI7fX1zOjMyOiJmNWVhODAwZjdhMTMxNzNiOGE2OThhZDRkMTYwOWQ3YiI7YTozOntpOjA7YTozOntpOjA7czo3OiJjb250ZW50IjtpOjE7czowOiIiO2k6MjtzOjE6IjQiO31pOjE7YTozOntpOjA7czo3OiJjb250ZW50IjtpOjE7czowOiIiO2k6MjtzOjI6IjE2Ijt9aToyO2E6Mzp7aTowO3M6NzoiY29udGVudCI7aToxO3M6MDoiIjtpOjI7czoyOiIyMyI7fX19'));
	
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