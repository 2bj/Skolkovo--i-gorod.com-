<?php
 abstract class translatorWrapper {public $isFull = false;public static $showEmptyFields = false;abstract public function translate($v8d777f385d3dfec8815d20f7496026dc);final static public function get($va8cfde6331bd59eb2ac96f8911c4b666) {if(is_object($va8cfde6331bd59eb2ac96f8911c4b666) == false) {throw new coreException("Object required to apply class translation");}$v6f66e878c62db60568a3487869695820 = self::getClassAlias($va8cfde6331bd59eb2ac96f8911c4b666);if($v7c27535f88bae9519ceb14a8983c57ff = self::loadWrapper($v6f66e878c62db60568a3487869695820)) {return $v7c27535f88bae9519ceb14a8983c57ff;}else {throw new coreException("Can't load translation wrapper for class \"{$v6f66e878c62db60568a3487869695820}\"");}}final static protected function loadWrapper($v6f66e878c62db60568a3487869695820) {static $v2430fe39e225818bd957ed4cb53eb770 = array(), $v2245023265ae4cf87d02c8b6ba991139;if(isset($v2430fe39e225818bd957ed4cb53eb770[$v6f66e878c62db60568a3487869695820])) {return $v2430fe39e225818bd957ed4cb53eb770[$v6f66e878c62db60568a3487869695820];}if(is_null($v2245023265ae4cf87d02c8b6ba991139)) {$v2245023265ae4cf87d02c8b6ba991139 = mainConfiguration::getInstance();}$v47826cacc65c665212b821e6ff80b9b0 = $v2245023265ae4cf87d02c8b6ba991139->includeParam('system.kernel') . 'utils/translators/wrappers/' . $v6f66e878c62db60568a3487869695820 . 'Wrapper.php';if(is_file($v47826cacc65c665212b821e6ff80b9b0) == false) {$v2430fe39e225818bd957ed4cb53eb770[$v6f66e878c62db60568a3487869695820] = false;throw new coreException("Can't load file \"{$v47826cacc65c665212b821e6ff80b9b0}\" to translate object of class \"{$v6f66e878c62db60568a3487869695820}\"");}require $v47826cacc65c665212b821e6ff80b9b0;$v46d111d8fa2089a051889becc4736cc4 = $v6f66e878c62db60568a3487869695820 . 'Wrapper';if(!class_exists($v46d111d8fa2089a051889becc4736cc4)) {$v2430fe39e225818bd957ed4cb53eb770[$v6f66e878c62db60568a3487869695820] = false;throw new coreException("Translation wrapper class \"{$v46d111d8fa2089a051889becc4736cc4}\" not found");}$v7c27535f88bae9519ceb14a8983c57ff = new $v46d111d8fa2089a051889becc4736cc4($v607f2f3099f2a347b327caa70e0be4b2);if($v7c27535f88bae9519ceb14a8983c57ff instanceof translatorWrapper == false) {$v2430fe39e225818bd957ed4cb53eb770[$v6f66e878c62db60568a3487869695820] = false;throw new coreException("Translation wrapper class \"{$v46d111d8fa2089a051889becc4736cc4}\" should be instance of translatorWrapper");}return $v2430fe39e225818bd957ed4cb53eb770[$v6f66e878c62db60568a3487869695820] = $v7c27535f88bae9519ceb14a8983c57ff;}protected static function getClassAlias($va8cfde6331bd59eb2ac96f8911c4b666) {$v1cd3953490871ffe86ea722016f59722 = array(    'baseRestriction', 'publicException'   );$v9299da2529c98fccce0e32b476ba3266 = array(    'umiObjectProperty' => array(     'umiObjectPropertyPrice',      'umiObjectPropertyFloat',      'umiObjectPropertyTags',      'umiObjectPropertyBoolean',      'umiObjectPropertyImgFile',      'umiObjectPropertyRelation',      'umiObjectPropertyText',      'umiObjectPropertyDate',      'umiObjectPropertyInt',      'umiObjectPropertyString',      'umiObjectPropertyWYSIWYG',      'umiObjectPropertyFile',      'umiObjectPropertyPassword',      'umiObjectPropertySymlink',     'umiObjectPropertyCounter',      'umiObjectPropertyOptioned'    ),        'umiFile' => array(     'umiImageFile'    )   );$v6f66e878c62db60568a3487869695820 = get_class($va8cfde6331bd59eb2ac96f8911c4b666);foreach($v9299da2529c98fccce0e32b476ba3266 as $vcc638e7ca262bd8afdee0b624fd6627f => $v724874d1be77f450a09b305fc1534afb) {if(in_array($v6f66e878c62db60568a3487869695820, $v724874d1be77f450a09b305fc1534afb)) {return $vcc638e7ca262bd8afdee0b624fd6627f;}}foreach($v1cd3953490871ffe86ea722016f59722 as $vc0449d20a20339c3c91f487349f9ef14) {if(in_array($vc0449d20a20339c3c91f487349f9ef14, class_parents($va8cfde6331bd59eb2ac96f8911c4b666))) {return $vc0449d20a20339c3c91f487349f9ef14;}}return $v6f66e878c62db60568a3487869695820;}};?>