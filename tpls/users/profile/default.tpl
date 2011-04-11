<?php

$FORMS = Array();

$FORMS['profile_block'] = <<<END

<p><b>%login%</b></p>

%data getPropertyGroupOfObject(%id%, 'short_info more_info addon', 'profile')%

END;

$FORMS['bad_user_block'] = <<<END

<p>Данного пользователя не существует</p>

END;

?>