<?php
  class cityStat extends simpleStat {public function get() {$result = array();$v141c7f42f6d7b3f5bf8bca910bc8d0b0 = "SELECT COUNT(*) AS `count`, `location` 
		           FROM `cms_stat_users` 
				   WHERE 1 ".$this->getHostSQL() .                    (!empty($this->user_id)?' AND id IN '.implode(', ', $this->user_id):'') ."  
				   GROUP BY `location` 
				   ORDER BY `count` DESC LIMIT 15";$v1c48ce2fc95d39ec6dc20d3c65de9ca4 = l_mysql_query($v141c7f42f6d7b3f5bf8bca910bc8d0b0);while($vad4f3b23a9c1baee57e5d091271a0053 = mysql_fetch_assoc($v1c48ce2fc95d39ec6dc20d3c65de9ca4))   $result[] = $vad4f3b23a9c1baee57e5d091271a0053;return $result;}}?>