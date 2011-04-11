<?php
class sectionHitsIncluded extends simpleStat{protected $params = array('section' => '');public function get()    {l_mysql_query("SET @all = (SELECT COUNT(*) FROM `cms_stat_pages` `p`
                     INNER JOIN `cms_stat_hits` `h` ON `h`.`page_id` = `p`.`id`
                      WHERE `p`.`section` = '" . mysql_real_escape_string($this->params['section']) . "' AND `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . ")");return $this->simpleQuery("SELECT COUNT(*) AS `abs`, COUNT(*) / @all * 100 AS `rel`, `p`.`uri`, `p`.`section`, UNIX_TIMESTAMP(`h`.`date`) AS `ts` FROM `cms_stat_pages` `p`
                                     INNER JOIN `cms_stat_hits` `h` ON `h`.`page_id` = `p`.`id`
                                      WHERE `p`.`section` = '" . mysql_real_escape_string($this->params['section']) . "' AND `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . "
                                       GROUP BY `p`.`id`
                                        ORDER BY `abs` DESC
                                         LIMIT " . $this->offset . ", " . $this->limit);}}?>