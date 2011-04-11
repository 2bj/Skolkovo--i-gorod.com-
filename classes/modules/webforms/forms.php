<?php
$FORMS = Array();$FORMS['addrs'] = <<<ADDRS

<form method="post" action="%pre_lang%/admin/webforms/addr_upd/">

<tablegroup>
	<hrow>
		<hcol style="width: 250px">E-mail адресата</hcol>
		<hcol>Описание адресата</hcol>
		<hcol style="width: 100px;">Удалить</hcol>
	</hrow>

%rows%

	<row>
		<col>
			<input style="width: 96%">
				<name><![CDATA[email_new]]></name>
			</input>
		</col>

		<col>
			<input style="width: 96%">
				<name><![CDATA[descr_new]]></name>
			</input>

		</col>

		<col style="text-align: center"></col>
	</row>

</tablegroup>

<p><submit title="Сохранить" /></p>

</form>

ADDRS;?>