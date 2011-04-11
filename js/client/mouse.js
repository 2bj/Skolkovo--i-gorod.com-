var lMouseX = 0;
var lMouseY = 0;
var lMouseOffsetX = 0;
var lMouseOffsetY = 0;
var lMouseObjectId = null;
var Mozilla = (navigator.appName.indexOf("Netscape") != -1);

var lMouseHandler_default = function () {
//	document.title = lMouseX + ":" + lMouseY;
};
var lMouseHandler = lMouseHandler_default;

function mH(event_nav) {
	if(Mozilla) {
		lMouseX= event_nav.pageX;
		lMouseY = event_nav.pageY;
	}
	else {
		lMouseX = event.x;
		lMouseY = event.y;
	}

	iMouseX = lMouseX;
	iMouseY = lMouseY;

	lMouseHandler();
}

function set_mouse() {
	if(Mozilla) {
//		document.captureEvents(Event.MOUSEMOVE);	//NOTE: https://bugzilla.mozilla.org/show_bug.cgi?query_format=specific&order=relevance+desc&bug_status=__open__&id=330494
	}


	var h = (typeof document.onmousemove == "function") ? document.onmousemove : function () {};
	document.onmousemove = function (e) {
		h(e);
		mH(e);
	};
}

set_mouse();