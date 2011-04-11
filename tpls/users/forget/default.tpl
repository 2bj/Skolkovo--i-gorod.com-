<?php

$FORMS = Array();


$FORMS['forget_block'] = <<<END

<form method="post" action="%pre_lang%/users/forget_do/">
	<table border="0">
		<tr>
			<td>Логин:</td>
			<td>
				<input type="text" name="forget_login" class="textinputs" />
			</td>
			<td>
				<input type="submit" value="Выслать пароль" />
			</td>
		</tr>
	</table>
</form>

END;




$FORMS['wrong_login_block'] = <<<END

<p><b>Пользователя "%forget_login%" не существует! <a href="%pre_lang%/users/registrate">Зарегистрировать?</a></b></p>

%users forget()%

END;




$FORMS['forget_sended'] = <<<END

<p>На e-mail адрес, указанный Вами при регистрации, был выслан пароль.</p>

END;



$FORMS['mail_verification'] = <<<END


	<p>
		Здравствуйте!<br />
		Кто-то, возможно Вы, пытается восстановить пароль для пользователя "%login%" на сайте <a href="http://%domain%">%domain%</a>.
	</p>


	<p>
		Если это не Вы, просто проигнорируйте данное письмо.
	</p>

	<p>
		Если Вы действительно хотите восстановить пароль, кликните по этой ссылке:<br />
		<a href="%restore_link%">%restore_link%</a>
	</p>

	<p>
		С уважением,<br />
		<b>Администрация сайта <a href="http://%domain%">%domain%</a></b>
	</p>


END;



$FORMS['mail_verification_subject'] = "Восстановление пароля";



$FORMS['restore_failed_block'] = <<<END

<p>Невозможно восстановить пароль: неверный код активации.</p>

END;



$FORMS['restore_ok_block'] = <<<END

<p>Пароль успешно изменен, на e-mail адрес, указанный при регистрации выслано уведомление.</p>

<p>
	Логин:	%login%<br />
	Пароль: %password%
</p>


END;



$FORMS['mail_password'] = <<<END


	<p>
		Здравствуйте!<br />

		Ваш новый пароль от сайта <a href="http://%domain%">%domain%</a>.
	</p>


	<p>
		Логин:	%login%<br />
		Пароль: %password%
	</p>

	<p>
		С уважением,<br />
		<b>Администрация сайта <a href="http://%domain%">%domain%</a></b>
	</p>
END;


$FORMS['mail_password_subject'] = "Новый пароль для сайта";

?>