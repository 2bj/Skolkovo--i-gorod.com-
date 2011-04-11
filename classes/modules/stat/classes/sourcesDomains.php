<?php
class sourcesDomains extends simpleStat{public function get() {$v0e413ad7c08b77c867e2d87219f29e93 = $this->simpleQuery("SELECT COUNT(*) AS `cnt`  FROM `cms_stat_sources_sites` `ss`
									INNER JOIN `cms_stat_sources_sites_domains` `ssd` ON `ssd`.`id` = `ss`.`domain`
									 INNER JOIN `cms_stat_sources` `s` ON `s`.`concrete_src_id` = `ss`.`id` AND `s`.`src_type` = 1
									  INNER JOIN `cms_stat_paths` `p` ON `p`.`source_id` = `s`.`id`
									   WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p') . "
										 ORDER BY `cnt` DESC
										  LIMIT " . $this->offset . ", " . $this->limit);$v663ccf380acaf3f549f1612654dc109d = (int) $v0e413ad7c08b77c867e2d87219f29e93[0]['cnt'];$va181a603769c1f98ad927e7367c7aa51 = $this->simpleQuery("SELECT SQL_CALC_FOUND_ROWS COUNT(*) AS `cnt`, `ssd`.`name`, `ss`.`domain` AS `domain_id`  FROM `cms_stat_sources_sites` `ss`
									INNER JOIN `cms_stat_sources_sites_domains` `ssd` ON `ssd`.`id` = `ss`.`domain`
									 INNER JOIN `cms_stat_sources` `s` ON `s`.`concrete_src_id` = `ss`.`id` AND `s`.`src_type` = 1
									  INNER JOIN `cms_stat_paths` `p` ON `p`.`source_id` = `s`.`id`
									   WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . " " . $this->getHostSQL("p") . $this->getUserFilterWhere('p')  . "
										GROUP BY `ss`.`domain`
										 ORDER BY `cnt` DESC
										  LIMIT " . $this->offset . ", " . $this->limit);$v9b207167e5381c47682c6b4f58a623fb = $this->simpleQuery('SELECT FOUND_ROWS() as `total`');$v8016fd3f91b68b651801a7c279f41ea4 = (int) $v9b207167e5381c47682c6b4f58a623fb[0]['total'];return array("all"=> $va181a603769c1f98ad927e7367c7aa51, "summ"=>$v663ccf380acaf3f549f1612654dc109d, "total"=>$v8016fd3f91b68b651801a7c279f41ea4);}}?>