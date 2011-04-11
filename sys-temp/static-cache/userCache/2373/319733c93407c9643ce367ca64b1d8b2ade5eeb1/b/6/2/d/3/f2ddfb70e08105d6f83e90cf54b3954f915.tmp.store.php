<?php
	$headers = unserialize(base64_decode('YTo3OntpOjA7czoyMzoiWC1Qb3dlcmVkLUJ5OiBQSFAvNS4yLjYiO2k6MTtzOjYyOiJTZXQtQ29va2llOiBQSFBTRVNTSUQ9ZDBmMmQ2YmQyOWE1NzcyZjQzOTk3YzY5NmU2ODZiZTM7IHBhdGg9LyI7aToyO3M6Mzg6IkV4cGlyZXM6IFRodSwgMTkgTm92IDE5ODEgMDg6NTI6MDAgR01UIjtpOjM7czo3NzoiQ2FjaGUtQ29udHJvbDogbm8tc3RvcmUsIG5vLWNhY2hlLCBtdXN0LXJldmFsaWRhdGUsIHBvc3QtY2hlY2s9MCwgcHJlLWNoZWNrPTAiO2k6NDtzOjE2OiJQcmFnbWE6IG5vLWNhY2hlIjtpOjU7czo5OToiU2V0LUNvb2tpZTogc3RhdF9pZD1kMGYyZDZiZDI5YTU3NzJmNDM5OTdjNjk2ZTY4NmJlMzsgZXhwaXJlcz1UaHUsIDMwLUFwci0yMDIwIDExOjUyOjQ0IEdNVDsgcGF0aD0vIjtpOjY7czo5OToiU2V0LUNvb2tpZTogc3RhdF9pZD1kMGYyZDZiZDI5YTU3NzJmNDM5OTdjNjk2ZTY4NmJlMzsgZXhwaXJlcz1Nb24sIDI3LUFwci0yMDIwIDExOjUyOjQ0IEdNVDsgcGF0aD0vIjt9'));
	$session = unserialize(base64_decode('YTo0OntzOjc6InVzZXJfaWQiO3M6NDoiMjM3MyI7czo4OiJpc19hZG1pbiI7YToxOntpOjIzNzM7YjowO31zOjE5OiJvbGRfbG9nZ2VkX2luX3ZhbHVlIjtiOjA7czo0OiJzdGF0IjthOjg6e3M6Nzoic2l0ZV9pZCI7czoxOiIxIjtzOjExOiJpc1NlYXJjaEJvdCI7YjowO3M6MjoiaWQiO3M6MzI6ImQwZjJkNmJkMjlhNTc3MmY0Mzk5N2M2OTZlNjg2YmUzIjtzOjc6InVzZXJfaWQiO2k6MzYyODtzOjc6InBhdGhfaWQiO2k6NDEzNjtzOjE0OiJudW1iZXJfaW5fcGF0aCI7aToxO3M6MTI6Imxhc3RfcGFnZV9pZCI7czoyOiI1OCI7czoxMjoicHJldl9wYWdlX2lkIjtzOjI6IjU4Ijt9fQ=='));
	
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