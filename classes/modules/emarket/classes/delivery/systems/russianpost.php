<?php
 class russianpostDelivery extends delivery {public function validate(order $v70a17ffa722a3985b86d30b034ad06d7) {return true;}public function getDeliveryPrice(order $v70a17ffa722a3985b86d30b034ad06d7) {$v5891da2d64975cae48d175d1e001f5da = umiObjectsCollection::getInstance();$v25446c4f944226558d332b92e66a5e56 = $v70a17ffa722a3985b86d30b034ad06d7->getActualPrice();$v7edabf994b76a00cbc60c95af337db8f = 0;$v691d502cfd0e0626cd3b058e5682ad1c  = $v70a17ffa722a3985b86d30b034ad06d7->getItems();foreach($v691d502cfd0e0626cd3b058e5682ad1c as $v447b7147e84be512208dcc0995d67ebc) {$v8e2dcfd7e7e24b1ca76c1193f645902b    = $v447b7147e84be512208dcc0995d67ebc->getItemElement();$v00806b2c98b2f9b03f2489e59eb9c511 = (int)$v8e2dcfd7e7e24b1ca76c1193f645902b->getValue("weight");if($v00806b2c98b2f9b03f2489e59eb9c511 != 0) {$v7edabf994b76a00cbc60c95af337db8f += $v00806b2c98b2f9b03f2489e59eb9c511 * $v447b7147e84be512208dcc0995d67ebc->getAmount();}else {return "Невозможно автоматически определить стоимость";}}$vef09fba021e4789bab1267cf395ac546 = $v5891da2d64975cae48d175d1e001f5da->getObject( $v70a17ffa722a3985b86d30b034ad06d7->delivery_address );if(!$vef09fba021e4789bab1267cf395ac546) {return "Невозможно автоматически определить стоимость";}$v97f124e23e3dd9e88d67dc4d3b1f5394 = $v5891da2d64975cae48d175d1e001f5da->getObject( $this->object->viewpost )->getValue("identifier");$vcfd02681d57cb14892d66020286432df = $v5891da2d64975cae48d175d1e001f5da->getObject( $this->object->typepost )->getValue("identifier");$vadcdbd79a8d84175c229b192aadc02f2   = $vef09fba021e4789bab1267cf395ac546->getValue("index");$v2063c1608d6e0baf80249c42e2be5804    = $this->object->setpostvalue ? $v70a17ffa722a3985b86d30b034ad06d7->getActualPrice() : 0;$v572d4e421e5e6b9bc11d815e8a027112 = "http://fcr.russianpost.ru/autotarif/Autotarif.aspx?countryCode=643&viewPost={$v97f124e23e3dd9e88d67dc4d3b1f5394}&typePost={$vcfd02681d57cb14892d66020286432df}&postOfficeId={$vadcdbd79a8d84175c229b192aadc02f2}&weight={$v7edabf994b76a00cbc60c95af337db8f}&value1={$v2063c1608d6e0baf80249c42e2be5804}";$v9a0364b9e99bb480dd25e1f0284c8555 = umiRemoteFileGetter::get($v572d4e421e5e6b9bc11d815e8a027112);$ve3cc92c14a5e6dd1a7d94b6ff634d7fc = array();preg_match("/<span id=\"TarifValue\">(\d+,\d+)<\/span>/i", $v9a0364b9e99bb480dd25e1f0284c8555, $ve3cc92c14a5e6dd1a7d94b6ff634d7fc);$v78a5eb43deef9a7b5b9ce157b9d52ac4 = (float)str_replace(",", ".", $ve3cc92c14a5e6dd1a7d94b6ff634d7fc[1]);return $v78a5eb43deef9a7b5b9ce157b9d52ac4;}};?>