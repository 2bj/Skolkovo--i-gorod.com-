var rep = new Array();

function init_link_stat() {
	if(!qedit_allowed)
		return true;

	var links = document.getElementsByTagName("a");
	var i;
	var host = "http://" + window.location.host;

	for(i = 0; i < links.length; i++) {
		var linkObj = links.item(i);
		var lnk = linkObj.href;
		lnk = lnk.replace(host, "");

		callStatGrabber(host, lnk, linkObj);
	}
}


function statRespond(eventId, total, jumps, proc) {
	var img = rep[eventId];
	var linkObj = img[2];

	if(!jumps || jumps == 0) return false;

	var flObj = document.createElement("div");

	flObj.style.zIndex = 1000;
	flObj.style.position = "absolute";
	flObj.style.border = "#000 1px solid";
	flObj.style.fontSize = "9px";
	flObj.style.color = "#000";
	flObj.style.padding = "2px";
	flObj.style.backgroundColor = "#FFF";
	flObj.style.cursor = "default";

	var pos = getAbsoluteLocation(linkObj);
	flObj.style.left = pos.x + parseInt(linkObj.offsetWidth) - (parseInt(linkObj.offsetHeight));
	flObj.style.top = pos.y + parseInt(linkObj.offsetHeight) / 2;
	flObj.className = 'semiOpacity';


	flObj.innerHTML = proc + "% (" + jumps + ")";

	var placer = chooseRandomPlacer();
	placer.appendChild(flObj);
}




function callStatGrabber(host, lnk, linkObj) {
	var index = rep.length;
	rep[index] = new Array(host, lnk, linkObj);

	var src = "/statResponder.php?host=" + host + "&href=" + window.location.href + "&lnk=" + lnk + "&eventId=" + index;
	attachScript(src);
}



function attachScript (src) {
	var placerObj = chooseRandomPlacer();
	var scriptObj = document.createElement("script");
	scriptObj.src = src;

	placerObj.appendChild(scriptObj);
}

function getAbsoluteLocation (obj, mode) {
	if(!mode)
		mode = false;

	var pX = 0, pY = 0;
	if(!obj)
		return false;

	var oParent = obj.offsetParent;

	while (oParent) {
		pX += oParent.offsetLeft;
		pY += oParent.offsetTop;

		if(mode) {
			if(!this.isIframeChild(oParent)) {
				break;
			}
		}

		oParent = oParent.offsetParent; 
	}


	if(this.iframe_pos) {
		pX += this.iframe_pos.x + 2;
		pY += this.iframe_pos.y + 2;
	}

	return { x: pX + obj.offsetLeft, y: pY + obj.offsetTop }
}

function chooseRandomPlacer() {
	var placerObj = document.body.firstChild;
	do {
		if(placerObj.nodeType == 1) {
			return placerObj;
			break;
		}
	} while(placerObj = placerObj.nextSibling);

	return false;
};