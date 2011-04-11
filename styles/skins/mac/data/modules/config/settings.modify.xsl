<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="/result[@method = 'cache' or @method = 'mails' or @method = 'watermark']/data">
		<script type="text/javascript"> 
			function doOptimizeDB() {
				openDialog({
					'title': getLabel('js-config-optimize-db-header'),
					'text': getLabel('js-config-optimize-db-content') + '<ul id="optimize-errors" />',
					'stdButtons': false
				});
				jQuery.getScript('/admin/config/reviewDatabase/', function () {
					window.location.reload();
				});
				return false;
			}
		</script>
	
		<form action="do/" method="post">
			<xsl:apply-templates mode="settings.modify" />
			<xsl:call-template name="std-save-button" />
		</form>
	</xsl:template>

	<xsl:template match="/result[@method = 'main']//group" mode="settings.modify">
		<table class="hide">
			<tbody>
				<xsl:apply-templates select="option" mode="settings.modify" />
			</tbody>
		</table>
		<xsl:call-template name="std-save-button" />
	</xsl:template>

	<xsl:template match="/result[@method = 'cache']//group" mode="settings.modify">
		<table class="tableContent">
			<thead>
				<th colspan="2">
					<xsl:value-of select="@label" />
				</th>
			</thead>
			<tbody>
				<xsl:apply-templates select="option" mode="settings.modify" />
			</tbody>
		</table>
	</xsl:template>

	<xsl:template match="/result[@method = 'mails' or @method = 'watermark']//group" mode="settings.modify">
		<table class="tableContent">
			<tbody>
				<xsl:apply-templates select="option" mode="settings.modify" />
			</tbody>
		</table>
	</xsl:template>

	<xsl:template match="option[@type = 'status' and @name = 'reset']" mode="settings.modify">
		<tr>
			<td />
			<td>
				<input type="button" value="{@label}" onclick="window.location = '{$lang-prefix}/admin/config/cache/reset/'" />
			</td>
		</tr>
	</xsl:template>
	
	<xsl:template match="option[@type = 'status' and @name = 'branch']" mode="settings.modify">
		<tr>
			<td class="eq-col">
				<xsl:value-of select="@label" />
			</td>
			
			<td>
				<input type="button" value="&option-branch; {value}%" onclick="doOptimizeDB()" />
			</td>
		</tr>
	</xsl:template>

</xsl:stylesheet>