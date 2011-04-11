<?php

$FORMS = array();

$FORMS['stores_block'] = <<<END

	<b>Наличие на складе</b>
	<table border="0" >
		<tr>
			<td><b>Название склада</b></td>
			<td><b>Кол-во</b></td>
		</tr>
		%lines%
	</table>

END;

$FORMS['stores_empty'] = <<<END
	Нет на складе
END;

$FORMS['store_line'] = <<<END

	<tr>
		<td>%name%</td>
		<td style="text-align:center;">%amount%</td>
	</tr>

END;

?>