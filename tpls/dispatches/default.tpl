<?php

$FORMS = Array();

/*
$FORMS['subscribe_unregistred_user'] = <<<END
	<form method="post" name="sbs_frm" enctype="multipart/form-data" action="%pre_lang%/dispatches/subscribe_do/">
		<table border="0" cellpadding="0" cellspacing="2">
			<tr>
				<td>
					*E-mail:<br />
					<input type="text" value="" name="sbs_mail" />
				</td>
			</tr>
			<tr>
				<td>
					Фамилия:<br />
					<input type="text" value="" name="sbs_lname" />
				</td>
			</tr>
			<tr>
				<td>
					Имя:<br />
					<input type="text" value="" name="sbs_fname" />
				</td>
			</tr>
			<tr>
				<td>
					Отчество:<br />
					<input type="text" value="" name="sbs_father_name" />
				</td>
			</tr>
			<tr>
				<td>
					Пол:<br />
					<select name="sbs_gender">
						<option></option>
						%sbs_genders%
					</select>
				</td>
			</tr>
			<tr>
				<td>
					<input type="submit" value="Ok" />
				</td>
			</tr>
		</table>
	</form>
END;

$FORMS['subscribe_registred_user'] = <<<END
	<form method="post" name="sbs_frm" enctype="multipart/form-data" action="%pre_lang%/dispatches/subscribe_do/">
		<table cellpadding="0" cellspacing="2" border="0">
			<tr>
				<td>Вы подписаны на рассылки:</td>
			</tr>
			<tr>
				<td>%subscriber_dispatches%</td>
			</tr>
			<tr>
				<td><input type="submit" value="Ok" /></td>
			</tr>
		</table>
	</form>
END;
*/

$FORMS['subscribe_unregistred_user'] = <<<END
	<form method="post" name="sbs_frm" enctype="multipart/form-data" action="%pre_lang%/dispatches/subscribe_do/">
		<table border="0" width="95%" class="bg_subscription">
			<tr><td></td></tr>

			<tr><td class="pad_left h2" style="padding-left:10px; padding-bottom: 5px">Подписка на новости:</td></tr>
			<tr>
			     <td class="h4">
					   <!--<img src="/images/spacer.gif" width="10" height="1" alt="" border="0">-->
					   <input name="sbs_mail" type="text" size="18" value="Введите e-mail" class="form" onfocus="if(this.value == 'Введите e-mail') { this.value = ''; }" onblur="if(this.value == '') { this.value = 'Введите e-mail' } " />
					   <!--<a href="javascript: document.forms['sbs_frm'].submit();" ><img src="/images/submit_ok.gif" width="39" align="absmiddle" hspace="7" height="18" alt="" border="0"></a>-->
					   <input type="submit" value="Ok"/>
				</td>
			</tr>

			<tr><td></td></tr>
		</table>
	</form>
END;

$FORMS['subscribe_registred_user'] = <<<END
	<form method="post" name="sbs_frm" enctype="multipart/form-data" action="%pre_lang%/dispatches/subscribe_do/">
		<table border="0" width="95%" class="bg_subscription">
			<tr><td><img src="/images/bg_subscription_top.gif" width="100%" height="12" alt=""></td></tr>
			<tr><td class="pad_left h2" style="padding-left:10px;">
				Вы подписаны на рассылки:<br />
				%subscriber_dispatches%
			</td></tr>
			<tr><td><a href="javascript: document.forms['sbs_frm'].submit();" ><img src="/images/submit_ok.gif" width="39" align="absmiddle" hspace="7" height="18" alt="" border="0"></a>
			</td></tr>

			<tr><td><img src="/images/bg_subscription_bot.gif" width="100%" height="12" alt=""></td></tr>
		</table>
	</form>
END;



$FORMS['subscriber_dispatches'] = <<<END
	<table border="0" cellpadding="0" cellspacing="2">
		%rows%
	</table>
END;

$FORMS['subscriber_dispatch_row'] = <<<END
	<tr>
		<td>
			<input type="checkbox" %checked% name="subscriber_dispatches[]" value="%disp_id%" />
			<span umi:object-id="%block-object-id%" umi:field-name="name">%disp_name%</span>
		</td>
	</tr>
END;


$FORMS['subscribe_confirm'] = <<<END
<p>Доброго времени суток!</p>

<p>Вы подписались на рассылку.</p>

<p>Если вы не хотите ее получать, перейдите по этой ссылке: <a href="%unsubscribe_link%">%unsubscribe_link%</a></p>

<p>UMI.CMS<br />
<a href="mailto:help@umi-cms.ru">help@umi-cms.ru</a></p>

END;

$FORMS['subscribe_confirm_subject'] = "Подписка на рассылку";


$FORMS['subscribe_guest_alredy_subscribed'] = <<<END
<p>Такой адрес уже есть в нашем списке. <a href="%unsubscribe_link%">Хотите отписаться?</a></p>

END;
?>