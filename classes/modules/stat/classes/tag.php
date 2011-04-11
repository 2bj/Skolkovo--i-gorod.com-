<?php
class tag extends simpleStat {protected $params = array('tag_id' => 0);public function get() {$v242ce12d964f3c99336424f73158a1d4 = array();$va94ce50ec7c649aefc2936a423013e83    = "SELECT e.name, p.uri, COUNT(*) as 'count' 
                    FROM `cms_stat_events` e, `cms_stat_events_collected` ec, `cms_stat_hits` h, `cms_stat_pages` p, `cms_stat_paths` pth 
                    WHERE e.id = " . $this->params['tag_id'] . " 
                      AND ec.event_id = e.id 
                      AND ec.hit_id = h.id 
                      AND h.page_id = p.id
                      AND h.path_id = pth.id
                      AND pth.date BETWEEN " . $this->getQueryInterval() . "
                      " . $this->getHostSQL('e') . $this->getUserFilterWhere('pth')  . " 
                    GROUP BY p.id 
                    ORDER BY count DESC";$va4c92959ebccbf50db90861fa2cc3c6e  = l_mysql_query($va94ce50ec7c649aefc2936a423013e83);$vfd4065b8a1d04f40ee550f3c90201a01  = 0;while($vad4f3b23a9c1baee57e5d091271a0053 = mysql_fetch_assoc($va4c92959ebccbf50db90861fa2cc3c6e)) {$vfd4065b8a1d04f40ee550f3c90201a01    += $vad4f3b23a9c1baee57e5d091271a0053['count'];$v242ce12d964f3c99336424f73158a1d4[]  = $vad4f3b23a9c1baee57e5d091271a0053;}foreach($v242ce12d964f3c99336424f73158a1d4 as &$vad4f3b23a9c1baee57e5d091271a0053) {$vad4f3b23a9c1baee57e5d091271a0053['rel'] = (float)$vad4f3b23a9c1baee57e5d091271a0053['count'] / (float)$vfd4065b8a1d04f40ee550f3c90201a01;}return $v242ce12d964f3c99336424f73158a1d4;}}?>
