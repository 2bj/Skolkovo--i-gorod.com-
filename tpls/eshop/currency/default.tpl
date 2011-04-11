<?php
$FORMS['currency_selector'] = <<<END
	<div id="rubricator" class="block">
	<h2>Валюта магазина:</h2>
	<select name="sel_currency_block" id="sel_currency_block" onChange="javascript: recalcCurrency();" style="width: 200px;">
		%currency_selector_items%
	</select>
	<script language="javascript">
		function recalcCurrency() {
			var currencySelector = document.getElementById("sel_currency_block");
			sel_curr = currencySelector.value;
			new Ajax.Request( '/eshop/changeSessionCurrency/?new_currency='+sel_curr , {
									method: "GET", 
									onComplete: function (a) {
										window.location.reload(true);
									}
								}
							);
 			 
		}
	</script>
	</div>
END;

$FORMS['currency_selector_item'] = <<<END
	<option value="%currency_s_code%" %selected% >%currency_name%</option>
END;
?>
