<?php
$FORMS = Array();$FORMS['polls'] = <<<END

<imgButton>
	<title><![CDATA[Добавить опрос]]></title>
	<src><![CDATA[/images/cms/admin/%skin_path%/ico_add.%ico_ext%]]></src>
	<link><![CDATA[%pre_lang%/admin/vote/add_poll/]]></link>
</imgButton>

<br /><br />

%pages%
<tablegroup>
	<header>
		<hcol style="text-align: left">Опросы</hcol>
		<hcol style="width: 100px">Активность</hcol>
		<hcol style="width: 100px">Изменить</hcol>
		<hcol style="width: 100px">Удалить</hcol>
	</header>
	%rows%
</tablegroup>

END;$FORMS['add_poll'] = <<<END
<script type="text/javascript">
<![CDATA[

function init_me() {
	df = document.forms['adding_new_page'];
	def_value = df.name.value;
	def_alt = df.alt_name.value;
}

function save_with_exit() {
	document.forms['adding_new_page'].exit_after_save.value = "1";
	return acf_check(1);
}
function save_without_exit() {
	document.forms['adding_new_page'].exit_after_save.value = "0";
	return acf_check(1);
}


frm = document.forms['adding_new_page'];
var hh = (frm.onsubmit) ? frm.onsubmit : function () {};frm.onsubmit = function () { hh(); acf_check(); };


cifi_upload_text = '%news_cifi_upload_text%';
]]>
</script>
<form method="post" name="adding_new_page" action="%pre_lang%/admin/vote/%method%/%poll_id%/">

	<passthru name="exit_after_save"></passthru>


	<setgroup name="Редактирование содержания" id="news_add_list" form="no">

		<table border="0" width="100%" cellspacing="0" cellpadding="0">

			<tr>
				<td width="50%">
					<input class="" br="yes" quant="no" size="58" style="width:355px">
						<id><![CDATA[pname]]></id>
						<name><![CDATA[name]]></name>
						<title><![CDATA[Название]]></title>
						<value><![CDATA[%name%]]></value>
						<tip><![CDATA[%tip_name%]]></tip>
						<onkeydown><![CDATA[javascript: go_alt(this);]]></onkeydown>
						<onchange><![CDATA[javascript: go_alt(this);]]></onchange>
					</input>
				</td>

				<td width="50%">
				<input class="" br="yes" quant="no" style="width:355px">
					<id><![CDATA[pkeywords]]></id>
					<name><![CDATA[meta_keywords]]></name>
					<title><![CDATA[Ключевые слова (meta name="KEYWORDS")]]></title>
					<value><![CDATA[%meta_keywords%]]></value>
					<tip><![CDATA[%tip_keywords%]]></tip>
				</input>
				</td>
			</tr>

			<tr>
				<td>
					<input  autocheck="yes"   class="" br="yes" quant="no" style="width:355px">
					<id><![CDATA[ptitle]]></id>
					<name><![CDATA[title]]></name>
					<title><![CDATA[<TITLE>]]></title>
					<value><![CDATA[%title%]]></value>
					<tip><![CDATA[%tip_title%]]></tip>
				</input>

			</td>

			<td>
				<input class="" br="yes" quant="no" style="width:355px">
					<id><![CDATA[pdescription]]></id>
					<name><![CDATA[meta_descriptions]]></name>
					<title><![CDATA[Описания (meta name="DESCRIPTIONS")]]></title>
					<value><![CDATA[%meta_descriptions%]]></value>
					<tip><![CDATA[%tip_description%]]></tip>
				</input>
				</td>
			</tr>

			<tr>
			<td>
					<input class="" br="yes" size="58" quant="no" style="width:355px">
					<id><![CDATA[palt_name]]></id>
					<name><![CDATA[alt_name]]></name>
					<title><![CDATA[Псевдостатический адрес (URL)]]></title>
					<value><![CDATA[%alt_name%]]></value>
					<tip><![CDATA[%tip_alt_name%]]></tip>
				</input>

			</td>

			<td>
				<input class="" br="yes" size="58" quant="no" style="width:355px">
					<name><![CDATA[h1]]></name>
					<title><![CDATA[Заголовок страницы (H1)]]></title>
					<value><![CDATA[%h1%]]></value>
					<tip><![CDATA[%tip_h1%]]></tip>
				</input>
			</td>
			</tr>

			<tr>
				<td>
					<select quant="no" br="yes" style="width: 375px;" class="std_select">
					<name><![CDATA[object_type_id]]></name>
					<title><![CDATA[Тип опроса]]></title>
					<tip><![CDATA[%tip_object_type%]]></tip>
					%object_types%
				</select>
			</td>

			<td>

			<input class="" br="yes" size="58" quant="no" style="width:355px">
					<id><![CDATA[tags]]></id>
					<name><![CDATA[tags]]></name>
					<title><![CDATA[Теги]]></title>
					<value><![CDATA[%tags%]]></value>
					<tip><![CDATA[%tip_tags%]]></tip>
				</input>
				</td>
			</tr>

			<tr>
				<td>
				<input class="" br="yes" size="58" quant="no" style="width:355px">
					<name><![CDATA[posttime]]></name>
					<title><![CDATA[Дата публикации]]></title>
					<value><![CDATA[%posttime%]]></value>
					<tip><![CDATA[%tip_publish_time%]]></tip>
				</input>

				</td>

				<td>
					<br />
					<checkbox    selected="%is_closed%">
					<name><![CDATA[is_closed]]></name>
					<title><![CDATA[Голосование закрыто]]></title>
					<value><![CDATA[1]]></value>
					<tip><![CDATA[%tip_is_closed%]]></tip>
				</checkbox>
				</td>

			</tr>
            <tr>
            	<td></td>
            	<td>
            		<br />
				<checkbox selected="%is_active%">
					<name><![CDATA[is_active]]></name>
					<title><![CDATA[Активен]]></title>
					<value><![CDATA[1]]></value>
					<tip><![CDATA[%tip_is_active%]]></tip>
				</checkbox>
            	</td>
            </tr>


			<tr>
				<td colspan="2">
					Текст вопроса<br/>
					<textarea  style="width: 97%; height: 173px;" name="question"><![CDATA[%question%]]></textarea>
				</td>
			</tr>

		</table>

		<p align="right">%save_n_save%&nbsp;&nbsp;&nbsp;&nbsp;</p>

	</setgroup>


	<setgroup name="Параметры" id="params" form="no">
		<table width="100%" cellspacing="0" cellpadding="0" border="0">
			<tr>
				<td>
					<span class="ftext">
						<![CDATA[Изображение неактивного раздела]]>
						<tip>
							<title><![CDATA[Изображение неактивного раздела]]></title>
							<content><![CDATA[%tip_menu_ua%]]></content>
						</tip>
					</span>
					%cifi_menu_ua%
				</td>

				<td style="width: 10px;">&nbsp;&nbsp;&nbsp;</td>

				<td>
					<span class="ftext">
						<![CDATA[Изображение активного раздела]]>
						<tip>
							<title><![CDATA[Изображение активного раздела]]></title>
							<content><![CDATA[%tip_menu_a%]]></content>
						</tip>
					</span>
					%cifi_menu_a%
				</td>
			</tr>

			<tr>
				<td>
					<span class="ftext">
						<![CDATA[Изображение для заголовка]]>
						<tip>
							<title><![CDATA[Изображение для заголовка]]></title>
							<content><![CDATA[%tip_headers%]]></content>
						</tip>
					</span>
					%cifi_headers%
				</td>

				<td style="width: 10px;"></td>

				<td>
					<select quant="no" br="yes" style="width: 86%;" class="std_select">
						<name><![CDATA[tpl]]></name>
						<title><![CDATA[Шаблон дизайна]]></title>
						<tip><![CDATA[%tip_template_id%]]></tip>
						%templates%
					</select>
				</td>
			</tr>
		</table>


		<br/>

		<table width="100%" cellspacing="0" cellpadding="0" border="0">
			<tr>
				<td>
					<checkbox selected="%is_visible%">
						<name><![CDATA[is_visible]]></name>
						<title><![CDATA[Отображать в меню]]></title>
						<value><![CDATA[1]]></value>
						<tip><![CDATA[%tip_is_visible%]]></tip>
					</checkbox>

				</td>

			<td>
				<checkbox selected="%show_submenu%">
					<name><![CDATA[show_submenu]]></name>
					<title><![CDATA[Показывать подменю]]></title>
					<value><![CDATA[1]]></value>
					<tip><![CDATA[%tip_show_submenu%]]></tip>
				</checkbox>

			</td>

			<td>
				<checkbox selected="%expanded%">
					<name><![CDATA[expanded]]></name>
					<title><![CDATA[Меню всегда развернуто]]></title>
					<value><![CDATA[1]]></value>
					<tip><![CDATA[%tip_expanded%]]></tip>
				</checkbox>
				</td>
			</tr>

			<tr>
				<td colspan="3" height="5"></td>
			</tr>

			<tr>
				<td>
					<checkbox selected="%is_default%">
					<name><![CDATA[is_default]]></name>
					<title><![CDATA[Страница по умолчанию]]></title>
					<value><![CDATA[1]]></value>
					<tip><![CDATA[%tip_is_default%]]></tip>
				</checkbox>
			</td>

			<td>
				<checkbox selected="%unindexed%">
					<name><![CDATA[unindexed]]></name>
					<title><![CDATA[Исключить из поиска]]></title>
					<value><![CDATA[1]]></value>
					<tip><![CDATA[%tip_is_unindexed%]]></tip>
				</checkbox>
				</td>

				<td>
					<!--<checkbox name="index_item" title="Раздел поиска" value="1">%index_item%</checkbox>-->
				</td>
			</tr>

			<tr>
				<td colspan="3" height="5"></td>
			</tr>


			<tr>
				<td>
					<checkbox selected="%robots_deny%">
						<name><![CDATA[robots_deny]]></name>
						<title><![CDATA[Запретить индексацию поисковиками]]></title>
						<value><![CDATA[1]]></value>
						<tip><![CDATA[%tip_robots_deny%]]></tip>
					</checkbox>
				</td>

				<td></td>

				<td></td>
			</tr>
		</table>

		<p align="right">%save_n_save%</p>
	</setgroup>


	<setgroup name="Варианты ответа" id="vote_answ" form="no">

		<tablegroup>
			<header>
				<hcol style="text-align: left">Текст ответа</hcol>
				<hcol style="width: 100px">Проголосовало</hcol>
				<hcol style="width: 100px">Удалить</hcol>
			</header>

			%rows%

			<row>
				<col>
					<input quant='no' class='' style='width: 525px; vertical-align: middle;' >
						<name><![CDATA[items_name_new]]></name>
					</input>
				</col>

				<col align="left"></col>
				<col align="center"></col>
			</row>
		</tablegroup>

		<p align="right">%save_n_save%&nbsp;&nbsp;&nbsp;&nbsp;</p>

	</setgroup>


