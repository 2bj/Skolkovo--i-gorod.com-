<?php
 abstract class __json_stat extends baseModuleAdmin {public function json_get_referer_pages() {$this->updateFilter();$v510ff634fce407eea1763854519fd3ce = (int) $_REQUEST['requestId'];if($v67b3dba8bc6778101892eb77249db32e = getRequest('host')) {$_SERVER['HTTP_HOST'] = $v67b3dba8bc6778101892eb77249db32e;}$veb45afcaf74119c59422c4ce2febd0c7 = "http://" . $_SERVER['HTTP_HOST'];$v2b118a2cbbb1d8af749254e5e61b7df0 = str_replace($veb45afcaf74119c59422c4ce2febd0c7, "", $_SERVER['HTTP_REFERER']);$v9549dd6065d019211460c59a86dd6536 = new statisticFactory(dirname(__FILE__) . '/classes');$v9549dd6065d019211460c59a86dd6536->isValid('pageNext');$ve98d2f001da5678b39482efbdf5770dc = $v9549dd6065d019211460c59a86dd6536->get('pageNext');$ve98d2f001da5678b39482efbdf5770dc->setStart(time() - 3600*24*7);$ve98d2f001da5678b39482efbdf5770dc->setFinish(time() + 3600*24);if(!$v2b118a2cbbb1d8af749254e5e61b7df0) $v2b118a2cbbb1d8af749254e5e61b7df0 = "/";$ve98d2f001da5678b39482efbdf5770dc->setParams( Array("page_uri" => $v2b118a2cbbb1d8af749254e5e61b7df0) );$result = $ve98d2f001da5678b39482efbdf5770dc->get();$v9b207167e5381c47682c6b4f58a623fb = <<<END
var response = new lLibResponse({$v510ff634fce407eea1763854519fd3ce});
response.links = new Array();


END;   $vfbb44b4487415b134bce9c790a27fe5e = 0;foreach($result as $v41acdec9c555ebe52b011d9f74f11c5d) {$vfbb44b4487415b134bce9c790a27fe5e += (int) $v41acdec9c555ebe52b011d9f74f11c5d['abs'];$v9b207167e5381c47682c6b4f58a623fb .= <<<END
response.links[response.links.length] = {"uri": "{$v41acdec9c555ebe52b011d9f74f11c5d['uri']}", "abs": "{$v41acdec9c555ebe52b011d9f74f11c5d['abs']}"};

END;   }$v9b207167e5381c47682c6b4f58a623fb .= <<<END

response.total = '{$vfbb44b4487415b134bce9c790a27fe5e}';

END;   $v9b207167e5381c47682c6b4f58a623fb .= <<<END

lLib.getInstance().makeResponse(response);

END;   $this->flush($v9b207167e5381c47682c6b4f58a623fb);}};?>