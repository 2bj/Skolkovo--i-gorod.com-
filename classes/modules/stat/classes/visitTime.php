<?php
class visitTime extends simpleStat{private $groupby;protected $interval = '-30 days';public function get()    {$this->groupby = $this->calcGroupby($this->start, $this->finish);return array('detail' => $this->getDetail(), 'dynamic' => $this->getDynamic(), 'groupby' => $this->groupby);}private function getDetail()    {l_mysql_query("DROP TEMPORARY TABLE IF EXISTS `tmp_visit_time`");l_mysql_query("CREATE TEMPORARY TABLE `tmp_visit_time` (`mins` FLOAT) ENGINE = MEMORY");l_mysql_query("INSERT INTO `tmp_visit_time` SELECT (UNIX_TIMESTAMP(MAX(`h`.`date`)) - UNIX_TIMESTAMP(MIN(`h`.`date`))) / 60 AS `minutes` FROM `cms_stat_hits` `h`
                        INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `h`.`path_id`
                         WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p') . " 
                          GROUP BY `h`.`path_id`");return $this->simpleQuery("SELECT COUNT(*) AS `cnt`, IF(`mins` > 10, IF(`mins` > 20, IF(`mins` > 30, IF(`mins` > 40, IF(`mins` > 50, 51, 41), 31), 21), 11), ROUND(`mins`)) `minutes`
                                     FROM `tmp_visit_time`
                                      GROUP BY `minutes` ORDER BY `cnt` DESC");}private function getDynamic()    {return $this->simpleQuery("SELECT AVG(`minutes`) AS `minutes_avg`, `tmp`.`" . $this->groupby . "`, UNIX_TIMESTAMP(`tmp`.`date`) AS `ts` FROM

                                    (SELECT `h`.`date`, `h`.`week`, `h`.`month`, `h`.`year`, (UNIX_TIMESTAMP(MAX(`h`.`date`)) - UNIX_TIMESTAMP(MIN(`h`.`date`))) / 60 AS `minutes` FROM `cms_stat_hits` `h`
                                      INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `h`.`path_id`
                                       WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p') . " 
                                        GROUP BY `h`.`path_id`) `tmp`

                                   GROUP BY `tmp`.`" . $this->groupby . "`, `tmp`.`year`
                                    ORDER BY `minutes_avg` DESC");}private function calcGroupby($vea2b2676c28c0db26d39331a336c6b92, $v3248bc7547ce97b2a197b2a06cf7283d)    {$v480b0ab43f368eb46e331029cacb5d1e = ceil(($v3248bc7547ce97b2a197b2a06cf7283d - $vea2b2676c28c0db26d39331a336c6b92) / (3600 * 24));if ($v480b0ab43f368eb46e331029cacb5d1e > 180) {return 'month';}return 'week';}}?>