<?php
 class backupModel extends singleton implements iBackupModel {protected function __construct() {}public static function getInstance() {return parent::getInstance(__CLASS__);}public function getChanges($vf33a4e939ffe21234596860b7249c246 = false, $vcd5b6c7221daa58d6e8c27bd85d9df56 = "", $v4f808c2668c4318a25f5068ad02f465f = "") {if(!regedit::getInstance()->getVal("modules/backup/enabled")) {return false;}$v21ffce5b8a6cc8cc6a41448dd69623c9 = array();if(!$vcd5b6c7221daa58d6e8c27bd85d9df56) {$vcd5b6c7221daa58d6e8c27bd85d9df56 = "content";}if(!$v4f808c2668c4318a25f5068ad02f465f) {$v4f808c2668c4318a25f5068ad02f465f = "edit_page_do";}$vaa9f73eea60a006820d0f8768bc8a3fc = (int) regedit::getInstance()->getVal("//modules/backup/max_save_actions");$vaa9f73eea60a006820d0f8768bc8a3fc -= 1;$vcd5b6c7221daa58d6e8c27bd85d9df56 = mysql_real_escape_string($vcd5b6c7221daa58d6e8c27bd85d9df56);$v4f808c2668c4318a25f5068ad02f465f = mysql_real_escape_string($v4f808c2668c4318a25f5068ad02f465f);$vf33a4e939ffe21234596860b7249c246 = (int) $vf33a4e939ffe21234596860b7249c246;$vac5c74b64b4b8352ef2f181affb5ac2a = "SELECT id, ctime, changed_module, user_id, is_active FROM cms_backup WHERE param='" . $vf33a4e939ffe21234596860b7249c246 . "' GROUP BY param0 ORDER BY ctime DESC";$result = l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);$v4a8a08f09d37b73795649038408b5f33 = 0;$vdf347a373b8f92aa0ae3dd920a5ec2f6 = Array();while(list($v5de09a8d1a309a8103bba960e16f1ab4, $v8c1eddb947fad440954f3c703d4df808, $vcd5b6c7221daa58d6e8c27bd85d9df56, $ve8701ad48ba05a91604e480dd60899a3, $v4264c638e0098acb172519b0436db099) = mysql_fetch_row($result)) {$v8bc182b015e0e0749de8158e4343b3da = Array();$v8bc182b015e0e0749de8158e4343b3da['attribute:changetime'] = $v8c1eddb947fad440954f3c703d4df808;$v8bc182b015e0e0749de8158e4343b3da['attribute:user-id'] = $ve8701ad48ba05a91604e480dd60899a3;if(strlen($vcd5b6c7221daa58d6e8c27bd85d9df56) == 0) {$v8bc182b015e0e0749de8158e4343b3da['attribute:is-void'] = true;}if($v4264c638e0098acb172519b0436db099) {$v8bc182b015e0e0749de8158e4343b3da['attribute:active'] = "active";}$v8bc182b015e0e0749de8158e4343b3da['date'] = new umiDate($v8c1eddb947fad440954f3c703d4df808);$v8bc182b015e0e0749de8158e4343b3da['author'] = selector::get('object')->id($ve8701ad48ba05a91604e480dd60899a3);$v8bc182b015e0e0749de8158e4343b3da['link'] = "/admin/backup/rollback/{$v5de09a8d1a309a8103bba960e16f1ab4}/";$vdf347a373b8f92aa0ae3dd920a5ec2f6[] = $v8bc182b015e0e0749de8158e4343b3da;}$v21ffce5b8a6cc8cc6a41448dd69623c9['nodes:revision'] = $vdf347a373b8f92aa0ae3dd920a5ec2f6;return $v21ffce5b8a6cc8cc6a41448dd69623c9;}public function save($vf33a4e939ffe21234596860b7249c246 = "", $vad0c3358f1a712601256bfc6e9ee9830 = "", $v05dd82e678780573a4af462d35d7f06d = "") {if(!regedit::getInstance()->getVal("//modules/backup/enabled")) return false;if(getRequest('rollbacked')) return false;$v8b1dc169bf460ee884fceef66c6607d6 = cmsController::getInstance();if(!$vad0c3358f1a712601256bfc6e9ee9830) $vad0c3358f1a712601256bfc6e9ee9830 = $v8b1dc169bf460ee884fceef66c6607d6->getCurrentModule();$v05dd82e678780573a4af462d35d7f06d = $v8b1dc169bf460ee884fceef66c6607d6->getCurrentMethod();$v1d0c3e03c46ba6aa6adb5394fecfc396 = ($v8b1dc169bf460ee884fceef66c6607d6->getModule('users')) ? $v1d0c3e03c46ba6aa6adb5394fecfc396 = $v8b1dc169bf460ee884fceef66c6607d6->getModule('users')->user_id : 0;$v8c1eddb947fad440954f3c703d4df808 = time();if(!$vad0c3358f1a712601256bfc6e9ee9830) {$vad0c3358f1a712601256bfc6e9ee9830 = getRequest('module');}if(!$v05dd82e678780573a4af462d35d7f06d) {$v05dd82e678780573a4af462d35d7f06d = getRequest('method');}foreach($_REQUEST as $v7efdfc94655a25dcea3ec85e9bb703fa => $vde3ec0aa2234aa1e3ee275bbc715c6c9) {if($v7efdfc94655a25dcea3ec85e9bb703fa == "save-mode") continue;$_temp[$v7efdfc94655a25dcea3ec85e9bb703fa] = (!is_array($vde3ec0aa2234aa1e3ee275bbc715c6c9)) ? base64_encode($vde3ec0aa2234aa1e3ee275bbc715c6c9) : $vde3ec0aa2234aa1e3ee275bbc715c6c9;}if(isset($_temp['data']['new'])) {$v8e2dcfd7e7e24b1ca76c1193f645902b = umiHierarchy::getInstance()->getElement($vf33a4e939ffe21234596860b7249c246);if($v8e2dcfd7e7e24b1ca76c1193f645902b instanceof umiHierarchyElement) {$_temp['data'][$v8e2dcfd7e7e24b1ca76c1193f645902b->getObjectId()] = $_temp['data']['new'];unset($_temp['data']['new']);}}$vab4d0a658aef644a039b90c2067b45c0 = serialize($_temp);$vab4d0a658aef644a039b90c2067b45c0 = mysql_real_escape_string($vab4d0a658aef644a039b90c2067b45c0);$vac5c74b64b4b8352ef2f181affb5ac2a = "UPDATE cms_backup SET is_active='0' WHERE param='" . $vf33a4e939ffe21234596860b7249c246 . "'";l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
INSERT INTO cms_backup (ctime, changed_module, changed_method, param, param0, user_id, is_active) 
				VALUES('{$v8c1eddb947fad440954f3c703d4df808}', '{$vad0c3358f1a712601256bfc6e9ee9830}', '{$v05dd82e678780573a4af462d35d7f06d}', '{$vf33a4e939ffe21234596860b7249c246}', '{$vab4d0a658aef644a039b90c2067b45c0}', '{$v1d0c3e03c46ba6aa6adb5394fecfc396}', '1')
SQL;