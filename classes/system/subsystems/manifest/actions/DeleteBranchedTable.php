<?php
 class DeleteBranchedTableAction extends atomicAction {public function execute() {$vacf567c9c3d6cf7c6e2cc0ce108e0631 = $this->getParam('hierarchy-type-id');$vcda36002b56bb226dc93d3af6686772f = "cms3_object_content_" . $vacf567c9c3d6cf7c6e2cc0ce108e0631;$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
DROP TABLE IF EXISTS `{$vcda36002b56bb226dc93d3af6686772f}`
SQL;   $this->mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);}public function rollback() {}};?>