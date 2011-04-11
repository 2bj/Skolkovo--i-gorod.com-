<?php
$FORMS = array();

$FORMS['order_block'] = <<<END
	<div id="rubricator" class="block">
		<h2>У Вас в корзине</h2>
		<ul>
			%items%
		</ul>
		
		<br />
		
		<p>
			<strong>
				Всего товаров: %total-amount%<br />
				Общая стоимость: %total-price%
			</strong>
		</p>
	</div>
END;

$FORMS['order_item'] = <<<END
	<li>
		<a href="%link%">%name%</a> x %amount%
		<br />
		%total-price%
		<a href="%pre_lang%/emarket/basket/remove/item/%id%/">(X)</a>
	</li>
END;


$FORMS['price_original'] = <<<END
<strike>%prefix%&nbsp;%original%&nbsp;%suffix%</strike>
END;

$FORMS['price_actual'] = <<<END
%prefix%&nbsp;%actual%&nbsp;%suffix%
END;

?>