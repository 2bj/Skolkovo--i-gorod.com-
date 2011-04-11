<?php

$FORMS = Array();

$FORMS['webforms_block'] = <<<BLOCK

<form method="post" action="%pre_lang%/webforms/post/">

<table border="0" width="100%">

	<tr>
		<td width="40%">
			Куда отправить:
		</td>

		<td>
			%to_block%
		</td>
	</tr>

	<tr>
		<td>
			Ваше имя:
		</td>

		<td>
			<input type="text" name="data[fname]" class="textinputs" />
		</td>
	</tr>

	<tr>
		<td>
			Ваша фамилия:
		</td>

		<td>
			<input type="text" name="data[lname]" class="textinputs" />
		</td>
	</tr>


	<tr>
		<td>
			Ваше отчество:
		</td>

		<td>
			<input type="text" name="data[mname]" class="textinputs" />
		</td>
	</tr>


	<tr>
		<td>
			Ваш e-mail:
		</td>

		<td>
			<input type="text" name="data[email_from]" class="textinputs" />
		</td>
	</tr>

	<tr>
		<td>
			Тема сообщения:
		</td>

		<td>
			<input type="text" name="data[subject]" class="textinputs" />
		</td>
	</tr>


	<tr>
		<td colspan="2">
			Сообщение:
		</td>
	</tr>

	<tr>
		<td colspan="2">
			<textarea name="message" class="textinputs" style="width: 385px; height: 200px;"></textarea>
		</td>
	</tr>
	<tr>
		<td>	
	%system captcha()%
		</td>
	</tr>

</table>

<p><input type="submit" value="Отправить" /></p>

</form>

BLOCK;

$FORMS['webforms_to_block'] = <<<TO_BLOCK

<select name="email_to" class="textinputs">%lines%</select>

TO_BLOCK;

$FORMS['webforms_to_line'] = <<<TO_LINE

<option value="%id%">%text%</option>

TO_LINE;

?>