%data_field_groups%

<script type="text/javascript">
<![CDATA[

function init_me() {
	df = document.forms['adding_new_page'];
	def_value = df.name.value;
	def_alt = df.alt_name.value;
}

function save_with_exit() {
	document.forms['adding_new_page'].exit_after_save.value = "1";
	return acf_check(1);
}
function save_without_exit() {
	document.forms['adding_new_page'].exit_after_save.value = "0";
	return acf_check(1);
}
function save_with_redirect() {
	document.forms['adding_new_page'].exit_after_save.value = "2";
	return acf_check(1);
}


var h = function () {
	frm = document.forms['adding_new_page'];
	var hh = (frm.onsubmit) ? frm.onsubmit : function () {};frm.onsubmit = function () { hh(); acf_check(); };
}
addOnLoadEvent(h);




acf_inputs_test[acf_inputs_test.length] = Array('pname', 'Enter page name');
acf_inputs_test[acf_inputs_test.length] = Array('palt_name', 'Enter static urlname');

acf_inputs_catch[acf_inputs_catch.length] = 'pname';
acf_inputs_catch[acf_inputs_catch.length] = 'ptitle';
acf_inputs_catch[acf_inputs_catch.length] = 'palt_name';
acf_inputs_catch[acf_inputs_catch.length] = 'pkeywords';
acf_inputs_catch[acf_inputs_catch.length] = 'pdescription';


cifi_upload_text = '%vote_cifi_upload_text%';
]]>
</script>

