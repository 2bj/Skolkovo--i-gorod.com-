<?php
 class CreateBranchTableAction extends atomicAction {protected $hierarchyTypeId, $didTableExisted = false;public function execute() {$this->hierarchyTypeId = $this->getParam('hierarchy-type-id');if(is_numeric($this->hierarchyTypeId) == false) {throw new Exception("Param \"hierarchy-type-id\" must be numeric");}$this->checkIfTableExists($this->hierarchyTypeId);$this->createBranchTable($this->hierarchyTypeId);}public function rollback() {if($this->didTableExisted == false) {$this->dropBranchTable($this->hierarchyTypeId);}}protected function createBranchTable($vacf567c9c3d6cf7c6e2cc0ce108e0631) {$v958a0b05bca2609f7f255d48df986c7c = "cms3_object_content";$vcda36002b56bb226dc93d3af6686772f = "cms3_object_content_" . $vacf567c9c3d6cf7c6e2cc0ce108e0631;$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
CREATE TABLE `{$vcda36002b56bb226dc93d3af6686772f}` LIKE `{$v958a0b05bca2609f7f255d48df986c7c}`
SQL;
ALTER TABLE `{$vcda36002b56bb226dc93d3af6686772f}` ADD CONSTRAINT `FK_Content to object relation {$vacf567c9c3d6cf7c6e2cc0ce108e0631}` FOREIGN KEY (`obj_id`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
SQL;
ALTER TABLE `{$vcda36002b56bb226dc93d3af6686772f}`  ADD CONSTRAINT `FK_content2tree {$vacf567c9c3d6cf7c6e2cc0ce108e0631}` FOREIGN KEY (`tree_val`) REFERENCES `cms3_hierarchy` (`id`) ON DELETE CASCADE
SQL;
ALTER TABLE `{$vcda36002b56bb226dc93d3af6686772f}`  ADD CONSTRAINT `FK_Contents field id relation {$vacf567c9c3d6cf7c6e2cc0ce108e0631}` FOREIGN KEY (`field_id`) REFERENCES `cms3_object_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
SQL;
ALTER TABLE `{$vcda36002b56bb226dc93d3af6686772f}`  ADD CONSTRAINT `FK_Relation value reference {$vacf567c9c3d6cf7c6e2cc0ce108e0631}` FOREIGN KEY (`rel_val`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
SQL;
DROP TABLE IF EXISTS `{$vcda36002b56bb226dc93d3af6686772f}`
SQL;
SHOW TABLES LIKE '{$vcda36002b56bb226dc93d3af6686772f}'
SQL;