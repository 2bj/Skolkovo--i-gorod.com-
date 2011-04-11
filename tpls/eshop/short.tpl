<?php

$FORMS = Array();

$FORMS['basket'] = <<<END
<table border="0" width="198" class="tab_all">
				<tr><td><img src="/images/bg_basket_top.gif" width="100%" height="10" alt=""></td></tr>
				<tr><td class="vote_text"><b>Всего товаров:</b> .............. %items_num%</td></tr>
				<tr><td class="vote_text"><b>На сумму (руб):</b> ........ %total_price%</td></tr>
				<tr><td class="vote_text pad_top"><a href="%link%" class="blue">Перейти в корзину</a></td></tr>
				<tr><td><img src="/images/bg_basket_bot.gif" width="100%" height="10" alt=""></td></tr>
			</table>

END;

$FORMS['basket_empty'] = <<<END

sdf

END;

?>