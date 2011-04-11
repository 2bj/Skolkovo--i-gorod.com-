<?php
class exitPoints extends simpleStat{public function get()    {l_mysql_query("SET @all = (SELECT COUNT(*) FROM `cms_stat_paths`
                      WHERE `date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL() . ")");l_mysql_query("DROP TEMPORARY TABLE IF EXISTS `tmp_paths_out`");l_mysql_query("CREATE TEMPORARY TABLE `tmp_paths_out` (`level`INT, `path_id` INT, KEY `path_id_level` (`path_id`, `level`)) ENGINE = MEMORY");l_mysql_query("INSERT INTO `tmp_paths_out` (SELECT MAX(`number_in_path`) AS `level`, `path_id` FROM `cms_stat_hits` `h`
                         INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `h`.`path_id`
                          WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p') . "
                           GROUP BY `path_id`)");$v0e413ad7c08b77c867e2d87219f29e93 = $this->simpleQuery("SELECT COUNT(*) AS 'cnt' FROM `cms_stat_hits` `h`
                                     INNER JOIN `tmp_paths_out` `t` ON `h`.`path_id` = `t`.`path_id` AND `h`.`number_in_path` = `t`.`level`
                                      INNER JOIN `cms_stat_pages` `p` ON `p`.`id` = `h`.`page_id`
                                       WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p'));$v663ccf380acaf3f549f1612654dc109d = isset($v0e413ad7c08b77c867e2d87219f29e93[0])?(int) $v0e413ad7c08b77c867e2d87219f29e93[0]['cnt']:0;$v9b207167e5381c47682c6b4f58a623fb = $this->simpleQuery("SELECT SQL_CALC_FOUND_ROWS COUNT(*) AS `abs`, COUNT(*) / @all * 100 AS `rel`, `p`.`uri` FROM `cms_stat_hits` `h`
                                     INNER JOIN `tmp_paths_out` `t` ON `h`.`path_id` = `t`.`path_id` AND `h`.`number_in_path` = `t`.`level`
                                      INNER JOIN `cms_stat_pages` `p` ON `p`.`id` = `h`.`page_id`
                                       WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p') . "
                                        GROUP BY `h`.`page_id`
                                         ORDER BY `rel` DESC
                                          LIMIT " . $this->offset . ", " . $this->limit, true);return array("all"=> $v9b207167e5381c47682c6b4f58a623fb['result'], "summ"=>$v663ccf380acaf3f549f1612654dc109d, "total"=>$v9b207167e5381c47682c6b4f58a623fb['FOUND_ROWS']);}}?>