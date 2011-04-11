<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM	"ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:variable name="edition" select="/result/@edition" />

	<xsl:template name="panel-buttons">
		<xsl:call-template name="profile" />
		
		<a id="site_link" href="{$lang-prefix}/">
			<xsl:text>&site-link;</xsl:text>
			<span class="l" /><span class="r" />
		</a>

<!--
		<xsl:if test="$edition = 'demo' or $edition = 'free' or $edition = 'trial' or not(string-length($edition))">
			<a id="buy" href="http://www.umi-cms.ru/market/">
				<xsl:text>&buy-umi-cms;</xsl:text>
				<span class="l" /><span class="r" />
			</a>
		</xsl:if>
-->
		<a id="cache" href="/admin/config/cache/">
			<xsl:choose>
				<xsl:when test="$cache-enabled = 0">
					<xsl:text>&cache-disabled-message;</xsl:text>
				</xsl:when>
				
				<xsl:otherwise>
					<xsl:text>&cache-enabled-message;</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
			
			<span class="l" /><span class="r" />
		</a>
	</xsl:template>
</xsl:stylesheet>