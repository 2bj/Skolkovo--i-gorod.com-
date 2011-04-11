var is_ie = !(navigator.appName.indexOf("Netscape") != -1);

function includeJS(src) {
	if(document.getElementsByTagName && document.createElement) {
		var head = document.getElementsByTagName('head')[0];

		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = src;
		script.charset = "utf-8";

		head.appendChild(script);

		return true;
	} else {
		return false;
	}
}

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

function lLib () {
	return this;
}

lLib.instance = null;

lLib.getInstance = function () {
	if(! lLib.instance) {
		lLib.instance = new lLib();
	}

	return lLib.instance;
};


lLib.includeJS = includeJS;

lLib.prototype.is_loaded = false;
lLib.prototype.onLoadEvents = new Array();
lLib.prototype.requestStack = new Array();





lLib.prototype.makeRequest = function (url, handler) {
	var requestId = this.requestStack.length;
	this.requestStack[requestId] = handler;
	
	var s_delim = "?";
	if (url.indexOf('?') !== -1) s_delim = '&';

	url += s_delim + "requestId=" + requestId + "&rnd=" + Math.random();
	lLib.includeJS(url);

	return requestId;
};


lLib.prototype.makeResponse = function (response) {
	if(typeof response != "object") {
		return false;
	}

	var requestHandler;
	var requestId = response.id;

	if(typeof this.requestStack[requestId] == "undefined") {
		return false;
	} else {
		requestHandler = this.requestStack[requestId];
		requestHandler(response);
		this.requestStack[requestId] = undefined;
		return true;
	}
};



function lLibResponse(requestId) {
	this.id = requestId;
}

lLibResponse.prototype.id = null;

function is_safari() {
	return (navigator.userAgent.indexOf("Safari") != -1);
}


var Mozilla = (navigator.appName.indexOf("Netscape") != -1);

function forum_check_reg_form() {
	forum_login = document.getElementById('forum_login');
	forum_password = document.getElementById('forum_password');
	forum_password_check = document.getElementById('forum_password_check');
	forum_email = document.getElementById('forum_email');

	if(!forum_login || !forum_password || !forum_password_check || !forum_email) {
		alert("Неправильно сформирована форма.");
		return false;
	}

	if(forum_login.value == "") {
		alert("Необходимо заполнить поле \"Логин\"");
		return false;
	}

	if(forum_password.value == "") {
		alert("Необходимо заполнить поле \"Пароль\"");
		return false;
	}

	if(forum_password.value != forum_password_check.value) {
		alert("Пароли не совпадают.");
		return false;
	}

	if(forum_email.value == "") {
		alert("Необходимо заполнить поле \"E-mail\"");
		return false;
	}

	return true;
}


function forum_check_form(obj) {
	if(!obj)
		return false;


	if(obj.captcha) {
		if(md5(obj.captcha.value) != getCookie("captcha1")) {
			alert("Неправильный код.");
			return false;
		}
	}


	if(obj.nickname)
		vlogin = obj.nickname.value;
	else
		vlogin = "";

	if(obj.title)
		vtitle = obj.title.value;
	else
		vtitle = "";

	if(obj.body)
		vbody = obj.body.value;
	else
		vbody = "";

	if(vlogin.length == 0) {
		alert("Введите имя.");
		return false;
	}



	if(vtitle.length == 0) {
		alert("Введите заголовок.");
		return false;
	}

	bd = vbody.replace(/[ \t\r\n]*/g, "");

	if(bd.length == 0) { 
		alert("Введите текст сообщения");
		return false;
	}
	return true;
}

function forum_quote(mess_id) {
    var author = "";
	mess_obj = document.getElementById('mess_' + mess_id);
	if(!mess_obj)
		return false;

	body_obj = document.getElementById('message');

	if(!body_obj)
		return false;


	if(is_ie) {
		sel = getCurrSelection();
		range = sel.createRange();
		sel_str = range.text;
	} else {
		sel = getCurrSelection();
		if (sel.rangeCount) {
			range = getRange(sel);
			sel_str = range;
		} else {
			sel_str = "";
		}
	}

	if(!is_ie)
		qmess = mess_obj.textContent;
	else
		qmess = mess_obj.outerText;

	if(sel_str && typeof sel_str != "undefined" && qmess) {
		parentObj = range.commonAncestorContainer;

		if(is_ie) {
			if(qmess.replace(sel_str, "") != qmess) {
				qmess = sel_str;
			}
		} else {
			parentObj = range.commonAncestorContainer;

			if(hasParent(parentObj, 'mess_' + mess_id)) {
				qmess = range;
			}
		}
	}

	res = "";

	real_id = mess_obj.id.substr(5, mess_obj.id.length - 5);
	author_obj = document.getElementById('author_' + real_id);
	if(author_obj) {
		author = (!Mozilla) ? author_obj.innerText : author_obj.textContent;
		author = "[b]" + trim(author) + "[/b]\r\n";
	} else {
		author = "";
	}

	if(qmess) {
		if(body_obj.value.length == 0)
			body_obj.value += "[QUOTE]" + author + qmess + "[/QUOTE]\r\n";
		else
			body_obj.value += "\r\n[QUOTE]" + author + qmess + "[/QUOTE]\r\n";
	}
	document.getElementById('message').focus();
	return false;
}


