<?php
class sectionHits extends simpleStat{public function get()    {l_mysql_query("SET @all = (SELECT COUNT(*) FROM `cms_stat_hits` `h`
                                    INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `h`.`path_id`
                                     WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p') . ")");$vbf708f1d9a0dcabb42fb1623674bf763 = $this->getQueryInterval();$v4ab6af2707db3b31783c279700eba64e = "
		SELECT
			COUNT(*) AS `abs`
		FROM
			`cms_stat_pages` `p`
			INNER JOIN `cms_stat_hits` `h` ON `h`.`page_id` = `p`.`id`
            ".$this->getUserFilterTable('id', 'h.path_id')."
		WHERE
			`date` BETWEEN ".$vbf708f1d9a0dcabb42fb1623674bf763."
			AND `p`.`host_id` = ".$this->host_id.  $this->getUserFilterWhere()."
";$result = $this->simpleQuery($v4ab6af2707db3b31783c279700eba64e);$v663ccf380acaf3f549f1612654dc109d = isset($result[0])?(int) $result[0]['abs']:0;$v7e39dc59e42d6a92b9ce147c1143465d = $this->simpleQuery("SELECT SQL_CALC_FOUND_ROWS COUNT(*) AS `abs`, COUNT(*) / @all * 100 AS `rel`, `p`.`section` FROM `cms_stat_pages` `p`
                                     INNER JOIN `cms_stat_hits` `h` ON `h`.`page_id` = `p`.`id`
                                     ".$this->getUserFilterTable('id', 'h.path_id')."
                                      WHERE `date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p")  . $this->getUserFilterWhere(). "
                                       GROUP BY `p`.`section`
                                        ORDER BY `abs` DESC
                                         LIMIT " . $this->offset . ", " . $this->limit, true);return array("all"=>$v7e39dc59e42d6a92b9ce147c1143465d['result'], "summ"=>$v663ccf380acaf3f549f1612654dc109d, "total"=>$v7e39dc59e42d6a92b9ce147c1143465d['FOUND_ROWS']);}public function getIncluded($v73d5342eba070f636ac3246f319bf77f)    {l_mysql_query("SET @all = (SELECT COUNT(*) FROM `cms_stat_pages` `p`
                     INNER JOIN `cms_stat_hits` `h` ON `h`.`page_id` = `p`.`id`
                      WHERE `p`.`section` = '" . mysql_real_escape_string($v73d5342eba070f636ac3246f319bf77f) . "' AND `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . ")");$result = $this->simpleQuery("SELECT COUNT(*) AS `summ` FROM `cms_stat_pages` `p`
                                     INNER JOIN `cms_stat_hits` `h` ON `h`.`page_id` = `p`.`id`
                                      WHERE `p`.`section` = '" . mysql_real_escape_string($v73d5342eba070f636ac3246f319bf77f) . "' AND `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p"));$v663ccf380acaf3f549f1612654dc109d = (int) $result[0]['summ'];$v7e39dc59e42d6a92b9ce147c1143465d = $this->simpleQuery("SELECT SQL_CALC_FOUND_ROWS COUNT(*) AS `abs`, COUNT(*) / @all * 100 AS `rel`, `p`.`uri`, `p`.`section`, UNIX_TIMESTAMP(`h`.`date`) AS `ts` FROM `cms_stat_pages` `p`
                                     INNER JOIN `cms_stat_hits` `h` ON `h`.`page_id` = `p`.`id`
                                      WHERE `p`.`section` = '" . mysql_real_escape_string($v73d5342eba070f636ac3246f319bf77f) . "' AND `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . "
                                       GROUP BY `p`.`id`
                                        ORDER BY `abs` DESC
                                         LIMIT " . $this->offset . ", " . $this->limit, true);$v7b9871fa1269e3c4148e01b2ad340af9 = array("all"=>$v7e39dc59e42d6a92b9ce147c1143465d['result'], "summ"=>$v663ccf380acaf3f549f1612654dc109d, "total"=>$v7e39dc59e42d6a92b9ce147c1143465d['FOUND_ROWS']);return $v7b9871fa1269e3c4148e01b2ad340af9;}}?>