<?php

$FORMS = Array();


$FORMS['compare_block'] = <<<END
<table>
	%headers%
	%lines%
</table>

END;

$FORMS['compare_block_header'] = <<<END
	<tr>
		<td></td>
		%items%
	</tr>

END;

$FORMS['compare_block_header_item'] = <<<END
	<td>
		%catalog viewObject('%id%')%
	</td>
END;

$FORMS['compare_block_line'] = <<<END
	<tr style="background-color: %bg%;">
		<td>
			%title%
		</td>
		%items%
	</tr>

END;

$FORMS['compare_block_line_item'] = <<<END
		<td>
			%data getProperty('%id%', '%name%')%
		</td>

END;

$FORMS['compare_list_block'] = <<<END
<h2>Сравнение</h2>
%lines%

<a href="%link%">Сравнить</a>

END;

$FORMS['compare_list_block_line'] = <<<END
<p>
	<a href="%link%">%name%</a>
</p>

END;
?>
