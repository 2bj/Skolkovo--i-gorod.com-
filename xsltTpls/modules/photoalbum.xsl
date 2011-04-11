<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet	version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:umi="http://www.umi-cms.ru/TR/umi">


	<xsl:template match="result[@module = 'photoalbum' and @method = 'album']">
		<xsl:apply-templates select="document('udata://photoalbum/album')/udata" />
	</xsl:template>
	
	
	<xsl:template match="udata[@module = 'photoalbum' and @method = 'album']">
		<ul class="photos" umi:module="photoalbum" umi:method="album" umi:element-id="{id}" umi:button-position="bottom left" umi:region="list" umi:sortable="sortable">
			<xsl:apply-templates select="items/item" />
		</ul>
	</xsl:template>
	
	<xsl:template match="udata[@module = 'photoalbum' and @method = 'album']/items/item">
		<xsl:variable name="item" select="document(concat('upage://', @id))/udata" />
		<xsl:variable name="photo" select="$item//property[@name = 'photo']/value" />
	
		<li umi:region="row" umi:element-id="{@id}">
			<img src="{$photo}" width="150" umi:field-name="photo" umi:delete="delete" />
		
			<a href="{@link}" umi:element-id="{@id}" umi:field-name="name" umi:empty="Enter photo name" umi:delete="delete">
				<xsl:value-of select="." />
			</a>
		</li>
	</xsl:template>
	
	
	<xsl:template match="result[@module = 'photoalbum' and @method = 'photo']">
		<xsl:variable name="photo" select="page//property[@name = 'photo']/value" />
		<img src="{$photo}" width="150" umi:field-name="photo" umi:element-id="{page/@id}" />
	</xsl:template>

</xsl:stylesheet>