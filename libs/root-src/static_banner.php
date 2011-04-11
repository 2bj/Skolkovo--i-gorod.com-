<?php
 include "./standalone.php";$v8b1dc169bf460ee884fceef66c6607d6 = cmsController::getInstance();$v009a93317a248d0fbcd664b6fa5e79e8 = $v8b1dc169bf460ee884fceef66c6607d6->getModule("banners");if($v009a93317a248d0fbcd664b6fa5e79e8 instanceof def_module) {header("Content-type: text/javascript; charset=utf-8");$vebed715e82a0a0f3e950ef6565cdc4a8 = getRequest('place');$v35225a4d2e8e152d85270a0e3f8c14f7 = getRequest('current_element_id');$result = $v009a93317a248d0fbcd664b6fa5e79e8->insert($vebed715e82a0a0f3e950ef6565cdc4a8, 0, false, $v35225a4d2e8e152d85270a0e3f8c14f7);$result = trim($result);$result = mysql_real_escape_string($result);$result = str_replace('\"', '"', $result);echo <<<JS

var response = {
	'place':	'{$vebed715e82a0a0f3e950ef6565cdc4a8}',
	'data':		'{$result}'
};

if(typeof window.onBannerLoad == "function") {
	window.onBannerLoad(response);
} else {
	var placer = document.getElementById('banner_place_{$vebed715e82a0a0f3e950ef6565cdc4a8}');
	if(placer) {
		placer.innerHTML = response['data'];
	}
}
JS; }else {echo "";}?>