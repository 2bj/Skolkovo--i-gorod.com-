function jsonRequestsController() {
	//Do nothing
};


jsonRequestsController.self = null;
jsonRequestsController.getInstance = function () {
	if(!jsonRequestsController.self) {
		jsonRequestsController.self = new jsonRequestsController();
	}
	return jsonRequestsController.self;
};


jsonRequestsController.prototype.requests = new Array();
jsonRequestsController.prototype.lastRequestId = 0;


jsonRequestsController.prototype.sendRequest = function (url, handler) {
	var requestId = ++this.lastRequestId;

	var requestInfo = {
		"id":		requestId,
		"url":		url,
		"handler":	(typeof(handler) === "function") ? handler : function () {},
		"status":	"new"
	};
	this.requests[requestId] = requestInfo;

	this.executeRequest(requestId);

	return requestId;
};


jsonRequestsController.prototype.reportRequest = function (requestId, responseArgs) {
	
	var requestInfo = this.requests[requestId];
	if(requestInfo) {
		return requestInfo['handler'](responseArgs);
	}
};


jsonRequestsController.prototype.executeRequest = function (requestId) {
	var requestInfo = this.requests[requestId];
	if(!requestInfo) {
		return false;
	}

	var placer = document.getElementsByTagName('head')[0];
	if (placer) {
		var scriptObj = document.createElement("script");
		scriptObj.src = requestInfo['url'] + "&requestId=" + requestId;
		placer.appendChild(scriptObj);

		this.requests[requestId]['status'] = "sended";
	}
	return;
};


function getLabel(key, str) {
	if(!window.langLabels) {
		window.langLabels = new Array();
		return false;
	}

	if(window.langLabels[key]) {
		var res = window.langLabels[key];
		
		if(str) {
			res = res.replace("%s", str);
		}
		return res;
	} else {
		return false;
	}
}

function setLabel(key, label) {
	if(!window.langLabels) {
		window.langLabels = new Array();
	}
	window.langLabels[key] = label;
}