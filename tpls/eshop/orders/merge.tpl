<?php

$FORMS = Array();



$FORMS['orders_empty'] = <<<END
	
END;


// Выводится при попытке заказа, когда пользователь не авторизован
$FORMS['need_autorize'] = <<<END

	Для осуществления заказа Вы должны быть авторизованным пользователем. <br />
	Пожалуйста, авторизуйтесь или зарегистрируйтесь. <br /><br />

	%users login()%

END;

$FORMS['orders_block'] = <<<END

	<h2>Ваши счета</h2>
	<form action="/eshop/merge_orders/" method="post" >
	<table id="order_block" border="0" width="100%" rules="rows">
		<tr class="orow_hat">
			<td>#</td>
			<td>№</td>
			<td>Дата заказа</td>
			<td>Сумма (руб.)</td>
			<td>Статус</td>
			<td>Отменить</td>
		</tr>
		%lines%
	</table>
	%eshop address_choice()%
	<input type="Submit" value="Объеденить заказы" /> 
	</form>
END;

$FORMS['order_line'] = <<<END

		<tr>
			<td><input type=checkbox value="%id%" name="merged_orders[]" /></td>
			<td><a href="%info_link%">%id%</a></td>
			<td>%order_time%</td>
			<td>%order_price%</td>
			<td>%status%</td>
			<td class="orow_remove">%cancel_button%</td>
		</tr>

END;

$FORMS['cancel_button'] = <<<END

	<a href="%cancel_link%">X</a>

END;

$FORMS['cancel_locked'] = <<<END


END;


$FORMS['order_info_block'] = <<<END

	<h2>Заказ #%id%</h2>
	<table id="order_block" border="0" width="100%" rules="rows">
			<tr class="orow_hat">
				<td>ID</td>
				<td>Наименование</td>
				<td>Цена (руб.)</td>
				<td>Количество</td>
				<td>Итого</td>
			</tr>
			%items%
	</table>
	<br />
	<b>Всего к оплате: %order_price% руб.</b><br />

	%eshop payment(%order_id%, 'repay')%

END;


$FORMS['order_info_line'] = <<<END

		<tr>
			<td>%id%</td>
			<td><a href="%content get_page_url(%id%)%">%name%</a></td>
			<td>%price%</td>
			<td>%count%</td>
			<td>%price_total%</td>
		</tr>

END;

$FORMS['order_canceled'] = <<<END

<h2>Ваш заказ отменен.</h2>

END;


?>
