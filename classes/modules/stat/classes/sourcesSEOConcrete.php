<?php
class sourcesSEOConcrete extends simpleStat{protected $params = array('engine_id' => 0);public function get() {$v0e413ad7c08b77c867e2d87219f29e93 = $this->simpleQuery("SELECT COUNT(*) AS `cnt` FROM `cms_stat_sources` `s`
									INNER JOIN `cms_stat_sources_search` `ss` ON `s`.`concrete_src_id` = `ss`.`id`
									INNER JOIN `cms_stat_sources_search_queries` `ssq` ON `ssq`.`id` = `ss`.`text_id`
									INNER JOIN `cms_stat_paths` `p` ON `p`.`source_id` = `s`.`id`
										WHERE `s`.`src_type` = 2 AND `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . " AND `ss`.`engine_id` = " . (int)$this->params['engine_id'] . " " . $this->getHostSQL("p") . "
										ORDER BY `cnt` DESC");$v663ccf380acaf3f549f1612654dc109d = (int) $v0e413ad7c08b77c867e2d87219f29e93[0]['cnt'];$va181a603769c1f98ad927e7367c7aa51 = $this->simpleQuery("SELECT COUNT(*) AS `cnt`, `ssq`.`text` FROM `cms_stat_sources` `s`
									INNER JOIN `cms_stat_sources_search` `ss` ON `s`.`concrete_src_id` = `ss`.`id`
									INNER JOIN `cms_stat_sources_search_queries` `ssq` ON `ssq`.`id` = `ss`.`text_id`
									INNER JOIN `cms_stat_paths` `p` ON `p`.`source_id` = `s`.`id`
										WHERE `s`.`src_type` = 2 AND `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . " AND `ss`.`engine_id` = " . (int)$this->params['engine_id'] . " " . $this->getHostSQL("p") . "
										GROUP BY `ssq`.`id`
										ORDER BY `cnt` DESC");$v9b207167e5381c47682c6b4f58a623fb = $this->simpleQuery('SELECT FOUND_ROWS() as `total`');$v8016fd3f91b68b651801a7c279f41ea4 = (int) $v9b207167e5381c47682c6b4f58a623fb[0]['total'];return array("all"=>$va181a603769c1f98ad927e7367c7aa51, "summ"=>$v663ccf380acaf3f549f1612654dc109d, "total"=>$v8016fd3f91b68b651801a7c279f41ea4);}}?>