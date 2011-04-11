<?php
$FORMS = Array();

$FORMS['form_block'] = <<<END

<form action="%formAction%" method="post">	

	   <input type="hidden" name="MrchLogin" value="%MrchLogin%" />
	   <input type="hidden" name="OutSum" value="%OutSum%" />
	   <input type="hidden" name="InvId" value="%InvId%" />
	   <input type="hidden" name="Desc"	value="%Desc%" />
	   <input type="hidden" name="SignatureValue" value="%SignatureValue%" />
	   <input type="hidden" name="IncCurrLabel" value="%IncCurrLabel%" />
	   <input type="hidden" name="Culture" value="%Culture%" />
	   <input type="hidden" name="shp_orderId" value="%shp_orderId%" />		
	
	
	<p>
		Нажмите кнопку "Оплатить" для перехода на сайт платежной системы <strong>Robokassa</strong>.
	</p>        

	<p>
		<input type="submit" value="Оплатить" />
	</p>
</form>
END;

?>