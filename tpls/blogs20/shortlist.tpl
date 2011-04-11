<?php
$FORMS = Array();

$FORMS['blogs_list_block'] = <<<END
<div id="blog" class="block">
	<h2>Блоги</h2>
	%lines%	
</div>
END;


$FORMS['blogs_list_line'] = <<<END
<div class="item">
	<span style="font-size:12pt;"><a href="%link%" style="text-decoration:none;">%title%</a></span><br />
	<div style="padding-bottom: 10px;">
		%description%
	</div>
	%blogs20 viewBlogAuthors(%bid%)%		
</div>
END;

$FORMS['blog_author_list_block'] = <<<END
	<img src="/images/cms/blogs20/user.png" alt="Авторы блога" title="Авторы блога" align="left" />
	&nbsp;&nbsp;
	%lines%
END;

$FORMS['blog_author_list_line'] = <<<END
<a href="/users/profile/%user_id%/"><b>%login%</b></a>
END;



$FORMS['tag_decoration'] = <<<END
<a href="/blogs20/postsByTag/%tag%/">%tag%</a>
END;

?>