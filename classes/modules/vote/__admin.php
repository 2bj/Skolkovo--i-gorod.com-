<?php
 abstract class __vote extends baseModuleAdmin {public function polls() {regedit::getInstance()->setVar("//modules/vote/default_method_admin", "lists");$this->redirect($this->pre_lang . "/admin/vote/lists/");}public function lists() {$this->setDataType("list");$this->setActionType("view");if($this->ifNotXmlMode()) return $this->doData();$vaa9f73eea60a006820d0f8768bc8a3fc = 20;$ve1ba980ce14a8c0d7e2779f895ab8695 = (int) getRequest('p');$v7a86c157ee9713c34fbd7a1ee40f0c5a = $vaa9f73eea60a006820d0f8768bc8a3fc * $ve1ba980ce14a8c0d7e2779f895ab8695;$v8be74552df93e31bbdd6b36ed74bdb6a = new selector('pages');$v8be74552df93e31bbdd6b36ed74bdb6a->types('hierarchy-type')->name('vote', 'poll');$v8be74552df93e31bbdd6b36ed74bdb6a->limit($v7a86c157ee9713c34fbd7a1ee40f0c5a, $vaa9f73eea60a006820d0f8768bc8a3fc);selectorHelper::detectFilters($v8be74552df93e31bbdd6b36ed74bdb6a);$this->setDataRange($vaa9f73eea60a006820d0f8768bc8a3fc, $v7a86c157ee9713c34fbd7a1ee40f0c5a);$v8d777f385d3dfec8815d20f7496026dc = $this->prepareData($v8be74552df93e31bbdd6b36ed74bdb6a->result, "pages");$this->setData($v8d777f385d3dfec8815d20f7496026dc, $v8be74552df93e31bbdd6b36ed74bdb6a->length);return $this->doData();}public function add() {$vd0e45878043844ffc41aac437e86b602 = (int)    getRequest("param0");$v15d61712450a686a7f365adf4fef581f   = (string) getRequest("param1");$ve62e4d22f2d8630f6e44e2b7c3f70ddc = Array("type"   => 'poll',          "parent"  => null,          'type-id' => getRequest('type-id'),           "allowed-element-types" => Array('poll'));if($v15d61712450a686a7f365adf4fef581f == "do") {$this->saveAddedElementData($ve62e4d22f2d8630f6e44e2b7c3f70ddc);$this->chooseRedirect();}$this->setDataType("form");$this->setActionType("create");$v8d777f385d3dfec8815d20f7496026dc = $this->prepareData($ve62e4d22f2d8630f6e44e2b7c3f70ddc, "page");$this->setData($v8d777f385d3dfec8815d20f7496026dc);return $this->doData();}public function edit() {$v8e2dcfd7e7e24b1ca76c1193f645902b = $this->expectElement("param0");$v15d61712450a686a7f365adf4fef581f = (string) getRequest('param1');$ve62e4d22f2d8630f6e44e2b7c3f70ddc = Array("element" => $v8e2dcfd7e7e24b1ca76c1193f645902b,                                         "allowed-element-types" => Array('poll'));if($v15d61712450a686a7f365adf4fef581f == "do") {if(isset($_REQUEST['data']['new'])) {unset($_REQUEST['data']['new']);}$this->saveEditedElementData($ve62e4d22f2d8630f6e44e2b7c3f70ddc);$this->chooseRedirect();}$this->setDataType("form");$this->setActionType("modify");$v8d777f385d3dfec8815d20f7496026dc = $this->prepareData($ve62e4d22f2d8630f6e44e2b7c3f70ddc, "page");$this->setData($v8d777f385d3dfec8815d20f7496026dc);return $this->doData();}public function del() {$v6a7f245843454cf4f28ad7c5e2572aa2 = getRequest('element');if(!is_array($v6a7f245843454cf4f28ad7c5e2572aa2)) {$v6a7f245843454cf4f28ad7c5e2572aa2 = Array($v6a7f245843454cf4f28ad7c5e2572aa2);}foreach($v6a7f245843454cf4f28ad7c5e2572aa2 as $v7552cd149af7495ee7d8225974e50f80) {$v8e2dcfd7e7e24b1ca76c1193f645902b = $this->expectElement($v7552cd149af7495ee7d8225974e50f80, false, true);$v21ffce5b8a6cc8cc6a41448dd69623c9 = Array(     "element" => $v8e2dcfd7e7e24b1ca76c1193f645902b,     "allowed-element-types" => Array('poll')    );$this->deleteElement($v21ffce5b8a6cc8cc6a41448dd69623c9);}$this->setDataType("list");$this->setActionType("view");$v8d777f385d3dfec8815d20f7496026dc = $this->prepareData($v6a7f245843454cf4f28ad7c5e2572aa2, "pages");$this->setData($v8d777f385d3dfec8815d20f7496026dc);return $this->doData();}public function activity() {$v6a7f245843454cf4f28ad7c5e2572aa2 = getRequest('element');if(!is_array($v6a7f245843454cf4f28ad7c5e2572aa2)) {$v6a7f245843454cf4f28ad7c5e2572aa2 = Array($v6a7f245843454cf4f28ad7c5e2572aa2);}$v4264c638e0098acb172519b0436db099 = getRequest('active');foreach($v6a7f245843454cf4f28ad7c5e2572aa2 as $v7552cd149af7495ee7d8225974e50f80) {$v8e2dcfd7e7e24b1ca76c1193f645902b = $this->expectElement($v7552cd149af7495ee7d8225974e50f80, false, true);$v21ffce5b8a6cc8cc6a41448dd69623c9 = Array(     "element" => $v8e2dcfd7e7e24b1ca76c1193f645902b,     "allowed-element-types" => Array('poll'),     "activity" => $v4264c638e0098acb172519b0436db099    );$this->switchActivity($v21ffce5b8a6cc8cc6a41448dd69623c9);$v8e2dcfd7e7e24b1ca76c1193f645902b->commit();}$this->setDataType("list");$this->setActionType("view");$v8d777f385d3dfec8815d20f7496026dc = $this->prepareData($v6a7f245843454cf4f28ad7c5e2572aa2, "pages");$this->setData($v8d777f385d3dfec8815d20f7496026dc);return $this->doData();}public function answers_list() {$v8e2dcfd7e7e24b1ca76c1193f645902b = $this->expectElement('param0');$v15d61712450a686a7f365adf4fef581f    = (string) getRequest('param1');if(!($v8e2dcfd7e7e24b1ca76c1193f645902b instanceof umiHierarchyElement)) {$vde4a7efe6d3b7d10fba90c97414419fd = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n".        "<error>".getLabel('error_save_page_first')."</error>";die($vde4a7efe6d3b7d10fba90c97414419fd);}$v50f52fdd86acafd4af8f5a02da2af0b8   = $v8e2dcfd7e7e24b1ca76c1193f645902b->getValue('answers');$va8cfde6331bd59eb2ac96f8911c4b666  = $v8e2dcfd7e7e24b1ca76c1193f645902b->getObject()->getId();$v94757cae63fd3e398c0811a976dd6bbe = umiObjectTypesCollection::getInstance()->getBaseType("vote", "poll_item");if($v15d61712450a686a7f365adf4fef581f == "do") {$v21ffce5b8a6cc8cc6a41448dd69623c9 = array("type_id" => $v94757cae63fd3e398c0811a976dd6bbe);$v2e1757962c18ea73e27e98e0b62a43a0 = $this->saveEditedList("objects", $v21ffce5b8a6cc8cc6a41448dd69623c9);if($v2e1757962c18ea73e27e98e0b62a43a0 !== false) {$v50f52fdd86acafd4af8f5a02da2af0b8[] = $v2e1757962c18ea73e27e98e0b62a43a0;$v8e2dcfd7e7e24b1ca76c1193f645902b->setValue('answers',$v50f52fdd86acafd4af8f5a02da2af0b8);}$vcc86ffa55f0ab6b9ddbf32c1a3d24d67 = getRequest("dels");if(is_array($vcc86ffa55f0ab6b9ddbf32c1a3d24d67)) {foreach($vcc86ffa55f0ab6b9ddbf32c1a3d24d67 as $vb80bb7740288fda1f201890375a60c8f) {$v3c6e0b8a9c15224a8228b9a98ca1531d = array_search($vb80bb7740288fda1f201890375a60c8f, $v50f52fdd86acafd4af8f5a02da2af0b8);unset($v50f52fdd86acafd4af8f5a02da2af0b8[$v3c6e0b8a9c15224a8228b9a98ca1531d]);}$v50f52fdd86acafd4af8f5a02da2af0b8 = array_values($v50f52fdd86acafd4af8f5a02da2af0b8);$v8e2dcfd7e7e24b1ca76c1193f645902b->setValue('answers',$v50f52fdd86acafd4af8f5a02da2af0b8);}$v8e2dcfd7e7e24b1ca76c1193f645902b->commit();}$this->setDataType("list");$this->setActionType("modify");$v8d777f385d3dfec8815d20f7496026dc = $this->prepareData($v50f52fdd86acafd4af8f5a02da2af0b8, "objects");$v8d777f385d3dfec8815d20f7496026dc['attribute:object_id'] = $va8cfde6331bd59eb2ac96f8911c4b666;$this->setData($v8d777f385d3dfec8815d20f7496026dc);return $this->doData();}public function getEditLink($v7057e8409c7c531a1a6e9ac3df4ed549, $vb8910fa4dc8f637c214b8e9094ef35b9) {$v8e2dcfd7e7e24b1ca76c1193f645902b = umiHierarchy::getInstance()->getElement($v7057e8409c7c531a1a6e9ac3df4ed549);$v6be379826b20cc58475f636e33f4606b = $v8e2dcfd7e7e24b1ca76c1193f645902b->getParentId();switch($vb8910fa4dc8f637c214b8e9094ef35b9) {case "poll": {$v441c674b4099be68caf8fb0f7ff47e3e = $this->pre_lang . "/admin/vote/edit/{$v7057e8409c7c531a1a6e9ac3df4ed549}/";return Array(false, $v441c674b4099be68caf8fb0f7ff47e3e);break;}default: {return false;}}}public function resetUserRatedPages($ve8701ad48ba05a91604e480dd60899a3 = null) {if (is_null($ve8701ad48ba05a91604e480dd60899a3)) $ve8701ad48ba05a91604e480dd60899a3 = getRequest("param0");$vee11cbb19052e40b07aac0ca060c23ee = umiObjectsCollection::getInstance()->getObject($ve8701ad48ba05a91604e480dd60899a3);if ($vee11cbb19052e40b07aac0ca060c23ee instanceof umiObject) {$vee11cbb19052e40b07aac0ca060c23ee->setValue("rated_pages", array());$vee11cbb19052e40b07aac0ca060c23ee->commit();}$this->chooseRedirect();}public function config() {$vb1444fb0c07653567ad325aa25d4e37a = regedit::getInstance();$v21ffce5b8a6cc8cc6a41448dd69623c9 = Array (     "config" => Array ( "bool:is_private" => false,         "bool:is_graded"  => false         )   );$v15d61712450a686a7f365adf4fef581f = getRequest("param0");if ($v15d61712450a686a7f365adf4fef581f == "do"){$v21ffce5b8a6cc8cc6a41448dd69623c9 = $this->expectParams($v21ffce5b8a6cc8cc6a41448dd69623c9);$vb1444fb0c07653567ad325aa25d4e37a->setVar("//modules/vote/is_private", (int) $v21ffce5b8a6cc8cc6a41448dd69623c9["config"]["bool:is_private"]);$vb1444fb0c07653567ad325aa25d4e37a->setVar("//modules/vote/is_graded", (int) $v21ffce5b8a6cc8cc6a41448dd69623c9["config"]["bool:is_graded"]);$this->chooseRedirect();}$v21ffce5b8a6cc8cc6a41448dd69623c9["config"]["bool:is_private"] = (bool) $vb1444fb0c07653567ad325aa25d4e37a->getVal("//modules/vote/is_private");$v21ffce5b8a6cc8cc6a41448dd69623c9["config"]["bool:is_graded"] = (bool) $vb1444fb0c07653567ad325aa25d4e37a->getVal("//modules/vote/is_graded");$this->setDataType("settings");$this->setActionType("modify");$v8d777f385d3dfec8815d20f7496026dc = $this->prepareData($v21ffce5b8a6cc8cc6a41448dd69623c9, "settings");$this->setData($v8d777f385d3dfec8815d20f7496026dc);return $this->doData();}public function getDatasetConfiguration($veca07335a33c5aeb5e1bc7c98b4b9d80 = '') {return array(     'methods' => array(      array('title'=>getLabel('smc-load'), 'forload'=>true,     'module'=>'vote', '#__name'=>'lists'),      array('title'=>getLabel('smc-delete'),           'module'=>'vote', '#__name'=>'del', 'aliases' => 'tree_delete_element,delete,del'),      array('title'=>getLabel('smc-activity'),    'module'=>'vote', '#__name'=>'activity', 'aliases' => 'tree_set_activity,activity'),      array('title'=>getLabel('smc-copy'), 'module'=>'content', '#__name'=>'tree_copy_element'),      array('title'=>getLabel('smc-move'),       'module'=>'content', '#__name'=>'tree_move_element'),      array('title'=>getLabel('smc-change-template'),        'module'=>'content', '#__name'=>'change_template'),      array('title'=>getLabel('smc-change-lang'),       'module'=>'content', '#__name'=>'move_to_lang')),     'types' => array(      array('common' => 'true', 'id' => 'poll')     ),     'stoplist' => array('title', 'h1', 'meta_keywords', 'meta_descriptions', 'menu_pic_ua', 'menu_pic_a', 'header_pic', 'more_params', 'robots_deny', 'is_unindexed', 'store_amounts', 'locktime', 'lockuser', 'rate_voters', 'rate_sum', 'total_count'),     'default' => 'question[170px]'    );}};?>