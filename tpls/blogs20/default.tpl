<?php
$FORMS = Array();

$FORMS['blogs_list_block'] = <<<END
<!--
<h2>Блоги</h2>
-->
%lines%
<br /><br />
%system numpages(%total%, %per_page%, 'standart')%

END;


$FORMS['blogs_list_line'] = <<<END
<div style="padding-bottom:40px;">
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
<a href="/users/profile/%user_id%/"><b>%name%</b></a>
END;

$FORMS['posts_list_block_empty'] = <<<END
<h3 style="text-align:center;">В блоге нет ни одной записи.</h3>
END;

$FORMS['posts_list_block'] = <<<END
<div style="clear:both;">
	%lines%
	<br /><br />
	%system numpages(%total%, %per_page%)%
</div>
END;

$FORMS['posts_list_line'] = <<<END
<div style="padding-bottom: 40px;">
	<div>
		<a href="%post_link%" style="color: #ff6600; font-size: medium; font-weight:bold;">%h1%</a><br/><span style="font-size:9px; margin-bottom:15px;">%system convertDate(%publish_time%, 'd-m-Y H:i')%</span>
	</div>
	<div>
		<div style="padding: 10px 0 10px 0;">
			%cut%
		</div>
		<!--<div style="padding:5px;">
			<img src="/images/cms/blogs20/tag.png" align="middle" alt="Теги" /><span style="padding-left:5px;">%tags%</span>
		</div>-->
		<div>
			<img src="/images/cms/blogs20/comments.png" align="middle" alt="Теги" style="border:0; margin-right: 5px;" />
			<a href="%post_link%#comments" title="Читать комментарии">
				Комментарии: %comments_count%
			</a>
			&nbsp;&nbsp;&nbsp;<a href="%post_link%#comment_add" onclick="javascript:setCommentParent(%pid%);">Прокомментировать</a>
		</div>
	</div>
</div>
END;

$FORMS['post_cut_link'] = <<<END
<span style="display:block;text-align:right;">[ <a href="%link%">Читать дальше</a> ]</span>
END;

$FORMS['post_view'] = <<<END
<span>
	<a href="%post_link%" style="color: #ff6600; font-size: medium; font-weight:bold;">%h1%</a><br/><span style="font-size:9px; margin-bottom:15px;">%system convertDate(%publish_time%, 'd-m-Y H:i')%</span>
</span>
<br /><br />
%content%
%blogs20 placeControls(%pid%)%
<p>
	(<a href="#comment_add" onclick="javascript:setCommentParent(%pid%);">Прокомментировать</a>)
</p>
<br />
<br />
%blogs20 commentsList(%pid%)%
END;

$FORMS['comments_list_block'] = <<<END
<script language="javascript">
<!--
	function setCommentParent(parentId) {
		var form   = document.getElementById('comment_add_form');
		var editor = document.getElementById('comment_editor');
		if(form)
			form.action = '/blogs20/commentAdd/' + parentId + '/';
		if(editor)
			editor.focus();
	}
-->
</script>
<a name="comments">
<h3>Комментарии</h3>
</a>
<div style="padding: 10px 10px 0px 10px;">
%lines%
</div>
%system numpages(%total%, %per_page%)%

%blogs20 commentAdd()%
END;


$FORMS['comments_list_line'] = <<<END

<div style="display:block;">
	<div style="float:left;">
		<b style="color:#555;font-size:10pt;">%users viewAuthor(%author_id%)%</b>
		<span style="font-size:9px; margin-bottom:15px;">%system convertDate(%publish_time%, 'd-m-Y H:i')%</span>
	</div>
	%blogs20 placeControls(%cid%)%
</div>
<div style="clear:both;">
	<p>
		%content%
	</p>
	<p style="padding-bottom:20px;">
		(<a href="#comment_add" onclick="javascript:setCommentParent(%cid%);">Ответить</a>)
	</p>
	
	<div style="padding-left:30px;">
		%subcomments%
	</div>
</div>
END;

$FORMS['post_add_form'] = <<<END
<h3>Новое сообщение</h3>
<br />
<form method="post" action="%action%">

%blog_select%

<input type="checkbox" id="visible_for_friends" name="visible_for_friends" style="border:1px solid #ccc;" %visible_for_friends% /> 
<label for="visible_for_friends">Будет видно только друзьям</label><br /><br />

<label for="title">Заголовок</label><br />
<input type="text" id="title" name="title" value="%title%" style="width:100%; border:1px solid #aaa;" /><br />
<span style="color:#777">Заголовок должен отражать содержание сообщения</span><br /><br />

