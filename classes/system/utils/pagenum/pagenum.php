<?php
 class umiPagenum implements iPagenum {public static $max_pages = 5;public static function generateNumPage($vfbb44b4487415b134bce9c790a27fe5e, $v9d85c254b5062e518a134a61950999c3, $v66f6181bcb4cff4cd38fbc804a036db6 = "default", $v51746fc9cfaaf892e94c2d56d7508b37 = "p", $vc381645e69cb46e1f8cd9c8efaf89360 = false) {$v9d85c254b5062e518a134a61950999c3 = intval($v9d85c254b5062e518a134a61950999c3);if($v9d85c254b5062e518a134a61950999c3 == 0) $v9d85c254b5062e518a134a61950999c3 = $vfbb44b4487415b134bce9c790a27fe5e;if(!$v66f6181bcb4cff4cd38fbc804a036db6) $v66f6181bcb4cff4cd38fbc804a036db6 = "default";if(!$v51746fc9cfaaf892e94c2d56d7508b37) $v51746fc9cfaaf892e94c2d56d7508b37 = "p";list($v364f9b183bd2dd9e0beb45c754830a6c, $v28d65bb7a643774ada22f54ca0679289, $v839bf4ce4f682ac29d72f21f39abbd61, $v4a1835dbba88e0fe534a30ac2fa8558a, $vb286163c2d7138578b6b3613433eed50, $v7c958e8e1861de153b774584fc4bca8b, $v0a017ef40a7bd9bd3d55a6a131fb2022, $v95b746440a532f0586864ff101da4948, $vc86804a0ba2ef9ad4f4da84c7288edb4, $vedc51c4694ab5eba9c080cb3832bdf35, $vb5974b598b6ced7f5f1c063fbaac66a2, $va2cbeb34cf8f6b425c8854901c7958b6, $vbfda3d6978660f5cd25c31b54d38eed8) = def_module::loadTemplates("tpls/numpages/{$v66f6181bcb4cff4cd38fbc804a036db6}.tpl", "pages_block", "pages_block_empty", "pages_item", "pages_item_a", "pages_quant", "pages_tobegin", "pages_tobegin_a", "pages_toend", "pages_toend_a", "pages_toprev", "pages_toprev_a", "pages_tonext", "pages_tonext_a");if(($vfbb44b4487415b134bce9c790a27fe5e <= 0) || ($vfbb44b4487415b134bce9c790a27fe5e <= $v9d85c254b5062e518a134a61950999c3)) {return $v28d65bb7a643774ada22f54ca0679289;}$v3c6e0b8a9c15224a8228b9a98ca1531d = $v51746fc9cfaaf892e94c2d56d7508b37;$v4cb7e30dcd90a438883f04c9fd09bd0e = (string) getRequest($v3c6e0b8a9c15224a8228b9a98ca1531d);$v21ffce5b8a6cc8cc6a41448dd69623c9 = $_GET;if(array_key_exists($v3c6e0b8a9c15224a8228b9a98ca1531d, $v21ffce5b8a6cc8cc6a41448dd69623c9)) {unset($v21ffce5b8a6cc8cc6a41448dd69623c9[$v3c6e0b8a9c15224a8228b9a98ca1531d]);}unset($v21ffce5b8a6cc8cc6a41448dd69623c9['path']);if($vc381645e69cb46e1f8cd9c8efaf89360 === false) {$vc381645e69cb46e1f8cd9c8efaf89360 = self::$max_pages;}$vfca1bff8ad8b3a8585abfb0ad523ba42 = Array();$vb3b32a2d422265cd25c3323ed0157f81 = Array();$v8b0b5c2528ffe15f18ef92e17ee3157d = ceil($vfbb44b4487415b134bce9c790a27fe5e / $v9d85c254b5062e518a134a61950999c3);if(!$v8b0b5c2528ffe15f18ef92e17ee3157d) $v8b0b5c2528ffe15f18ef92e17ee3157d = 1;$v21ffce5b8a6cc8cc6a41448dd69623c9 = self::protectParams($v21ffce5b8a6cc8cc6a41448dd69623c9);if(xslTemplater::getInstance()->getIsInited() || true) {$v7694f4a66316e53c8cdd9d9954bd611d = (sizeof($v21ffce5b8a6cc8cc6a41448dd69623c9)) ? "&" . http_build_query($v21ffce5b8a6cc8cc6a41448dd69623c9) : "";}else {$v7694f4a66316e53c8cdd9d9954bd611d = (sizeof($v21ffce5b8a6cc8cc6a41448dd69623c9)) ? "&amp;" . str_replace("&", "&amp;", http_build_query($v21ffce5b8a6cc8cc6a41448dd69623c9)) : "";}if(xslTemplater::getInstance()->getIsInited() == false) {$v7694f4a66316e53c8cdd9d9954bd611d = str_replace("%", "&#37;", $v7694f4a66316e53c8cdd9d9954bd611d);}for($v865c0c0b4ab0e063e5caa3387c1a8741 = 0;$v865c0c0b4ab0e063e5caa3387c1a8741 < $v8b0b5c2528ffe15f18ef92e17ee3157d;$v865c0c0b4ab0e063e5caa3387c1a8741++) {$v69ba0c89abba8a3e9cc0c5e32be0d35d = Array();$v7b8b965ad4bca0e41ab51de7b31363a1 = $v865c0c0b4ab0e063e5caa3387c1a8741 + 1;if(($v4cb7e30dcd90a438883f04c9fd09bd0e - $vc381645e69cb46e1f8cd9c8efaf89360) >= $v865c0c0b4ab0e063e5caa3387c1a8741) continue;if(($v4cb7e30dcd90a438883f04c9fd09bd0e + $vc381645e69cb46e1f8cd9c8efaf89360) <= $v865c0c0b4ab0e063e5caa3387c1a8741) break;if($v4cb7e30dcd90a438883f04c9fd09bd0e != "all") {$v4f2afc9c4099ee1f39c9f551123e54bd = ($v865c0c0b4ab0e063e5caa3387c1a8741 == $v4cb7e30dcd90a438883f04c9fd09bd0e) ? $v4a1835dbba88e0fe534a30ac2fa8558a : $v839bf4ce4f682ac29d72f21f39abbd61;}else {$v4f2afc9c4099ee1f39c9f551123e54bd = $v839bf4ce4f682ac29d72f21f39abbd61;}$v2a304a1348456ccd2234cd71a81bd338 = "?{$v3c6e0b8a9c15224a8228b9a98ca1531d}={$v865c0c0b4ab0e063e5caa3387c1a8741}" . $v7694f4a66316e53c8cdd9d9954bd611d;$v69ba0c89abba8a3e9cc0c5e32be0d35d['attribute:link'] = $v2a304a1348456ccd2234cd71a81bd338;$v69ba0c89abba8a3e9cc0c5e32be0d35d['attribute:page-num'] = $v865c0c0b4ab0e063e5caa3387c1a8741;if($v4cb7e30dcd90a438883f04c9fd09bd0e == $v865c0c0b4ab0e063e5caa3387c1a8741) {$v69ba0c89abba8a3e9cc0c5e32be0d35d['attribute:is-active'] = true;}$v69ba0c89abba8a3e9cc0c5e32be0d35d['node:num'] = $v7b8b965ad4bca0e41ab51de7b31363a1;$v69ba0c89abba8a3e9cc0c5e32be0d35d['void:quant'] = (($v865c0c0b4ab0e063e5caa3387c1a8741 < (($v4cb7e30dcd90a438883f04c9fd09bd0e + $vc381645e69cb46e1f8cd9c8efaf89360)-1)) and ($v865c0c0b4ab0e063e5caa3387c1a8741 < ($v8b0b5c2528ffe15f18ef92e17ee3157d - 1))) ? $vb286163c2d7138578b6b3613433eed50 : "";$vb3b32a2d422265cd25c3323ed0157f81[] = def_module::parseTemplate($v4f2afc9c4099ee1f39c9f551123e54bd, $v69ba0c89abba8a3e9cc0c5e32be0d35d);}$vfca1bff8ad8b3a8585abfb0ad523ba42['subnodes:items'] = $vfca1bff8ad8b3a8585abfb0ad523ba42['void:pages'] = $vb3b32a2d422265cd25c3323ed0157f81;$vfca1bff8ad8b3a8585abfb0ad523ba42['tobegin'] = ($v4cb7e30dcd90a438883f04c9fd09bd0e == 0 || $v8b0b5c2528ffe15f18ef92e17ee3157d <= 1) ? $v0a017ef40a7bd9bd3d55a6a131fb2022 : $v7c958e8e1861de153b774584fc4bca8b;$vfca1bff8ad8b3a8585abfb0ad523ba42['toprev']  = ($v4cb7e30dcd90a438883f04c9fd09bd0e == 0 || $v8b0b5c2528ffe15f18ef92e17ee3157d <= 1) ? $vb5974b598b6ced7f5f1c063fbaac66a2  : $vedc51c4694ab5eba9c080cb3832bdf35;$vfca1bff8ad8b3a8585abfb0ad523ba42['toend'] =  ($v4cb7e30dcd90a438883f04c9fd09bd0e == ($v8b0b5c2528ffe15f18ef92e17ee3157d - 1) || $v8b0b5c2528ffe15f18ef92e17ee3157d <= 1) ? $vc86804a0ba2ef9ad4f4da84c7288edb4 : $v95b746440a532f0586864ff101da4948;$vfca1bff8ad8b3a8585abfb0ad523ba42['tonext'] = ($v4cb7e30dcd90a438883f04c9fd09bd0e == ($v8b0b5c2528ffe15f18ef92e17ee3157d - 1) || $v8b0b5c2528ffe15f18ef92e17ee3157d <= 1) ? $vbfda3d6978660f5cd25c31b54d38eed8 : $va2cbeb34cf8f6b425c8854901c7958b6;$v8ce1a19060c7f3777242272261830ee1 = xslTemplater::getInstance();$vb0efae39904aed41aca525e2d7ccb04f = $v8ce1a19060c7f3777242272261830ee1->getIsInited();if ($v4cb7e30dcd90a438883f04c9fd09bd0e != 0) {$v5446dec5267237b6586d5ea62673ec8a = "?{$v3c6e0b8a9c15224a8228b9a98ca1531d}=0" . $v7694f4a66316e53c8cdd9d9954bd611d;if($vb0efae39904aed41aca525e2d7ccb04f) {$vfca1bff8ad8b3a8585abfb0ad523ba42['tobegin_link'] = array(      'attribute:page-num' => 0,      'node:value' => $v5446dec5267237b6586d5ea62673ec8a     );}else {$vfca1bff8ad8b3a8585abfb0ad523ba42['tobegin_link'] = $v5446dec5267237b6586d5ea62673ec8a;}}if ($v4cb7e30dcd90a438883f04c9fd09bd0e < $v8b0b5c2528ffe15f18ef92e17ee3157d - 1) {$vf6482501a577488d9d516673a818b529 = "?{$v3c6e0b8a9c15224a8228b9a98ca1531d}=" . ($v8b0b5c2528ffe15f18ef92e17ee3157d - 1) . $v7694f4a66316e53c8cdd9d9954bd611d;if($vb0efae39904aed41aca525e2d7ccb04f) {$vfca1bff8ad8b3a8585abfb0ad523ba42['toend_link'] = array(      'attribute:page-num' => $v8b0b5c2528ffe15f18ef92e17ee3157d - 1,      'node:value' => $vf6482501a577488d9d516673a818b529     );}else {$vfca1bff8ad8b3a8585abfb0ad523ba42['toend_link'] = $vf6482501a577488d9d516673a818b529;}}if($v4cb7e30dcd90a438883f04c9fd09bd0e - 1 >= 0) {$v40ea974cc7981d1dce9ba3aede6d20cb = "?{$v3c6e0b8a9c15224a8228b9a98ca1531d}=" . ($v4cb7e30dcd90a438883f04c9fd09bd0e -1)  . $v7694f4a66316e53c8cdd9d9954bd611d;if($vb0efae39904aed41aca525e2d7ccb04f) {$vfca1bff8ad8b3a8585abfb0ad523ba42['toprev_link'] = array(      'attribute:page-num' => $v4cb7e30dcd90a438883f04c9fd09bd0e -1,      'node:value' => $v40ea974cc7981d1dce9ba3aede6d20cb     );}else {$vfca1bff8ad8b3a8585abfb0ad523ba42['toprev_link'] = $v40ea974cc7981d1dce9ba3aede6d20cb;}}if($v4cb7e30dcd90a438883f04c9fd09bd0e < $v8b0b5c2528ffe15f18ef92e17ee3157d - 1) {$vd6b69f3495f46527af2f79a8b02da78b = "?{$v3c6e0b8a9c15224a8228b9a98ca1531d}=" . ($v4cb7e30dcd90a438883f04c9fd09bd0e + 1) . $v7694f4a66316e53c8cdd9d9954bd611d;if($vb0efae39904aed41aca525e2d7ccb04f) {$vfca1bff8ad8b3a8585abfb0ad523ba42['tonext_link'] = array(      'attribute:page-num' => $v4cb7e30dcd90a438883f04c9fd09bd0e + 1,      'node:value' => $vd6b69f3495f46527af2f79a8b02da78b     );}else {$vfca1bff8ad8b3a8585abfb0ad523ba42['tonext_link'] = $vd6b69f3495f46527af2f79a8b02da78b;}}$vfca1bff8ad8b3a8585abfb0ad523ba42['current-page'] = (int) $v4cb7e30dcd90a438883f04c9fd09bd0e;return def_module::parseTemplate($v364f9b183bd2dd9e0beb45c754830a6c, $vfca1bff8ad8b3a8585abfb0ad523ba42);}public static function generateOrderBy($v972bf3f05d14ffbdb817bef60638ff00, $v94757cae63fd3e398c0811a976dd6bbe, $v66f6181bcb4cff4cd38fbc804a036db6 = "default") {if(!$v66f6181bcb4cff4cd38fbc804a036db6) $v66f6181bcb4cff4cd38fbc804a036db6 = "default";list($v364f9b183bd2dd9e0beb45c754830a6c, $v77aec815defa0531d0f88e17982c7876) = def_module::loadTemplates("tpls/numpages/{$v66f6181bcb4cff4cd38fbc804a036db6}.tpl", "order_by", "order_by_a");if(!($v599dcce2998a6b40b1e38e8c6006cb0a = umiObjectTypesCollection::getInstance()->getType($v94757cae63fd3e398c0811a976dd6bbe))) {return "";}$vfca1bff8ad8b3a8585abfb0ad523ba42 = Array();if(($v3aabf39f2d943fa886d86dcbbee4d910 = $v599dcce2998a6b40b1e38e8c6006cb0a->getFieldId($v972bf3f05d14ffbdb817bef60638ff00)) || ($v972bf3f05d14ffbdb817bef60638ff00 == "name")) {$v21ffce5b8a6cc8cc6a41448dd69623c9 = $_GET;unset($v21ffce5b8a6cc8cc6a41448dd69623c9['path']);$vdb64cd49d22f58e2d5fc26108f11b181 = getArrayKey($v21ffce5b8a6cc8cc6a41448dd69623c9, 'order_filter');if(is_array($vdb64cd49d22f58e2d5fc26108f11b181)) {$v4f2afc9c4099ee1f39c9f551123e54bd = (array_key_exists($v972bf3f05d14ffbdb817bef60638ff00, $vdb64cd49d22f58e2d5fc26108f11b181)) ? $v77aec815defa0531d0f88e17982c7876 : $v364f9b183bd2dd9e0beb45c754830a6c;}else {$v4f2afc9c4099ee1f39c9f551123e54bd = $v364f9b183bd2dd9e0beb45c754830a6c;}unset($v21ffce5b8a6cc8cc6a41448dd69623c9['order_filter']);$v21ffce5b8a6cc8cc6a41448dd69623c9['order_filter'][$v972bf3f05d14ffbdb817bef60638ff00] = 1;$v21ffce5b8a6cc8cc6a41448dd69623c9 = self::protectParams($v21ffce5b8a6cc8cc6a41448dd69623c9);$v7694f4a66316e53c8cdd9d9954bd611d = (sizeof($v21ffce5b8a6cc8cc6a41448dd69623c9)) ? "&amp;" . str_replace("&", "&amp;", http_build_query($v21ffce5b8a6cc8cc6a41448dd69623c9)) : "";$v7694f4a66316e53c8cdd9d9954bd611d = urldecode($v7694f4a66316e53c8cdd9d9954bd611d);$v7694f4a66316e53c8cdd9d9954bd611d = str_replace("%", "&#037;", $v7694f4a66316e53c8cdd9d9954bd611d);$vfca1bff8ad8b3a8585abfb0ad523ba42['link'] = "?" . $v7694f4a66316e53c8cdd9d9954bd611d;if($v972bf3f05d14ffbdb817bef60638ff00 == "name") {$vfca1bff8ad8b3a8585abfb0ad523ba42['title'] = getLabel('field-name');}else {$vfca1bff8ad8b3a8585abfb0ad523ba42['title'] = umiFieldsCollection::getInstance()->getField($v3aabf39f2d943fa886d86dcbbee4d910)->getTitle();}return def_module::parseTemplate($v4f2afc9c4099ee1f39c9f551123e54bd, $vfca1bff8ad8b3a8585abfb0ad523ba42);}return "";}protected static function protectParams($v21ffce5b8a6cc8cc6a41448dd69623c9) {foreach($v21ffce5b8a6cc8cc6a41448dd69623c9 as $v865c0c0b4ab0e063e5caa3387c1a8741 => $v9e3669d19b675bd57058fd4664205d2a) {if(is_array($v9e3669d19b675bd57058fd4664205d2a)) {$v21ffce5b8a6cc8cc6a41448dd69623c9[$v865c0c0b4ab0e063e5caa3387c1a8741] = self::protectParams($v9e3669d19b675bd57058fd4664205d2a);}else {$v9e3669d19b675bd57058fd4664205d2a = htmlspecialchars($v9e3669d19b675bd57058fd4664205d2a);$v21ffce5b8a6cc8cc6a41448dd69623c9[$v865c0c0b4ab0e063e5caa3387c1a8741] = str_replace("%", "&#037;", $v9e3669d19b675bd57058fd4664205d2a);}}return $v21ffce5b8a6cc8cc6a41448dd69623c9;}};?>