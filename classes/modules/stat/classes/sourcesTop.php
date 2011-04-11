<?php
class sourcesTop extends simpleStat{public function get()    {return $this->simpleQuery("(SELECT COUNT(*) AS `cnt`, 'sites' AS `type`, `d`.`name` AS `name` FROM `cms_stat_paths` `p`
                                     INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                      INNER JOIN `cms_stat_sources_sites` `ss` ON `s`.`concrete_src_id` = `ss`.`id`
                                       INNER JOIN `cms_stat_sources_sites_domains` `d` ON `d`.`id` = `ss`.`domain`
                                        WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . " " . $this->getHostSQL("p") . " AND `s`.`src_type` = 1
                                         GROUP BY `d`.`id`)

                                         UNION
                                    (
                                    SELECT COUNT(*) AS `cnt`, 'search' AS `type`, `sse`.`name` AS `name` FROM `cms_stat_paths` `p`
                                     INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                      INNER JOIN `cms_stat_sources_search` `ss` ON `ss`.`id` = `s`.`concrete_src_id`
                                       INNER JOIN `cms_stat_sources_search_engines` `sse` ON `sse`.`id` = `ss`.`engine_id`
                                        WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . "  " . $this->getHostSQL("p") . " AND `s`.`src_type` = 2
                                         GROUP BY `sse`.`id`)

                                         UNION
                                    (
                                    SELECT COUNT(*) AS `cnt`, 'pr' AS `type`, `pr`.`name` AS `name`  FROM `cms_stat_paths` `p`
                                     INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                      INNER JOIN `cms_stat_sources_pr` `pr` ON `pr`.`id` = `s`.`concrete_src_id`
                                       WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . " " . $this->getHostSQL("p") . " AND `s`.`src_type` = 3
                                        GROUP BY `pr`.`id`)

                                        UNION
                                    (
                                    SELECT COUNT(*) AS `cnt`, 'ticket' AS `type`, `t`.`name` AS `name` FROM `cms_stat_paths` `p`
                                     INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                      INNER JOIN `cms_stat_sources_ticket` `t` ON `t`.`id` = `s`.`concrete_src_id`
                                       WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . " " . $this->getHostSQL("p") . " AND `s`.`src_type` = 4
                                        GROUP BY `t`.`id`)

                                        UNION
                                    (
                                    SELECT COUNT(*) AS `cnt`, 'coupon' AS `type`, `c`.`descript` AS `name` FROM `cms_stat_paths` `p`
                                     INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                      INNER JOIN `cms_stat_sources_coupon` `c` ON `c`.`id` = `s`.`concrete_src_id`
                                       WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p') . " " . $this->getHostSQL("p") . " AND `s`.`src_type` = 5
                                        GROUP BY `c`.`id`)

                                        UNION
                                    (
                                    SELECT COUNT(*) AS `cnt`, 'direct' AS `type`, 'direct' AS `name` FROM `cms_stat_paths` `p`
                                       WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . " " . $this->getHostSQL("p") . " AND `p`.`source_id` = 0
                                        GROUP BY 'tmp')

                                    ORDER BY `cnt` DESC
                                     LIMIT " . $this->offset . ", " . $this->limit);}}?>