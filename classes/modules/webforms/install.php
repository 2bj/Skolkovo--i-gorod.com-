<?php
$v551b723eafd6a31d444fcb2f5920fbd3 = Array();$v551b723eafd6a31d444fcb2f5920fbd3['version_line'] = "pro";$v551b723eafd6a31d444fcb2f5920fbd3['name'] = "webforms";$v551b723eafd6a31d444fcb2f5920fbd3['filename'] = "webforms/class.php";$v551b723eafd6a31d444fcb2f5920fbd3['config'] = "0";$v551b723eafd6a31d444fcb2f5920fbd3['ico'] = "ico_webforms";$v551b723eafd6a31d444fcb2f5920fbd3['default_method'] = "insert";$v551b723eafd6a31d444fcb2f5920fbd3['default_method_admin'] = "addresses";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms'] = "Functions, that should have their own permissions.";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/insert'] = "Отправка сообщений";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/insert/post'] = "";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/insert/posted'] = "";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/addresses'] = "Редактирование адресатов";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/addresses/addr_upd'] = "";$v1e48ab2454d1b1b374ca4a649d05b1f7 = Array();$v1e48ab2454d1b1b374ca4a649d05b1f7['cms_webforms_drop'] = "DROP TABLE cms_webfors";$v1e48ab2454d1b1b374ca4a649d05b1f7['cms_webforms'] = <<<CMS_WEBFORMS

CREATE TABLE cms_webforms (
id		INT		NOT NULL	AUTO_INCREMENT	PRIMARY KEY,
email		VARCHAR(255)	NOT NULL	DEFAULT '',
descr		VARCHAR(255)	NOT NULL	DEFAULT '',
KEY(email)
)

CMS_WEBFORMS;?>