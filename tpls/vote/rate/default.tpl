<?php
$FORMS = Array();

$FORMS['rate_ok'] = <<<END

%rate_sum%\n
%rate_voters%\n
%current_rating%

END;

$FORMS['rate_rated'] = <<<END

rated
"%current_rating%"

END;

$FORMS['rate_not_found'] = <<<END

not found

END;

?>