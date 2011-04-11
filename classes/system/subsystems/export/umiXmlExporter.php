<?php
 class umiXmlExporter implements iUmiXmlExporter {private $objects, $elements, $dump, $source_id;public function __construct() {$this->source_id =  umiImportRelations::getInstance()->addNewSource(strtoupper(md5($this->getSiteName())));}public function setElements($v0565942fb39be0978d5774cfa5320fcb) {if(is_array($v0565942fb39be0978d5774cfa5320fcb)) {foreach ($v0565942fb39be0978d5774cfa5320fcb as $v65c10911d8b8591219a21ebacf46da01) $this->elements[] = ($v65c10911d8b8591219a21ebacf46da01 instanceof umiHierarchyElement) ? $v65c10911d8b8591219a21ebacf46da01->getId() : $v65c10911d8b8591219a21ebacf46da01;$this->fillObjects($this->elements);return true;}else {trigger_error("First argument must be an array.", E_USER_WARNING);return false;}}public function setObjects($v96c3e113f86dfac469d4412a3a3b2517) {if(is_array($v96c3e113f86dfac469d4412a3a3b2517)) {foreach ($v96c3e113f86dfac469d4412a3a3b2517 as $vbe8f80182e0c983916da7338c2c1c040) $this->objects[] = ($vbe8f80182e0c983916da7338c2c1c040 instanceof umiObject) ? $vbe8f80182e0c983916da7338c2c1c040->getId() : $vbe8f80182e0c983916da7338c2c1c040;return true;}else {trigger_error("First argument must be an array.", E_USER_WARNING);return false;}}public function run() {if (is_array($this->elements)) {$v6a7f245843454cf4f28ad7c5e2572aa2 = $this->parseElements();}else {$v6a7f245843454cf4f28ad7c5e2572aa2 = "";}$v5891da2d64975cae48d175d1e001f5da = $this->parseObjects();$vad5f82e879a9c5d6b5b442eb37e50551  = $this->getDomainPath() . "/";$v08b89d3caec7cf7e0564ae3bf9683308 = $this->getSiteName();$v0afd9202ba86aa11ce63ad7007e7990b = strtoupper(md5($v08b89d3caec7cf7e0564ae3bf9683308));$v5dc123223f4465124f5eab5e97d72725 = new umiDate(time());$vd1701d1bb6704c552b420dae7dd7f10b = $v5dc123223f4465124f5eab5e97d72725->getFormattedDate("U");$ve9a61fb3cc6ea8c818ee0df10f5a8347  = $v5dc123223f4465124f5eab5e97d72725->getFormattedDate("r");$ve76021b36d9fe4320c6fa8690f158a5a  = $v5dc123223f4465124f5eab5e97d72725->getFormattedDate(DATE_ATOM);$vb9ef165b255673dde47bff07f4390fb1 = '<' . '?xml version="1.0" encoding="utf-8"?' . '>';$vb9ef165b255673dde47bff07f4390fb1 .= <<<END

<umicmsDump>
	<siteName><![CDATA[{$v08b89d3caec7cf7e0564ae3bf9683308}]]></siteName>
	<domain>{$vad5f82e879a9c5d6b5b442eb37e50551}</domain>
	<sourceId><![CDATA[{$v0afd9202ba86aa11ce63ad7007e7990b}]]></sourceId>

	<generateTime>
			<timestamp><![CDATA[{$vd1701d1bb6704c552b420dae7dd7f10b}]]></timestamp>
			<RFC><![CDATA[{$ve9a61fb3cc6ea8c818ee0df10f5a8347}]]></RFC>
			<UTC><![CDATA[{$ve76021b36d9fe4320c6fa8690f158a5a}]]></UTC>
	</generateTime>

{$v6a7f245843454cf4f28ad7c5e2572aa2}

{$v5891da2d64975cae48d175d1e001f5da}

</umicmsDump>
END;$this->dump = $vb9ef165b255673dde47bff07f4390fb1;}public function getResultFile() {return $this->dump;}public function saveResultFile($v6a2a431fe8b621037ea949531c28551d) {file_put_contents($v6a2a431fe8b621037ea949531c28551d, $this->dump);chmod($v6a2a431fe8b621037ea949531c28551d, 0777);}protected function parseObjects() {$v5891da2d64975cae48d175d1e001f5da = "";static $vcf9f3fde7326f1d8e64205f0e07a3695 = 0;if(is_null($this->objects)) {return $v5891da2d64975cae48d175d1e001f5da;}foreach ($this->objects as $v865c0c0b4ab0e063e5caa3387c1a8741 => $vaf31437ce61345f416579830a98c91e5){$v5891da2d64975cae48d175d1e001f5da .= $this->parseObject($vaf31437ce61345f416579830a98c91e5);umiObjectsCollection::getInstance()->unloadObject($vaf31437ce61345f416579830a98c91e5);}return $v5891da2d64975cae48d175d1e001f5da;}protected function parseObject($vaf31437ce61345f416579830a98c91e5) {if(!($va8cfde6331bd59eb2ac96f8911c4b666 = umiObjectsCollection::getInstance()->getObject($vaf31437ce61345f416579830a98c91e5))) {trigger_error("Can't load object #{$vaf31437ce61345f416579830a98c91e5}", E_USER_WARNING);return false;}$v8aa5703199edd89cb7041c8f375f2c0e  = $va8cfde6331bd59eb2ac96f8911c4b666->getName();$v87306dd4235ed712ebc07fe169b76f83  = $va8cfde6331bd59eb2ac96f8911c4b666->getTypeId();$v975a727c9c61eaed4d1a08613b177ca8 = (int) $va8cfde6331bd59eb2ac96f8911c4b666->getIsLocked();$v267678086336c1646720ce11b42efe04 = $this->parsePropertyBlocks($va8cfde6331bd59eb2ac96f8911c4b666);$vd59a2244b2acdab008cbf3397e3f376a = $this->parseStoresBlock($va8cfde6331bd59eb2ac96f8911c4b666);$vda7a81e962241a2c5e2471dde07172ad = <<<END
	<object id="{$vaf31437ce61345f416579830a98c91e5}" typeId="{$v87306dd4235ed712ebc07fe169b76f83}" isLocked="{$v975a727c9c61eaed4d1a08613b177ca8}">
		<name><![CDATA[{$v8aa5703199edd89cb7041c8f375f2c0e}]]></name>

{$v267678086336c1646720ce11b42efe04}
{$vd59a2244b2acdab008cbf3397e3f376a}

	</object>


END;   unset($v267678086336c1646720ce11b42efe04);unset($va8cfde6331bd59eb2ac96f8911c4b666);return $vda7a81e962241a2c5e2471dde07172ad;}protected function parsePropertyBlocks(umiObject $va8cfde6331bd59eb2ac96f8911c4b666) {$v87306dd4235ed712ebc07fe169b76f83 = $va8cfde6331bd59eb2ac96f8911c4b666->getTypeId();if(!$v87306dd4235ed712ebc07fe169b76f83) return false;$v7ae7003da59ae71dcc9f8638ef50593d = umiObjectTypesCollection::getInstance()->getType($v87306dd4235ed712ebc07fe169b76f83);$v1471e4e05a4db95d353cc867fe317314 = $v7ae7003da59ae71dcc9f8638ef50593d->getFieldsGroupsList();$v1ec69b8024b343837d05dd646df226fc = "";foreach($v1471e4e05a4db95d353cc867fe317314 as $vdb0f6f37ebeb6ea09489124345af2a45) {$veeeb23fbd23e52a6a6ff78b9f18cbc4e  = $vdb0f6f37ebeb6ea09489124345af2a45->getName();$vd7362b6e3ba1f2a7c022a9d864601ecc  = $vdb0f6f37ebeb6ea09489124345af2a45->getTitle();$v2705faa7cf2cc5a2ad39111317b9cb84 = (int) $vdb0f6f37ebeb6ea09489124345af2a45->getIsLocked();$v5c836eaf9a3ec923fc13d2784e3168e9 = (int) $vdb0f6f37ebeb6ea09489124345af2a45->getIsVisible();if (in_array($veeeb23fbd23e52a6a6ff78b9f18cbc4e, array("locks", "rate_voters"))) {continue;}$v9ff69144c9c536063fb2753e2242da46 = $this->parseProperty($va8cfde6331bd59eb2ac96f8911c4b666, $vdb0f6f37ebeb6ea09489124345af2a45);$v1ec69b8024b343837d05dd646df226fc .= <<<END
		<propertiesBlock isLocked="{$v2705faa7cf2cc5a2ad39111317b9cb84}" isPublic="{$v5c836eaf9a3ec923fc13d2784e3168e9}">
			<name><![CDATA[{$veeeb23fbd23e52a6a6ff78b9f18cbc4e}]]></name>
			<title><![CDATA[{$vd7362b6e3ba1f2a7c022a9d864601ecc}]]></title>

{$v9ff69144c9c536063fb2753e2242da46}
		</propertiesBlock>


END;   unset($v9ff69144c9c536063fb2753e2242da46);}unset($v1471e4e05a4db95d353cc867fe317314);return $v1ec69b8024b343837d05dd646df226fc;}protected function parseStoresBlock(umiObject $va8cfde6331bd59eb2ac96f8911c4b666) {$v54ee9af2cf1cf33279404c601e2841a1 = $va8cfde6331bd59eb2ac96f8911c4b666->getValue("store_amounts");$vfbd79507bfe8e92ae14ee624160ad6d2 = umiObjectsCollection::getInstance();if(is_array($v54ee9af2cf1cf33279404c601e2841a1)) {$v61af09f34bc001f3b6d9139687a723fd = "";foreach($v54ee9af2cf1cf33279404c601e2841a1 as $vf00bed6045b135e90e5197e7d1e37941) {$vcc39dcf1a23d955276228b460fc4aabc = $vfbd79507bfe8e92ae14ee624160ad6d2->getObject($vf00bed6045b135e90e5197e7d1e37941);if (!$vcc39dcf1a23d955276228b460fc4aabc instanceof umiObject) continue;$v7473547c72c42fe58cd6ddf3e925b22b = $vcc39dcf1a23d955276228b460fc4aabc->getValue("store_id");$v8cd892b7b97ef9489ae4479d3f4ef0fc = $vfbd79507bfe8e92ae14ee624160ad6d2->getObject($v7473547c72c42fe58cd6ddf3e925b22b);if (!$v8cd892b7b97ef9489ae4479d3f4ef0fc instanceof umiObject) continue;$vb7cd129c427cf6ae86798630b98d06aa = $v8cd892b7b97ef9489ae4479d3f4ef0fc->getName();$ve9f40e1f1d1658681dad2dac4ae0971e = $vcc39dcf1a23d955276228b460fc4aabc->getValue("amount");$v61af09f34bc001f3b6d9139687a723fd .= <<<END

						<store id="{$vb7cd129c427cf6ae86798630b98d06aa}">
							<amount>{$ve9f40e1f1d1658681dad2dac4ae0971e}</amount>
						</store>

END;    }return <<<END
					<storesBlock>
						{$v61af09f34bc001f3b6d9139687a723fd}
					</storesBlock>
END;   }return "";}protected function parseProperty(umiObject $va8cfde6331bd59eb2ac96f8911c4b666, umiFieldsGroup $vdb0f6f37ebeb6ea09489124345af2a45) {$v74693d2fc58b46bd06410f278e39aa71 = "";$vd05b6ed7d2345020440df396d6da7f73 = $vdb0f6f37ebeb6ea09489124345af2a45->getFields();foreach($vd05b6ed7d2345020440df396d6da7f73 as $v06e3d36fa30cea095545139854ad1fb9) {$v73f329f154a663bfda020aadcdd0b775  = $v06e3d36fa30cea095545139854ad1fb9->getName();$v133479bebf56554d434d59f53992e221  = $v06e3d36fa30cea095545139854ad1fb9->getTitle();$v5d17718c024b76565e2df33fced306ea  = $v06e3d36fa30cea095545139854ad1fb9->getTip();$ve2763042762c80c9a6b0be4da2cbe6f2 = (int) $v06e3d36fa30cea095545139854ad1fb9->getIsLocked();$v2dda6d1dda7c17f80b9a8f3e1bae58f9 = (int) $v06e3d36fa30cea095545139854ad1fb9->getIsVisible();$v4302d2aed2186d4c573c94c3833e5ea6 = (int) $v06e3d36fa30cea095545139854ad1fb9->getIsInSearch();$vde794a8a1ac8e400923460b137ddac76 = (int) $v06e3d36fa30cea095545139854ad1fb9->getIsInFilter();$v9e670cc5a0728bf2df6a7753fc9a40f4  = $v06e3d36fa30cea095545139854ad1fb9->getGuideId();$v519504d7d4beb745dac24ccfb6c1d7c9  = $v06e3d36fa30cea095545139854ad1fb9->getFieldType();$v5c4e252909242b24243818048235620d = (int) $v519504d7d4beb745dac24ccfb6c1d7c9->getIsMultiple();$v983560f49ede87197144b22c810a5087 = (string) $v519504d7d4beb745dac24ccfb6c1d7c9->getDataType();$vf09cc7ee3a9a93273f4b80601cafb00c = $this->parseValues($va8cfde6331bd59eb2ac96f8911c4b666, $v06e3d36fa30cea095545139854ad1fb9);$v74693d2fc58b46bd06410f278e39aa71 .= <<<END

			<property isLocked="{$ve2763042762c80c9a6b0be4da2cbe6f2}" isPublic="{$v2dda6d1dda7c17f80b9a8f3e1bae58f9}">
				<name><![CDATA[{$v73f329f154a663bfda020aadcdd0b775}]]></name>
				<title><![CDATA[{$v133479bebf56554d434d59f53992e221}]]></title>

				<fieldType><![CDATA[{$v983560f49ede87197144b22c810a5087}]]></fieldType>
				<isMultiple>{$v5c4e252909242b24243818048235620d}</isMultiple>
				<isIndexed>{$v4302d2aed2186d4c573c94c3833e5ea6}</isIndexed>
				<isFilterable>{$vde794a8a1ac8e400923460b137ddac76}</isFilterable>

				<guideId>{$v9e670cc5a0728bf2df6a7753fc9a40f4}</guideId>

				<tip><![CDATA[{$v5d17718c024b76565e2df33fced306ea}]]></tip>

				<values>
{$vf09cc7ee3a9a93273f4b80601cafb00c}
				</values>
			</property>
END;    unset($vf09cc7ee3a9a93273f4b80601cafb00c);}unset($vd05b6ed7d2345020440df396d6da7f73);return $v74693d2fc58b46bd06410f278e39aa71;}protected function parseValues(umiObject $va8cfde6331bd59eb2ac96f8911c4b666, umiField $v06e3d36fa30cea095545139854ad1fb9) {$v519504d7d4beb745dac24ccfb6c1d7c9  = $v06e3d36fa30cea095545139854ad1fb9->getFieldType();$v5c4e252909242b24243818048235620d = (int) $v519504d7d4beb745dac24ccfb6c1d7c9->getIsMultiple();$v983560f49ede87197144b22c810a5087 = (string) $v519504d7d4beb745dac24ccfb6c1d7c9->getDataType();$vf09cc7ee3a9a93273f4b80601cafb00c = $va8cfde6331bd59eb2ac96f8911c4b666->getValue($v06e3d36fa30cea095545139854ad1fb9->getName());$vf09cc7ee3a9a93273f4b80601cafb00c = (is_array($vf09cc7ee3a9a93273f4b80601cafb00c)) ? $vf09cc7ee3a9a93273f4b80601cafb00c : Array($vf09cc7ee3a9a93273f4b80601cafb00c);switch($v983560f49ede87197144b22c810a5087) {case "img_file": {$vde5b1cd11c4544e7f3fe792f2e0d8b8b = Array();foreach($vf09cc7ee3a9a93273f4b80601cafb00c as $vf19e92e810d08b6cf2d0265b779064d9) {if(!$vf19e92e810d08b6cf2d0265b779064d9) continue;$vde5b1cd11c4544e7f3fe792f2e0d8b8b[] = Array (          "value" => $vf19e92e810d08b6cf2d0265b779064d9->getFilePath()         );}break;}case "relation": {$vde5b1cd11c4544e7f3fe792f2e0d8b8b = Array();foreach($vf09cc7ee3a9a93273f4b80601cafb00c as $vf19e92e810d08b6cf2d0265b779064d9) {$vf19e92e810d08b6cf2d0265b779064d9 = umiObjectsCollection::getInstance()->getObject($vf19e92e810d08b6cf2d0265b779064d9);if(!$vf19e92e810d08b6cf2d0265b779064d9) continue;$v818ad5ef6588e140ecb9f81e810c028a = $vf19e92e810d08b6cf2d0265b779064d9->getId();if(!in_array($v818ad5ef6588e140ecb9f81e810c028a, $this->objects)) {$this->objects[] = $v818ad5ef6588e140ecb9f81e810c028a;}$vde5b1cd11c4544e7f3fe792f2e0d8b8b[] = Array (          "value" => $vf19e92e810d08b6cf2d0265b779064d9->getName(),          "id" => $vf19e92e810d08b6cf2d0265b779064d9->getId()         );}break;}case "symlink": {$vde5b1cd11c4544e7f3fe792f2e0d8b8b = Array();foreach($vf09cc7ee3a9a93273f4b80601cafb00c as $vf19e92e810d08b6cf2d0265b779064d9) {if(!$vf19e92e810d08b6cf2d0265b779064d9) continue;$vde5b1cd11c4544e7f3fe792f2e0d8b8b[] = Array (          "value" => $vf19e92e810d08b6cf2d0265b779064d9->getName(),          "id" => $vf19e92e810d08b6cf2d0265b779064d9->getId(),          "link" => $this->getDomainPath() . umiHierarchy::getInstance()->getPathById($vf19e92e810d08b6cf2d0265b779064d9->getId())         );}break;}case "date": {$vde5b1cd11c4544e7f3fe792f2e0d8b8b = Array();foreach($vf09cc7ee3a9a93273f4b80601cafb00c as $vf19e92e810d08b6cf2d0265b779064d9) {if(!$vf19e92e810d08b6cf2d0265b779064d9) continue;$vde5b1cd11c4544e7f3fe792f2e0d8b8b[] = Array (          "timestamp" => $vf19e92e810d08b6cf2d0265b779064d9->getFormattedDate("U"),          "RFC"  => $vf19e92e810d08b6cf2d0265b779064d9->getFormattedDate("r"),          "UTC"  => $vf19e92e810d08b6cf2d0265b779064d9->getFormattedDate(DATE_ATOM)         );}break;}default: {$vde5b1cd11c4544e7f3fe792f2e0d8b8b = Array();foreach($vf09cc7ee3a9a93273f4b80601cafb00c as $vf19e92e810d08b6cf2d0265b779064d9) {$vde5b1cd11c4544e7f3fe792f2e0d8b8b[] = Array (          "value" => $vf19e92e810d08b6cf2d0265b779064d9,          "id" => NULL         );}break;}}$vf09cc7ee3a9a93273f4b80601cafb00c = "";foreach($vde5b1cd11c4544e7f3fe792f2e0d8b8b as $v3a6d0284e743dc4a9b86f97d6dd1a3bf) {if(array_key_exists('value',$v3a6d0284e743dc4a9b86f97d6dd1a3bf)) $v2063c1608d6e0baf80249c42e2be5804 = $v3a6d0284e743dc4a9b86f97d6dd1a3bf['value'];if(array_key_exists('id',$v3a6d0284e743dc4a9b86f97d6dd1a3bf)) {if(array_key_exists('timestamp',$v3a6d0284e743dc4a9b86f97d6dd1a3bf)) {$vf09cc7ee3a9a93273f4b80601cafb00c .= <<<END
							<value>
								<timestamp><![CDATA[{$v3a6d0284e743dc4a9b86f97d6dd1a3bf['timestamp']}]]></timestamp>
								<RFC><![CDATA[{$v3a6d0284e743dc4a9b86f97d6dd1a3bf['RFC']}]]></RFC>
								<UTC><![CDATA[{$v3a6d0284e743dc4a9b86f97d6dd1a3bf['UTC']}]]></UTC>
							</value>

END;     }else {$v7ffc4d510260a8544e5550e62ec56bc1 = !is_null($v3a6d0284e743dc4a9b86f97d6dd1a3bf['id']) ? ' id="' . $v3a6d0284e743dc4a9b86f97d6dd1a3bf['id'] . '"' : '';$vf09cc7ee3a9a93273f4b80601cafb00c .= <<<END
							<value{$v7ffc4d510260a8544e5550e62ec56bc1}><![CDATA[{$v2063c1608d6e0baf80249c42e2be5804}]]></value>

END;     }}else {if(array_key_exists('timestamp',$v3a6d0284e743dc4a9b86f97d6dd1a3bf)) {$vf09cc7ee3a9a93273f4b80601cafb00c .= <<<END
							<value>
								<timestamp><![CDATA[{$v3a6d0284e743dc4a9b86f97d6dd1a3bf['timestamp']}]]></timestamp>
								<RFC><![CDATA[{$v3a6d0284e743dc4a9b86f97d6dd1a3bf['RFC']}]]></RFC>
								<UTC><![CDATA[{$v3a6d0284e743dc4a9b86f97d6dd1a3bf['UTC']}]]></UTC>
							</value>

END;     }else {$vf09cc7ee3a9a93273f4b80601cafb00c .= <<<END
							<value><![CDATA[{$v2063c1608d6e0baf80249c42e2be5804}]]></value>

END;     }if(!array_key_exists('value', $v3a6d0284e743dc4a9b86f97d6dd1a3bf)) continue;if(array_key_exists('timestamp',$v3a6d0284e743dc4a9b86f97d6dd1a3bf)) {$vb80bb7740288fda1f201890375a60c8f = $v3a6d0284e743dc4a9b86f97d6dd1a3bf['id'];$v2a304a1348456ccd2234cd71a81bd338 = array_key_exists("link", $v3a6d0284e743dc4a9b86f97d6dd1a3bf) ? " link=\"{$v3a6d0284e743dc4a9b86f97d6dd1a3bf['link']}\"" : "";$vf09cc7ee3a9a93273f4b80601cafb00c .= <<<END
							<value id="{$vb80bb7740288fda1f201890375a60c8f}"{$v2a304a1348456ccd2234cd71a81bd338}><![CDATA[{$v2063c1608d6e0baf80249c42e2be5804}]]></value>
END;     }}}unset($vde5b1cd11c4544e7f3fe792f2e0d8b8b);return $vf09cc7ee3a9a93273f4b80601cafb00c;}protected function getDomainPath() {return "http://" . $_SERVER['HTTP_HOST'];}protected function getSiteName() {$va072dbbe3bd3b2f40eaf73aa4066ede7 = cmsController::getInstance();$v78e6dd7a49f5b0cb2106a3a434dd5c86     = $va072dbbe3bd3b2f40eaf73aa4066ede7->getCurrentLang()->getId();$v662cbf1253ac7d8750ed9190c52163e5   = $va072dbbe3bd3b2f40eaf73aa4066ede7->getCurrentDomain()->getId();$vb1444fb0c07653567ad325aa25d4e37a     = regedit::getInstance();$vafb1f7fb17bb3e20675433364009e3a9   = $vb1444fb0c07653567ad325aa25d4e37a->getVal("//settings/title_prefix/{$v78e6dd7a49f5b0cb2106a3a434dd5c86}/{$v662cbf1253ac7d8750ed9190c52163e5}");if(strlen($vafb1f7fb17bb3e20675433364009e3a9))    return $vafb1f7fb17bb3e20675433364009e3a9;else    return $vb1444fb0c07653567ad325aa25d4e37a->getVal("//settings/site_name");}protected function fillObjects($v0565942fb39be0978d5774cfa5320fcb) {foreach($v0565942fb39be0978d5774cfa5320fcb as $v7057e8409c7c531a1a6e9ac3df4ed549) {$v8e2dcfd7e7e24b1ca76c1193f645902b = umiHierarchy::getInstance()->getElement($v7057e8409c7c531a1a6e9ac3df4ed549);if (!$v8e2dcfd7e7e24b1ca76c1193f645902b) continue;$vaf31437ce61345f416579830a98c91e5 = $v8e2dcfd7e7e24b1ca76c1193f645902b->getObject()->getId();if(!is_array($this->objects) || !in_array($vaf31437ce61345f416579830a98c91e5, $this->objects)) {$this->objects[] = $vaf31437ce61345f416579830a98c91e5;}}}protected function parseElements() {$v0565942fb39be0978d5774cfa5320fcb = $this->elements;$v6a7f245843454cf4f28ad7c5e2572aa2 = "";$va5d4db7ed95dbef22bdd6bd8036da60a = umiHierarchy::getInstance()->forceAbsolutePath(true);foreach($v0565942fb39be0978d5774cfa5320fcb as $v7057e8409c7c531a1a6e9ac3df4ed549) {$v8e2dcfd7e7e24b1ca76c1193f645902b = umiHierarchy::getInstance()->getElement($v7057e8409c7c531a1a6e9ac3df4ed549);if(!$v8e2dcfd7e7e24b1ca76c1193f645902b) continue;$vb068931cc450442b63f5b3d276ea4297   = $v8e2dcfd7e7e24b1ca76c1193f645902b->getName();$vd84ff935144e00c3e1d395c2379aca47  = $v8e2dcfd7e7e24b1ca76c1193f645902b->getAltName();$v2a304a1348456ccd2234cd71a81bd338   = umiHierarchy::getInstance()->getPathById($v7057e8409c7c531a1a6e9ac3df4ed549);$v6be379826b20cc58475f636e33f4606b  = $v8e2dcfd7e7e24b1ca76c1193f645902b->getParentId();$v0715f6d9497f93911417c9c324265771 = $v8e2dcfd7e7e24b1ca76c1193f645902b->getTypeId();$vb946c44d711ade3b061653732977d043  = umiHierarchyTypesCollection::getInstance()->getType($v0715f6d9497f93911417c9c324265771);$v571927edeba34435dcef63324b2a4f86 = $vb946c44d711ade3b061653732977d043->getTitle();$v5cde3b79e1c913665469de8dc2f1f8b6 = $vb946c44d711ade3b061653732977d043->getName();$v28843f287b7e7d3ee4ad0be8761e325d = $vb946c44d711ade3b061653732977d043->getExt();$vd02e12eb6d6c3f6ebd763197df01e211   = $v8e2dcfd7e7e24b1ca76c1193f645902b->getTplId();$vf9bdb7221804d6d17b654ec67c5a0735  = templatesCollection::getInstance()->getTemplate($vd02e12eb6d6c3f6ebd763197df01e211)->getFilename();$v78e6dd7a49f5b0cb2106a3a434dd5c86  = $v8e2dcfd7e7e24b1ca76c1193f645902b->getLangId();$v7572559ca86e781ba8fe8073a0b725c6   = langsCollection::getInstance()->getLang($v78e6dd7a49f5b0cb2106a3a434dd5c86);$vff8b918bc674d6a658430241e4a74574  = $v7572559ca86e781ba8fe8073a0b725c6->getTitle();$v753527be46567ad90a4203cf4b40d70e  = $v7572559ca86e781ba8fe8073a0b725c6->getPrefix();$v662cbf1253ac7d8750ed9190c52163e5  = $v8e2dcfd7e7e24b1ca76c1193f645902b->getDomainId();$vad5f82e879a9c5d6b5b442eb37e50551   = domainsCollection::getInstance()->getDomain($v662cbf1253ac7d8750ed9190c52163e5);$vf9b9218cbe221f8b9f1292474aa6f3e4  = $vad5f82e879a9c5d6b5b442eb37e50551->getHost();$vaf31437ce61345f416579830a98c91e5  = $v8e2dcfd7e7e24b1ca76c1193f645902b->getObject()->getId();$ve1c6c9ef2fcbe75f26f815c4ef2e60b4  = (int) $v8e2dcfd7e7e24b1ca76c1193f645902b->getIsVisible();$v4264c638e0098acb172519b0436db099  = (int) $v8e2dcfd7e7e24b1ca76c1193f645902b->getIsActive();$v3e04dc2abd929a9d02e2e0fa41d24bf9  = new umiDate($v8e2dcfd7e7e24b1ca76c1193f645902b->getUpdateTime());$v2e10faa7211633841eebf971b7056c0b = $v3e04dc2abd929a9d02e2e0fa41d24bf9->getFormattedDate("U");$vd4f11866a8f58f1071bd3ae29c935c5a  = $v3e04dc2abd929a9d02e2e0fa41d24bf9->getFormattedDate("r");$vc10cb84e1a90ce84ef3ee424c2b1a2ef  = $v3e04dc2abd929a9d02e2e0fa41d24bf9->getFormattedDate(DATE_ATOM);$ve05b19ee2921f914301c26bcc4fc8d5a = umiImportRelations::getInstance()->getNewIdRelation($this->source_id, $v6be379826b20cc58475f636e33f4606b);$ve7398137766d8a8621035454620c1317 = umiImportRelations::getInstance()->getNewIdRelation($this->source_id, $v7057e8409c7c531a1a6e9ac3df4ed549);if ($v7057e8409c7c531a1a6e9ac3df4ed549 && !$ve7398137766d8a8621035454620c1317) {umiImportRelations::getInstance()->setIdRelation($this->source_id, $v7057e8409c7c531a1a6e9ac3df4ed549, $v7057e8409c7c531a1a6e9ac3df4ed549);$ve7398137766d8a8621035454620c1317 = $v7057e8409c7c531a1a6e9ac3df4ed549;}if ($v6be379826b20cc58475f636e33f4606b && !$ve05b19ee2921f914301c26bcc4fc8d5a) {umiImportRelations::getInstance()->setIdRelation($this->source_id, $v6be379826b20cc58475f636e33f4606b, $v6be379826b20cc58475f636e33f4606b);$ve05b19ee2921f914301c26bcc4fc8d5a = $v6be379826b20cc58475f636e33f4606b;}$v6a7f245843454cf4f28ad7c5e2572aa2 .= <<<END
	<element id="{$ve7398137766d8a8621035454620c1317}" parentId="{$ve05b19ee2921f914301c26bcc4fc8d5a}" objectId="{$vaf31437ce61345f416579830a98c91e5}" is_visible="{$ve1c6c9ef2fcbe75f26f815c4ef2e60b4}" is_active="{$v4264c638e0098acb172519b0436db099}">
		<name><![CDATA[{$vb068931cc450442b63f5b3d276ea4297}]]></name>
		<link><![CDATA[{$v2a304a1348456ccd2234cd71a81bd338}]]></link>
		<altName><![CDATA[{$vd84ff935144e00c3e1d395c2379aca47}]]></altName>

		<templateId><![CDATA[{$vd02e12eb6d6c3f6ebd763197df01e211}]]></templateId>
		<templatePath><![CDATA[{$vf9bdb7221804d6d17b654ec67c5a0735}]]></templatePath>
		<lang prefix="{$v753527be46567ad90a4203cf4b40d70e}"><![CDATA[{$vff8b918bc674d6a658430241e4a74574}]]></lang>
		<domain><![CDATA[{$vf9b9218cbe221f8b9f1292474aa6f3e4}]]></domain>

		<behaviour>
			<title><![CDATA[{$v571927edeba34435dcef63324b2a4f86}]]></title>
			<module><![CDATA[{$v5cde3b79e1c913665469de8dc2f1f8b6}]]></module>
			<method><![CDATA[{$v28843f287b7e7d3ee4ad0be8761e325d}]]></method>
		</behaviour>

		<updateTime>
				<timestamp><![CDATA[{$v2e10faa7211633841eebf971b7056c0b}]]></timestamp>
				<RFC><![CDATA[{$vd4f11866a8f58f1071bd3ae29c935c5a}]]></RFC>
				<UTC><![CDATA[{$vc10cb84e1a90ce84ef3ee424c2b1a2ef}]]></UTC>
		</updateTime>
	</element>


END;    unset($v8e2dcfd7e7e24b1ca76c1193f645902b);umiHierarchy::getInstance()->unloadElement($v7057e8409c7c531a1a6e9ac3df4ed549);}umiHierarchy::getInstance()->forceAbsolutePath($va5d4db7ed95dbef22bdd6bd8036da60a);unset($v0565942fb39be0978d5774cfa5320fcb);return $v6a7f245843454cf4f28ad7c5e2572aa2;}};?>
