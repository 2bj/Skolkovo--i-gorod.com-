<?php
$FORMS = Array();

$FORMS['search_block'] = <<<END
<p>
	%search_founded_total1% %total% %search_founded_total%.
</p>

<ul>
%lines%
</ul>

%system numpages(%total%, %per_page%)%

END;

$FORMS['search_block_line'] = <<<END
<li>
	<span class="s_num">%num%.</span> <a href='%link%' umi:element-id="%id%" umi:field-name="name">%name%</a>
	%context%
</li>

END;

$FORMS['search_empty_result'] = <<<END
<p>
	Извините. По данному запросу ничего не найдено.
</p>

END;

$FORMS['search_form'] = <<<END
<form method="get" action="%pre_lang%/sitesearch/">
	<div class="search" style="background:url(/images/search_bg_%pre_lang%.gif) no-repeat 100% 0%;">
		<div class="search-input"><input name="searchword" id="mod_search_searchword" maxlength="20" alt="Искать" class="inputbox" type="text" size="20" value="искать..." onblur="if(this.value=='') this.value='искать...';" onfocus="if(this.value=='искать...') this.value='';" /></div>
		<div class="search-button"><input type="submit" value="Search" class="button" onclick="this.form.searchword.focus();"/></div>
	</div>
	<input type="hidden" name="task"   value="search" />
	<input type="hidden" name="option" value="com_search" />
</form>
END;

?>