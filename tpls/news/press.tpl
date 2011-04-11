<?php
$FORMS = Array();

$FORMS['lastlist_block'] = <<<END

<ul umi:module="news" umi:method="lastlist" umi:element-id="%id%">
%items%
</ul>
%system numpages(%total%, %per_page%)%

END;

$FORMS['lastlist_item'] = <<<END
<li umi:element-id="%id%">
	<div><a href="%link%" umi:element-id="%id%" umi:field-name="h1" style="color: #ff6600; font-size: medium; font-weight:bold;">%header%</a><!-- // <span umi:element-id="%id%" umi:field-name="publish_time">%system convertDate(%publish_time%, 'd.m.Y')%</span>--></div>
	<p umi:element-id="%id%" umi:field-name="anons">%anons%</p>
</li>

END;

$FORMS['view'] = <<<END
%content%

%news related_links(%id%)%

%comments insert('%id%')%

END;

$FORMS['related_block'] = <<<END
<p>Похожие новости:</p>
<ul>
	%related_links%
</ul>

END;

$FORMS['related_line'] = <<<END
<li>
	<a href="%link%"><b>%name%</b> (%system convertDate(%publish_time%, 'Y-m-d')%)</a>
</li>
END;



$FORMS['listlents_block'] = <<<END
<p>Рубрики новостей:</p>
<ul>
	%items%
</ul>

END;

$FORMS['listlents_item'] = <<<END
<li>
	<a href="%link%">%header%</a>
</li>

END;

$FORMS['listlents_block_empty'] = "";
?>