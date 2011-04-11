<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet	version="1.0"
	xmlns:umi="http://www.umi-cms.ru/TR/umi"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="result[@module = 'news' and @method = 'item']">
		<xsl:value-of select="page//property[@name = 'content']/value" disable-output-escaping="yes" />
	</xsl:template>

	<xsl:template match="result[@module = 'news' and @method = 'rubric']">
		<xsl:apply-templates select="document('udata://news/lastlist')/udata" />
	</xsl:template>

	<xsl:template match="udata[@module = 'news' and @method = 'lastlist']">
		<xsl:apply-templates select="items">
			<xsl:with-param name="list-class">
				<xsl:text>news-lastlist</xsl:text>
			</xsl:with-param>
		</xsl:apply-templates>
	</xsl:template>
	
	
	<xsl:template match="udata[@method = 'lastlist']//item">
		<xsl:variable name="date" select="document(concat('udata://system/convertDate/', @publish_time, '/(Y-m-d%20H:i:s)'))/udata" />
		<li>
			<a href="{@link}" umi:element-id="{@id}" umi:field-name="name">
				<xsl:value-of select="." />
			</a>
			
			<xsl:text> (</xsl:text>
			<span umi:element-id="{@id}" umi:field-name="publish_time" umi:format="Y-m-d H:i">
				<xsl:value-of select="$date" />
			</span>
			<xsl:text>)</xsl:text>
			
			<xsl:apply-templates select="document(concat('upage://', @id, '.anons_pic'))/udata">
				<xsl:with-param name="page-id" select="@id" />
			</xsl:apply-templates>
		</li>
	</xsl:template>
	
	
	<xsl:template match="property[@name = 'anons_pic']">
		<xsl:param name="page-id" />
		<p>
			<strong>
				<xsl:text>Using simple img[src] tag</xsl:text>
			</strong>
			<br />
			<img src="{value}" umi:element-id="{$page-id}" umi:field-name="{@name}" width="120" />
		</p>
		
		<p>
			<strong>
				<xsl:text>Using simple img[src] tag #2</xsl:text>
			</strong>
			<br />
			<img src="{value}" umi:element-id="{$page-id}" umi:field-name="{@name}" width="120" />
		</p>
		
		<p>
			<strong>
				<xsl:text>Using CSS background-image</xsl:text>
			</strong>
			<br />
			<div
				style="display: block; width: 180px; height: 100px; background-image: url('{value}');"
				umi:element-id="{$page-id}"
				umi:field-name="{@name}"
			/>
		</p>
		
		<p>
			<strong>
				<xsl:text>Using system::makeThumbnail() macros</xsl:text>
			</strong>
			<br />
			<xsl:apply-templates select="document(concat('udata://system/makeThumbnail/(.', value, ')/100'))/udata">
				<xsl:with-param name="page-id" select="$page-id" />
				<xsl:with-param name="field-name" select="@name" />
			</xsl:apply-templates>
		</p>
		
		<p>
			<strong>
				<xsl:text>Using autothumbs rewrite</xsl:text>
			</strong>
			<br />
			<img src="/images/autothumbs{value/@folder}/{value/@name}_100_.{value/@ext}"
				umi:element-id="{$page-id}"
				umi:field-name="{@name}"
			/>
		</p>
	</xsl:template>
	
	<xsl:template match="udata[@module = 'system' and @method = 'makeThumbnail']">
		<xsl:param name="page-id" />
		<xsl:param name="object-id" />
		<xsl:param name="field-name" />
		
		<img src="{src}" umi:element-id="{$page-id}" umi:object-id="{$object-id}" umi:field-name="{$field-name}" />
	</xsl:template>
</xsl:stylesheet>