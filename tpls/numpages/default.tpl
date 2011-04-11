<?php
	$FORMS = Array();

	$FORMS['pages_block'] = <<<END
	<div>
		<div style="font-size:18px; padding:16px;">%toprev% <span style="font-size:16px;">%pages%</span> %tonext%</div>
	</div>

END;



	$FORMS['pages_item'] = <<<END
	<a href="%link%">%num%</a>&nbsp;%quant%
END;

	$FORMS['pages_item_a'] = <<<END
	<span style="padding:6px 8px; background-color:#FF6600; color:white; font-weight:bold;">%num%</span>&nbsp;%quant%
END;

	$FORMS['pages_quant'] = <<<END
&nbsp;
END;

	$FORMS['pages_block_empty'] = "";
	
	$FORMS['pages_toprev'] = <<<END
	<a href="%toprev_link%">&larr;</a>&nbsp;
END;

	$FORMS['pages_tonext'] = <<<END
	&nbsp;<a href="%tonext_link%">&rarr;</a>
END;
?>