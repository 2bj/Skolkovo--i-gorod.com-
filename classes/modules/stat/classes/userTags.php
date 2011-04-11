<?php
class userTags extends simpleStat{protected $params = array('user_id' => 0);public function get()    {$result = array();if ((int)$this->params['user_id']) {l_mysql_query("DROP TEMPORARY TABLE IF EXISTS `tmp_collected_labels`");l_mysql_query("CREATE TEMPORARY TABLE `tmp_collected_labels` (`id` INT, `name` CHAR(255), `description` CHAR(255), KEY `id` (`id`)) ENGINE = MEMORY");l_mysql_query("INSERT INTO `tmp_collected_labels` SELECT IFNULL(`e2`.`id`, `e`.`id`), IFNULL(`e2`.`name`, `e`.`name`), IFNULL(`e2`.`description`, `e`.`description`) FROM `cms_stat_hits` `h`
                             INNER JOIN `cms_stat_paths` `p` ON `p`.`id` = `h`.`path_id`
                              INNER JOIN `cms_stat_events_collected` `ec` ON `ec`.`hit_id` = `h`.`id`
                               INNER JOIN `cms_stat_events` `e` ON `e`.`id` = `ec`.`event_id`
                                LEFT JOIN `cms_stat_events_rel` `er` ON `er`.`metaevent_id` = `e`.`id`
                                 LEFT JOIN `cms_stat_events` `e2` ON `e2`.`id` = `er`.`event_id`
                                  WHERE `p`.`date` BETWEEN " . $this->getQueryInterval() . " AND `p`.`user_id` = " . (int)$this->params['user_id'] . " AND `e`.`type` = 2");$result['labels']['top'] = $this->simpleQuery("SELECT COUNT(*) AS `cnt`, `name` as `tag` FROM `tmp_collected_labels`
                                         GROUP BY `id`
                                          ORDER BY `cnt` DESC");unset($vfa816edb83e95bf0c8da580bdfd491ef);}return $result;}}?>