<?php

$FORMS = array();

$FORMS['payment_block'] = <<<END
	
	<h2>Способ оплаты</h2>
	<table width="100%" border="0" cellspacing="3">

		<tr>
			<td width="10"><input type="radio" name="payment_engine" value="" /></td>
			<td>Наличными</td>
		</tr>

		<tr>
			<td>
				<input type="radio" name="payment_engine" value="%pre_lang%/eshop/paygateway_chronopay/%order_id%" />
			</td>
			<td>
				Chronopay
			</td>
		</tr>

	</table>

END;

$FORMS['payment_locked'] = <<<END

END;

?>