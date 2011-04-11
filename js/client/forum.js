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