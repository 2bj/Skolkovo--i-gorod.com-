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
		var inputName = input.name.replace(/([)\\])/g, "\\$1");

		
		switch(input.type) {
			case "password": break;
			
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
	
	var i, str = "";
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

