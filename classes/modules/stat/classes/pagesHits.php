<?php
class pagesHits extends simpleStat{public function get()    {return $this->getAll();}private function getAll()    {$result = $this->simpleQuery("SELECT SQL_CACHE COUNT(*) as `total` FROM `cms_stat_hits` `h` FORCE INDEX(`date`)
                                     INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `h`.`path_id`
                                     WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p'));$v8016fd3f91b68b651801a7c279f41ea4 = (int) $result[0]['total'];$v7e39dc59e42d6a92b9ce147c1143465d = $this->simpleQuery("SELECT SQL_CACHE SQL_CALC_FOUND_ROWS COUNT(*) AS `abs`, COUNT(*) / ".$v8016fd3f91b68b651801a7c279f41ea4." * 100 AS `rel`, `h`.`page_id`, `p`.`uri` FROM `cms_stat_hits` `h`
                                    INNER JOIN `cms_stat_pages` `p` ON `p`.`id` = `h`.`page_id`
                                    ".$this->getUserFilterTable('id', 'h.path_id')."
                                     WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere() . "
                                      GROUP BY `page_id`
                                       ORDER BY `abs` DESC
                                        LIMIT " . $this->offset . ", " . $this->limit, true);return array("all"=>$v7e39dc59e42d6a92b9ce147c1143465d['result'], "summ"=>$v8016fd3f91b68b651801a7c279f41ea4, "total"=>$v7e39dc59e42d6a92b9ce147c1143465d['FOUND_ROWS']);}}?>