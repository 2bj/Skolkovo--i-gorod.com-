<?php

$FORMS = Array();

$FORMS['albums_list_block'] = <<<END

Список альбомов:

%lines%

END;

$FORMS['albums_list_block_empty'] = <<<END

Фотоальбомов нет.

END;


$FORMS['albums_list_block_line'] = <<<END

<li>
	<a href="%link%">%name%</a>
</li>

END;


$FORMS['album_block'] = <<<END

<div umi:element-id="%id%" umi:module="photoalbum" umi:method="album">
%lines%
%system numpages(%total%, %per_page%)%
</div>

END;


$FORMS['album_block_empty'] = <<<END

<p>Фотогалерея пуста.</p>

END;


$FORMS['album_block_line'] = <<<END

<table width="100%" umi:element-id="%id%">
	<tr>
		<td rowspan="2" style="width: 150px;">
			<a href="%link%">
				%data getProperty('%id%', 'photo')%
			</a>
		</td>

		<td>
			<a href="%link%" umi:element-id="%id%" umi:field-name="name">
				%name%
			</a>
		</td>
	</tr>

	<tr>
		<td umi:element-id="%id%" umi:field-name="descr">
			%descr%
		</td>
	</tr>
</table>

<br /><br />

END;


$FORMS['photo_block'] = <<<END

<table width="100%">
	<tr>
		<td style="width: 250px;">
			%data getProperty('%id%', 'photo')%
		</td>

		<td>
			<p>Теги: <span umi:element-id="%id%" umi:field-name="tags">%tags%</span></p>
			<p umi:element-id="%id%" umi:field-name="descr">%descr%</p>
		</td>
	</tr>
</table>

<p>
	%system getPrevious(%id%)%
	%system getNext(%id%)%
</p>

%comments insert('%id%')%

END;

?>