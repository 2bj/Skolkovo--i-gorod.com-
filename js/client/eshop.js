function eshop_subscribe_check() {
	fname = document.getElementById('fname');
	lname = document.getElementById('lname');
	mname = document.getElementById('mname');
	email = document.getElementById('email');

	if(fname.value == "") {
		alert("Необходимо заполнить поле \"Имя\"");
		fname.focus();
		return false;
	}


	if(lname.value == "") {
		alert("Необходимо заполнить поле \"Фамилия\"");
		lname.focus();
		return false;
	}


	if(mname.value == "") {
		alert("Необходимо заполнить поле \"Отчество\"");
		mname.focus();
		return false;
	}

	if(email.value == "") {
		alert("Необходимо заполнить поле \"E-mail\"");
		email.focus();
		return false;
	}

	return true;
}
