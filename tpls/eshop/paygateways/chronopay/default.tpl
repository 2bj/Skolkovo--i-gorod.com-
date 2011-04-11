<?php
$FORMS = Array();

$FORMS['preform'] = <<<END
<form action="%form_action%" method="POST" target="_blank">
	%required_fields%
	<div style="margin:8px;font-weight:bold;">
		Вы выбрали способ оплаты через Chronopay
	</div>
	<div style="margin:16px;">
		Заказ: %order_id%<br/>
		Товар: %product_name%<br/>
		Сумма: %product_price%<br/>
		Транзакция: %transaction_id%<br/>
	</div>
	<div style="margin:8px;">
		Нажмите кнопку чтобы перейти к сервису процессинга платежа на сайте Chronopay.
	</div>
	<div style="margin:8px;">
		<input type="submit" value="Перейти к оплате"> <input type="button" value="Отмена" onclick="history.go(-1);">
	</div>
</form>
END;

?>