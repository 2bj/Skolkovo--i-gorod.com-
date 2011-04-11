<?php

$FORMS = Array();

$FORMS['video_player'] = <<<END
<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	id="UmiVideoPlayer" width="%width%" height="%height%"
	codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">
	<param name="movie" value="/images/cms/video/UmiVideoPlayer.swf" />
	<param name="quality" value="high" />
	<param name="bgcolor" value="#869ca7" />
	<param name="allowScriptAccess" value="sameDomain" />
	<param name="allowFullscreen" value="true" />
	<param name="flashVars" value="video=%path%" />
	<embed src="/images/cms/video/UmiVideoPlayer.swf" quality="high" bgcolor="#869ca7"
		width="%width%" height="%height%" name="UmiVideoPlayer" align="middle"
		play="true"
		loop="false"
		quality="high"
		allowScriptAccess="sameDomain"
		allowFullscreen="true"
		flashVars="video=%path%"
		type="application/x-shockwave-flash"
		pluginspage="http://www.adobe.com/go/getflashplayer">
	</embed>
</object>
END;

?>