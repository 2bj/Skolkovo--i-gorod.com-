function subscribe_check_reg_form() {
	subscribe_login = document.getElementById('subscribe_login');
	subscribe_password = document.getElementById('subscribe_password');
	subscribe_password_check = document.getElementById('subscribe_password_check');
	subscribe_email = document.getElementById('subscribe_email');

	if(!subscribe_login || !subscribe_password || !subscribe_password_check || !subscribe_email) {
		alert("Неправильно сформирована форма.");
		return false;
	}

	if(subscribe_login.value == "") {
		alert("Необходимо заполнить поле \"Логин\"");
		return false;
	}

	if(subscribe_password.value == "") {
		alert("Необходимо заполнить поле \"Пароль\"");
		return false;
	}

	if(subscribe_password.value != subscribe_password_check.value) {
		alert("Пароли не совпадают.");
		return false;
	}

	if(subscribe_email.value == "") {
		alert("Необходимо заполнить поле \"E-mail\"");
		return false;
	}

	return true;
}
