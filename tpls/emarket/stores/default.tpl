<?php
$FORMS = array();

$FORMS['stores_block'] = <<<END
<h5>Наличие на складах</h5>
<ul>
	%items%
</ul>
Всего: %total-amount% наименований
END;

$FORMS['stores_block_empty'] = <<<END
<h5>Наличие на складах: отсутствует</h5>
END;

$FORMS['stores_item'] = <<<END
	<li>%name% - <b>%amount%</b> наименоваий</li>
END;
?>