<?php
$FORMS = Array();

$FORMS['errors_block'] = <<<END
<ul>
	%items%
</ul>
END;

$FORMS['errors_block_line'] = <<<END
	<li style="color: red; font-weight: bold">
		%message%
	</li>
END;

?>