<?php
 ini_set("display_errors", "1");error_reporting(E_ALL);require "../standalone.php";header("Content-type: text/javascript; charset=utf-8");enableOutputCompression();$v100b9d7a39ea15296482a66701d97864 = trim(getServer('HTTP_REFERER'), "/");$v673299140b0e1fd8f19cc1e8f8ab2e29 = langsCollection::getInstance()->getDefaultLang();$vf93468b031de35b3137ae86c486febac = explode("/", $v100b9d7a39ea15296482a66701d97864);if (isset($vf93468b031de35b3137ae86c486febac[3])) {$v64aa031a650240cac51b92ea0ad20369 = $vf93468b031de35b3137ae86c486febac[3];if ($va1eac8b3c6e26be694489a4cba0b6809 = langsCollection::getInstance()->getLangId($v64aa031a650240cac51b92ea0ad20369)) {$v673299140b0e1fd8f19cc1e8f8ab2e29 = langsCollection::getInstance()->getLang($va1eac8b3c6e26be694489a4cba0b6809);}}echo "\nvar pre_lang = '".$v673299140b0e1fd8f19cc1e8f8ab2e29->getPrefix()."';\n";$vc3d518ded8cde6122ff9f877236ad62e = $_COOKIE['ilang'];echo "\naLang = '".$vc3d518ded8cde6122ff9f877236ad62e."';\n";echo file_get_contents (CURRENT_WORKING_DIR . "/js/client/lang/qEdit_".$vc3d518ded8cde6122ff9f877236ad62e.".js");?>

var is_ie = !(navigator.appName.indexOf("Netscape") != -1);

<?php
 if(file_exists("./client/commonClient.js")) {echo <<<END
includeJS("/js/client/commonClient.js");

END; }else {echo <<<END
includeJS("/js/custom.js");
includeJS("/js/client/cookie.js");
includeJS("/js/client/catalog.js");
includeJS("/js/client/stat.js");
includeJS("/js/client/vote.js");
includeJS("/js/client/users.js");
includeJS("/js/client/eshop.js");
includeJS("/js/client/forum.js");
includeJS("/js/client/mouse.js");
includeJS("/js/client/quickEdit.js");
includeJS("/js/client/qPanel.js");
includeJS("/js/client/umiTicket.js");
includeJS("/js/client/umiTickets.js");
includeJS("/js/client/floatReferers.js");

END; }?>

Event.observe(document, "keydown", function(event) {
	var oTargetEl = Event.element(event);
	if (oTargetEl) {
		if (oTargetEl.tagName.toUpperCase() == 'INPUT' || oTargetEl.tagName.toUpperCase() == 'TEXTAREA' || oTargetEl.tagName.toUpperCase() == 'IFRAME') {
			return true;
		}
	}

	var iKCode = event.which;

	if(event.keyCode == 27) {
		quickEdit.getInstance().hide();
	}

	if ((event.shiftKey || event.metaKey) && event.keyCode == 68) {
		quickEdit.getInstance().show();
	}

	if ((event.shiftKey || event.metaKey) && event.keyCode == 67) {
		umiTickets.getInstance().beginCreatingTicket();
	}

	if(event.ctrlKey || event.metaKey) {
		
		if(event.keyCode == 37) {
			var obj = document.getElementById('toprev');
			if(obj) {
				document.location = obj.href.toString();
				
				if(is_safari()) {
					return false;
				}
			}
		}

		if(event.keyCode == 39) {
			var obj = document.getElementById('tonext');
			if(obj) {
				document.location = obj.href.toString();
			}
		}

		if(event.keyCode == 36) {
			var obj = document.getElementById('tobegin');
			if(obj) {
				document.location = obj.href.toString();
				
				if(is_safari()) {
					return false;
				}
			}
		}

		if(event.keyCode == 35) {
			var obj = document.getElementById('toend');
			if(obj) {
				document.location = obj.href.toString();
				
				if(is_safari()) {
					return false;
				}
			}
		}
	}


});
