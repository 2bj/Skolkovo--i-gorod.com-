<?php

$FORMS = Array();

$FORMS['tags_block'] = <<<END
<div>
%lines%
</div>

END;


$FORMS['tags_block_line'] = <<<END

<font style="font-size: +%font_size%pt;">%tag%</font> %separator%

END;

$FORMS['tags_separator'] = ", ";

?>