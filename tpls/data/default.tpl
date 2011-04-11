<?php
$FORMS = Array();

$FORMS['groups_block'] = <<<END
<ul>
	%lines%
</ul>
END;

$FORMS['groups_line'] = <<<END
<li>
	%data getPropertyGroup('%id%', '%group_id%', '%template%')%
</li>
END;


$FORMS['group'] = <<<END
[Group], %title% (%name%)
<ul>
    %lines%
</ul>
END;

$FORMS['group_line'] = <<<END
<li>
    %prop%
</li>
END;



$FORMS['int'] = <<<END
[Int], %title% (%name%): %value%

END;

$FORMS['price'] = <<<END
[Price], %title% (%name%): %value%

END;


$FORMS['string'] = <<<END
[String], %title% (%name%): %value%

END;

$FORMS['text'] = <<<END
[Text], %title% (%name%): %value%

END;


$FORMS['relation'] = <<<END
[Relation] %title% (%name%): %value% (%object_id%)

END;

$FORMS['file'] = <<<END
[File], %title% (%name%)<br />
Filename: %filename%;<br />
Filepath: %filepath%;<br />
Filepath: %src%;<br />
Size: %size%<br />
Extension: %ext%<br />
<a href="%src%">%src%</a>
END;

$FORMS['swf_file'] = $FORMS['img_file'] = <<<END
[Image File], %title% (%name%)<br />
Filename: %filename%;<br />
Filepath: %filepath%;<br />
Filepath: %src%;<br />
Size: %size%<br />
Extension: %ext%<br />
%width% %height%<br />
<img src="%src%" width="%width%" height="%height%" />

END;

$FORMS['date'] = <<<END
[Date], %title% (%name%): %value%

END;

$FORMS['boolean_yes'] = <<<END
[Boolean], %title% (%name%): Да
END;

$FORMS['boolean_no'] = <<<END
[Boolean], %title% (%name%): Нет
END;


$FORMS['wysiwyg'] = <<<END
[HTML text], %title% (%name%): %value%

END;


/* Multiple property blocks */

$FORMS['relation_mul_block'] = <<<END
[Relation multiple], %title% (%name%): %items%
END;

/* Multiple property item */

$FORMS['relation_mul_item'] = <<<END
%value%(%object_id%)%quant%
END;

/* Multiple property quant */
$FORMS['symlink_block'] = <<<END
[Symlink multiple], %title%: %items%
END;

$FORMS['symlink_item'] = <<<END
<a href="%link%">%value%(%id%, %object_id%)</a>%quant%
END;

$FORMS['symlink_quant'] = <<<END
, 
END;

?>