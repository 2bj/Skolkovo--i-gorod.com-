<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/autoupdate">

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
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
				<div class="buttons">
					<div>
						<input type="button" value="&label-check-updates;" onclick="window.location = '/smu/index.php';" />
						<span class="l" /><span class="r" />
					</div>
				</div>
			</div>
		</div>
	</xsl:template>


	<xsl:template match="option[@type = 'boolean' and @name = 'disabled']" mode="settings.view">
		<!-- <tr>
			<td class="eq-col">
				<label>
					<xsl:text>&label-manual-update;</xsl:text>
				</label>
			</td>
			<td>
				<div class="buttons">
					<div>
						<input type="button" value="&label-check-updates;" onclick="window.location = '/smu/index.php';" />
						<span class="l" /><span class="r" />
					</div>
				</div>
			</td>
		</tr> -->
	</xsl:template>

</xsl:stylesheet>
