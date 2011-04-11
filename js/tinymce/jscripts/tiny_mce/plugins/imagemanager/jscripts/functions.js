tinyMCEPopup.requireLangPack();

function init() {	
	$('#user_size_width').val(tinyMCEPopup.getWindowArg('orig_width'));
	$('#user_size_height').val(tinyMCEPopup.getWindowArg('orig_height'));
}

function cancelAction() {
	tinyMCEPopup.close();
}

function insertAction() {
	var editor = tinyMCEPopup.editor;
	editor.contentWindow.focus();


	var iWidth = tinyMCEPopup.getWindowArg('img_width');
	var iHeight = tinyMCEPopup.getWindowArg('img_height');


	var sSrc = tinyMCEPopup.getWindowArg('img_src');
	if ($('#orig_size').attr("checked")) {
		sSrc = tinyMCEPopup.getWindowArg('orig_src');
		iWidth = tinyMCEPopup.getWindowArg('orig_width');
		iHeight = tinyMCEPopup.getWindowArg('orig_height');
	} else if ($('#user_size').attr("checked")) {
		iWidth  = $('#user_size_width').val();
		iHeight = $('#user_size_height').val();
		sSrc = tinyMCEPopup.getWindowArg('img_base') + "_" + iWidth + "_" + iHeight + "." + tinyMCEPopup.getWindowArg('img_ext');
	}

	var html = "<img";

		html += makeAttrib('src', sSrc);
		html += makeAttrib('alt' , '');

		html += makeAttrib('border', 0);
		html += makeAttrib('width', iWidth);
		html += makeAttrib('height', iHeight);
		html += " />";

	editor.execCommand("mceInsertContent", false, html);

	tinyMCEPopup.close();
}

function makeAttrib(attrib, value) {
	value = value.toString();
	var formObj = document.forms[0];
	var valueElm = formObj.elements[attrib];

	if (typeof(value) == "undefined" || value == null) {
		value = "";

		if (valueElm)
			value = valueElm.value;
	}

	if (value == "")
		return "";

	// XML encode it
	value = value.replace(/&/g, '&amp;');
	value = value.replace(/\"/g, '&quot;');
	value = value.replace(/</g, '&lt;');
	value = value.replace(/>/g, '&gt;');

	return ' ' + attrib + '="' + value + '"';
}


function setUserSizesActive() {
	$('#user_size').checked = 1;
}

function validateIntVals(event) {
	setUserSizesActive();
	var oInputEl = Event.element(event);

	if (oInputEl) {
		var iKCode = window.event ? window.event.keyCode : event.which;
		if (iKCode > 47 && iKCode < 58 ||
			iKCode == Event.KEY_BACKSPACE ||
			iKCode == Event.KEY_DELETE ||
			iKCode == Event.KEY_HOME ||
			iKCode == Event.KEY_END ||
			iKCode == Event.KEY_INSERT ||
			iKCode == Event.KEY_LEFT ||
			iKCode == Event.KEY_RIGHT ||
			iKCode == Event.KEY_TAB)
		{
			return true;
		}
	}
	Event.stop(event);
	return false;

}

function calculateProportions(event) {
	var oInputEl = event ? event.currentTarget : window.event.currentTarget;
	if (oInputEl.tagName.toLowerCase() !== 'input') {
		oInputEl = $('#user_size_width').get(0);
	}

	var iOrigWidth = tinyMCEPopup.getWindowArg('orig_width');
	var iOrigHeight = tinyMCEPopup.getWindowArg('orig_height');
	var bSaveProportions = $('#save_proportions').attr("checked");

	if (!bSaveProportions) return true;

	if (oInputEl) {
		if (oInputEl.id == 'user_size_width') {
			var oHInput = $('#user_size_height');
			oHInput.val(Math.round(oInputEl.value * iOrigHeight / iOrigWidth));
		} else {
			var oWInput = $('#user_size_width');
			oWInput.val(Math.round(oInputEl.value * iOrigWidth / iOrigHeight));
		}
	}
	return true;
}

tinyMCEPopup.onInit.add(init);