<?php

$FORMS = Array();


$FORMS['block'] = <<<END

<tr>
	<td>
		Номер дисконтной карты
	</td>

	<td>
		<input type="text" name="discount_card_code" value="%code%" class="textinputs" />
		%data getPropertyOfObject('%discount_card_id%', 'proc', 'discount_card.proc')%
	</td>
</tr>

END;

?>