<?php

$FORMS = Array();

$FORMS['pages_block'] = <<<END
<ul>
	%items%
</ul>

END;

$FORMS['pages_block_line'] = <<<END
    <li><a href="%link%">%name%</a></li>

END;

$FORMS['pages_block_empty'] = <<<END
<i>No result</i>

END;

?>