<?php

$FORMS = Array();


$FORMS['block'] = <<<END

<ul>
    %items%
</ul>

%system numpages('%total%', '%per_page%', 'default')%
END;


$FORMS['block_item'] = <<<END
    <li><a href="%pre_lang%/users/profile/%user_id%/">%login% (%users isUserOnline(%user_id%)%)</a></li>

END;


?>