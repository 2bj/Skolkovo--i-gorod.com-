<?php
class openstatSources extends simpleStat{public function get()    {$v4ab6af2707db3b31783c279700eba64e = "SET @cnt := (SELECT COUNT(*) FROM `cms_stat_sources_openstat` `os`
                                     INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `os`.`path_id`
                                       WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p') . ")";l_mysql_query($v4ab6af2707db3b31783c279700eba64e);$result = $this->simpleQuery("SELECT COUNT(*) AS `total` FROM `cms_stat_sources_openstat` `os`
                                     INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `os`.`path_id`
                                      INNER JOIN `cms_stat_sources_openstat_source` `s` ON `s`.`id` = `os`.`source_id`
                                       WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p'));$v8016fd3f91b68b651801a7c279f41ea4 = (int) $result[0]['total'];$v4ab6af2707db3b31783c279700eba64e = "SELECT SQL_CALC_FOUND_ROWS COUNT(*) AS `abs`, COUNT(*) / @cnt * 100 AS `rel`, `s`.`name` AS 'name', `s`.`id` AS `source_id` FROM `cms_stat_sources_openstat` `os`
                                     INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `os`.`path_id`
                                      INNER JOIN `cms_stat_sources_openstat_source` `s` ON `s`.`id` = `os`.`source_id`
                                       WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p') . "
                                        GROUP BY `s`.`id`
                                         ORDER BY `abs` DESC
                                          LIMIT " . $this->offset . ", " . $this->limit;$v9b207167e5381c47682c6b4f58a623fb = $this->simpleQuery($v4ab6af2707db3b31783c279700eba64e, true);return array("all"=>$v9b207167e5381c47682c6b4f58a623fb['result'], "summ"=>$v8016fd3f91b68b651801a7c279f41ea4, "total"=>$v9b207167e5381c47682c6b4f58a623fb['FOUND_ROWS']);}}?>