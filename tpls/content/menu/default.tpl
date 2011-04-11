<?php

$FORMS = Array();


$FORMS['menu_block_level1'] = <<<END
<div id="menu" umi:element-id="%id%" umi:module="content" umi:method="menu">
			<div class="top_menu">
				<ul id="mainlevel-nav">
				%lines%
				</ul>
			</div>
</div>
END;

$FORMS['menu_line_level1'] = <<<END
				<li><a href="%link%" umi:element-id="%id%" umi:field-name="name">%text%</a></li>

END;

$FORMS['menu_line_level1_a'] = <<<END
				<li><a class="active" href="%link%" umi:element-id="%id%" umi:field-name="name" id="active_menu-nav">%text%</a></li>

END;


?>