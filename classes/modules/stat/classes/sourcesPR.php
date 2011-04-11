<?php
class sourcesPR extends simpleStat{public function get()    {return $this->simpleQuery("SELECT COUNT(*) AS `cnt`, `pr`.`name` AS `name`  FROM `cms_stat_paths` `p`
                                     INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                      INNER JOIN `cms_stat_sources_pr` `pr` ON `pr`.`id` = `s`.`concrete_src_id`
                                       WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p')  . " AND `s`.`src_type` = 3
                                        GROUP BY `pr`.`id`");}}?>