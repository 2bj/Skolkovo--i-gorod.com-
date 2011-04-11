<?php

$FORMS = array();

$FORMS['payment_block'] = <<<END
	
	<script type="text/javascript">
		function doPayment() {
			var arrEngines = document.getElementsByName("payment_engine");
			for (var iI = 0; iI < arrEngines.length; iI++) {
				if (arrEngines[iI].checked) {
					window.location = arrEngines[iI].value;
					return true;
				}
			}

			alert('Выберите способ оплаты.');
		}
	</script>

	<h2>Оплатить заказ</h2>
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

	<button onclick="doPayment();">Оплатить</button>

END;

$FORMS['payment_locked'] = <<<END

END;

?>