<?php

$FORMS = Array();

$FORMS['subscribe_unregistred_user'] = <<<END

					<form method="post" name="sbs_frm" enctype="multipart/form-data" action="%pre_lang%/dispatches/subscribe_do/">
						<label for="subscribe"><div>Подписка на новости:</div></label>
						<input name="sbs_mail" id="subscribe" class="textinputs" type="text" value="Введите E-mail" onfocus="if (this.value == 'Введите E-mail') this.value=''" onblur="if (!this.value.length) this.value='Введите E-mail';" />
						<input type="submit" value="Ok"/>
					</form>

END;

$FORMS['subscribe_registred_user'] = <<<END

					<form method="post" name="sbs_frm" enctype="multipart/form-data" action="%pre_lang%/dispatches/subscribe_do/">
						<label for="subscribe"><div>Вы подписаны на рассылки:</div></label>
						%subscriber_dispatches%
						<input type="submit" value="Ok"/>
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


?>