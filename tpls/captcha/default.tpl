<?php

$FORMS = Array();

$FORMS['captcha'] = <<<CAPTCHA
<p>
	%content insert('/infoblocks/captcha/')%<br />
	<img src="/captcha.php" /><br />
	<input type="text" name="captcha" />
</p>

CAPTCHA;
?>