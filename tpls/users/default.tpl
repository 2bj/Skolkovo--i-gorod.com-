<?php

$FORMS = Array();

$FORMS['login'] = <<<END
<p>Вы ввели неверный логин или пароль.<br />
Проверьте раскладку клавиатуры, не нажата ли клавиша «Caps Lock» и попробуйте ввести логин и пароль еще раз:</p>
<form action="%pre_lang%/users/login_do/" method="post">
	<label for="login"><b>Логин:</b></label><br />
	<input type="text" id="login" name="login" class="textinputs" value=""/><br />

	<label for="password"><b>Пароль:</b></label><br />
	<input type="password" id="password" name="password" class="textinputs" value=""/><br />

	<p>
		<input type="submit" value="%users_auth_enter%"/>
	</p>
	<input style="display:none;" type="hidden" name="from_page" value="%from_page%" />
</form>

<p>
	Если Вы еще не зарегистрированы на сайте, Вы можете <a href="%pre_lang%/users/registrate/" class="sub">зарегистрироваться</a>.
</p>

<p>
	Если Вы забыли пароль, Вы можете <a href="%pre_lang%/users/forget/" class="sub">воспользоваться сервисом восстановления пароля</a>.
</p>

END;


$FORMS['logged'] = <<<END
<p>
	%users_welcome% %user_name% (%user_login%)
</p>

<p>
	<a href="%pre_lang%/users/logout/">Выйти</a><br />
	<a href="%pre_lang%/users/settings/">Перейти в персональный раздел</a>
</p>

END;
?>