function crossDomainWrapper() {
}

crossDomainWrapper.currentId = 0;
crossDomainWrapper.queue = new Array();
window.b = 0;
crossDomainWrapper.masterCallback = function () {
	var i = crossDomainWrapper.currentId;

	if(!crossDomainWrapper.queue[i]) return "";

	var url = crossDomainWrapper.queue[i][0];
	var callback = crossDomainWrapper.queue[i][1];
	crossDomainWrapper.queue[i][0] = "";
	if(url) {
		return url;
	} else {
		return "";
	}
};


crossDomainWrapper.listenCallbak = function (str) {
	var id = crossDomainWrapper.currentId;
	var callback = crossDomainWrapper.queue[id][1];
	str = Base64.decode(str);
	callback(str);
};

crossDomainWrapper.push = function (url, callback) {
	var id = ++crossDomainWrapper.currentId;

	if(url) {
		crossDomainWrapper.queue[id] = Array(url, callback);
		return true;
	} else {
		return false;
	}
};


var callback = function (param) {
	alert(param);
};
