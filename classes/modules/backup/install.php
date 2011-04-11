<?php
$v551b723eafd6a31d444fcb2f5920fbd3 = Array();$v551b723eafd6a31d444fcb2f5920fbd3['version'] = "2.0.0.0";$v551b723eafd6a31d444fcb2f5920fbd3['version_line'] = "pro";$v551b723eafd6a31d444fcb2f5920fbd3['name'] = "backup";$v551b723eafd6a31d444fcb2f5920fbd3['title'] = "Backups";$v551b723eafd6a31d444fcb2f5920fbd3['description'] = "Module for backuping all updates on site.";$v551b723eafd6a31d444fcb2f5920fbd3['filename'] = "modules/backup/class.php";$v551b723eafd6a31d444fcb2f5920fbd3['config'] = "0";$v551b723eafd6a31d444fcb2f5920fbd3['ico'] = "ico_backup";$v551b723eafd6a31d444fcb2f5920fbd3['default_method'] = "temp_method";$v551b723eafd6a31d444fcb2f5920fbd3['default_method_admin'] = "config";$v551b723eafd6a31d444fcb2f5920fbd3['max_timelimit'] = "30";$v551b723eafd6a31d444fcb2f5920fbd3['max_save_actions'] = "10";$v551b723eafd6a31d444fcb2f5920fbd3['enabled'] = "1";$v551b723eafd6a31d444fcb2f5920fbd3['enabled_sys'] = "1";$v551b723eafd6a31d444fcb2f5920fbd3['max_timelimit_sys'] = "787";$v551b723eafd6a31d444fcb2f5920fbd3['max_save_arch_sys'] = "45";$v551b723eafd6a31d444fcb2f5920fbd3['enabled_files'] = "0";$v551b723eafd6a31d444fcb2f5920fbd3['max_timelimit_files'] = "0";$v551b723eafd6a31d444fcb2f5920fbd3['max_save_arch_files'] = "0";$v551b723eafd6a31d444fcb2f5920fbd3['enabled_img'] = "1";$v551b723eafd6a31d444fcb2f5920fbd3['max_timelimit_img'] = "0";$v551b723eafd6a31d444fcb2f5920fbd3['max_save_arch_img'] = "0";$v551b723eafd6a31d444fcb2f5920fbd3['enabled_tpl'] = "0";$v551b723eafd6a31d444fcb2f5920fbd3['max_timelimit_tpl'] = "0";$v551b723eafd6a31d444fcb2f5920fbd3['max_save_arch_tpl'] = "0";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms'] = "Functions, that should have their own permissions.";$v551b723eafd6a31d444fcb2f5920fbd3['func_perms/config'] = "Настройка";$v1e48ab2454d1b1b374ca4a649d05b1f7['cms_backup_drop'] = "DROP TABLE cms_backup";$v1e48ab2454d1b1b374ca4a649d05b1f7['cms_backup'] = "
CREATE TABLE cms_backup(
id DOUBLE NOT NULL PRIMARY KEY AUTO_INCREMENT,
ctime INT,
changed_module VARCHAR(128),
changed_method VARCHAR(128),
param TEXT,
param0 TEXT,
user_id INT,
is_active INT DEFAULT '0'
) TYPE=InnoDB;
";?>