<?php
class entryPoints extends simpleStat{public function get()    {l_mysql_query("SET @all = (SELECT COUNT(*) FROM `cms_stat_hits` `h`
                     INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `h`.`path_id`
                      WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " AND `number_in_path` = 1 " . $this->getHostSQL("p") . $this->getUserFilterWhere('p') . ")");$v0e413ad7c08b77c867e2d87219f29e93 = $this->simpleQuery("SELECT COUNT(*) AS 'cnt' FROM `cms_stat_hits` `h`
                                     INNER JOIN `cms_stat_pages` `p` ON `p`.`id` = `h`.`page_id`
                                      WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " AND `h`.`number_in_path` = 1 " . $this->getHostSQL("p"));$v663ccf380acaf3f549f1612654dc109d = (int) $v0e413ad7c08b77c867e2d87219f29e93[0]['cnt'];$v9b207167e5381c47682c6b4f58a623fb = $this->simpleQuery($v36f75e2036c54462c47b965f4a581cff = "SELECT SQL_CALC_FOUND_ROWS COUNT(*) AS `abs`, COUNT(*) / @all * 100 AS `rel`, `p`.`uri`, `p`.`id`, UNIX_TIMESTAMP(`h`.`date`) AS `ts` FROM `cms_stat_hits` `h`
                                     INNER JOIN `cms_stat_pages` `p` ON `p`.`id` = `h`.`page_id`
                                      WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " AND `h`.`number_in_path` = 1 " . $this->getHostSQL("p") . $this->getUserFilterWhere('p') . "
                                       GROUP BY `h`.`page_id`
                                        ORDER BY `abs` DESC
                                         LIMIT " . $this->offset . ", " . $this->limit, true);return array("all"=> $v9b207167e5381c47682c6b4f58a623fb['result'], "summ"=>$v663ccf380acaf3f549f1612654dc109d, "total"=>$v9b207167e5381c47682c6b4f58a623fb['FOUND_ROWS']);}}?>