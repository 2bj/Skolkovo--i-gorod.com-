<?php

$FORMS = array();

// Тело письма для заказчика
$FORMS['user_message'] = <<<END

	Здравствуйте, %lname% %fname% %father_name% <br />
	Спасибо за Ваш заказ! <br />

	%order_items%

END;


// Тело письма для ответственного менеджера
$FORMS['manager_message'] = <<<END

	Здравствуйте, %lname% %fname% %father_name% <br />
	Поступил новый заказ:<br />

	%order_items%

	<a href="%order_link%">Смотреть подробную информацию о заказе</a>
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


// Блок для вывода каждого элемета письма
$FORMS['order_item'] = <<<END

		<tr>
			<td>%id%</td>
			<td>%name%</td>
			<td>%price% р.</td>
			<td>%count%</td>
			<td>%price_total%</td>
		</tr>

END;

// Сообщение заказчику, если у заказа изменился статус
$FORMS['user_status_change_msg'] = <<<END

	Здравствуйте, %lname% %fname% %father_name% <br />
	
	Ваш заказ #%order_id% <b>%status%</b> <br />

	Спасибо!

END;

// Сообщение ответственному менеджеру, если у заказа изменился статус
$FORMS['manager_status_change_msg'] = <<<END

	Здравствуйте, %lname% %fname% %father_name% <br />
	
	Заказ #%order_id% %status% <br />

	<a href="%order_link%">Смотреть подробную информацию о заказе</a>

END;

?>