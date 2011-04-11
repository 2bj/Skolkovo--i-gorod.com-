<?php
$FORMS = array();

$FORMS['currency_prices_block'] = <<<END
<h5>Цены для во всех валютах</h5>
<ul>
	%items%
</ul>
END;

$FORMS['currency_prices_item'] = <<<END
<li>
	%name% - %prefix%%price-original%%suffix% (<strike>%prefix%%price-actual%%suffix%</strike>)
</li>
END;

$FORMS['currency_block'] = <<<END
<form method="post" action="%pre_lang%/emarket/selectCurrency/">
	<p>Выберите предпочитаемую валюту:</p>
	
	<ul>
		%items%
	</ul>
	
	<p>
		<input type="submit" value="Выбрать" />
	</p>
</form>
END;

$FORMS['currency_item'] = <<<END
	<li>
		<label>
			<input type="radio" name="currency-codename" value="%codename%" />
			%name% (%codename%)
		</label>
	</li>
END;

$FORMS['currency_item_a'] = <<<END
	<li>
		<label>
			<input type="radio" name="currency-codename" value="%codename%" checked="checked" />
			%name% (%codename%)
		</label>
	</li>
END;
?>