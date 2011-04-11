<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/">

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="data[@type = 'settings' and @action = 'view']">
		<xsl:apply-templates select="group" mode="settings-view"/>
	</xsl:template>

	<xsl:template match="group" mode="settings-view">
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
				
				<xsl:call-template name="std-save-button" />
			</div>
		</div>
	</xsl:template>

	<xsl:template match="option" mode="settings.view">
		<tr>
			<td class="eq-col">
				<label for="{@name}">
					<xsl:value-of select="@label" />
				</label>
			</td>
			<td>
				<xsl:value-of select="value" />
			</td>
		</tr>
	</xsl:template>

	<xsl:include href="udata://core/importSkinXsl/settings.view.xsl"/>
	<xsl:include href="udata://core/importSkinXsl/settings.view.custom.xsl"/>

</xsl:stylesheet>