<?php
 abstract class __visitors_stat extends baseModuleAdmin {public function visitors() {$this->updateFilter();$v3086f2e00ea19967e011c652edfc2884 = getRequest('param0');$v7982b1e077e535e00dc62cf8d6e9a455 = cmsController::getInstance()->getCurrentDomain()->getHost();$v23a2cbb13502e40ff869bbfa3211fc9b = cmsController::getInstance()->getCurrentLang()->getPrefix();$v5430f956c571aa9e86e91947b5da11a2 = '/'.$v23a2cbb13502e40ff869bbfa3211fc9b.'/admin/stat/'.__FUNCTION__;$v4062f8ff37e55691af3f19fac2155cf9 = '';$v9549dd6065d019211460c59a86dd6536 = new statisticFactory(dirname(__FILE__) . '/classes');if ($v3086f2e00ea19967e011c652edfc2884 === 'xml1') {$v9549dd6065d019211460c59a86dd6536->isValid('visitersCommon');$ve98d2f001da5678b39482efbdf5770dc = $v9549dd6065d019211460c59a86dd6536->get('visitersCommon');$ve98d2f001da5678b39482efbdf5770dc->setStart($this->from_time);$ve98d2f001da5678b39482efbdf5770dc->setFinish($this->to_time);$ve98d2f001da5678b39482efbdf5770dc->setLimit(PHP_INT_MAX);$ve98d2f001da5678b39482efbdf5770dc->setOffset(0);$ve98d2f001da5678b39482efbdf5770dc->setDomain($this->domain);$ve98d2f001da5678b39482efbdf5770dc->setUser($this->user);$result = $ve98d2f001da5678b39482efbdf5770dc->get();$v03f1bcf4bdfde045733bb97482344c55 = 0;$v58048d5700b450e117e35a9c095fa5cb = $result['summ'];$v233762765fbf2a8381bb11dac5c21b8f = $result['total'];$va985177e18afdab154ab615657ef1514 = "";$va985177e18afdab154ab615657ef1514 .= "<"."?xml version=\"1.0\" encoding=\"utf-8\"?".">\n";$va985177e18afdab154ab615657ef1514 .= <<<END
					<statistics>
					<report name="visitCommon" title="Динамика захода посетителей за выбранный период по дням" host="{$v7982b1e077e535e00dc62cf8d6e9a455}" lang="{$v23a2cbb13502e40ff869bbfa3211fc9b}"  timerange_start="{$this->from_time}" timerange_finish="{$this->to_time}">
					<table>
						<column field="name" title="День" valueSuffix="" prefix="" />
						<column field="cnt" title="Сессий" valueSuffix="" prefix="" />
					</table>
					<chart type="column" drawTrendLine="true">
						<argument />
						<value field="cnt" description="Количество сессий" axisTitle="Количество сессий" />
						<caption field="name" />
					</chart>                    
					<data>
END;
					<statistics>
					<report name="visitCommonHours" title="Динамика захода посетителей за выбранный период по часам суток" host="{$v7982b1e077e535e00dc62cf8d6e9a455}" lang="{$v23a2cbb13502e40ff869bbfa3211fc9b}" timerange_start="{$this->from_time}" timerange_finish="{$this->to_time}">
					<table>
						<column field="name" title="Час" valueSuffix="" prefix="" />
						<column field="cnt" title="Сессий" valueSuffix="" prefix="" />
					</table>
					<chart type="line" drawTrendLine="true">
						<argument />
						<value field="cnt" description="Количество сессий" axisTitle="Количество сессий" />
						<caption field="name" />
					</chart>                    
					<data>
END;

<row>
	<col>{$v4a8a08f09d37b73795649038408b5f33}</col>

	<col>
		<a href="%pre_lang%/admin/stat/visitor/{$ve8701ad48ba05a91604e480dd60899a3}/"><![CDATA[{$v18566cda79f670c2098360799275aa31['browser']} ({$v18566cda79f670c2098360799275aa31['os']})]]></a>
	</col>

	<col>
		<![CDATA[{$v7ec725730ad08f671ee8e8b6736b0620}]]>
	</col>

	<col>
		<![CDATA[{$v191255bfb61514bea8f37c1f75c0a0ae}]]>
	</col>
</row>


ROW;
	<row>
		<col>
			$v4a8a08f09d37b73795649038408b5f33.
		</col>

		<col>
			<a href="$v9c502c0ace8194273cfb602536cdfa44"><![CDATA[{$vb73b19f3754a0e0b3972c787ac204174}]]></a>
		</col>


		<col>
			<![CDATA[$v9c502c0ace8194273cfb602536cdfa44]]>
		</col>
	</row>

END;
					<statistic report="visitCommonHours" title="Динамика захода посетителей за выбранный период по часам суток" host="{$v7982b1e077e535e00dc62cf8d6e9a455}" lang="{$v23a2cbb13502e40ff869bbfa3211fc9b}"  timerange_start="{$this->from_time}" timerange_finish="{$this->to_time}">
					<cols>
						<col name="name" title="Час" valueSuffix="" prefix="" />
						<col name="cnt" title="Посетителей" valueSuffix="" prefix="" />
					</cols>
					<reports>
						<report type="xml" title="xml" uri="{$v5430f956c571aa9e86e91947b5da11a2}/xml/{$v4062f8ff37e55691af3f19fac2155cf9}" />
						<report type="txt" title="txt" uri="{$v5430f956c571aa9e86e91947b5da11a2}/txt/{$v4062f8ff37e55691af3f19fac2155cf9}" />
						<report type="rfccsv" title="csv" uri="{$v5430f956c571aa9e86e91947b5da11a2}/rfccsv/{$v4062f8ff37e55691af3f19fac2155cf9}" />
						<report type="mscsv" title="xls" uri="{$v5430f956c571aa9e86e91947b5da11a2}/mscsv/{$v4062f8ff37e55691af3f19fac2155cf9}" />
					</reports>
					<details>
END;
		<statgraph w="100%" h="530" id="linear" align="middle" src="/images/cms/stat/line.swf" quality="high" bgcolor="#ffffff">
			<flashvar disable-output-escaping="yes"><![CDATA[xmlswf=/images/cms/stat/xml.swf&xmlini=/images/cms/stat/ini/ini.xml&xmlstat={$v5430f956c571aa9e86e91947b5da11a2}/xml/{$v4062f8ff37e55691af3f19fac2155cf9}]]></flashvar>
		</statgraph>
END;