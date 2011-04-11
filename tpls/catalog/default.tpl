<?php

$FORMS = Array();

$FORMS['category'] = <<<END
%catalog getCategoryList('default', '%category_id%', 100, 1)%
%catalog getObjectsList('default', '%category_id%')%

END;


$FORMS['category_block'] = <<<END
<h3>Подразделы</h3>
<ul>
	%lines%
</ul>


END;


$FORMS['category_block_empty'] = <<<END

END;


$FORMS['category_block_line'] = <<<END
<li>
	<a href="%link%">%text%</a>
</li>

END;




$FORMS['objects_block'] = <<<END
%catalog search('%category_id%')%
%system numpages(%total%, %per_page%)%

<ul>
	%lines%
</ul>

%system numpages(%total%, %per_page%)%

END;


$FORMS['objects_block_search_empty'] = <<<END
%catalog search('%category_id%')%

<p>По Вашему запросу ничего не найдено.</p>

END;


$FORMS['objects_block_line'] = <<<END
<p><a href="%link%">%h1%</a></p>

END;



$FORMS['view_block'] = <<<END
<h4>
	Тестирование макроса "emarket price(id)"
</h4>
%emarket price(%id%)%

<h4>
	Тестирование макроса "emarket stores(id)"
</h4>
%emarket stores(%id%)%

<form method="post" action="/emarket/basket/put/element/%id%/">
	<input type="hidden" name="redirect-uri" value="%request_uri%" />

	<div class="buttons">
		<input type="submit" value="Положить в корзину" />
		<input type="button" value="Добавить к сравнению" />
	</div>
</form>

END;

$FORMS['search_block'] = <<<END

<form method="get" action="%content get_page_url(%category_id%)%">
<h3>Фильтр по товарам</h3>
%lines%
<p>
	<input type="submit" value="Подобрать" /><br />
	<input type="button" onclick="javascript: window.location = '%content get_page_url(%category_id%)%';" value="Сбросить" />
</p>
</form>


END;


$FORMS['search_block_line'] = <<<END
	<p>
		%selector%
	</p>
END;



$FORMS['search_block_line_relation'] = <<<END
%title% <select name="fields_filter[%name%]"><option />%items%</select>

END;


$FORMS['search_block_line_text'] = <<<END
%title% <input type="text" name="fields_filter[%name%]" class="textinputs" value="%value%" />

END;

$FORMS['search_block_line_price'] = <<<END
%title% от &nbsp;до 
<input type="text" name="fields_filter[%name%][0]" value="%value_from%" />
<input type="text" name="fields_filter[%name%][1]" value="%value_to%" />

END;

$FORMS['search_block_line_boolean'] = <<<END
%title% <input type="checkbox" name="fields_filter[%name%]" %checked% value="1" /> 

END;

?>