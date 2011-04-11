<?php
class fastUserTags extends simpleStat{protected $params = array('user_id' => 0);public function get()    {$result = array();$ve8701ad48ba05a91604e480dd60899a3 = (int) $this->params['user_id'];$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
SELECT DISTINCT
STRAIGHT_JOIN se.name AS `tag` , COUNT( se.name ) AS `cnt` , sec.hit_id
FROM cms_stat_paths sp, cms_stat_hits sh, cms_stat_events_collected sec, cms_stat_events se
WHERE sp.user_id = '{$ve8701ad48ba05a91604e480dd60899a3}'
AND sh.path_id = sp.id
AND sec.hit_id = sh.id
AND se.id = sec.event_id
AND se.type =2
GROUP BY se.name
ORDER BY cnt DESC
SQL; $v64bc6a1e5375a5043bc2422a10dfb93d = l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);$result['labels'] = Array();while($vf1965a857bc285d26fe22023aa5ab50d = mysql_fetch_assoc($v64bc6a1e5375a5043bc2422a10dfb93d)) {$result['labels'][] = $vf1965a857bc285d26fe22023aa5ab50d;}return $result;}}?>