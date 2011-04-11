<?php

$FORMS = Array();


$FORMS['projects_block'] = <<<END
	<div>
		%lines%
	</div>


END;

$FORMS['projects_block_empty'] = <<<END

END;

$FORMS['projects_block_line'] = <<<END

	<a href="%link%">%text%</a><br />

END;

$FORMS['categories_block'] = <<<END
	<p>%content%</p>
	<ul>
		%lines%
	</ul>
%system numpages(%total%, %per_page%)%
END;

$FORMS['categories_block_empty'] = <<<END
	Вопросов по данному проекту пока нет.
END;

$FORMS['categories_block_line'] = <<<END

	<li>
		<a href="%link%">%text</a><br />
		%content%
	</li>

END;

$FORMS['question'] = <<<END
	<div>
		%question%
	</div>
	<div>
		%answer%
	</div>
END;

$FORMS['questions_block'] = <<<END
	%lines%
	%system numpages(%total%, %per_page%)% <br/><br/>
	<h3>Задайте свой вопрос</h3>
	%faq addQuestionForm()%
END;

$FORMS['questions_block_empty'] = <<<END
	<p>Вопросов данной категории пока нет.</p>

	<h3>Задайте свой вопрос</h3>
	%faq addQuestionForm()%
END;

$FORMS['questions_block_line'] = <<<END

	<div>
		<b>Вопрос:</b> %question%
	</div>
	<div>
		<b>Ответ:</b> %answer%
	</div>

	<br /><br />

END;


$FORMS['question_add_user'] = <<<ADD_FORM_USER

<form method="post" action="%action%">

<table cellspacing="5" cellpadding="0" border="0">
	<tr>
		<td>
			Заголовок:<br />
			<input type="text" name="title" size="50" style="width: 400px;" />
		</td>
	</tr>
	<tr>
		<td>
			Ваш вопрос:<br />
			<textarea name="question" style="width: 400px; height:150px;" ></textarea>
		</td>
	</tr>
	<tr>
		<td>
			<input type="submit" value="Отправить вопрос" />
		</td>
	</tr>
</table>

</form>

ADD_FORM_USER;


$FORMS['question_add_guest'] = <<<ADD_FORM_GUEST

<form method="post" action="%action%">

<table cellspacing="5" cellpadding="0" border="0">
	<tr>
		<td>
			Ваш ник:<br />
			<input type="text" name="nick" size="50" style="width: 400px;" />
		</td>
	</tr>

	<tr>
		<td>
			Ваш e-mail:<br />
			<input type="text" name="email" size="50" style="width: 400px;" />
		</td>
	</tr>

	<tr>
		<td>
			Заголовок:<br />
			<input type="text" name="title" size="50" style="width: 400px;" />
		</td>
	</tr>

	<tr>
		<td>
			Ваш вопрос:<br />
			<textarea name="question" style="width: 400px;height:150px;" ></textarea>
		</td>
	</tr>

	<tr>
		<td>
			%system captcha('default')%
		</td>
	</tr>

	<tr>
		<td>
			<input type="submit" value="Отправить вопрос" />
		</td>
	</tr>
</table>


</form>

ADD_FORM_GUEST;

$FORMS['confirm_mail_subj_user'] = <<<MAIL_USER_SBJ
Спасибо за Ваш вопрос
MAIL_USER_SBJ;

$FORMS['confirm_mail_user'] = <<<MAIL_USER
Вашему вопросу присвоен тикет #%ticket% <br />
Мы ответим Вам в ближайшее время.<br />
<br /><hr />
С уважением, <br />
Администрация сайта <b>%domain%</b>
MAIL_USER;


$FORMS['confirm_mail_subj_admin'] = <<<MAIL_ADMIN_SBJ
Новый вопрос в FAQ
MAIL_ADMIN_SBJ;

$FORMS['confirm_mail_admin'] = <<<MAIL_ADMIN
В базу знаний поступил новый вопрос:<br />
<a href="%question_link%">%question_link%</a><br />
<hr />
%question%
<hr />

MAIL_ADMIN;


?>