<?php

$FORMS = array();

 
$FORMS['basket'] = <<<END
		<p><b>Всего к оплате: %order_price%</b> (%total_count%)</p>
		<p><a href="/eshop/basket/">Jump to basket</a></p>
END;

$FORMS['basket_empty'] = <<<END

	<h2>Корзина пуста</h2>
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


$FORMS['orders_empty'] = <<<END
	
END;

$FORMS['orders_block'] = <<<END

	<h2>Ваши счета</h2>
	<table border="1" cellspacing="2" width="100%" rules="rows">
		<tr>
			<td><b>Номер заказа</b></td>
			<td><b>Дата заказа</b></td>
			<td><b>Общая сумма</b></td>
			<td><b>Статус</b></td>
			<td><b>Отменить</b></td>
		</tr>
		%lines%
	</table>
END;

$FORMS['order_line'] = <<<END

		<tr>
			<td>%id%</td>
			<td>%order_time%</td>
			<td>%order_price% р.</td>
			<td>%status%</td>
			<td align="center"><a href="%pre_lang%/eshop/cancel_order/%id%">X</a></td>
		</tr>

END;

// Тело письма для заказчика
$FORMS['user_message'] = <<<END

	Здравствуйте, %lname% %fname% %father_name% <br />
	Спасибо за Ваш заказ! <br />

	%order_items%

END;


// Выводится при попытке заказа, когда пользователь не авторизован
$FORMS['need_autorize'] = <<<END

	Для осуществления заказа Вы должны быть авторизованным пользователем. <br />
	Пожалуйста, авторизуйтесь или зарегистрируйтесь. <br /><br />

	%users login()%

END;

$FORMS['incorrect_user_info'] = <<<END

	Вы указали некорректные данные о себе. <br />
	Пожалуйста, введите корректные данные.<br /><br />
	%users settings()%
END;


// Тело письма для ответственного менеджера
$FORMS['manager_message'] = <<<END

	Здравствуйте, %lname% %fname% %father_name% <br />
	Поступил новый заказ <br />

	%order_items%

END;

// Подробное описание заказа, для отправляемых писем
$FORMS['order_items'] = <<<END
	<table border="1" cellspacing="2" width="100%" rules="rows">
			<tr style="background-color: #CCCCCC">
				<td><b>ID</b></td>
				<td><b>Наименование</b></td>
				<td><b>Цена</b></td>
				<td><b>Количество</b></td>
				<td><b>Итого</b></td>
			</tr>
			%items%
			<tr>
				<td colspan="5"><b>Всего к оплате: %order_price% р.</b></td>
			</tr>
	</table>
END;


$FORMS['order_item'] = <<<END

		<tr>
			<td>%id%</td>
			<td>%name%</td>
			<td>%price% р.</td>
			<td>%count%</td>
			<td>%price_total%</td>
		</tr>

END;



?>