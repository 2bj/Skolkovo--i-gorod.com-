<?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/webo">

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:param name="host" />

	<xsl:template match="data[@type = 'list' and @action = 'view']">
		<div id="webo_in">
			<div class="panel">
				<div class="header">
					<span><xsl:text>&label-site-address;</xsl:text></span>
					<div class="l"></div>
					<div class="r"></div>
				</div>
				<div class="content">
					<form action="" method="get">
						<div class="field" style="height:20px;">
							<label><span><input type="text" name="host" value="{$host}" /></span></label>
						</div>
						<div class="buttons" style="padding-top:5px;">
							<div style="float:left;">
								<input type="submit" value="&label-button;" /><span class="l" /><span class="r" />
							</div>
						</div>
					</form>
					<xsl:if test="not(site)">
						<xsl:apply-templates select="group/option" mode="show-error" />
					</xsl:if>
					<xsl:apply-templates select="site" mode="show-result" />
				</div>
			</div>
			<!-- <script type="text/javascript">v_onload('webo');</script> -->
			<xsl:apply-templates select="site" mode="show-result-info" />
			<div class="webo_copy">
				<xsl:text>Результаты тестирования предоставлены сервисом </xsl:text>
				<a href="http://webo.in" target="_blank"><xsl:text>http://webo.in</xsl:text></a>
			</div>
		</div>
	</xsl:template>

	<xsl:template match="option" mode="show-error">
		<div class="webo_err">
			<strong><xsl:text>http://</xsl:text><xsl:value-of select="value" /></strong>
			<xsl:text> &label-host-error;</xsl:text>
		</div>
	</xsl:template>

	<xsl:template match="site" mode="show-result">
		<dl>
			<dt><img src="{image}" alt="{name}" title="{name}" /></dt>
			<dd>
				<div class="site_name"><xsl:value-of select="name" /></div>
				<div class="ratings">
					<div>
						<abbr title="&label-info-rating-desc;"><xsl:text>&label-info-rating;</xsl:text></abbr>:
						<div><span><xsl:value-of select="mark" /></span><xsl:text>/100</xsl:text></div>
					</div>
					<div>
						<abbr title="&label-info-integral-desc;"><xsl:text>&label-info-integral;</xsl:text></abbr>:
						<div><span><xsl:value-of select="integral" /></span><xsl:text>/100</xsl:text></div>
					</div>
				</div>
				<div class="info">
					<div><xsl:text>&label-info-date;:</xsl:text><strong><xsl:value-of select="date" /></strong></div>
					<div><xsl:text>&label-info-load; (33,6 KB/s):</xsl:text><strong><xsl:value-of select="time/low" />с</strong></div>
					<div><xsl:text>&label-info-load; (100 KB/s):</xsl:text><strong><xsl:value-of select="time/high" />c</strong></div>
					<div><xsl:text>&label-info-count-files;:</xsl:text><strong><xsl:value-of select="files/number" /></strong></div>
				</div>
			</dd>
			<div class="clear" />
		</dl>
	</xsl:template>

	<xsl:template match="site" mode="show-result-info">
		<xsl:variable name="css_size"	 select="sum(files/file[type='CSS']/size)" />
		<xsl:variable name="html_size"	 select="sum(files/file[type='HTML']/size)" />
		<xsl:variable name="js_size"	 select="sum(files/file[type='JS']/size)" />
		<xsl:variable name="cssimg_size" select="sum(files/file[type='CSSIMG']/size)" />
		<xsl:variable name="img_size"	 select="sum(files/file[type='IMG']/size)" />
		<xsl:variable name="swf_size"	 select="sum(files/file[type='MEDIA']/size)" />
		<xsl:variable name="all_size"	 select="sum(files/size)" />

		<xsl:variable name="css_precent"	select="round(number(100 div $all_size * $css_size))" />
		<xsl:variable name="html_precent"	select="round(number(100 div $all_size * $html_size))" />
		<xsl:variable name="js_precent"		select="round(number(100 div $all_size * $js_size))" />
		<xsl:variable name="cssimg_precent"	select="round(number(100 div $all_size * $cssimg_size))" />
		<xsl:variable name="img_precent"	select="round(number(100 div $all_size * $img_size))" />
		<xsl:variable name="swf_precent"	select="round(number(100 div $all_size * $swf_size))" />

		<div class="panel" id="webo_main">
			<div class="tabs">
				<a href="javascript:switch_webo('webo_analyze','webo_files','first');" class="header first act">
					<span class="c"><xsl:text>&label-tab-main;</xsl:text></span><span class="l" /><span class="r" />
				</a>
				<a href="javascript:switch_webo('webo_files','webo_analyze','last');" class="header last">
					<span class="c"><xsl:text>&label-tab-files;</xsl:text></span><span class="l" /><span class="r" />
				</a>
			</div>
			<div class="content">
				<div id="webo_analyze">
					<h2><xsl:text>&label-remarks;</xsl:text></h2>
					<ol><xsl:apply-templates select="remarks/advice" mode="li" /></ol>
					<h2><xsl:text>&label-advices;</xsl:text></h2>
					<ol><xsl:apply-templates select="advices/advice" mode="li" /></ol>
				</div>
				<div id="webo_files" style="display:none;">
					<h2><xsl:text>&label-graph-title;</xsl:text></h2>
					<table id="webo_google">
						<tr>
							<td width="60%" align="right">
								<img src="{concat('http://chart.apis.google.com/chart?chs=500x200&amp;cht=p3&amp;chd=t:', $css_precent, ',', $html_precent, ',', $js_precent, ',', $cssimg_precent, ',', $img_precent, ',', $swf_precent, '&amp;chco=868686,D0EB55,EBD055,5539EB,55EBD0,D055EB&amp;chf=bg,s,FFFFFF&amp;chl=CSS|HTML|JavaScript|CSSimg|IMG|Media')}" alt="" />
							</td>
							<td>
								<div>
									<span><xsl:value-of select="$html_precent" />%</span>
									<xsl:text>— &label-html; </xsl:text>(<strong style="color:#d0eb55;">HTML</strong>)
								</div>
								<div>
									<span><xsl:value-of select="$css_precent" />%</span>
									<xsl:text>— &label-css; </xsl:text>(<strong style="color:#868686;">CSS</strong>)
								</div>
								<div>
									<span><xsl:value-of select="$js_precent" />%</span>
									<xsl:text>— &label-js; </xsl:text>(<strong style="color:#ebd055;">JavaScript</strong>)
								</div>
								<div>
									<span><xsl:value-of select="$cssimg_precent" />%</span>
									<xsl:text>— &label-cssimg; </xsl:text>(<strong style="color:#5539eb;">CSSimg</strong>)
								</div>
								<div>
									<span><xsl:value-of select="$img_precent" />%</span>
									<xsl:text>— &label-img; </xsl:text>(<strong style="color:#55ebd0;">IMG</strong>)
								</div>
								<div>
									<span><xsl:value-of select="$swf_precent" />%</span>
									<xsl:text>— &label-media; </xsl:text>(<strong style="color:#d055eb;">Media</strong>)
								</div>
							</td>
						</tr>
					</table>
					<table id="webo_files_table">
						<tr>
							<th><xsl:text>&label-files-list-th-url;</xsl:text></th>
							<th><xsl:text>&label-files-list-th-mime;</xsl:text></th>
							<th><xsl:text>&label-files-list-th-size;</xsl:text></th>
							<th><xsl:text>&label-files-list-th-compressed;</xsl:text></th>
						</tr>
						<xsl:apply-templates select="files/file" mode="li" />
					</table>
				</div>
			</div>
		</div>
		<script type="text/javascript">
			<![CDATA[
				function switch_webo(first_block,two_block,link) {
					first_block = '#'+first_block;
					two_block = '#'+two_block;
					link = '.'+link;
					$(first_block).css('display','block');
					$(two_block).css('display','none');
					$('.header').removeClass('act');
					$(link).addClass('act');
				}
			]]>
		</script>
	</xsl:template>

	<xsl:template match="file" mode="li">
		<tr>
			<td><xsl:value-of select="url" /></td>
			<td><xsl:value-of select="type" />/<xsl:value-of select="mime" /></td>
			<td><xsl:value-of select="size" /></td>
			<td><xsl:value-of select="compressed" /></td>
		</tr>
	</xsl:template>

	<xsl:template match="advice" mode="li">
		<li>
			<strong class="name"><xsl:value-of select="title" /></strong>
			<xsl:value-of select="body" disable-output-escaping="yes" />
		</li>
	</xsl:template>

</xsl:stylesheet>