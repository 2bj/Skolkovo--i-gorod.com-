<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/">[
	<!ENTITY sys-module 'stat'>
]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

	<xsl:template match="/result[@method='clear']/data[@type = 'settings' and @action = 'view']">
        <script type="text/javascript" language="javascript">
        <![CDATA[
			function ClearButtonClick () {
				var callback = function () {
					window.location.href = "]]><xsl:value-of select="$lang-prefix"/>/admin/&sys-module;/clear/do<![CDATA[";
				};

				openDialog({
					title       : "]]>&label-stat-clear;<![CDATA[",
					text        : "]]>&label-stat-clear-confirm;<![CDATA[",
					OKText      : "]]>&label-clear;<![CDATA[",
					cancelText  : "]]>&label-cancel;<![CDATA[",
					OKCallback	: callback
				});                

				return false;
			}
        ]]>
        </script>
		<div class="panel">
			<div class="header" onclick="panelSwitcher(this);">
				<span />
				<div class="l" /><div class="r" />
			</div>
			<div class="content">
				&label-stat-clear-help;
				<div class="buttons">
					<div>
						<input type="button" value="&label-stat-clear;" onclick="javascript:ClearButtonClick();" />
						<span class="l" />
						<span class="r" />
					</div>
				</div>
			</div>
		</div>		
    </xsl:template>

	<xsl:template match="/result[not(@method='clear')]/data[@type = 'settings' and @action = 'view']">
		<div id="stat_links">
			<xsl:apply-templates select="/result[@module = 'stat']" mode="stat_links" />
		</div>
		<xsl:apply-templates select="group[@name = 'filter']" mode="settings-view"/>
		<xsl:apply-templates select="group[not(@name = 'filter')]" mode="settings-view"/>
	</xsl:template>

	<xsl:template match="group[@name = 'filter']" mode="settings-view">
		<form method="post">
			<table id="statFilter" class="tableContent">
				<tr>
					<th><xsl:text>&label-domain;</xsl:text></th>
					<th><xsl:text>&label-period-start;</xsl:text></th>
					<th><xsl:text>&label-period-end;</xsl:text></th>
				</tr>
				<tr>
					<td>
						<xsl:apply-templates select="option[@type='domain']" mode="settings-view"/>
					</td>
					<td>
						<xsl:apply-templates select="option[@type='period' and @name='start']" mode="settings-view"/>
					</td>
					<td>
						<xsl:apply-templates select="option[@type='period' and @name='end']" mode="settings-view"/>
					</td>
				</tr>
				<tr>
					<td><strong><xsl:text>&label-users;</xsl:text></strong></td>
					<td>
						<xsl:apply-templates select="option[@type='users' and @name='user']" mode="settings-view"/>
					</td>
					<td><xsl:text>&nbsp;</xsl:text></td>
				</tr>
			</table>
			<div class="buttons">
				<div>
					<input type="submit" value="&label-apply-filter;" />
					<span class="l" />
					<span class="r" />
				</div>
			</div>
		</form>
	</xsl:template>

	<xsl:template match="group[not(@name = 'filter')]" mode="settings-view">
		<div class="panel">
			<div class="header" onclick="panelSwitcher(this);">
				<span>
					<xsl:value-of select="@label" />
				</span>
				<div class="l" /><div class="r" />
			</div>
			<div class="content">
				<table class="tableContent">
					<tbody>
						<xsl:apply-templates select="option" mode="settings.view" />
					</tbody>
				</table>
			</div>
		</div>
	</xsl:template>

	<xsl:template match="group[not(@name = 'filter') and ./option/@type = 'flash']" mode="settings-view">
		  <xsl:apply-templates select="option" mode="settings-view"/>
	</xsl:template>	

	<xsl:template match="option[@type = 'flash']" mode="settings-view">
		<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
				codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"
				width="100%" height="780" align="middle">
			<param name="allowScriptAccess" value="sameDomain"/>
			<param name="movie" value="">
				<xsl:attribute disable-output-escaping="yes" name="value">
					/images/cms/stat/Chart.swf?<xsl:value-of select="value/node()"/><![CDATA[&]]>ilang=<xsl:value-of select="/result/@interface-lang" />
				</xsl:attribute>
			</param>
			<param name="quality" value="high"/>
			<param name="bgcolor" value="#ffffff"/>
			<param name="wmode" value="transparent"/>
			<param name="FlashVars">
				<xsl:attribute disable-output-escaping="yes" name="FlashVars">
					<xsl:value-of select="value/node()"/><![CDATA[&]]>ilang=<xsl:value-of select="/result/@interface-lang" />
				</xsl:attribute>
			</param>
			<embed quality="high" bgcolor="#ffffff" width="100%" height="780"
				   name="report_graph" align="middle" allowScriptAccess="sameDomain"
				   type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"
				   wmode="transparent">
				<xsl:attribute disable-output-escaping="yes" name="src">
					/images/cms/stat/Chart.swf?amp;ilang=<xsl:value-of select="/result/@interface-lang" />
				</xsl:attribute>
				<xsl:attribute name="FlashVars" disable-output-escaping="yes">
					<xsl:value-of select="value/node()"/><![CDATA[&]]>ilang=<xsl:value-of select="/result/@interface-lang" />
				</xsl:attribute>
			</embed>
		</object>
	</xsl:template>

	<xsl:template match="option[@type = 'tags']" mode="settings.view">
		<tr>
			<td style="text-align:center;">
				<xsl:apply-templates select="value/tag"/>
				<xsl:apply-templates select="value/message"/>
			</td>
		</tr>
	</xsl:template>

	<xsl:template match="option[@type = 'domain']" mode="settings-view">
		<select name="{@name}" id="{@name}" style="width:100%">
			<xsl:apply-templates select="value/item">
				<xsl:with-param name="value" select="value/@id"/>
			</xsl:apply-templates>
		</select>
	</xsl:template>

	<xsl:template match="option[@type = 'period']" mode="settings-view">
		<select name="{@name}_day" id="{@name}_day" class="date">
			<xsl:apply-templates select="value/entity[@type='day']/item">
				<xsl:with-param name="value" select="value/entity[@type='day']/@id"/>
			</xsl:apply-templates>
		</select>
		<select name="{@name}_month" id="{@name}_month" class="date">
			<xsl:apply-templates select="value/entity[@type='month']/item">
				<xsl:with-param name="value" select="value/entity[@type='month']/@id"/>
			</xsl:apply-templates>
		</select>
		<select name="{@name}_year" id="{@name}_year" class="date">
			<xsl:apply-templates select="value/entity[@type='year']/item">
				<xsl:with-param name="value" select="value/entity[@type='year']/@id"/>
			</xsl:apply-templates>
		</select>
	</xsl:template>

	<xsl:template match="option[@type = 'users']" mode="settings-view">
		<select name="{@name}" id="{@name}" style="width:100%">
			<xsl:apply-templates select="value/item">
				<xsl:with-param name="value" select="value/@id"/>
			</xsl:apply-templates>
		</select>
	</xsl:template>

	<xsl:template match="item">
		<xsl:param name="value"/>
		<option value="{@id}">
			<xsl:if test="$value = @id">
				<xsl:attribute name="selected">selected</xsl:attribute>
			</xsl:if>
			<xsl:value-of select="."/>
		</option>
	</xsl:template>

	<xsl:template match="tag">
		<a href="{$lang-prefix}/admin/stat/tag/{@id}/">
			<span style="font-size: {@fontweight}px">
				<xsl:value-of select="text()"/>
				<xsl:text>(</xsl:text>
				<xsl:value-of select="@weight"/>
				<xsl:text>%)</xsl:text>
			</span>
		</a>
		<xsl:text>&nbsp;</xsl:text>
	</xsl:template>

	<xsl:template match="message">
		<xsl:value-of select="." disable-output-escaping="yes"/>
	</xsl:template>

	<xsl:template match="result" mode="stat_links" />

	<xsl:template match="result[@method = 'popular_pages' or @method = 'sectionHits']" mode="stat_links">
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'popular_pages'" />
			<xsl:with-param name="label" select="'&menu-pages;'" />
		</xsl:call-template>
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'sectionHits'" />
			<xsl:with-param name="label" select="'&menu-sections;'" />
		</xsl:call-template>
	</xsl:template>

	<xsl:template match="result[
		@method = 'visits' or 
		@method = 'visits_sessions' or 
		@method = 'visits_visitors' or 
		@method = 'auditoryActivity' or 
		@method = 'auditoryLoyality' or 
		@method = 'auditoryLocation' or 
		@method = 'visitDeep' or 
		@method = 'visitTime'
	]" mode="stat_links">
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'visits'" />
			<xsl:with-param name="label" select="'&menu-hits;'" />
		</xsl:call-template>
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'visits_sessions'" />
			<xsl:with-param name="label" select="'&menu-sessions;'" />
		</xsl:call-template>
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'visits_visitors'" />
			<xsl:with-param name="label" select="'&menu-visitors;'" />
		</xsl:call-template>
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'auditoryActivity'" />
			<xsl:with-param name="label" select="'&menu-auditory-activity;'" />
		</xsl:call-template>
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'auditoryLoyality'" />
			<xsl:with-param name="label" select="'&menu-auditory-loyality;'" />
		</xsl:call-template>
		<xsl:if test="document('udata://config/menu')/udata/items/item[@name = 'geoip']">
			<xsl:call-template name="stat_links">
				<xsl:with-param name="link" select="'auditoryLocation'" />
				<xsl:with-param name="label" select="'&menu-auditory-location;'" />
			</xsl:call-template>
		</xsl:if>
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'visitDeep'" />
			<xsl:with-param name="label" select="'&menu-visit-deep;'" />
		</xsl:call-template>
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'visitTime'" />
			<xsl:with-param name="label" select="'&menu-visit-time;'" />
		</xsl:call-template>
	</xsl:template>

	<xsl:template match="result[
		@method = 'sources' or 
		@method = 'engines' or 
		@method = 'phrases' or 
		@method = 'entryPoints' or 
		@method = 'exitPoints'
	]" mode="stat_links">
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'sources'" />
			<xsl:with-param name="label" select="'&menu-sources;'" />
		</xsl:call-template>
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'engines'" />
			<xsl:with-param name="label" select="'&menu-engines;'" />
		</xsl:call-template>
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'phrases'" />
			<xsl:with-param name="label" select="'&menu-phrases;'" />
		</xsl:call-template>
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'entryPoints'" />
			<xsl:with-param name="label" select="'&menu-entry;'" />
		</xsl:call-template>
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'exitPoints'" />
			<xsl:with-param name="label" select="'&menu-exit;'" />
		</xsl:call-template>
	</xsl:template>

	<xsl:template match="result[
		@method = 'openstatCampaigns' or 
		@method = 'openstatServices' or 
		@method = 'openstatSources' or 
		@method = 'openstatAds'
	]" mode="stat_links">
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'openstatCampaigns'" />
			<xsl:with-param name="label" select="'&menu-ostat-campaigns;'" />
		</xsl:call-template>
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'openstatServices'" />
			<xsl:with-param name="label" select="'&menu-ostat-services;'" />
		</xsl:call-template>
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'openstatSources'" />
			<xsl:with-param name="label" select="'&menu-ostat-sources;'" />
		</xsl:call-template>
		<xsl:call-template name="stat_links">
			<xsl:with-param name="link" select="'openstatAds'" />
			<xsl:with-param name="label" select="'&menu-ostat-ads;'" />
		</xsl:call-template>
	</xsl:template>

	<xsl:template name="stat_links">
		<xsl:param name="link" />
		<xsl:param name="label" />
		<xsl:choose>
			<xsl:when test="@method = $link">
				<span><xsl:value-of select="$label" /></span>
			</xsl:when>
			<xsl:otherwise>
				<a href="{$lang-prefix}/admin/&sys-module;/{$link}/">
					<xsl:value-of select="$label" />
				</a>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

</xsl:stylesheet>