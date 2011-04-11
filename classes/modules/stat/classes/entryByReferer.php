<?php
  class entryByReferer extends simpleStat {protected $params  = array('source_id' => 0);public function get() {$result = array();$v141c7f42f6d7b3f5bf8bca910bc8d0b0 = "SELECT COUNT(*) AS `count` , `page`.`uri`, `page`.`section`  
				   FROM `cms_stat_pages` AS `page`, `cms_stat_hits` AS `hit`, 
				        `cms_stat_paths` AS `path`, `cms_stat_sources` AS `source` 
				   WHERE `source`.`concrete_src_id`=".$this->params['source_id']."
					 AND `source`.`src_type` = 1
					 AND `path`.`source_id` = `source`.`id`
					 AND `hit`.`path_id`=`path`.`id` 
					 AND `hit`.`number_in_path`=1
					 AND `page`.`id`=`hit`.`page_id`
					 AND `hit`.`date` BETWEEN ".$this->getQueryInterval()." 
					 ".$this->getHostSQL('page') . $this->getUserFilterWhere('path') ." 
				   GROUP BY `page`.`id`";$v1c48ce2fc95d39ec6dc20d3c65de9ca4 = l_mysql_query($v141c7f42f6d7b3f5bf8bca910bc8d0b0);while($vad4f3b23a9c1baee57e5d091271a0053 = mysql_fetch_array($v1c48ce2fc95d39ec6dc20d3c65de9ca4))   $result[] = $vad4f3b23a9c1baee57e5d091271a0053;return $result;}}?>