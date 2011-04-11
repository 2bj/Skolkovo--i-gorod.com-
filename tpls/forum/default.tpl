<?php

$FORMS = Array();


$FORMS['confs_block'] = <<<CONFS_BLOCK
<table>
	<tr>
		<th>Рубрики</th>
		<th>Темы</th>
		<th>Сообщения</th>
		<th>Последние&nbsp;сообщения</th>
	</tr>
	%lines%
</table>

CONFS_BLOCK;

$FORMS['confs_block_line'] = <<<CONFS_LINE
<tr>
	<td>
		<p>
			<a href="%link%">%name%</a><br />
			%descr%
		</p>
	</td>

	<td>
		%topics_count%
	</td>

	<td>
		%messages_count%
	</td>

	<td>
		%forum conf_last_message(%id%)%
	</td>

</tr>

CONFS_LINE;

$FORMS['topics_block'] = <<<TOPICS_BLOCK
<table>
	<tr>
		<td>Темы</td>
		<td>Ответов</td>
		<td>Последнее сообщение</td>
	</tr>
	%lines%
</table>

<p>%system numpages(%total%, %per_page%)%</p>
%forum topic_post(%id%)%

TOPICS_BLOCK;


$FORMS['topics_block_line'] = <<<TOPICS_LINE
<tr>
	<td>
		<p><a href="%link%">%name%</a><p>
	</td>

	<td>
		%messages_count%
	</td>

	<td>
		%forum topic_last_message(%id%)%
	</td>
</tr>

TOPICS_LINE;


$FORMS['messages_block'] = <<<MESSAGES_BLOCK
<table>
%lines%
</table>

<p>%system numpages(%total%, %per_page%)%</p>
%forum message_post(%id%)%

MESSAGES_BLOCK;


$FORMS['messages_block_line'] = <<<MESSAGES_LINE
<tr>
	<td>
		<a name="%id%">
		%users viewAuthor(%author_id%)%<br />
		%system convertDate(%publish_time%, 'd.m.Y в H:i')%<br />
		<b>%name%</b>
		</a>
	</td>
</tr>

<tr>
	<td>
		<div umi:element-id="%id%" umi:field-name="message">%message%</div><br />
	</td>
</tr>

MESSAGES_LINE;



$FORMS['add_message_user'] = <<<ADD_MESSAGE_USER
<form method="post" action="%action%">
	<p>
		Заголовок сообщения: <input type="text" name="title" value="Re: %name%" />
	</p>

	<p>
		Ваши комментарии: <textarea name="body"></textarea>
	</p>
	%smiles%
	
	<p>
		<input type="submit" value="Отправить" />
	</p>

	<input type="hidden" name="login" disabled="disabled" />
</form>

ADD_MESSAGE_USER;

$FORMS['add_message_guest'] = <<<ADD_MESSAGE_GUEST
<form method="post" action="%action%">

	<p>
		Ваше имя: <input type="text" name="nickname" />
	</p>

	<p>
		Ваш e-mail: <input type="text" name="email" />
	</p>

	<p>
		Название темы: <input type="text" name="title" />
	</p>
	
	%system captcha()%
	
	<p>
		Ваши комментарии: <textarea name="body"></textarea>
	</p>
	
	%smiles%
	
	<p>
		<input type="submit" value="Отправить" />
	</p>
</form>

ADD_MESSAGE_GUEST;


$FORMS['add_topic_user'] = <<<ADD_TOPIC_USER
<form method="post" action="%action%">
	<p>
		Название темы: <input type="text" name="title" />
	</p>

	<p>
		Ваши комментарии: <textarea name="body"></textarea>
	</p>
	
	%smiles%
	
	<p>
		<input type="submit" value="Отправить" />
	</p>
	
	<input type="hidden" name="login" disabled="disabled" />
</form>

ADD_TOPIC_USER;


$FORMS['add_topic_guest'] = <<<ADD_TOPIC_GUEST
<form method="post" action="%action%">
	<p>
		Ваше имя: <input type="text" name="login" />
	</p>
	
	<p>
		Ваше email: <input type="text" name="email" />
	</p>
	
	<p>
		Название темы: <input type="text" name="title" />
	</p>
	
	%system captcha()%
	
	<p>
		Ваши комментарии: <textarea name="body"></textarea>
	</p>
	
	%smiles%
	
	<p>
		<input type="submit" value="Отправить" />
	</p>
</form>

ADD_TOPIC_GUEST;


$FORMS['add_topic_unauth'] = <<<ADD_TOPIC_UNAUTH
Для создания топиков необходимо <a href="%pre_lang%/forum/registrate/">зарегистрироваться</a>.

ADD_TOPIC_UNAUTH;

$FORMS['add_message_unauth'] = <<<ADD_MESSAGE_UNAUTH
Для добавления сообщений необходимо <a href="%pre_lang%/forum/registrate/">зарегистрироваться</a>.

ADD_MESSAGE_UNAUTH;


$FORMS['conf_last_message'] = <<<END
<a href="%link%">%name%</a><br />

%system convertDate(%publish_time%, 'd.m.Y в H:i')%<br />
%users viewAuthor(%author_id%)%

END;

$FORMS['topic_last_message'] = <<<END
<a href="%link%">%name%</a><br />

%system convertDate(%publish_time%, 'd.m.Y в H:i')%<br />
%users viewAuthor(%author_id%)%

END;


$FORMS['smiles'] = <<<END
<div class="smiles">
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/1.gif" alt="1"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/2.gif" alt="2"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/3.gif" alt="3"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/4.gif" alt="4"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/5.gif" alt="5"></a>
	
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/6.gif" alt="6"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/7.gif" alt="7"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/8.gif" alt="8"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/9.gif" alt="9"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/10.gif" alt="10"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/11.gif" alt="11"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/12.gif" alt="12"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/13.gif" alt="13"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/14.gif" alt="14"></a>
	
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/15.gif" alt="15"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/16.gif" alt="16"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/17.gif" alt="17"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/18.gif" alt="18"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/19.gif" alt="19"></a>
	<a href="#" onclick="javascript: forum_insert_smile(this); return false;"><img src="/images/forum/smiles/20.gif" alt="20"></a>
</div>
END;

?>