function forum_toAuthor(obj) {
	if(is_ie)
		res = obj.innerText;
	else
		res = obj.textContent;

	res = trim(res);

	res = "[b]" + res + "[/b]\r\n";

	document.getElementById('message').value += res;
	window.location = "#add";

	document.getElementById('message').focus();

	return false;
}



function forum_insert_smile(obj, element_name) {
	if(!obj) return;
	var obj = obj.firstChild;
	if(!obj) return;

	var alt = obj.alt;
	if(!alt) return false;

	var obj = document.getElementById('message');
	if(!obj) obj = document.getElementById('forum_body');
	if(!obj) obj = document.getElementById(element_name);
	if(!obj) return false;

	obj.value += "[smile:" + alt + "] ";
	obj.focus();

	return true;
}

var last_src = "";


function cms_vote_postDo(formName, inputName, nstext) {
	var fObjColl = document.getElementsByName(formName);

	var fObj = '';
	if (fObjColl) {
		fObj = fObjColl[fObjColl.length-1];
	}

	if(typeof(fObj) !== "object") return false;
	
	iObj = fObj.elements[inputName];
	
	if(typeof(iObj) === "undefined") return false;

	res = false;
	for(i = 0; i < iObj.length; i++)
		if(iObj[i].checked)
			res = iObj[i].value;


	if(res) {
		sc = document.createElement("script");
		sc.src = "/vote/post/" + res + "/?m=" + new Date().getTime();
		oTemplate = fObj.elements['system_template'];
		if((oTemplate instanceof Object) && (oTemplate.value.length)) {		
			sc.src = sc.src + "&template="+oTemplate.value;			
		}

		fObj.appendChild(sc);
	} else {
		if(nstext) {
			alert(nstext);
		}
	}
}

function saveFormData(form) {
	if(!form) {
		return false;
	}
	
	if(!form.id) {
		alert("You should set id attribute in form tag to save or restore it.");
		return false;
	}

	var cookieData = new Array;	
	for(var i = 0; i < form.elements.length; i++) {
		var input = form.elements[i];
		if (input.name) {
			var inputName = input.name.replace(/([)\\])/g, "\\$1");

			switch(input.type) {
				case "file": {
					if (input.value == '') input.parentNode.removeChild(input);
					break;
				}
				case "password":
				
				case "text":
				case "textarea": {
					cookieData.push({type: 'T', name: inputName, value: input.value});
					break;
				}
				
				case "checkbox":
				case "radio": {
					cookieData.push({type: 'C', name: inputName, value: (input.checked ? 1 : 0)});
					break;
				}
				
				case "select-multiple":
				case "select-one": {
					cookieData.push({type: 'S', name: inputName, value: input.selectedIndex});
					break;
				}
			}
		}

	}
	
	var str = "";
	for(var i = 0; i < cookieData.length; i++) {
		var elementData = cookieData[i];
		var value = new String(elementData.value);
		var inputName = new String(elementData.name);
		
		if(!inputName || !value) {
			continue;
		}
		
		str += elementData.type + "," + inputName.length + "," + inputName + "," + value.length + "," + value;
	}
	document.cookie="frm" + form.id + "=" + escape(str.replace(/([|\\])/g, "\\$1"));
	return true;
}

function restoreFormData(form) {
	if(!form) {
		return false;
	}
	
	if(!form.id) {
		alert("You should set id attribute in form tag to save or restore it.");
		return false;
	}
	var cookieName = "frm" + form.id + "=";
	
	var cookie = new String(unescape(document.cookie));
	var posStart, posEnd;
	if((posStart = cookie.indexOf(cookieName)) == -1) {
		return false;
	}
	
	if((posEnd = cookie.indexOf(";", posStart)) == -1) {
		posEnd = cookie.length;
	}
	
	var data = cookie.substring(posStart + cookieName.length, posEnd);
	var pos = 0, cookieData = new Array;

	while(pos < data.length) {
		var inputName;
		var type = data.substring(pos, pos + 1);
		pos += 2;
		
		var length = parseInt(data.substring(pos, data.indexOf(",", pos)));
		pos = data.indexOf(",", pos) + 1;
		var inputName = data.substring(pos, pos + length);
		pos += length + 1;

		var length = parseInt(data.substring(pos, data.indexOf(",", pos)));
		if(length == 0) {
			pos += 2;
			continue;
		} else {
			pos = data.indexOf(",", pos) + 1;
		}
		
		var value = data.substring(pos, pos + length);
		pos += length;
		
		cookieData.push({type: type, name: inputName, value: value});
	}
	
	for(var i = 0; i < cookieData.length; i++) {
		var elementData = cookieData[i];
		if (elementData.type && elementData.name) {
			switch(elementData.type) {
				case "T": {
					form.elements[elementData.name].value = elementData.value;
					break;
				}
				
				case "C": {
					form.elements[elementData.name].checked = elementData.value ? true : false;
					break;
				}
				
				case "S": {
					form.elements[elementData.name].selectedIndex = elementData.value;
					break;
				}
			}
		}
	}
}

























