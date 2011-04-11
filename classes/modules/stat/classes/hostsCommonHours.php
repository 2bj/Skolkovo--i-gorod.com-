<?php
require_once dirname(__FILE__) . '/holidayRoutineCounter.php';class hostsCommonHours extends simpleStat{private $weekends_count = 0;private $routine_count = 0;public function get()    {return array('detail' => $this->getDetail(), 'avg' => $this->getAvg());}private function getDetail()    {$this->setUpVars();return $this->simpleQuery("SELECT COUNT(*) AS `cnt`, `hour`, UNIX_TIMESTAMP(`p`.`date`) AS `ts` FROM `cms_stat_paths` `p`
                                     INNER JOIN `cms_stat_hits` `h` ON `h`.`path_id` = `p`.`id` AND `h`.`number_in_path` = 1
                                      INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                       INNER JOIN `cms_stat_sources_sites` `ss` ON `ss`.`id` = `s`.`concrete_src_id`
                                        WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p') . " AND `s`.`src_type` = 1
                                         GROUP BY `hour`");}private function getAvg()    {$this->setUpVars();$v36f75e2036c54462c47b965f4a581cff = "(SELECT 'routine' AS `type`, COUNT(*) / " . $this->routine_count . ".0 AS `avg`, `h`.`hour` FROM `cms_stat_paths` `p`
                 INNER JOIN `cms_stat_hits` `h` ON `h`.`path_id` = `p`.`id` AND `h`.`number_in_path` = 1
                  INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                   INNER JOIN `cms_stat_sources_sites` `ss` ON `ss`.`id` = `s`.`concrete_src_id`
                    LEFT JOIN `cms_stat_holidays` `holidays` ON `h`.`day` = `holidays`.`day` AND `h`.`month` = `holidays`.`month`
                     WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p') . " AND `s`.`src_type` = 1
                      AND `day_of_week` BETWEEN 1 AND 5 AND `holidays`.`id` IS NULL
                       GROUP BY `h`.`hour`)
                UNION
                (SELECT 'weekend' AS `type`, COUNT(*) / " . $this->holidays_count . ".0 AS `avg`, `h`.`hour` FROM `cms_stat_paths` `p`
                 INNER JOIN `cms_stat_hits` `h` ON `h`.`path_id` = `p`.`id` AND `h`.`number_in_path` = 1
                  INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                   INNER JOIN `cms_stat_sources_sites` `ss` ON `ss`.`id` = `s`.`concrete_src_id`
                    LEFT JOIN `cms_stat_holidays` `holidays` ON `h`.`day` = `holidays`.`day` AND `h`.`month` = `holidays`.`month`
                     WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p') . " AND `s`.`src_type` = 1
                      AND (`day_of_week` NOT BETWEEN 1 AND 5 OR `holidays`.`id` IS NOT NULL)
                       GROUP BY `h`.`hour`)";$v9b207167e5381c47682c6b4f58a623fb = l_mysql_query($v36f75e2036c54462c47b965f4a581cff);$result = array();while ($vf1965a857bc285d26fe22023aa5ab50d = mysql_fetch_assoc($v9b207167e5381c47682c6b4f58a623fb)) {$result[$vf1965a857bc285d26fe22023aa5ab50d['type']][$vf1965a857bc285d26fe22023aa5ab50d['hour']] = $vf1965a857bc285d26fe22023aa5ab50d['avg'];}return $result;}private function setUpVars()    {$v9b207167e5381c47682c6b4f58a623fb = holidayRoutineCounter::count($this->start, $this->finish);$this->holidays_count = $v9b207167e5381c47682c6b4f58a623fb['holidays'];$this->routine_count = $v9b207167e5381c47682c6b4f58a623fb['routine'];}}?>