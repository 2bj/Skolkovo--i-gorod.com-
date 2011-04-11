<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/geoip">

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="data[@type = 'settings' and @action = 'modify']">
		<form method="post" action="do/">
			<div class="panel">
				<div class="header">
					<span>
						<xsl:text>&header-geoip-info;</xsl:text>
					</span>
					<div class="l" /><div class="r" />
				</div>
				<div class="content">
					<table  class="tableContent">
						<tbody>
							<xsl:apply-templates select="group/option" mode="settings.modify" />
						</tbody>
					</table>
					<div class="buttons">
						<div>
							<input type="submit" value="&label-check;" />
							<span class="l" /><span class="r" />
						</div>
					</div>
				</div>
			</div>
		</form>
	</xsl:template>

</xsl:stylesheet>