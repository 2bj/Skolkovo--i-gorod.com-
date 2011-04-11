<?php
$FORMS = Array();

$FORMS['payment_block'] = <<<END
<form action="%pre_lang%/emarket/purchase/payment/choose/do/" method="post">
	Выберите подходящий вам способ оплаты:
	<ul>
		%items%
	</ul>
	
	<p>
		<input type="submit" />
	</p>
</form>
END;

$FORMS['payment_item'] = <<<END
	<li><input type="radio" name="payment-id" value="%id%" /> %name%</li>
END;

?>