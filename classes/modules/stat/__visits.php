<?php
abstract class __stat_visits extends baseModuleAdmin {public function visits_hits() {$this->updateFilter();$v3086f2e00ea19967e011c652edfc2884 = getRequest('param0');$ve1ba980ce14a8c0d7e2779f895ab8695 = (int) getRequest('p');$v7982b1e077e535e00dc62cf8d6e9a455 = cmsController::getInstance()->getCurrentDomain()->getHost();$v23a2cbb13502e40ff869bbfa3211fc9b = cmsController::getInstance()->getCurrentLang()->getPrefix();$v5430f956c571aa9e86e91947b5da11a2 = '/'.$v23a2cbb13502e40ff869bbfa3211fc9b.'/admin/stat/'.__FUNCTION__;$v4062f8ff37e55691af3f19fac2155cf9 = '';$v9549dd6065d019211460c59a86dd6536 = new statisticFactory(dirname(__FILE__) . '/classes');if ($v3086f2e00ea19967e011c652edfc2884 === 'xml') {}elseif ($v3086f2e00ea19967e011c652edfc2884 === 'xml1') {$v9549dd6065d019211460c59a86dd6536->isValid('visitCommon');$ve98d2f001da5678b39482efbdf5770dc = $v9549dd6065d019211460c59a86dd6536->get('visitCommon');$ve98d2f001da5678b39482efbdf5770dc->setStart($this->from_time);$ve98d2f001da5678b39482efbdf5770dc->setFinish($this->to_time);$ve98d2f001da5678b39482efbdf5770dc->setDomain($this->domain);$ve98d2f001da5678b39482efbdf5770dc->setUser($this->user);$result = $ve98d2f001da5678b39482efbdf5770dc->get();$v03f1bcf4bdfde045733bb97482344c55 = 0;$v58048d5700b450e117e35a9c095fa5cb = $result['summ'];$v233762765fbf2a8381bb11dac5c21b8f = $result['total'];$va985177e18afdab154ab615657ef1514 = "";$va985177e18afdab154ab615657ef1514 .= "<"."?xml version=\"1.0\" encoding=\"utf-8\"?".">\n";$va985177e18afdab154ab615657ef1514 .= <<<END
                <statistics> 
                 <report name="visitCommon" title="Динамика хитов по дням" host="{$v7982b1e077e535e00dc62cf8d6e9a455}" lang="{$v23a2cbb13502e40ff869bbfa3211fc9b}"  timerange_start="{$this->from_time}" timerange_finish="{$this->to_time}">
                <table>
                    <column field="timestamp" title="День" showas="date" valueSuffix="" prefix="" />
                    <column field="count"    title="Хитов (абсолютное значение)" valueSuffix="" prefix="" />
                    <column field="rel"      title="Хитов (относительное значение)" valueSuffix="%" prefix="" />
                </table>
                <chart type="column" drawTrendLine="true">
                    <argument field="timestamp" />
                    <value field="count" description="Количество хитов" axisTitle="Количество хитов" />
                    <caption field="date" />
                </chart>
                <data>\n
END;
                <statistics>
                <report name="visitCommonHours" title="Распеределение хитов по часам суток" host="{$v7982b1e077e535e00dc62cf8d6e9a455}" lang="{$v23a2cbb13502e40ff869bbfa3211fc9b}"  timerange_start="{$this->from_time}" timerange_finish="{$this->to_time}">
                <table>
                    <column field="hourint"  title="Часы" valueSuffix="" prefix="" />
                    <column field="count" title="Хитов (абсолютное значение)" valueSuffix="" prefix="" />
                    <column field="rel"   title="Хитов (относительное значение)" valueSuffix="%" prefix="" />
                </table>
                <chart type="line" drawTrendLine="true">
                    <argument field="hour" />
                    <value field="count" description="Количество хитов" axisTitle="Количество хитов" />
                    <caption field="hourint" />
                </chart>
                <data>\n
END;