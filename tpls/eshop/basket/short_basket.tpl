<?php


$FORMS = array();

$FORMS['basket'] = <<<END


<div id="rubricator" class="block">
	<h2>У Вас в корзине:</h2>
	<ul>
		%items%
	</ul>
	<br />
	<a href="%pre_lang%/eshop/basket/" style="font-weight:bold;">Всего к оплате: <span name="order_total" id="order_total">%order_price%</span> %currency_symbol%</a><br />
	
</div>


END;

$FORMS['basket_empty'] = <<<END
	<div id="rubricator" class="block">
		<a href="%pre_lang%/eshop/basket/" style="font-weight:bold;">Корзина пуста</a>
	</div>
END;

$FORMS['basket_new_item'] = <<<END

		<li id="basketnewrow" name="basketnewrow" style="display:none">
			<a href="#" id="cnewitm_path" name="cnewitm_path"><span id="cnewitm_name" name="cnewitm_name"></span> (<b><span name="cnewitm_count" id="cnewitm_count"></span></b> шт.)</a> <a class="cancel_link" href="#" name="cnewitm_remove" id="cnewitm_remove">X</a>
		</li>

END;

$FORMS['basket_item'] = <<<END

		<li name="basketrow_%id%" id="basketrow_%id%">
			<a href="%content get_page_url(%id%)%" name="citm_%id%_path" id="citm_%id%_path"><span name="citm_%id%_name" id="citm_%id%_name">%name%</span> (<b><span name="citm_%id%_count" id="citm_%id%_count">%count%</span></b> шт.)</a> <a href="#" class="cancel_link" name="citm_%id%_remove" id="citm_%id%_remove" onclick="javascript:umiBasket.getInstance().removeBasketItem('%id%'); return false;">X</a>
		</li>

END;


?>
