function users_check_reg_form() {
	users_login = document.getElementById('users_login');
	users_password = document.getElementById('users_password');
	users_password_check = document.getElementById('users_password_check');
	users_email = document.getElementById('users_email');

	if(!users_login || !users_password || !users_password_check || !users_email) {
		alert("Неправильно сформирована форма.");
		return false;
	}

	if(users_login.value == "") {
		alert("Необходимо заполнить поле \"Логин\"");
		users_login.focus();
		return false;
	}

	if(users_password.value == "") {
		alert("Необходимо заполнить поле \"Пароль\"");
		users_password.focus();
		return false;
	}

	if(users_password.value != users_password_check.value) {
		alert("Пароли не совпадают.");
		users_password_check.focus();
		return false;
	}

	if(users_email.value == "") {
		alert("Необходимо заполнить поле \"E-mail\"");
		users_email.focus();
		return false;
	}

	return true;
}
