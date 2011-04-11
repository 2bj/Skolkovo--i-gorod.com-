<?php
class refuses extends simpleStat{public function get()    {l_mysql_query("DROP TEMPORARY TABLE IF EXISTS `tmp_pages_refuse`");l_mysql_query("CREATE TEMPORARY TABLE `tmp_pages_refuse` (`path_id` INT, `level` INT, KEY `path_id_level` (`path_id`, `level`)) ENGINE = MEMORY");l_mysql_query("INSERT INTO `tmp_pages_refuse` SELECT `path_id`, MAX(`number_in_path`) AS `mnum` FROM `cms_stat_hits` `h`
                         INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `h`.`path_id`
                          WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p') . "
                           GROUP BY `path_id`
                            HAVING `mnum` = 1");l_mysql_query("SET @all_refuses = (SELECT COUNT(*) FROM tmp_pages_refuse)");l_mysql_query("SET @all_visits = (SELECT COUNT(*) FROM `cms_stat_paths` `p`
                      WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p') . " )");return $this->simpleQuery("SELECT COUNT(DISTINCT(`h`.`path_id`)) AS `refuse`, COUNT(*) / COUNT(DISTINCT(`h`.`path_id`)) AS `entry`, COUNT(DISTINCT(`h`.`path_id`)) / COUNT(*) * 100 AS `refuse_percent`, COUNT(DISTINCT(`h`.`path_id`)) / @all_refuses * 100 AS `all_refuses_percent`, COUNT(DISTINCT(`h`.`path_id`)) /  @all_visits * 100 AS `traffic_lost`, `p`.`uri`, `p`.`id` FROM `tmp_pages_refuse` `t`
                                     INNER JOIN `cms_stat_hits` `h` ON `h`.`path_id` = `t`.`path_id` AND `h`.`number_in_path` = `t`.`level`
                                      INNER JOIN `cms_stat_pages` `p` ON `p`.`id` = `h`.`page_id`
                                       INNER JOIN `cms_stat_hits` `h2` ON `h2`.`page_id` = `p`.`id` AND `h2`.`number_in_path` = 1
                                        WHERE " . $this->getHostSQL("p") . "
                                         GROUP BY `h`.`page_id`
                                          ORDER BY `refuse` DESC
                                           LIMIT " . $this->offset . ", " . $this->limit);}}?>