<?php
$FORMS = Array();

$FORMS['delivery_block'] = <<<END
<form action="%pre_lang%/emarket/purchase/delivery/choose/do/" method="post">
	Выберите подходящий вам способ доставки:
	<ul>
		%items%
	</ul>
	
	<p>
		<input type="submit" />
	</p>
</form>
END;

$FORMS['delivery_item_free'] = <<<END
	<li><input type="radio" name="delivery-id" value="%id%" checked="checked" /> %name% - бесплатно</li>
END;

$FORMS['delivery_item_priced'] = <<<END
	<li><input type="radio" name="delivery-id" value="%id%" /> %name% - %price%</li>
END;


$FORMS['delivery_address_block'] = <<<END
<form action="%pre_lang%/emarket/purchase/delivery/address/do/" method="post">
	Выберите подходящий вам адрес доставки:
	<ul>
		%items%
		<li>
			<input type="radio" name="delivery-address" value="new" />Новый адрес
			<div>
			%data getCreateForm(803)%
			</div>
		</li>
	</ul>
	
	<p>
		<input type="submit" />
	</p>
</form>
END;

$FORMS['delivery_address_item'] = <<<END
	<li><input type="radio" name="delivery-address" value="%id%" />%index%, %city%, %street%, д. %house%, кв. %flat%</li>
END;


?>