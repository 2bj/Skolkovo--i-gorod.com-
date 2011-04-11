<?php
$v551b723eafd6a31d444fcb2f5920fbd3 = Array();$v551b723eafd6a31d444fcb2f5920fbd3['version'] = "2.0.0.0";$v551b723eafd6a31d444fcb2f5920fbd3['version_line'] = "pro";$v551b723eafd6a31d444fcb2f5920fbd3['name'] = "users";$v551b723eafd6a31d444fcb2f5920fbd3['filename'] = "modules/users/class.php";$v551b723eafd6a31d444fcb2f5920fbd3['config'] = "1";$v551b723eafd6a31d444fcb2f5920fbd3['ico'] = "ico_users";$v551b723eafd6a31d444fcb2f5920fbd3['default_method'] = "auth";$v551b723eafd6a31d444fcb2f5920fbd3['default_method_admin'] = "groups_list";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms'] = "Functions, that should have their own permissions.";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/login'] = "Авторизация";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/registrate'] = "Регистрация";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/settings'] = "Редактирование настроек";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/users_list'] = "Управление пользователями";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/profile'] = "Просмотр профиля пользователей";$v1e48ab2454d1b1b374ca4a649d05b1f7 = Array();$v1e48ab2454d1b1b374ca4a649d05b1f7['cms_permissions'] = <<<SQL

CREATE TABLE cms_permissions(
id		INT		NOT NULL	PRIMARY KEY	AUTO_INCREMENT,
module		VARCHAR(64)	DEFAULT NULL,
method		VARCHAR(64)	DEFAULT NULL,
owner_id	INT		DEFAULT NULL,
allow		TINYINT		DEFAULT '1',
KEY(module), KEY(method), KEY(owner_id)
)

SQL;?>