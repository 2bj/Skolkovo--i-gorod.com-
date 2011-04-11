<?php
$FORMS = Array();

$FORMS['form_block'] = <<<END

<form action="%formAction%" method="post">

	<input type="hidden" name="eshopId" value="%eshopId%" />
	<input type="hidden" name="orderId" value="%orderId%" />
	<input type="hidden" name="recipientAmount" value="%recipientAmount%" />
	<input type="hidden" name="recipientCurrency" value="%recipientCurrency%" />
	<input type="hidden" name="version" value="%version%" />	
	
	<p>
		Нажмите кнопку "Оплатить" для перехода на сайт платежной системы <strong>RBK Money</strong>.
	</p>        

	<p>
		<input type="submit" value="Оплатить" />
	</p>
</form>
END;
?>