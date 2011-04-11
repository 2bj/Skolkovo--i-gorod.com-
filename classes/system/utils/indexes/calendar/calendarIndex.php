<?php
 class calendarIndex {public   $timeStart, $timeEnd;protected   $selector = null,   $index = null,   $year, $month;public function __construct(selector $v8be74552df93e31bbdd6b36ed74bdb6a) {$this->selector = $v8be74552df93e31bbdd6b36ed74bdb6a;}public function index($v972bf3f05d14ffbdb817bef60638ff00, $v84cdc76cabf41bd7c961f6ab12f117d8 = null, $v7436f942d5ea836cb84f1bb2527d8286 = null) {$this->setFieldName($v972bf3f05d14ffbdb817bef60638ff00);$this->year = is_null($v84cdc76cabf41bd7c961f6ab12f117d8) ? date('Y') : (int) $v84cdc76cabf41bd7c961f6ab12f117d8;$this->month = is_null($v7436f942d5ea836cb84f1bb2527d8286) ? date('m') : (int) $v7436f942d5ea836cb84f1bb2527d8286;$this->timeStart = strtotime($this->year . '-' . $this->month . '-' . 1);$this->timeEnd = strtotime($this->year . '-' . ($this->month + 1) . '-' . 1);$this->selector->where($v972bf3f05d14ffbdb817bef60638ff00)->between($this->timeStart, $this->timeEnd);$v6a992d5529f459a44fee58c733255e86 = $this->run();$result = array();$v44fdec47036f482b68b748f9d786801b = round($this->timeEnd - $this->timeStart) / (3600*24);for($v865c0c0b4ab0e063e5caa3387c1a8741 = 1;$v865c0c0b4ab0e063e5caa3387c1a8741 <= $v44fdec47036f482b68b748f9d786801b;$v865c0c0b4ab0e063e5caa3387c1a8741++) {$result[$v865c0c0b4ab0e063e5caa3387c1a8741] = (int) (isset($v6a992d5529f459a44fee58c733255e86[$v865c0c0b4ab0e063e5caa3387c1a8741]) ? $v6a992d5529f459a44fee58c733255e86[$v865c0c0b4ab0e063e5caa3387c1a8741] : 0);}return array(    'year'  => $this->year,    'month'  => $this->month,    'first-day' => ((int) date("w", $this->timeStart) + 6) % 7,    'days'  => $result   );}protected function run() {$permissions = permissionsCollection::getInstance();$v834239295ea6020233dda11b3d85af21 = $permissions->isSv();$v15d61712450a686a7f365adf4fef581f = $this->selector->mode;l_mysql_query("START TRANSACTION /* Get calendar index */");l_mysql_query("DROP TABLE IF EXISTS `calendar_index`");$vac5c74b64b4b8352ef2f181affb5ac2a = "CREATE TABLE `calendar_index` (";$vac5c74b64b4b8352ef2f181affb5ac2a .= "id int  unsigned not null)";l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);$v1b1cc7f086b3f074da452bc3129981eb = $this->selector->query();l_mysql_query("INSERT INTO `calendar_index` {$v1b1cc7f086b3f074da452bc3129981eb}");$v945100186b119048837b9859c2c46410 = $this->fieldId;$v80071f37861c360a27b7327e132c911a = selectorExecutor::getContentTableName($this->selector, $v945100186b119048837b9859c2c46410);if($v15d61712450a686a7f365adf4fef581f == 'pages') {$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
SELECT
	COUNT(`h`.`id`),
	DATE_FORMAT(FROM_UNIXTIME(`oc`.`int_val`), '%d') as `day`
FROM
	`calendar_index` `tmp`,
	`cms3_objects` `o`,
	`cms3_hierarchy` `h`,
	`cms3_object_content` `oc`
WHERE
	`h`.`id` = `tmp`.`id` AND
	`o`.`id` = `h`.`obj_id` AND
	`oc`.`obj_id` = `o`.`id` AND
	`oc`.`field_id` = '{$v945100186b119048837b9859c2c46410}' AND
	`oc`.`int_val` BETWEEN '{$this->timeStart}' AND '{$this->timeEnd}'
GROUP BY
	`day`
ORDER BY
	`day` ASC
SQL;   }else {$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
SELECT
	COUNT(`o`.`id`),
	DATE_FORMAT(FROM_UNIXTIME(`oc`.`int_val`), '%d') as `day`
FROM
	`calendar_index` `tmp`,
	`cms3_objects` `o`,
	`cms3_object_content` `oc`
WHERE
	`o`.`id` = `tmp`.`id` AND
	`oc`.`obj_id` = `o`.`id` AND
	`oc`.`field_id` = '{$v945100186b119048837b9859c2c46410}' AND
	`oc`.`int_val` BETWEEN '{$this->timeStart}' AND '{$this->timeEnd}'
GROUP BY
	`day`
ORDER BY
	`day` ASC
SQL;   }$result = l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);$v6a992d5529f459a44fee58c733255e86 = array();while(list($ve2942a04780e223b215eb8b663cf5353, $v628b7db04235f228d40adc671413a8c8) = mysql_fetch_row($result)) {$v6a992d5529f459a44fee58c733255e86[(int) $v628b7db04235f228d40adc671413a8c8] = $ve2942a04780e223b215eb8b663cf5353;}l_mysql_query("DROP TABLE IF EXISTS `calendar_index`");l_mysql_query("COMMIT");return $v6a992d5529f459a44fee58c733255e86;}protected function setFieldName($v972bf3f05d14ffbdb817bef60638ff00) {if($v945100186b119048837b9859c2c46410 = $this->selector->searchField($v972bf3f05d14ffbdb817bef60638ff00))    $this->fieldId = $v945100186b119048837b9859c2c46410;else throw new coreException("No field \"{$v972bf3f05d14ffbdb817bef60638ff00}\" not found in selector types list");}};?>