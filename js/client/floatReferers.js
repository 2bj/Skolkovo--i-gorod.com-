var Mozilla = (navigator.appName.indexOf("Netscape") != -1);

function floatReferers() {
	this.placer = lLib.createVoidContainer();
	//TODO: Void
};

floatReferers.self = null;
floatReferers.getInstance = function () {
	if(!floatReferers.self) {
		floatReferers.self = new floatReferers();
	}
	return floatReferers.self;
};


floatReferers.prototype.is_loaded = false;
floatReferers.prototype.links = null;
floatReferers.prototype.total = null;
floatReferers.prototype.placer = null;

floatReferers.prototype.loadLinks = function () {
	if(this.is_loaded) {
		if(this.placer) {
			this.placer.parentNode.removeChild(this.placer);
		}
		this.placer = lLib.createVoidContainer();
		this.is_loaded = false;
		return true;
	}

	var __self = this;
	var handler = function (response) {
		__self.onLoadLinks(response);
	};

	lLib.getInstance().makeRequest("/stat/json_get_referer_pages/?", handler);
};


floatReferers.prototype.onLoadLinks = function (response) {
	this.is_loaded = true;
	this.links = response.links;
	this.total = response.total;

	this.renderLinks();
};


floatReferers.prototype.renderLinks = function () {
	var i = 0;

	for(i = 0; i < this.links.length; i++) {
		var currentLink = this.links[i];

		if(currentLink.abs == 0) continue;

		currentLink.rel = Math.round((currentLink.abs / this.total) * 100);
		this.showAllRelatedLinks(currentLink);
	}
};


floatReferers.prototype.showAllRelatedLinks = function (linkInfo) {
	var links = document.getElementsByTagName("a");
	var i;
	var host = "http://" + window.location.host;

	for(i = 0; i < links.length; i++) {
		var linkObj = links.item(i);
		var lnk = linkObj.href;
		lnk = lnk.replace(host, "");

		if(lnk != linkInfo.uri) {
			continue;
		}

		var flObj = document.createElement("div");

		flObj.style.zIndex = 1000;
		flObj.style.position = "absolute";
		flObj.style.border = "#000 1px solid";
		flObj.style.fontFamily = "Verdana";
		flObj.style.fontSize = "9px";
		flObj.style.color = "#000";
		flObj.style.padding = "2px";
		flObj.style.backgroundColor = "#FFF";
		flObj.style.cursor = "default";

		var pos = lLib.getAbsoluteLocation(linkObj);
		flObj.style.left = pos.x + parseInt(linkObj.offsetWidth) - (parseInt(linkObj.offsetHeight)) + 'px';
		flObj.style.top = pos.y + parseInt(linkObj.offsetHeight) / 2 + 'px';

		if(Mozilla) {
			flObj.style.setProperty("-moz-opacity", "0.6", "");
		} else {
			flObj.style.filter = "alpha(opacity = 60)";
		}


		flObj.innerHTML = linkInfo.rel + "% (" + linkInfo.abs + ")";

		this.placer.appendChild(flObj);
	}
};


function t() {
	floatReferers.getInstance().loadLinks();
}

//setTimeout(t, 3500);