<label for="blg20_content">Текст</label>
<textarea id="blg20_content" name="content" style="width:100%; height:150px; border:1px solid #ccc; overflow: auto;">%content%</textarea><br />
%comments smilePanel('blg20_content')%
<span style="color:#777">Для оформления можно использовать bb-коды</span><br /><br />

<label for="tags">Теги</label><br />
<input type="text" id="tags" name="tags" value="%tags%" style="width:100%; border:1px solid #aaa;" /><br />
<span style="color:#777">Теги разделяются запятыми. Например: <i>осень, фотография, Петербург, UMI</i></span><br /><br />
<input type="hidden" id="post_%id%_draught" name="draught" value="0" />
<br />
<p align="right">
	<input type="button" value="В черновики" onclick="javascript:document.getElementById('post_%id%_draught').value=1;this.form.submit();" /> 
	<input type="submit" value="Опубликовать" />
</p>
</form>
END;

$FORMS['post_edit_form'] = <<<END
<form method="post" action="%action%">

%blog_select%

<input type="checkbox" id="visible_for_friends" name="visible_for_friends" style="border:1px solid #ccc;" %visible_for_friends% /> 
<label for="visible_for_friends">Будет видно только друзьям</label><br /><br />

<label for="title">Заголовок</label><br />
<input type="text" id="title" name="title" value="%title%" style="width:100%; border:1px solid #aaa;" /><br />
<span style="color:#777">Заголовок должен отражать содержание сообщения</span><br /><br />

<label for="blg20_content">Текст</label>
<textarea id="blg20_content" name="content" style="width:100%; height:150px; border:1px solid #ccc; overflow: auto;">%content%</textarea><br />
%comments smilePanel('blg20_content')%
<span style="color:#777">Для оформления можно использовать bb-коды</span><br /><br />

<label for="tags">Теги</label><br />
<input type="text" id="tags" name="tags" value="%tags%" style="width:100%; border:1px solid #aaa;" /><br />
<span style="color:#777">Теги разделяются запятыми. Например: <i>осень, фотография, Петербург, UMI</i></span><br /><br />
<input type="hidden" id="post_%id%_draught" name="draught" value="0" />
<br />
<p align="right">
	<input type="button" value="В черновики" onclick="javascript:document.getElementById('post_%id%_draught').value=1;this.form.submit();" /> 
	<input type="submit" value="Опубликовать" />
</p>
</form>
END;

$FORMS['blog_choose_block'] = <<<END
<label for="bid">Где публикуем</label><br />
<select id="bid" name="bid" style="width:100%; border:1px solid #aaa;">
	%options%
</select>
<br /><br />
END;

$FORMS['blog_choose_line'] = <<<END
<option value="%bid%" %selected%>%title%</option>
END;

$FORMS['post_control_block'] = <<<END
<div style="display:block;text-align:right;">
	<div style="color:#777;">Управление</div>
	<div style="float:right;text-align:left;">%controls%</div>
</div>
END;

$FORMS['post_control_delete'] = <<<END
<a href="%link%" style="text-decoration:none;">
<div style="width:120px; color: #999; padding:2px;" onmouseover="this.style.backgroundColor='#eee';" onmouseout="this.style.backgroundColor='#fff';">
	<img src="/images/cms/blogs20/post_delete.png" alt="Удалить этот пост" title="Удалить этот пост" style="border:0; vertical-align:middle;" />&nbsp;Удалить
</div>
</a>
END;

$FORMS['post_control_edit'] = <<<END
<a href="%link%" style="text-decoration:none;">
<div style="width:120px; color: #999; padding:2px;" onmouseover="this.style.backgroundColor='#eee';" onmouseout="this.style.backgroundColor='#fff';">
	<img src="/images/cms/blogs20/post_edit.png" alt="Редактировать этот пост" title="Редактировать этот пост" style="border:0; vertical-align:middle;"  />&nbsp;Редактировать
</div>
</a>
END;

$FORMS['comment_control_block'] = <<<END
<div style="float:right;">
	%controls%
</div>
END;

$FORMS['comment_control_delete'] = <<<END
<a href="%link%" style="text-decoration:none;">
<img src="/images/cms/blogs20/comment_delete.png" alt="Удалить этот комментарий" title="Удалить этот комментарий" style="border:0;" />
</a>
END;

$FORMS['comment_control_edit'] = <<<END
<!--
<a href="%link%" style="text-decoration:none;">
<img src="/images/cms/blogs20/comment_edit.png" alt="Редактировать этот комментарий" title="Редактировать этот комментарий" style="border:0;" />
</a>
-->
END;

