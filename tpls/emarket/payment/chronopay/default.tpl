<?php
$FORMS = Array();

$FORMS['form_block'] = <<<END

<form action="%formAction%" method="post">	

	<input type="hidden" name="product_id" value="%product_id%" />
	<input type="hidden" name="product_name" value="%product_name%" />
	<input type="hidden" name="product_price" value="%product_price%" />
	<input type="hidden" name="language" value="%language%" />
	<input type="hidden" name="cs1" value="%cs1%" />
	<input type="hidden" name="cs2" value="%cs2%" />
	<input type="hidden" name="cs3" value="%cs3%" />
	<input type="hidden" name="cb_type" value="%cb_type%" />
	<input type="hidden" name="cb_url" value="%cb_url%" />
	<input type="hidden" name="decline_url" value="%decline_url%" />
	<input type="hidden" name="sign" value="%sign%" />	
	
	
	<p>
		Нажмите кнопку "Оплатить" для перехода на сайт платежной системы <strong>Chronopay</strong>.
	</p>        

	<p>
		<input type="submit" value="Оплатить" />
	</p>
</form>
END;

?>