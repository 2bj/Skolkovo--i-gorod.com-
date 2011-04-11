<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet	version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:umi="http://www.umi-cms.ru/TR/umi">

	<xsl:include href="catalog-editor.xsl" />


	<xsl:template match="result[@module = 'catalog' and @method = 'category']">
		<xsl:apply-templates select="document('udata://catalog/getCategoryList')/udata" />
		<xsl:apply-templates select="document('udata://catalog/getObjectsList')/udata" />
	</xsl:template>

	<xsl:template match="udata[@module = 'catalog' and @method = 'getCategoryList']">
		<xsl:apply-templates select="items">
			<xsl:with-param name="list-class">
				<xsl:text>catalog-rubrics</xsl:text>
			</xsl:with-param>
		</xsl:apply-templates>
	</xsl:template>
	
	<xsl:template match="udata[@module = 'catalog' and @method = 'getObjectsList']">
		<xsl:call-template name="numpages">
			<xsl:with-param name="limit" select="per_page" />
			<xsl:with-param name="total" select="total" />
		</xsl:call-template>

		<xsl:apply-templates select="items|lines">
		</xsl:apply-templates>
	</xsl:template>
	
	<xsl:template match="udata[@method = 'getObjectsList']/lines">
		<ul umi:region="list" umi:sortable="sortable" umi:element-id="{../category_id}" umi:module="catalog" umi:method="getObjectsList">
			<xsl:apply-templates select="item" />
		</ul>
	</xsl:template>
	
	
	<xsl:template match="udata[@module = 'catalog' and @method = 'getCategoryList']/items">
		<ul umi:module="catalog" umi:element-id="{../@category-id}" umi:method="getCategoryList" umi:button-position="bottom left" umi:region="list" umi:sortable="sortable">
			<xsl:apply-templates />
		</ul>
		<br /><br />
	</xsl:template>
	
	<xsl:template match="result[@module = 'catalog' and @method = 'object']">
		<p>
			<xsl:apply-templates select="document(concat('udata://emarket/price/', page/@id))/udata" />
		</p>
		
		<p>
			<xsl:apply-templates select="document(concat('udata://emarket/stores/', page/@id))/udata" />
		</p>
		
		<form method="post" action="/emarket/basket/put/element/{page/@id}/">
			<input type="hidden" name="redirect-uri" value="{$request-uri}" />
			<xsl:apply-templates select="page//group[@name = 'catalog_option_props']" />
			
			<div class="buttons">
				<input type="submit" value="Положить в корзину" />
				<xsl:text> </xsl:text>
				<input type="button" value="Добавить к сравнению" />
			</div>
		</form>
	</xsl:template>
	
	
	<xsl:template match="group[@name = 'catalog_option_props']">
		<h2>
			<xsl:text>Выберите дополнительные опции</xsl:text>
		</h2>
		
		<input type="hidden" name="redirect-uri" value="{$request-uri}" />
		
		<xsl:apply-templates select="property[@type = 'optioned']" />
	</xsl:template>
</xsl:stylesheet>