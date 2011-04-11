<?php
class sourcesSummary extends simpleStat{public function get()    {$v88b385b4c21f1c1570db6d8193d769d1 = $this->getHostSQL("p");l_mysql_query("SET @all = (SELECT COUNT(*) AS `cnt` FROM `cms_stat_paths` `p`
                      WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . " " . $v88b385b4c21f1c1570db6d8193d769d1 . ")");$result['detail'] = $this->simpleQuery("(SELECT COUNT(*) AS `cnt`, COUNT(*) / @all * 100 AS `abs`, 'sites' AS `type`, `d`.`name` AS `name` FROM `cms_stat_paths` `p`
                                                 INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                                  INNER JOIN `cms_stat_sources_sites` `ss` ON `s`.`concrete_src_id` = `ss`.`id`
                                                   INNER JOIN `cms_stat_sources_sites_domains` `d` ON `d`.`id` = `ss`.`domain`
                                                    WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . " " . $v31a87d536ace07ee138cb4811eb87d06 . " AND `s`.`src_type` = 1
                                                     GROUP BY `d`.`id`)

                                                     UNION
                                                (
                                                SELECT COUNT(*) AS `cnt`, COUNT(*) / @all * 100 AS `abs`, 'search' AS `type`, `sse`.`name` AS `name` FROM `cms_stat_paths` `p`
                                                 INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                                  INNER JOIN `cms_stat_sources_search` `ss` ON `ss`.`id` = `s`.`concrete_src_id`
                                                   INNER JOIN `cms_stat_sources_search_engines` `sse` ON `sse`.`id` = `ss`.`engine_id`
                                                    WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . " " . $v88b385b4c21f1c1570db6d8193d769d1 . " AND `s`.`src_type` = 2
                                                     GROUP BY `sse`.`id`)

                                                     UNION
                                                (
                                                SELECT COUNT(*) AS `cnt`, COUNT(*) / @all * 100 AS `abs`, 'pr' AS `type`, `pr`.`name` AS `name`  FROM `cms_stat_paths` `p`
                                                 INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                                  INNER JOIN `cms_stat_sources_pr` `pr` ON `pr`.`id` = `s`.`concrete_src_id`
                                                   WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . " " . $v88b385b4c21f1c1570db6d8193d769d1 . " AND `s`.`src_type` = 3
                                                    GROUP BY `pr`.`id`)

                                                    UNION
                                                (
                                                SELECT COUNT(*) AS `cnt`, COUNT(*) / @all * 100 AS `abs`, 'ticket' AS `type`, `t`.`name` AS `name` FROM `cms_stat_paths` `p`
                                                 INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                                  INNER JOIN `cms_stat_sources_ticket` `t` ON `t`.`id` = `s`.`concrete_src_id`
                                                   WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . " " . $v88b385b4c21f1c1570db6d8193d769d1 . " AND `s`.`src_type` = 4
                                                    GROUP BY `t`.`id`)

                                                    UNION
                                                (
                                                SELECT COUNT(*) AS `cnt`, COUNT(*) / @all * 100 AS `abs`, 'coupon' AS `type`, `c`.`descript` AS `name` FROM `cms_stat_paths` `p`
                                                 INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                                  INNER JOIN `cms_stat_sources_coupon` `c` ON `c`.`id` = `s`.`concrete_src_id`
                                                   WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . " " . $v88b385b4c21f1c1570db6d8193d769d1 . " AND `s`.`src_type` = 5
                                                    GROUP BY `c`.`id`)

