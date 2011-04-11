<?php
$FORMS = Array();

$FORMS['vote_block'] = <<<END
<form method="post">
	<p><b umi:element-id="%id%" umi:field-name="question">%text%</b></p>
	%items%
	
	%submit%
</form>

END;

$FORMS['vote_block_submit'] = <<<END

<input type="button" value="Отправить" onclick="javscript:cms_vote_postDo('postForm_%id%', 'vote_results', '%vote_not_selected%'); return false;" />


END;

$FORMS['vote_block_line'] = <<<END
	<p>
		<input type="radio" name="vote_results" value="%item_id%" class="search" id="vote_item_%item_id%">
		<span umi:object-id="%block-object-id%" umi:field-name="name">%item_name%</span>
	</p>
END;


$FORMS['result_block'] = <<<END

<p><b>Результаты опроса :  <span umi:element-id="%id%" umi:field-name="question">%question%</span></b></p>
%items%
<p><b>Всего голосов: %total_posts%</b></p>
END;

$FORMS['result_block_line'] = <<<END
	<table width="150" cellspacing="0" cellpadding="0" style="border: #000 1px solid">
		<tr>
			<td style="width: %item_result_proc%px; background-color: red;" height="10"></td>
			<td style="width: %item_result_proc_reverce%px;"></td>
		</tr>
	</table>
<span umi:object-id="%block-object-id%" umi:field-name="name">%item_name%</span> (<span umi:object-id="%block-object-id%" umi:field-name="count">%item_result%</span> голосов)

END;

$FORMS['js_block_voted'] = "Вы уже проголосовали.";
$FORMS['js_block_closed'] = "Ошибка. Голосование не активно, либо закрыто.";
$FORMS['js_block_ok'] = "Ваше мнение учтено.";


?>