$FORMS['comment_add_form'] = <<<END
<a name="comment_add">
	<h3>Написать комментарий</h3>
	<br />
	<form id="comment_add_form" method="post" action="/blogs20/commentAdd/%parent_id%/">
		<textarea id="comment_editor" name="content" style="width:100%; height:100px;"></textarea><br />
		%comments smilePanel('comment_editor')%
		<span style="color:#777">Для оформления можно использовать bb-коды</span><br />
		<p align="right"><input type="submit" value="Отправить" /></p>
	</form>
</a>
END;

$FORMS['comment_add_form_guest'] = <<<END
<a name="comment_add">
	<h3>Написать комментарий</h3>
</a>
	<br />
	<form id="comment_add_form" method="post" action="/blogs20/commentAdd/%pid%/">
		<label for="nick">Ваше имя</label><br />
		<input type="text" id="nick" name="nick" style="width:99%" /><br /><br />
		<label for="comment_editor">Текст комментария</label><br />
		<textarea id="comment_editor" name="content" style="width:99%; height:100px;"></textarea><br />
		<p align="right"><input type="submit" value="Отправить" /></p>
	</form>

END;

$FORMS['blod_edit_block'] = <<<END
<div style="display:block;width:100%;margin-top: 40px;">
	<h3>Мои блоги</h3>
	<span style="display:block; margin:20px 20px 20px 20px; font-size:11pt;">
		<a href="/blogs20/draughtsList/" style="color:#777;text-decoration:none;" title="Черновики">
			<img src="/images/cms/blogs20/draught.png" alt="Черновики" title="Черновики" style="border:0;vertical-align:middle;" />
			&#8594;
		</a>
		<a href="/blogs20/draughtsList/" style="color:#777;vertical-align:middle;" title="Черновики">Черновики публикаций</a>		
	</span>
	%lines%
</div>
END;

$FORMS['blog_edit_line'] = <<<END
<div style="padding-top:10px;">
	<h4>%title%</h4>
	<br />
	Ссылка на сайте: <a href="%path%">%path%</a>
	<br /><br />
	<div style="padding-left:15px;">
		<form id="form_%bid%_edit" method="post" action="/blogs20/editUserBlogs/%bid%/">
			<input type="hidden" name="redirect" value="%current_page%" />
			<label for="blog_%bid%_title">Название</label><br />
			<input type="text" id="blog_%bid%_title" name="blog[%bid%][title]" style="width:99%;border:1px solid #ccc;" value="%title%" /><br /><br />			
			<label for="blog_%bid%_description">Описание</label><br />
			<input type="text" id="blog_%bid%_description" name="blog[%bid%][description]" style="width:99%;border:1px solid #ccc;" value="%description%" /><br /><br />
			<label for="blog_%bid%_friendlist">Друзья</label><br />
			<select id="blog_%bid%_friendlist" name="blog[%bid%][friendlist][]" multiple="multiple" style="width:99%;height:100px;border:1px solid #ccc;">%friends%</select><br /><br />	
			
			<span style="display:block;text-align:right;"><input type="submit" value="Сохранить" /></span>
		</form>
	</div>
</div>
END;

$FORMS['blog_new_line'] = <<<END
<div style="padding-top:10px;">
	<h3>Создать новый блог</h3>
	<div style="padding-left:15px;">
		<form id="form_%bid%_edit" method="post" action="/blogs20/editUserBlogs/%bid%/">
			<input type="hidden" name="redirect" value="%current_page%" />
			<label for="blog_%bid%_title">Название</label><br />
			<input type="text" id="blog_%bid%_title" name="blog[%bid%][title]" style="width:99%;border:1px solid #ccc;" value="%title%" /><br /><br />			
			<label for="blog_%bid%_description">Описание</label><br />
			<input type="text" id="blog_%bid%_description" name="blog[%bid%][description]" style="width:99%;border:1px solid #ccc;" value="%description%" /><br /><br />
			<label for="blog_%bid%_friendlist">Друзья</label><br />
			<select id="blog_%bid%_friendlist" name="blog[%bid%][friendlist][]" multiple="multiple" style="width:99%;height:100px;border:1px solid #ccc;">%friends%</select><br /><br />	
			
			<span style="display:block;text-align:right;"><input type="submit" value="Сохранить" /></span>
		</form>
	</div>
</div>
END;

$FORMS['tag_decoration'] = <<<END
<a href="/blogs20/postsByTag/%tag%/">%tag%</a>
END;

?>