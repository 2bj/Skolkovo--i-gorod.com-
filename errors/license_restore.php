<?php
 header("Content-type: text/javascript; charset=utf-8");?>

function requestsController() {
	requestsController.self = this;
}

requestsController.prototype.requests = new Array();


requestsController.getSelf = function () {
	if(!requestsController.self) {
		requestsController.self = new requestsController();
	}
	return requestsController.self;
};



requestsController.prototype.sendRequest = function (url, handler) {
	var requestId = this.requests.length;
	this.requests[requestId] = handler;

	var url = url;
	var scriptObj = document.createElement("script");
	scriptObj.src = url + "&requestId=" + requestId;
	document.body.appendChild(scriptObj);
};

requestsController.prototype.reportRequest = function (requestId, args) {
	this.requests[requestId](args);
	this.requests[requestId] = undefined;
}


function checkLicenseCode(frm) {
	var keycodeInput = document.getElementById('keycode');
	var keycode = keycodeInput.value;

	var ip = "<?php echo isset($_SERVER['SERVER_ADDR']) ? $_SERVER['SERVER_ADDR'] : str_replace("\\", "", $_SERVER['DOCUMENT_ROOT']);?>";
	var domain = "<?php echo $_SERVER['HTTP_HOST'];?>";

	var url = "http://umi-cms-2.umi-cms.ru/updatesrv/initInstallation/?keycode=" + keycode + "&domain=" + domain + "&ip=" + ip;

	var handler = function (response) {
		if(response['status'] == "OK") {
			document.getElementById('license_msg').style.color = "green";

			var res = "Лицензия \"" + response['license_type'] + "\" активирована.<br />Владелец " + response['last_name'] + " " + response['first_name'] + " " + response['second_name'] + " (" + response['email'] + ")<br />";
			var domain_keycode = response['domain_keycode'];

			document.getElementById('licenseButton').value = "Ok >>";

			document.getElementById('licenseButton').onclick = function () {
				window.location = "/";
			}

			document.getElementById('license_msg').innerHTML = res;

			var url = "/errors/save_domain_keycode.php?domain_keycode=" + domain_keycode + "&domain=" + domain + "&ip=" + ip + "&license_codename=" + response['license_codename'];
			requestsController.getSelf().sendRequest(url, function () {});
		} else {
			document.getElementById('license_msg').innerHTML = "Ошибка: " + response['msg'];
		}
	};

	requestsController.getSelf().sendRequest(url, handler);
}