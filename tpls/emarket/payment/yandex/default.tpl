<?php
$FORMS = Array();

$FORMS['form_block'] = <<<END

<form action="%formAction%" method="post">

	<input type="hidden" name="shopId" 	   value="%shopId%" />
	<input type="hidden" name="Sum" 	   value="%Sum%" />
	<input type="hidden" name="BankId" 	   value="%BankId%" />
	<input type="hidden" name="scid" 	   value="%scid%" />
	<input type="hidden" name="CustomerNumber" value="%CustomerNumber%" />
	<!-- NB! This field should exist for proper system working -->
	<input type="hidden" name="order-id"       value="%orderId%" />	
	
	<p>
		Нажмите кнопку "Оплатить" для перехода на сайт платежной системы <strong>Yandex</strong>.
	</p>        

	<p>
		<input type="submit" value="Оплатить" />
	</p>
</form>
END;

?>