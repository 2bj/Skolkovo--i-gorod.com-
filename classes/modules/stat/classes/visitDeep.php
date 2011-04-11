<?php
class visitDeep extends simpleStat{private $groupby;protected $interval = '-30 days';public function get()    {$this->groupby = $this->calcGroupby($this->start, $this->finish);return array('detail' => $this->getDetail(), 'dynamic' => $this->getDynamic(), 'groupby' => $this->groupby);}private function getDetail()    {l_mysql_query("DROP TEMPORARY TABLE IF EXISTS `tmp_visit_deep`");l_mysql_query("CREATE TEMPORARY TABLE `tmp_visit_deep` (`lvl` INT) ENGINE = MEMORY");l_mysql_query("INSERT INTO `tmp_visit_deep` SELECT MAX(`number_in_path`) AS `level` FROM `cms_stat_hits` `h`
                         INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `h`.`path_id`
                          WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p')  . "
                           GROUP BY `h`.`path_id`");$v4ab6af2707db3b31783c279700eba64e = <<<END
		SELECT
			COUNT(*) AS `cnt`,
			IF(`lvl` > 10, IF(`lvl` > 20, IF(`lvl` > 30, IF(`lvl` > 40, IF(`lvl` > 50, 51, 41), 31), 21), 11), `lvl`) AS `level`
		FROM
			`tmp_visit_deep`
		GROUP BY
			`level`
		ORDER BY `cnt` DESC
END;        return $this->simpleQuery($v4ab6af2707db3b31783c279700eba64e);}private function getDynamic()    {return $this->simpleQuery("SELECT AVG(`level`) AS `level_avg`, `" . $this->groupby . "` AS `period`, UNIX_TIMESTAMP(`date`) AS `ts` FROM

                                    (SELECT `h`.`date`, `h`.`week`, `h`.`month`, `h`.`year`, MAX(`number_in_path`) AS `level` FROM `cms_stat_hits` `h`
                                     INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `h`.`path_id`
                                      WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p') . "
                                       GROUP BY `p`.`id`) `tmp`

                                       GROUP BY `tmp`.`" . $this->groupby . "`, `tmp`.`year`
                                        ORDER BY `date` ASC");}private function calcGroupby($vea2b2676c28c0db26d39331a336c6b92, $v3248bc7547ce97b2a197b2a06cf7283d)    {$v480b0ab43f368eb46e331029cacb5d1e = ceil(($v3248bc7547ce97b2a197b2a06cf7283d - $vea2b2676c28c0db26d39331a336c6b92) / (3600 * 24));if ($v480b0ab43f368eb46e331029cacb5d1e > 180) {return 'month';}return 'week';}}?>