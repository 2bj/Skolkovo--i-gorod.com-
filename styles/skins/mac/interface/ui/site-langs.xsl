<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM	"ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="udata[@module = 'system' and @method = 'getLangsList']" />
	<xsl:template match="udata[@module = 'system' and @method = 'getLangsList' and count(items/item) &gt; 1]">
		<div id="lang">
			<xsl:text>&site-lang-versions;</xsl:text>
			<xsl:apply-templates select="items/item" />
		</div>
	</xsl:template>
	
	<xsl:template match="udata[@module = 'system' and @method = 'getLangsList']/items/item">
		<!-- Get rid off this choose -->
		<xsl:choose>
			<xsl:when test="(concat('/', @prefix) = $lang-prefix) or (@is-current = 1 and not($lang-prefix))">
				<span>
					<xsl:value-of select="." />
				</span>
			</xsl:when>
			<xsl:otherwise>
				<a href="/{@prefix}/admin/">
					<xsl:value-of select="." />
				</a>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>