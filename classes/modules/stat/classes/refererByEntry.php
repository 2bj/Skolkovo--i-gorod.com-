<?php
  class refererByEntry extends simpleStat {protected $params  = array('page_id' => 0);public function get() {$result = array();$v141c7f42f6d7b3f5bf8bca910bc8d0b0 = "SELECT COUNT( * ) AS `count` , `domain`.`name` , `site`.`uri` 
					FROM `cms_stat_sources_sites` AS `site` , 
						 `cms_stat_sources_sites_domains` AS `domain` , 
						 `cms_stat_hits` AS `hit` , 
						 `cms_stat_paths` AS `path` , 
						 `cms_stat_sources` AS `source` 
					WHERE `domain`.`id` = `site`.`domain` 
					  AND `source`.`concrete_src_id` = `site`.`id` 
					  AND `source`.`src_type` =1
					  AND `path`.`source_id` = `source`.`id` 					  
					  AND `hit`.`path_id` = `path`.`id` 
					  AND `hit`.`number_in_path` =1
					  AND `hit`.`page_id`=" . $this->params['page_id'] . " 
					  AND `hit`.`date` BETWEEN ".$this->getQueryInterval().       $this->getHostSQL('page') . $this->getUserFilterWhere('path').     "GROUP BY `site`.`id`";$v1c48ce2fc95d39ec6dc20d3c65de9ca4 = l_mysql_query($v141c7f42f6d7b3f5bf8bca910bc8d0b0);while($vad4f3b23a9c1baee57e5d091271a0053 = mysql_fetch_array($v1c48ce2fc95d39ec6dc20d3c65de9ca4))   $result[] = $vad4f3b23a9c1baee57e5d091271a0053;return $result;}}?>