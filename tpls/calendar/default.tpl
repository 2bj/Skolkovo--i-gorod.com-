<?php
$FORMS = array();

$FORMS['calendar'] = <<<END
<table border="1">
	<tr>
		<td colspan="7" align="center">
			%system convertDate(%date%, 'Y M')%
		</td>
	</tr>
	
	%weeks%
</table>

END;

$FORMS['week'] = <<<END
	<tr>
		%days%
	</tr>

END;

$FORMS['day'] = <<<END
		<td>
			%day%
		</td>

END;

$FORMS['day_a'] = <<<END
		<td>
			%day% (%count%)
		</td>

END;

$FORMS['day_null'] = <<<END
		<td>
			%day%
		</td>

END;
?>