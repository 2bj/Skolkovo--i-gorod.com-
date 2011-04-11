<?php

$FORMS = Array();

$FORMS['delivery_block'] = <<<END

<br /><br />
<h3>Адреса доставки</h3><br />
<table border="0" width="100%">
%lines%
</table>

%eshop delivery_add()%

END;


$FORMS['delivery_block_line'] = <<<END

<tr>
	<td>
		<a href="%link%">%country%, %city%, %post_index%, %address%, %phone%</a>
	</td>

	<td>
		<a href="%link_del%" onclick="return confirm('Вы уверены, что хотите удалить этот адрес?');">Удалить</a>
	</td>
</tr>

END;



$FORMS['delivery_add_block'] = <<<END

<form action="%pre_lang%/eshop/delivery_add_do/" method="post" enctype="multipart/form-data">

<table border="0">

%data getCreateForm(%type_id%, 'users')%
</table>

<p><input type="submit" value="Добавить" /></p>

</form>

END;


$FORMS['delivery_edit_block'] = <<<END

<form action="%pre_lang%/eshop/delivery_edit_do/%id%/" method="post" enctype="multipart/form-data">

<table border="0" width="420">

%data getEditForm(%id%, 'users')%
</table>

<p><input type="submit" value="Сохранить" /></p>

</form>

END;


$FORMS['choise_block'] = <<<END

<br /><br />
<h2>Адрес доставки</h2>

<table width="100%" border="0" cellspacing="3">
%lines%
<tr>
	<td></td>
	<td colspan="2" style="padding-top: 5px;"><a href="%pre_lang%/eshop/delivery_add/">Добавить адрес</a></td>
</tr>
</table>


END;

$FORMS['choise_block_empty'] = <<<END

<p>Адресов нет</p>

<p><a href="%pre_lang%/eshop/delivery_add/">Добавить адрес</a></p>

END;

$FORMS['choise_block_line'] = <<<END

	<tr>
		<td>
			<input type="radio" name="delivery_address" value="%id%" />
		</td>
		<td>
			%country%, %city%, %post_index%, %address%, %phone%
		</td>
		
		<td>
			<a href="%link%">Редактировать</a>
		</td>
		
		<td>
			<a href="%link_del%" onclick="return confirm('Вы уверены, что хотите удалить этот адрес?');">Удалить</a>
		</td>
	</tr>

END;

?>