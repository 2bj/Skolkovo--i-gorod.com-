<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
				xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
				exclude-result-prefixes="">

<xsl:output method="xml" encoding="UTF-8"/>

<xsl:key name="object" match="object" use="@id"/>
<xsl:key name="property" match="property" use="concat(../../@id, name)"/>
<xsl:variable name="root" select="//element[position() = 1]"/>


<xsl:template match="umicmsDump">
	<feed xmlns="http://www.w3.org/2005/Atom">
		<title><xsl:value-of select="siteName" /></title>
		<id><xsl:value-of select="domain" /></id>
		<link href="{element/link}" />
		<subtitle><xsl:value-of select="concat(siteName, ' - ', element/name)" /></subtitle>
		<updated><xsl:value-of select="element/updateTime/UTC" /></updated>
		<xsl:choose>
			<xsl:when test="$root/behaviour/module = 'catalog'">
				<xsl:apply-templates select="element[behaviour/method = 'object']"/>
			</xsl:when>
			<xsl:when test="$root/behaviour/module = 'content'">
				<xsl:apply-templates select="element[behaviour/method = 'comment']"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates select="element[@parentId = $root/@id]"/>
			</xsl:otherwise>
		</xsl:choose>
	</feed>
</xsl:template>


<xsl:template match="element">
	<xsl:element name="entry">
		<xsl:apply-templates select="key('object', @objectId)"/>
		<link href="{link}" rel="alternate"/>
		<id><xsl:value-of select="link"/></id>
		<updated><xsl:value-of select="updateTime/UTC"/></updated>
	</xsl:element>
</xsl:template>


<xsl:template match="object">
	<xsl:variable name="author" select="//object[@id = key('property', concat(current()/@id, 'author_id'))/values/value/@id]"/>
	<title>
		<xsl:value-of select="name"/>
	</title>
	<xsl:if test="$author">
		<author>
			<name>
				<xsl:choose>
					<xsl:when test="$author//property[name = 'is_registrated']//value = 1">
						<xsl:variable name="user" select="//object[@id = $author//property[name = 'user_id']//value/@id]"/>
						<xsl:value-of select="$user//property[name = 'login']//value"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$author//property[name = 'nickname']//value"/>
					</xsl:otherwise>
				</xsl:choose>
			</name>
		</author>
	</xsl:if>
	<xsl:choose>
		<xsl:when test="key('property', concat(@id, 'anons'))/values/value != ''">
			<summary><xsl:value-of select="key('property', concat(@id, 'anons'))/values/value"/></summary>
		</xsl:when>
		<xsl:when test="key('property', concat(@id, 'content'))/values/value != ''">
			<content><xsl:value-of select="key('property', concat(@id, 'content'))/values/value"/></content>
		</xsl:when>
		<xsl:when test="key('property', concat(@id, 'message'))/values/value != ''">
			<content><xsl:value-of select="key('property', concat(@id, 'message'))/values/value"/></content>
		</xsl:when>
		<xsl:when test="key('property', concat(@id, 'opisanie'))/values/value != ''">
			<content><xsl:value-of select="key('property', concat(@id, 'opisanie'))/values/value"/></content>
		</xsl:when>
	</xsl:choose>
	<xsl:if test="key('property', concat(@id, 'publish_time'))/values/value/RFC">
		<published><xsl:value-of select="key('property', concat(@id, 'publish_time'))/values/value/RFC"/></published>
	</xsl:if>
</xsl:template>


</xsl:stylesheet>