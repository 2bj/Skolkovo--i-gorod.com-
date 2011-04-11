<?php

$FORMS = array();


$FORMS['basket'] = <<<END
	<form action="%pre_lang%/eshop/basket_recalc/" method="post" name="basket_frm">
		<table border="1" cellspacing="2" width="100%" rules="rows">
			<tr style="background-color: #CCCCCC">
				<td><b>ID</b></td>
				<td><b>Наименование</b></td>
				<td><b>Цена</b></td>
				<td><b>Количество</b></td>
				<td><b>Итого</b></td>
				<td><b>Удалить</b></td>
			</tr>
			%items%
		</table>
		<b>Всего к оплате: %order_price%</b>
		<br />

		%eshop address_choice()%

		<button onclick="javascript:document.forms['basket_frm'].action='%pre_lang%/eshop/order/'; document.forms['basket_frm'].submit();">Оформить заказ</button>

		<input type="submit" value="Пересчитать" name="recalc" />

		<input type="hidden" name="from_page" value="%pre_lang%/eshop/basket" />
	</form>

	%eshop user_orders()%
END;

$FORMS['basket_empty'] = <<<END

	<p>Корзина пуста</p>

	%eshop user_orders()%
END;

$FORMS['basket_item'] = <<<END

		<tr>
			<td>%id%</td>
			<td>%name%</td>
			<td>%price% р.</td>
			<td><input type="text" name="basket_items[%id%][count]" value="%count%" maxlength="3" style="width:30px; border:1px sold #CCCCCC;" /></td>
			<td>%price_total%</td>
			<td><input type="checkbox" name="basket_items[%id%][remove]" value="1" /></td>
		</tr>

END;

$FORMS['addtobasket'] = <<<END

	<a href="%link%">Заказать</a>

END;



?>