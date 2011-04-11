<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="xml" encoding="UTF-8"/>

<xsl:key name="object" match="object" use="@id"/>
<xsl:key name="property" match="property" use="concat(../../@id, name)"/>
<xsl:variable name="root" select="//element[position() = 1]"/>

<xsl:template match="umicmsDump">
	<rss version="2.0" xmlns:yandex="http://news.yandex.ru">
		<channel>
			<title><xsl:value-of select="siteName"/></title>
			<link><xsl:value-of select="element/link"/></link>
			<description><xsl:value-of select="concat(siteName, ' - ', element/name)"/></description>
			<language><xsl:value-of select="$root/lang/@prefix"/></language>
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
		</channel>
	</rss>
</xsl:template>


<xsl:template match="element">
	<item>
		<xsl:apply-templates select="key('object', @objectId)"/>
		<link><xsl:value-of select="link"/></link>
		<guid><xsl:value-of select="link"/></guid>
	</item>
</xsl:template>


<xsl:template match="object">
	<xsl:variable name="pageHeader" select="properties/property" />
	<xsl:variable name="author" select="//object[@id = key('property', concat(current()/@id, 'author_id'))/values/value/@id]"/>
	<title><xsl:value-of select="key('property', concat(@id, 'h1'))/values/value"/></title>
	<xsl:if test="$author">
		<author>
			<xsl:choose>
				<xsl:when test="$author//property[name = 'is_registrated']//value = 1">
					<xsl:variable name="user" select="//object[@id = $author//property[name = 'user_id']//value/@id]"/>
					<xsl:value-of select="$user//property[name = 'login']//value"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$author//property[name = 'nickname']//value"/>
				</xsl:otherwise>
			</xsl:choose>
		</author>
	</xsl:if>
	<xsl:choose>
		<xsl:when test="key('property', concat(@id, 'anons'))/values/value != ''">
			<description><xsl:value-of select="key('property', concat(@id, 'anons'))/values/value"/></description>
		</xsl:when>
		<xsl:when test="key('property', concat(@id, 'content'))/values/value != ''">
			<description><xsl:value-of select="key('property', concat(@id, 'content'))/values/value"/></description>
		</xsl:when>
		<xsl:when test="key('property', concat(@id, 'message'))/values/value != ''">
			<description><xsl:value-of select="key('property', concat(@id, 'message'))/values/value"/></description>
		</xsl:when>
		<xsl:when test="key('property', concat(@id, 'opisanie'))/values/value != ''">
			<description><xsl:value-of select="key('property', concat(@id, 'opisanie'))/values/value"/></description>
		</xsl:when>
		<!--xsl:otherwise>
			<xsl:value-of select="name"/>
		</xsl:otherwise-->
	</xsl:choose>
	<xsl:if test="key('property', concat(@id, 'publish_time'))/values/value/RFC">
		<pubDate><xsl:value-of select="key('property', concat(@id, 'publish_time'))/values/value/RFC"/></pubDate>
	</xsl:if>
	<xsl:choose>
		<xsl:when test="key('property', concat(@id, 'content'))/values/value != ''">
		     <xsl:element name="yandex:full-text" namespace="http://news.yandex.ru">
			     <xsl:value-of select="key('property', concat(@id, 'content'))/values/value"/>
			</xsl:element>
		</xsl:when>
		<xsl:otherwise>
		     <xsl:element name="yandex:full-text" namespace="http://news.yandex.ru">
     			<xsl:value-of select="key('property', concat(@id, 'anons'))/values/value"/>
			</xsl:element>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>


</xsl:stylesheet>
