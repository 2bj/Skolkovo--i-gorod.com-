<?php

$FORMS = Array();

$FORMS['block'] = <<<END

<ul umi:element-id="%block-element-id%" umi:module="content" umi:method="sitemap">
	%items%
</ul>

END;

$FORMS['item'] = <<<END

	<li>
		<a href="%link%" umi:element-id="%id%" umi:field-name="name" umi:module="content" umi:method="sitemap">%name%</a>
		%sub_items%
	</li>

END;

?>