                                                    UNION
                                                (
                                                SELECT COUNT(*) AS `cnt`, COUNT(*) / @all * 100 AS `abs`, 'direct' AS `type`, 'direct' AS `name` FROM `cms_stat_paths` `p`
                                                   WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . " " . $v88b385b4c21f1c1570db6d8193d769d1 . " AND `p`.`source_id` = 0)

                                                ORDER BY `cnt` DESC
                                                 LIMIT " . $this->offset . ", " . $this->limit);$result['segments'] = $this->simpleQuery("SELECT COUNT(*) AS `cnt`, COUNT(*) / @all * 100 AS `cnt`, `type` FROM (
                                                    (SELECT COUNT(*) AS `cnt`, COUNT(*) / @all * 100 AS `abs`, 'sites' AS `type`, `d`.`name` AS `name` FROM `cms_stat_paths` `p`
                                                     INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                                      INNER JOIN `cms_stat_sources_sites` `ss` ON `s`.`concrete_src_id` = `ss`.`id`
                                                       INNER JOIN `cms_stat_sources_sites_domains` `d` ON `d`.`id` = `ss`.`domain`
                                                        WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . " " . $v88b385b4c21f1c1570db6d8193d769d1 . " AND `s`.`src_type` = 1
                                                         GROUP BY `d`.`id`)

                                                         UNION
                                                    (
                                                    SELECT COUNT(*) AS `cnt`, COUNT(*) / @all * 100 AS `abs`, 'search' AS `type`, `sse`.`name` AS `name` FROM `cms_stat_paths` `p`
                                                     INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                                      INNER JOIN `cms_stat_sources_search` `ss` ON `ss`.`id` = `s`.`concrete_src_id`
                                                       INNER JOIN `cms_stat_sources_search_engines` `sse` ON `sse`.`id` = `ss`.`engine_id`
                                                        WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . "  " . $v88b385b4c21f1c1570db6d8193d769d1 . " AND `s`.`src_type` = 2
                                                         GROUP BY `sse`.`id`)

                                                         UNION
                                                    (
                                                    SELECT COUNT(*) AS `cnt`, COUNT(*) / @all * 100 AS `abs`, 'pr' AS `type`, `pr`.`name` AS `name`  FROM `cms_stat_paths` `p`
                                                     INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                                      INNER JOIN `cms_stat_sources_pr` `pr` ON `pr`.`id` = `s`.`concrete_src_id`
                                                       WHERE `p`.`date` BETWEEN " . $this->getQueryInterval()  . $this->getUserFilterWhere('p') . " " . $v88b385b4c21f1c1570db6d8193d769d1 . " AND `s`.`src_type` = 3
                                                        GROUP BY `pr`.`id`)

                                                        UNION
                                                    (
                                                    SELECT COUNT(*) AS `cnt`, COUNT(*) / @all * 100 AS `abs`, 'ticket' AS `type`, `t`.`name` AS `name` FROM `cms_stat_paths` `p`
                                                     INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                                      INNER JOIN `cms_stat_sources_ticket` `t` ON `t`.`id` = `s`.`concrete_src_id`
                                                       WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . " " . $v88b385b4c21f1c1570db6d8193d769d1 . " AND `s`.`src_type` = 4
                                                        GROUP BY `t`.`id`)

                                                        UNION
                                                    (
                                                    SELECT COUNT(*) AS `cnt`, COUNT(*) / @all * 100 AS `abs`, 'coupon' AS `type`, `c`.`descript` AS `name` FROM `cms_stat_paths` `p`
                                                     INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                                      INNER JOIN `cms_stat_sources_coupon` `c` ON `c`.`id` = `s`.`concrete_src_id`
                                                       WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . "  " . $v88b385b4c21f1c1570db6d8193d769d1 . " AND `s`.`src_type` = 5
                                                        GROUP BY `c`.`id`)

                                                        UNION
                                                    (
                                                    SELECT COUNT(*) AS `cnt`, COUNT(*) / @all * 100 AS `abs`, 'direct' AS `type`, 'direct' AS `name` FROM `cms_stat_paths` `p`
                                                       WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . $this->getUserFilterWhere('p')  . "  " . $v88b385b4c21f1c1570db6d8193d769d1 . " AND `p`.`source_id` = 0)
                                                    ) `tmp`
                                                    GROUP BY `tmp`.`type`
                                                     ORDER BY `cnt` DESC
                                                      LIMIT " . $this->offset . ", " . $this->limit);return $result;}}?>