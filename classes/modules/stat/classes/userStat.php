<?php
class userStat extends simpleStat{protected $params = array('user_id' => 0);public function get()    {$result = array();$v88b385b4c21f1c1570db6d8193d769d1 = $this->getHostSQL("p");if ((int)$this->params['user_id']) {$vfa816edb83e95bf0c8da580bdfd491ef = $this->simpleQuery("SELECT `login`, UNIX_TIMESTAMP(`first_visit`) AS `first_visit`, `o`.`name` AS `os`, `b`.`name` AS `browser`, `location`, `js_version` FROM `cms_stat_users` `u`
                                             INNER JOIN `cms_stat_users_os` `o` ON `o`.`id` = `u`.`os_id`
                                              INNER JOIN `cms_stat_users_browsers` `b` ON `b`.`id` = `u`.`browser_id`
                                               WHERE `u`.`id` = " . (int)$this->params['user_id']);if (!isset($vfa816edb83e95bf0c8da580bdfd491ef[0])) {$vfa816edb83e95bf0c8da580bdfd491ef[0] = array('first_visit' => 0, 'name' => '', 'os' => 'browser', 'location' => '', 'js_version' => '');}$result = $vfa816edb83e95bf0c8da580bdfd491ef[0];unset($vfa816edb83e95bf0c8da580bdfd491ef);l_mysql_query("SET @visits_count = (SELECT COUNT(*) AS `visits_cnt` FROM `cms_stat_paths` `p`
                         INNER JOIN `cms_stat_users` `u` ON `p`.`user_id` = `u`.`id`
                          WHERE " . $v88b385b4c21f1c1570db6d8193d769d1 . " AND `p`.`user_id` = " . (int)$this->params['user_id'] . ")");$vfa816edb83e95bf0c8da580bdfd491ef = $this->simpleQuery("SELECT @visits_count AS `cnt`");$result['visit_count'] = $vfa816edb83e95bf0c8da580bdfd491ef[0]['cnt'];unset($vfa816edb83e95bf0c8da580bdfd491ef);l_mysql_query("SET @first_path = (SELECT MIN(`id`) FROM `cms_stat_paths` WHERE `user_id` = " . (int)$this->params['user_id'] . ")");$vfa816edb83e95bf0c8da580bdfd491ef = $this->simpleQuery("SELECT `src_type`, `concrete_src_id` FROM `cms_stat_paths` `p`
                                         INNER JOIN `cms_stat_sources` `s` ON `p`.`source_id` = `s`.`id`
                                          WHERE `p`.`id` = @first_path" . $this->getUserFilterWhere('p') );if (isset($vfa816edb83e95bf0c8da580bdfd491ef[0])) {$vfa816edb83e95bf0c8da580bdfd491ef = $vfa816edb83e95bf0c8da580bdfd491ef[0];$vfa816edb83e95bf0c8da580bdfd491ef = $this->simpleQuery("(SELECT 'sites' AS `type`, `d`.`name` AS `name` FROM `cms_stat_paths` `p`
                                         INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                          INNER JOIN `cms_stat_sources_sites` `ss` ON `s`.`concrete_src_id` = `ss`.`id`
                                           INNER JOIN `cms_stat_sources_sites_domains` `d` ON `d`.`id` = `ss`.`domain`
                                            WHERE `s`.`src_type` = 1 AND `s`.`src_type` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['src_type'] . " AND `s`.`concrete_src_id` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['concrete_src_id']  . $this->getUserFilterWhere('p') . "
                                             )

                                             UNION
                                        (
                                        SELECT 'search' AS `type`, `sse`.`name` AS `name` FROM `cms_stat_paths` `p`
                                         INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                          INNER JOIN `cms_stat_sources_search` `ss` ON `ss`.`id` = `s`.`concrete_src_id`
                                           INNER JOIN `cms_stat_sources_search_engines` `sse` ON `sse`.`id` = `ss`.`engine_id`
                                            WHERE `s`.`src_type` = 2  AND `s`.`src_type` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['src_type'] . " AND `s`.`concrete_src_id` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['concrete_src_id']  . $this->getUserFilterWhere('p') . "
                                             )

                                             UNION
                                        (
                                        SELECT 'pr' AS `type`, `pr`.`name` AS `name`  FROM `cms_stat_paths` `p`
                                         INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                          INNER JOIN `cms_stat_sources_pr` `pr` ON `pr`.`id` = `s`.`concrete_src_id`
                                           WHERE `s`.`src_type` = 3 AND `s`.`src_type` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['src_type'] . " AND `s`.`concrete_src_id` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['concrete_src_id']  . $this->getUserFilterWhere('p') . "
                                            )

                                            UNION
                                        (
                                        SELECT 'ticket' AS `type`, `t`.`name` AS `name` FROM `cms_stat_paths` `p`
                                         INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                          INNER JOIN `cms_stat_sources_ticket` `t` ON `t`.`id` = `s`.`concrete_src_id`
                                           WHERE `s`.`src_type` = 4 AND `s`.`src_type` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['src_type'] . " AND `s`.`concrete_src_id` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['concrete_src_id']  . $this->getUserFilterWhere('p') . "
                                            )

                                            UNION
                                        (
                                        SELECT 'coupon' AS `type`, `c`.`descript` AS `name` FROM `cms_stat_paths` `p`
                                         INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                          INNER JOIN `cms_stat_sources_coupon` `c` ON `c`.`id` = `s`.`concrete_src_id`
                                           WHERE `s`.`src_type` = 5 AND `s`.`src_type` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['src_type'] . " AND `s`.`concrete_src_id` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['concrete_src_id']  . $this->getUserFilterWhere('p') . "
                                            )

                                            UNION
                                        (
                                        SELECT 'direct' AS `type`, 'direct' AS `name` FROM `cms_stat_paths` `p`
                                           WHERE `p`.`source_id` = 0 AND 0 = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['src_type'] . $this->getUserFilterWhere('p')  . ")");$result['source'] = $vfa816edb83e95bf0c8da580bdfd491ef[0];unset($vfa816edb83e95bf0c8da580bdfd491ef);}$vfa816edb83e95bf0c8da580bdfd491ef = $this->simpleQuery("SELECT IF(MAX(`number_in_path`) > 1, 0, 1) AS `first_visit_refuse` FROM `cms_stat_hits` `h`
                                         WHERE `h`.`path_id` = @first_path;");$result['first_visit_refuse'] = (string)$vfa816edb83e95bf0c8da580bdfd491ef[0]['first_visit_refuse'];unset($vfa816edb83e95bf0c8da580bdfd491ef);$result['first_path'] = $this->simpleQuery("SELECT `p`.`id`, `p`.`uri` FROM `cms_stat_hits` `h`
                                         INNER JOIN `cms_stat_pages` `p` ON `h`.`page_id` = `p`.`id`
                                          WHERE `h`.`path_id` = @first_path
                                           ORDER BY `h`.`id`");$vfa816edb83e95bf0c8da580bdfd491ef = $this->simpleQuery("SELECT  ( UNIX_TIMESTAMP(MAX(`date`)) - UNIX_TIMESTAMP(MIN(`date`)) ) / (COUNT(*) - 1) / 3600 / 24  AS `days` FROM `cms_stat_paths`
                                         WHERE `date` BETWEEN " . $this->getQueryInterval() . " AND " . $this->getHostSQL() . " AND `user_id` = " . (int)$this->params['user_id']);$result['visit_frequency'] = $vfa816edb83e95bf0c8da580bdfd491ef[0]['days'];unset($vfa816edb83e95bf0c8da580bdfd491ef);$vfa816edb83e95bf0c8da580bdfd491ef = $this->simpleQuery("SELECT COUNT(*) AS `abs`, COUNT(*) / @visits_count * 100 AS `rel`  FROM `cms_stat_hits` `h`
                                         INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `h`.`path_id`
                                          LEFT JOIN `cms_stat_hits` `h2` ON `h2`.`path_id` = `h`.`path_id` AND `h2`.`number_in_path` = 2
                                           WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " AND `h`.`number_in_path` = 1 AND `h2`.`id` IS NULL AND `p`.`user_id` = " . (int)$this->params['user_id'] . "  " . $v88b385b4c21f1c1570db6d8193d769d1);$result['refuse_frequency'] = $vfa816edb83e95bf0c8da580bdfd491ef[0];unset($vfa816edb83e95bf0c8da580bdfd491ef);l_mysql_query("SET @hits_count = (SELECT COUNT(*) FROM `cms_stat_hits` `h`
                         INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `h`.`path_id`
                          INNER JOIN `cms_stat_pages` `pg` ON `pg`.`id` = `h`.`page_id`
                           WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " AND `p`.`user_id` = " . (int)$this->params['user_id'] . " " . $v88b385b4c21f1c1570db6d8193d769d1 . ")");$result['top_pages'] = $this->simpleQuery("SELECT COUNT(*) AS `abs`, COUNT(*) / @hits_count * 100 AS `rel`, `pg`.`id`, `pg`.`uri` FROM `cms_stat_hits` `h`
                                         INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `h`.`path_id`
                                          INNER JOIN `cms_stat_pages` `pg` ON `pg`.`id` = `h`.`page_id`
                                           WHERE `h`.`date` BETWEEN " . $this->getQueryInterval() . " AND `p`.`user_id` = " . (int)$this->params['user_id'] . "
                                            GROUP BY `pg`.`id`
                                             ORDER BY `abs` DESC
                                              LIMIT " . $this->offset . ", " . $this->limit);$vfa816edb83e95bf0c8da580bdfd491ef = $this->simpleQuery("SELECT UNIX_TIMESTAMP(`p`.`date`) AS `last_visit`, `s`.`concrete_src_id`, `s`.`src_type` FROM `cms_stat_paths` `p`
                                         INNER JOIN `cms_stat_sources` `s` ON `p`.`source_id` = `s`.`id`
                                          WHERE `p`.`user_id` = " . (int)$this->params['user_id'] . " " . $v88b385b4c21f1c1570db6d8193d769d1 . "
                                           ORDER BY `p`.`id` DESC
                                            LIMIT 1");if (isset($vfa816edb83e95bf0c8da580bdfd491ef[0])) {$result['last_visit'] = $vfa816edb83e95bf0c8da580bdfd491ef[0]['last_visit'];$vfa816edb83e95bf0c8da580bdfd491ef = $vfa816edb83e95bf0c8da580bdfd491ef[0];$vfa816edb83e95bf0c8da580bdfd491ef = $this->simpleQuery("(SELECT 'sites' AS `type`, `d`.`name` AS `name` FROM `cms_stat_paths` `p`
                                         INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                          INNER JOIN `cms_stat_sources_sites` `ss` ON `s`.`concrete_src_id` = `ss`.`id`
                                           INNER JOIN `cms_stat_sources_sites_domains` `d` ON `d`.`id` = `ss`.`domain`
                                            WHERE `s`.`src_type` = 1 AND `s`.`src_type` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['src_type'] . " AND `s`.`concrete_src_id` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['concrete_src_id'] . "
                                             )

                                             UNION
                                        (
                                        SELECT 'search' AS `type`, `sse`.`name` AS `name` FROM `cms_stat_paths` `p`
                                         INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                          INNER JOIN `cms_stat_sources_search` `ss` ON `ss`.`id` = `s`.`concrete_src_id`
                                           INNER JOIN `cms_stat_sources_search_engines` `sse` ON `sse`.`id` = `ss`.`engine_id`
                                            WHERE `s`.`src_type` = 2  AND `s`.`src_type` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['src_type'] . " AND `s`.`concrete_src_id` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['concrete_src_id'] . "
                                             )

                                             UNION
                                        (
                                        SELECT 'pr' AS `type`, `pr`.`name` AS `name`  FROM `cms_stat_paths` `p`
                                         INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                          INNER JOIN `cms_stat_sources_pr` `pr` ON `pr`.`id` = `s`.`concrete_src_id`
                                           WHERE `s`.`src_type` = 3 AND `s`.`src_type` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['src_type'] . " AND `s`.`concrete_src_id` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['concrete_src_id'] . "
                                            )

                                            UNION
                                        (
                                        SELECT 'ticket' AS `type`, `t`.`name` AS `name` FROM `cms_stat_paths` `p`
                                         INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                          INNER JOIN `cms_stat_sources_ticket` `t` ON `t`.`id` = `s`.`concrete_src_id`
                                           WHERE `s`.`src_type` = 4 AND `s`.`src_type` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['src_type'] . " AND `s`.`concrete_src_id` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['concrete_src_id'] . "
                                            )

                                            UNION
                                        (
                                        SELECT 'coupon' AS `type`, `c`.`descript` AS `name` FROM `cms_stat_paths` `p`
                                         INNER JOIN `cms_stat_sources` `s` ON `s`.`id` = `p`.`source_id`
                                          INNER JOIN `cms_stat_sources_coupon` `c` ON `c`.`id` = `s`.`concrete_src_id`
                                           WHERE `s`.`src_type` = 5 AND `s`.`src_type` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['src_type'] . " AND `s`.`concrete_src_id` = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['concrete_src_id'] . "
                                            )

                                            UNION
                                        (
                                        SELECT 'direct' AS `type`, 'direct' AS `name` FROM `cms_stat_paths` `p`
                                           WHERE `p`.`source_id` = 0 AND 0 = " . (int)$vfa816edb83e95bf0c8da580bdfd491ef['src_type'] . ")");$result['last_source'] = $vfa816edb83e95bf0c8da580bdfd491ef[0];unset($vfa816edb83e95bf0c8da580bdfd491ef);}l_mysql_query("SET @last_path = (SELECT `p`.`id` FROM `cms_stat_paths` `p`
                         WHERE `p`.`user_id` = " . (int)$this->params['user_id'] . "  " . $v88b385b4c21f1c1570db6d8193d769d1 . "
                          ORDER BY `p`.`id` DESC
                           LIMIT 1)");$vfa816edb83e95bf0c8da580bdfd491ef = $this->simpleQuery("SELECT IF(MAX(`number_in_path`) > 1, 0, 1) AS `last_visit_refuse` FROM `cms_stat_hits` `h`
                                 WHERE `h`.`path_id` = @last_path");$result['last_visit_refuse'] = (string)$vfa816edb83e95bf0c8da580bdfd491ef[0]['last_visit_refuse'];unset($vfa816edb83e95bf0c8da580bdfd491ef);$result['last_path'] = $this->simpleQuery("SELECT `p`.`id`, `p`.`uri` FROM `cms_stat_hits` `h`
                                                         INNER JOIN `cms_stat_pages` `p` ON `h`.`page_id` = `p`.`id`
                                                          WHERE `h`.`path_id` = @last_path
                                                           ORDER BY `h`.`id`");l_mysql_query("DROP TEMPORARY TABLE IF EXISTS `tmp_collected_events`");l_mysql_query("CREATE TEMPORARY TABLE `tmp_collected_events` (`id` INT, `name` CHAR(255), `description` CHAR(255), `profit` float(9,2), KEY `id` (`id`)) ENGINE = MEMORY");l_mysql_query("INSERT INTO `tmp_collected_events` SELECT IFNULL(`e2`.`id`, `e`.`id`), IFNULL(`e2`.`name`, `e`.`name`), IFNULL(`e2`.`description`, `e`.`description`), IFNULL(`e2`.`profit`, `e`.`profit`) FROM `cms_stat_hits` `h`
                             INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `h`.`path_id`
                              INNER JOIN `cms_stat_events_collected` `ec` ON `ec`.`hit_id` = `h`.`id`
                               INNER JOIN `cms_stat_events` `e` ON `e`.`id` = `ec`.`event_id`
                                LEFT JOIN `cms_stat_events_rel` `er` ON `er`.`metaevent_id` = `e`.`id`
                                 LEFT JOIN `cms_stat_events` `e2` ON `e2`.`id` = `er`.`event_id`
                                  WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . " AND `p`.`user_id` = " . (int)$this->params['user_id'] . " AND `e`.`type` = 1  " . $v88b385b4c21f1c1570db6d8193d769d1);$result['collected_events'] = $this->simpleQuery("SELECT COUNT(*) AS `cnt`, `name`, `description` FROM `tmp_collected_events`
                                                                 GROUP BY `id`
                                                                  ORDER BY `cnt` DESC");$vfa816edb83e95bf0c8da580bdfd491ef = $this->simpleQuery("SELECT SUM(`profit`) AS `profit` FROM `tmp_collected_events`");$result['profit'] = $vfa816edb83e95bf0c8da580bdfd491ef[0]['profit'];unset($vfa816edb83e95bf0c8da580bdfd491ef);l_mysql_query("DROP TEMPORARY TABLE IF EXISTS `tmp_collected_labels`");l_mysql_query("CREATE TEMPORARY TABLE `tmp_collected_labels` (`id` INT, `name` CHAR(255), `description` CHAR(255), KEY `id` (`id`)) ENGINE = MEMORY");l_mysql_query("INSERT INTO `tmp_collected_labels` SELECT IFNULL(`e2`.`id`, `e`.`id`), IFNULL(`e2`.`name`, `e`.`name`), IFNULL(`e2`.`description`, `e`.`description`) FROM `cms_stat_hits` `h`
                             INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `h`.`path_id`
                              INNER JOIN `cms_stat_events_collected` `ec` ON `ec`.`hit_id` = `h`.`id`
                               INNER JOIN `cms_stat_events` `e` ON `e`.`id` = `ec`.`event_id`
                                LEFT JOIN `cms_stat_events_rel` `er` ON `er`.`metaevent_id` = `e`.`id`
                                 LEFT JOIN `cms_stat_events` `e2` ON `e2`.`id` = `er`.`event_id`
                                  WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . " AND `p`.`user_id` = " . (int)$this->params['user_id'] . " AND `e`.`type` = 2");$result['labels']['top'] = $this->simpleQuery("SELECT COUNT(*) AS `cnt`, `name`, `description` FROM `tmp_collected_labels`
                                         GROUP BY `id`
                                          ORDER BY `cnt` DESC");unset($vfa816edb83e95bf0c8da580bdfd491ef);}return $result;}}?>