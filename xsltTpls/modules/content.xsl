<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet	version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:umi="http://www.umi-cms.ru/TR/umi">

	<xsl:template match="result[@module = 'content' and @method = 'content']">
		<div umi:element-id="{/result/@pageId}" umi:field-name="content" umi:empty="Содержание страницы">
			<xsl:value-of select="page//property[@name = 'content']/value" disable-output-escaping="yes" />
		</div>
		
		<xsl:apply-templates select="page//property[@type = 'video_file' and @name = 'video_movie']" />
	</xsl:template>
	
	<xsl:template match="property[@type = 'video_file']">
		<div umi:element-id="{../../../@id}" umi:field-name="video_movie">
			<xsl:apply-templates select="value" />
		</div>
	</xsl:template>


	<xsl:template match="udata[@module = 'content' and @method = 'menu']">
		<xsl:apply-templates select="items">
			<xsl:with-param name="list-class">
				<xsl:text>menu</xsl:text>
			</xsl:with-param>
		</xsl:apply-templates>
	</xsl:template>
	
	<xsl:template match="udata[@method = 'menu']">
		<ul class="menu" umi:module='content' umi:method='menu' umi:element-id="0" umi:button-position="bottom left" umi:region="list" umi:sortable="sortable">
			<xsl:apply-templates select="items/item" />
		</ul>
	</xsl:template>
	
	<xsl:template match="udata[@method = 'menu']//item">
		<li umi:region="row">
			<a href="{@link}" umi:element-id="{@id}" umi:field-name="name" umi:delete="delete" umi:empty="Название страницы">
				<xsl:value-of select="." />
			</a>
		</li>
	</xsl:template>
	
	
	<xsl:template match="result[@module = 'content' and @method = 'notfound']">
		<xsl:apply-templates select="document('udata://content/sitemap')/udata" />
	</xsl:template>
	
	
	<xsl:template match="result[@module = 'content' and @method = 'sitemap']">
		<xsl:apply-templates select="document('udata://content/sitemap')/udata/items" />
	</xsl:template>
	
	
	
	<xsl:template match="udata[@method = 'sitemap']//items">
		<ul class="menu" umi:module='content' umi:method='menu' umi:element-id="0" umi:button-position="bottom left" umi:region="list" umi:sortable="sortable">
			<xsl:apply-templates select="item" />
		</ul>
	</xsl:template>
	
	<xsl:template match="udata[@method = 'sitemap']//item">
		<li umi:region="row">
			<a href="{@link}" umi:element-id="{@id}" umi:field-name="name" umi:delete="delete" umi:empty="Название страницы">
				<xsl:value-of select="@name" />
			</a>
			
			<xsl:apply-templates select="items" />
		</li>
	</xsl:template>
</xsl:stylesheet>