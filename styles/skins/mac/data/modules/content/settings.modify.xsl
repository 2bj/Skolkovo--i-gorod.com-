<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/content">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="/result[@method = 'seo']/data[@type = 'settings' and @action = 'modify']">
		<form method="post" action="do/" enctype="multipart/form-data">
			<xsl:apply-templates select="." mode="settings-modify" />
			<xsl:call-template name="std-save-button" />
		</form>
	</xsl:template>

	<xsl:template match="/result[@method = 'seo']//group" mode="settings-modify">
		<xsl:variable name="seo-title" select="option[position() = 2]" />
		<xsl:variable name="seo-keywords" select="option[position() = 3]" />
		<xsl:variable name="seo-description" select="option[position() = 4]" />
	
		<table class="tableContent">
			<thead>
				<tr>
					<th colspan="2" class="eq-col">
						<xsl:value-of select="option[@name = 'domain']/value" />
					</th>
				</tr>
			</thead>
			
			<tbody>
				<tr> 
					<td>
						<label for="{$seo-title/@name}">
							<xsl:text>&option-seo-title;</xsl:text>
						</label>
					</td> 

					<td>
						<input type="text" name="{$seo-title/@name}" value="{$seo-title/value}" id="{$seo-title/@name}" />
					</td> 
				</tr>

				<tr>
					<td class="eq-col">
						<label for="{$seo-keywords/@name}">
							<xsl:text>&option-seo-keywords;</xsl:text>
						</label>
					</td>

					<td>
						<input type="text" name="{$seo-keywords/@name}" value="{$seo-keywords/value}" id="{$seo-keywords/@name}" />
					</td>
				</tr>
				
				<tr>
					<td class="eq-col">
						<label for="{$seo-description/@name}">
							<xsl:text>&option-seo-description;</xsl:text>
						</label>
					</td>

					<td>
						<input type="text" name="{$seo-description/@name}" value="{$seo-description/value}" id="{$seo-description/@name}" />
					</td>
				</tr>
			</tbody>
		</table>
	</xsl:template>
</xsl:stylesheet>