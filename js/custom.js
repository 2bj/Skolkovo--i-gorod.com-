function getCurrSelection() {
	if(document.selection)
		return document.selection;
	else
		return window.getSelection();
}

function getRange(sel) {
	if(!sel)
		sel = getSelection();

	if(typeof sel != "undefined") {
		return sel.getRangeAt(0);
	} else {
		return window.document.createRange();
	}
}

function hasParent(obj, par_id) {
	if(!obj) {
		return false;
	}

	if(obj.id == par_id) {
//		alert(obj.id);
		return true;
	} else {
		if(obj.parentNode) {
			return hasParent(obj.parentNode, par_id);
		} else {
			return false;
		}
	}
}

function trim(str) {
	var res = str.replace(/^\s+/, '');
	return res.replace(/\s+$/, '');

}


function gen_popup(src, width, height, page_header) {
	if(!page_header)
		page_header = "";

	win = window.open("", "_blank", "width=" + (width) + ",height=" + (height) + ",titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no");

	win.document.write("<html><head><title>" + page_header + "</title></head><body leftmargin=0 topmargin=0 marginwidth=0 marginheight=0><table style='height: 100%' cellspacing='0' cellpadding='0' border='0'><tr><td valgin='middle'>");
	win.document.write("<" + "script" + ">document.title = \"" + page_header + "\";\r\nfunction _CloseOnEsc(e) {if(e){ event = e;} if (event.keyCode == 27) { window.close(); return; }} document.onkeydown = _CloseOnEsc;<" + "/script>");
	win.document.write("<img src=\"" + src +  "\" onclick=\"javascript: window.close();\" style=\"cursor: pointer;\" />");
	win.document.write("</td></tr></table></body></html>");
	win.document.close();
	return false;
}

function getPageSizes(){
	
	var iScrollX, iScrollY;
	
	if (window.innerHeight && window.scrollMaxY) {
		iScrollX = document.body.scrollWidth;
		iScrollY = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight) {
		iScrollX = document.body.scrollWidth;
		iScrollY = document.body.scrollHeight;
	} else {
		iScrollX = document.body.offsetWidth;
		iScrollY = document.body.offsetHeight;
	}
	
	var iWinWidth, iWinHeight;
	if (self.innerHeight) {
		iWinWidth = self.innerWidth;
		iWinHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) {
		iWinWidth = document.documentElement.clientWidth;
		iWinHeight = document.documentElement.clientHeight;
	} else if (document.body) {
		iWinWidth = document.body.clientWidth;
		iWinHeight = document.body.clientHeight;
	}	
	
	if(iScrollY < iWinHeight){
		iPageHeight = iWinHeight;
	} else { 
		iPageHeight = iScrollY;
	}

	if(iScrollX < iWinWidth){	
		iPageWidth = iWinWidth;
	} else {
		iPageWidth = iScrollX;
	}

	var arrSizes = new Array(iPageWidth,iPageHeight,iWinWidth,iWinHeight) 
	return arrSizes;
}