%perm_panel%


</form>


%backup_panel%

END;$FORMS['items'] = <<<END

<form method="post" action="%pre_lang%/admin/vote/add_item/%pid%/">
<tinytable>
	<col>
		<middeled>

			<mcol>
				<input quant='no' class='' style='width: 350px; vertical-align: middle;'>
					<name><![CDATA[new_item]]></name>
				</input>
			</mcol>
			<mcol>
				<submit title='Добавить ответ' />
			</mcol>
		</middeled>
	</col>

	<col>
		<middeled>
			<mcol>
				%link_open%
				%link_close%
			</mcol>
		</middeled>
	</col>
</tinytable>
</form>

<p />

<form method="post" action="%pre_lang%/admin/vote/edit_items/%pid%">
<tablegroup>
	<header>
		<hcol style="text-align: left">Текст ответа</hcol>
		<hcol style="width: 100px">Проголосовало</hcol>
		<hcol style="width: 100px">Удалить</hcol>
	</header>
%rows%
</tablegroup>

<p><submit title="Сохранить изменения" /></p>

</form>
END;$FORMS['config'] = <<<CONFIG

<form action="%pre_lang%/admin/vote/config_do/">
	<setgroup name="Настройка голосований" id="params_cont" form="no">
		<tablegroup>
			<row>
				<col style="width: 50%;">
					<![CDATA[Сделать 5ти-бальные рейтинги]]>
				</col>

				<col>
					<checkbox style="margin-left: 3px;" selected="%is_graded%">
						<name><![CDATA[is_graded]]></name>
						<value><![CDATA[1]]></value>
					</checkbox>
				</col>
			</row>

			<row>
				<col style="width: 50%;">
					<![CDATA[Разрешить голосование только авторизованным пользователям]]>
				</col>

				<col>
					<checkbox style="margin-left: 3px;" selected="%is_private%">
						<name><![CDATA[is_private]]></name>
						<value><![CDATA[1]]></value>
					</checkbox>
				</col>
			</row>
		</tablegroup>

		<p align="right"><submit title="Сохранить" /></p>

	</setgroup>
</form>

CONFIG;?>