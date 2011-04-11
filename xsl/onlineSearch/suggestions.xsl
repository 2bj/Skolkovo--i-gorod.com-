<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="text" />
	<xsl:param name="search-string" />
	
	<xsl:template match="/">
		<xsl:text>["</xsl:text>
		<xsl:value-of select="$search-string" />
		<xsl:text>",[</xsl:text>
		<xsl:apply-templates select="udata/words/word" />
		<xsl:text>],[</xsl:text>
		<xsl:apply-templates select="udata/words/word" mode="count" />
		<xsl:text>]]</xsl:text>
	</xsl:template>
	
	<xsl:template match="word">
		<xsl:value-of select="concat('&quot;', ., '&quot;')" />
		<xsl:if test="not(position() = last())">
			<xsl:text>,</xsl:text>
		</xsl:if>
	</xsl:template>
	
	<xsl:template match="word" mode="count">
		<xsl:value-of select="concat('&quot;', @count, '&quot;')" />
		<xsl:if test="not(position() = last())">
			<xsl:text>,</xsl:text>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>