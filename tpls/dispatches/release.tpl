<?php

$FORMS = Array();

$FORMS['release_body'] = <<<END
	%messages%
	<hr>
	<b>Отписаться:</b> Отписаться от рассылки можно <a href="%unsubscribe_link%">по этой ссылке</a>
</html>

END;

$FORMS['release_message'] = <<<END
	<h3>%header%</h3>
	%body%
	<hr>
END;

?>