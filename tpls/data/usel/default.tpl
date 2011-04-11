<?php

$FORMS = Array();

$FORMS['objects_block'] = <<<END
<p>Objects list (%total%/%per_page%):</p>
<ul>
	%items%
</ul>
END;

$FORMS['objects_block_line'] = <<<END
<li>
	%name%
	%separator%
</li>
END;

$FORMS['objects_block_empty'] = <<<END
<p>Objects not found</p>
END;

$FORMS['elements_block'] = <<<END
<p>Elements list (%total%/%per_page%)</p>
<ul>
	%items%
</ul>
END;

$FORMS['elements_block_line'] = <<<END
<li>
	<a href="%link%">%name%</a>
	%separator%
</li>
END;

$FORMS['elements_block_empty'] = <<<END
<p>Elements not found</p>
END;

$FORMS['separator'] = <<<END
|
END;

$FORMS['separator_last'] = <<<END
!
END;
?>