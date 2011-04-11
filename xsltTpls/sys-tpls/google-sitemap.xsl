<?xml version="1.0" encoding="UTF-8"?>
 
<xsl:stylesheet	version="1.0"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
		xmlns:php="http://php.net/xsl"
		xsl:extension-element-prefixes="php"
		exclude-result-prefixes="php"
		xmlns:xlink="http://www.w3.org/TR/xlink"
		xmlns="http://www.google.com/schemas/sitemap/0.84">
 
	<xsl:output encoding="utf-8" method="xml" indent="yes"/>
	<xsl:param name="domain" />
 
 
	<xsl:template match="/">
		<urlset xmlns="http://www.google.com/schemas/sitemap/0.84"
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			xsi:schemaLocation="http://www.google.com/schemas/sitemap/0.84
			http://www.google.com/schemas/sitemap/0.84/sitemap.xsd">
			<xsl:apply-templates select="//items"/>
		</urlset>
	</xsl:template>
 
 
	<xsl:template match="items">
		<xsl:apply-templates select="item"/>	
	</xsl:template>
 
 
	<xsl:template match="item">
		<xsl:variable name="update-time" select="document(@xlink:href)/udata/page/@update-time" />
		<url>
			<loc>
				<xsl:value-of select="concat('http://', $domain, @link)" />
			</loc>
			<lastmod>
				<xsl:value-of select="document(concat('udata://system/convertDate/', $update-time, '/c/'))/udata" />
			</lastmod>
		</url>
	</xsl:template>
 
</xsl:stylesheet>