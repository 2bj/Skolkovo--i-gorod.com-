<?php
$v551b723eafd6a31d444fcb2f5920fbd3 = Array();$v551b723eafd6a31d444fcb2f5920fbd3['version'] = "2.0.0.0";$v551b723eafd6a31d444fcb2f5920fbd3['version_line'] = "pro";$v551b723eafd6a31d444fcb2f5920fbd3['name'] = "search";$v551b723eafd6a31d444fcb2f5920fbd3['filename'] = "modules/search/class.php";$v551b723eafd6a31d444fcb2f5920fbd3['config'] = "0";$v551b723eafd6a31d444fcb2f5920fbd3['ico'] = "ico_search";$v551b723eafd6a31d444fcb2f5920fbd3['default_method'] = "search_do";$v551b723eafd6a31d444fcb2f5920fbd3['default_method_admin'] = "index_control";$v551b723eafd6a31d444fcb2f5920fbd3['hightlight_color'] = "";$v551b723eafd6a31d444fcb2f5920fbd3['weight_name'] = "0";$v551b723eafd6a31d444fcb2f5920fbd3['weight_title'] = "0";$v551b723eafd6a31d444fcb2f5920fbd3['weight_h1'] = "0";$v551b723eafd6a31d444fcb2f5920fbd3['weight_content'] = "0";$v551b723eafd6a31d444fcb2f5920fbd3['autoindex'] = "1";$v551b723eafd6a31d444fcb2f5920fbd3['per_page'] = "10";$v551b723eafd6a31d444fcb2f5920fbd3['search_deep'] = "999999";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms'] = "Functions, that should have their own permissions.";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/index'] = "Индексация";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/index/index_all'] = "";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/index/index_item'] = "";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/index/elementisreindexed'] = "";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/index/index_control'] = "";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/search'] = "Поиск по сайту";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/search/runsearch'] = "";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/search/search_do'] = "";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/search/insert_form'] = "";$v1e48ab2454d1b1b374ca4a649d05b1f7['cms_search_index_drop'] = "DROP TABLE cms_search_index";$v1e48ab2454d1b1b374ca4a649d05b1f7['cms_search_index_all'] = "

CREATE TABLE cms_search_index (
word		VARCHAR(128)	NOT NULL	DEFAULT '',
module		VARCHAR(48)	NOT NULL	DEFAULT '',
method		VARCHAR(48)	NOT NULL	DEFAULT '',
param		VARCHAR(48)	NOT NULL	DEFAULT '',
lang		VARCHAR(24)	NOT NULL	DEFAULT '',
domain		VARCHAR(128)	NOT NULL	DEFAULT '',
range		INT		NOT NULL	DEFAULT 0,
indextime	INT DEFAULT 0,

KEY (word), KEY (module), KEY (method), KEY (lang), KEY (domain)
) TYPE=InnoDB;

";?>