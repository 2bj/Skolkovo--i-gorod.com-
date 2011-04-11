<?php

$FORMS = Array();

$FORMS['navibar'] = <<<NAVIBAR
<div id="navibar">
	%elements%
</div>
				
NAVIBAR;

$FORMS['navibar_empty'] = <<<NAVIBAR
NAVIBAR;

$FORMS['element'] = '<div><a href="%pre_lang%%link%" umi:element-id="%id%" umi:field-name="name">%text%</a></div>';

$FORMS['element_active'] = "<div>%text%</div>";

$FORMS['quantificator'] = " / ";

?>
