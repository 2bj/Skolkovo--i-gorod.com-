<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="data[@type = 'settings' and @action = 'modify']">
		<form method="post" action="do/" enctype="multipart/form-data">
			<xsl:apply-templates select="." mode="settings.modify" />
		</form>
	</xsl:template>

	<xsl:template match="group" mode="settings.modify">
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
						<xsl:apply-templates select="option" mode="settings.modify" />
					</tbody>
				</table>
				
				<xsl:call-template name="std-save-button" />
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="option" mode="settings.modify">
		<tr>
			<td class="eq-col">
				<label for="{@name}">
					<xsl:value-of select="@label" />
				</label>
			</td>
			
			<td>
				<xsl:apply-templates select="." mode="settings.modify-option" />
			</td>
		</tr>
	</xsl:template>

	<xsl:template match="option" mode="settings.modify-option">
		<xsl:text>Put here "</xsl:text>
		<xsl:value-of select="@type" />
		<xsl:text>" and code for other options (</xsl:text>
		<a href="/styles/skins/mac/data/settings.modify.xsl">
			<xsl:text>~/styles/skins/mac/data/settings.modify.xsl</xsl:text>
		</a>
		<xsl:text>)</xsl:text>
	</xsl:template>

	<xsl:template match="option[@type = 'status']" mode="settings.modify-option">
		<xsl:value-of select="value" />
	</xsl:template>

	<xsl:template match="option[@type = 'string' or @type = 'int' or @type = 'email']" mode="settings.modify-option">
		<input type="text" name="{@name}" value="{value}" id="{@name}" />
	</xsl:template>
	
	<xsl:template match="option[@type = 'bool']" mode="settings.modify-option">
		<input type="hidden" name="{@name}" value="0" />
		<input type="checkbox" name="{@name}" value="1" id="{@name}" class="check">
			<xsl:if test="value = '1'">
				<xsl:attribute name="checked">checked</xsl:attribute>
			</xsl:if>
		</input>
	</xsl:template>

	<xsl:template match="option[@type = 'password']" mode="settings.modify-option">
		<input type="password" name="{@name}" value="********" id="{@name}" />
	</xsl:template>

	<xsl:template match="option[@type = 'boolean']" mode="settings.modify-option">
		<input type="hidden" value="0" name="{@name}" />
		<input type="checkbox" value="1" id="{@name}" name="{@name}" class="check">
			<xsl:if test="value &gt; 0">
				<xsl:attribute name="checked"><xsl:text>checked</xsl:text></xsl:attribute>
			</xsl:if>
		</input>
	</xsl:template>

	<xsl:template match="option[@type = 'select']" mode="settings.modify-option">
		<select id="{@name}" name="{@name}">
			<xsl:apply-templates select="value/item" mode="settings.modify-option.select">
				<xsl:with-param name="value" select="value/@id"/>
			</xsl:apply-templates>
		</select>
	</xsl:template>

	<xsl:template match="option[@type = 'guide' or @type = 'weak_guide']" mode="settings.modify-option">
		<select name="{@name}" id="{@name}">
			<xsl:apply-templates
					select="document(concat('udata://content/getObjectsByTypeList/', value/type-id))/udata//item"
					mode="settings.modify-option.select">
				<xsl:with-param name="value" select="value/value"/>
			</xsl:apply-templates>
		</select>
	</xsl:template>

	<xsl:template match="option[@type = 'templates']" mode="settings.modify-option">
		<select name="{@name}" id="{@name}">
			<xsl:apply-templates
					select="document('udata://system/getTemplatesList/')/udata//item"
					mode="settings.modify-option.select">
				<xsl:with-param name="value" select="value" />
			</xsl:apply-templates>
		</select>
	</xsl:template>

	<xsl:template match="item" mode="settings.modify-option.select">
		<xsl:param name="value"/>
		<option value="{@id}">
			<xsl:if test="$value = @id">
				<xsl:attribute name="selected"><xsl:text>selected</xsl:text></xsl:attribute>
			</xsl:if>
			<xsl:value-of select="."/>
		</option>
	</xsl:template>

	<xsl:include href="udata://core/importSkinXsl/settings.modify.xsl"/>
	<xsl:include href="udata://core/importSkinXsl/settings.modify.custom.xsl"/>
</xsl:stylesheet>