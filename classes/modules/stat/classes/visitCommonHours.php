<?php
require_once dirname(__FILE__).'/holidayRoutineCounter.php';class visitCommonHours extends simpleStat{private $weekends_count = 0;private $routine_count = 0;public function get()    {$v4e21d0994fbebbafeb95172093e5ebb2 = $this->getDetail();return array('detail' => $v4e21d0994fbebbafeb95172093e5ebb2['all'], 'avg' => $this->getAvg(), 'summ' => $this->getSumm(), 'total' => $v4e21d0994fbebbafeb95172093e5ebb2['total']);}private function getSumm() {$this->setUpVars();$v30103711375a567954d36923f75319b8 = $this->getQueryInterval();$vc1886ec018769dae2d0bebcd668df00e = $this->getHostSQL("p");$vcc711ace44d83effff5e0bb8592b3a7d  = $this->getUserFilterWhere('pth');$v4ab6af2707db3b31783c279700eba64e = <<<END
			SELECT
				COUNT(*) AS `cnt`
			FROM
				`cms_stat_hits` `h`
                              	INNER JOIN
					`cms_stat_pages` `p` ON `p`.`id` = `h`.`page_id`
                    INNER JOIN `cms_stat_paths` `pth` ON `pth`.`id` = `h`.`path_id`
			WHERE
				h.`date` BETWEEN {$v30103711375a567954d36923f75319b8}
				 {$vc1886ec018769dae2d0bebcd668df00e}
                 {$vcc711ace44d83effff5e0bb8592b3a7d}
			ORDER BY
				h.`date` ASC
END;                    $v0e413ad7c08b77c867e2d87219f29e93 = $this->simpleQuery($v4ab6af2707db3b31783c279700eba64e);$v663ccf380acaf3f549f1612654dc109d = isset($v0e413ad7c08b77c867e2d87219f29e93[0])?(int) $v0e413ad7c08b77c867e2d87219f29e93[0]['cnt']:0;return $v663ccf380acaf3f549f1612654dc109d;}private function getDetail()    {$this->setUpVars();$va181a603769c1f98ad927e7367c7aa51 = $this->simpleQuery("SELECT SQL_CALC_FOUND_ROWS COUNT(*) AS `cnt`, `hour`, UNIX_TIMESTAMP(h.`date`) AS `ts` FROM `cms_stat_hits` `h`
                             INNER JOIN `cms_stat_pages` `p` ON `p`.`id` = `h`.`page_id`
                             INNER JOIN `cms_stat_paths` `pth` ON `pth`.`id` = `h`.`path_id`
                              WHERE h.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p"). "
                               GROUP BY `hour`
                                 ORDER BY `ts` ASC");$v9b207167e5381c47682c6b4f58a623fb = $this->simpleQuery('SELECT FOUND_ROWS() as `total`');$v8016fd3f91b68b651801a7c279f41ea4 = (int) $v9b207167e5381c47682c6b4f58a623fb[0]['total'];$v37988d3e81795bef76b736acfda39145 = array();foreach ($va181a603769c1f98ad927e7367c7aa51 as $v6074271d6a482d25dedb8299c0f36145=>$v9eedf9fca1325b03274ff771bf16578e) {$v37988d3e81795bef76b736acfda39145[intval(date('G', $v9eedf9fca1325b03274ff771bf16578e['ts']))] = $v9eedf9fca1325b03274ff771bf16578e;}ksort($v37988d3e81795bef76b736acfda39145);return array("all"=>$v37988d3e81795bef76b736acfda39145, "total"=>$v8016fd3f91b68b651801a7c279f41ea4);}private function getAvg()    {$this->setUpVars();$v36f75e2036c54462c47b965f4a581cff = "(SELECT 'routine' AS `type`, COUNT(*) / " . $this->routine_count . ".0 AS `avg`, `hour` FROM `cms_stat_hits` `h`
                 LEFT JOIN `cms_stat_holidays` `holidays` ON `h`.`day` = `holidays`.`day` AND `h`.`month` = `holidays`.`month`
                  INNER JOIN `cms_stat_pages` `p` ON `p`.`id` = `h`.`page_id`
                  INNER JOIN `cms_stat_paths` `pth` ON `pth`.`id` = `h`.`path_id`
                   WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('pth')  . "
                    AND `h`.`day_of_week` BETWEEN 1 AND 5 AND `holidays`.`id` IS NULL
                     GROUP BY `hour`)
                UNION
                (SELECT 'weekend' AS `type`, COUNT(*) / " . $this->holidays_count . ".0 AS `avg`, `hour` FROM `cms_stat_hits` `h`
                 LEFT JOIN `cms_stat_holidays` `holidays` ON `h`.`day` = `holidays`.`day` AND `h`.`month` = `holidays`.`month`
                  INNER JOIN `cms_stat_pages` `p` ON `p`.`id` = `h`.`page_id`
                  INNER JOIN `cms_stat_paths` `pth` ON `pth`.`id` = `h`.`path_id`
                   WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('pth')  . "
                    AND `h`.`day_of_week` NOT BETWEEN 1 AND 5 OR `holidays`.`id` IS NOT NULL
                     GROUP BY `hour`)";$v9b207167e5381c47682c6b4f58a623fb = l_mysql_query($v36f75e2036c54462c47b965f4a581cff);$result = array();while ($vf1965a857bc285d26fe22023aa5ab50d = @mysql_fetch_assoc($v9b207167e5381c47682c6b4f58a623fb)) {$result[$vf1965a857bc285d26fe22023aa5ab50d['type']][$vf1965a857bc285d26fe22023aa5ab50d['hour']] = $vf1965a857bc285d26fe22023aa5ab50d['avg'];}return $result;}private function setUpVars()    {$v9b207167e5381c47682c6b4f58a623fb = holidayRoutineCounter::count($this->start, $this->finish);$this->holidays_count = $v9b207167e5381c47682c6b4f58a623fb['holidays'];$this->routine_count = $v9b207167e5381c47682c6b4f58a623fb['routine'];}}?>