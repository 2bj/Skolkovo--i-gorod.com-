<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet	version="1.0"
	xmlns:umi="http://www.umi-cms.ru/TR/umi"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:variable name="page-id" select="/result/@pageId" />
	<xsl:variable name="module" select="/result/@module" />
	<xsl:variable name="method" select="/result/@method" />
	<xsl:variable name="request-uri" select="/result/@request-uri" />
	<xsl:variable name="errors" select="document('udata://system/listErrorMessages')/udata" />
	
	
	

	<xsl:include href="modules/content.xsl" />
	<xsl:include href="modules/news.xsl" />
	<xsl:include href="modules/users.xsl" />
	<xsl:include href="modules/catalog.xsl" />
	<xsl:include href="modules/emarket.xsl" />
	<xsl:include href="modules/photoalbum.xsl" />
<!--	
	<xsl:include href="debug.xsl" />
-->
	<!-- Undefined result -->
	<xsl:template match="result">
		<p>
			<xsl:text>Undefined result for </xsl:text>
			<xsl:value-of select="concat(@module, '::', @method)" />
			<xsl:text>() method.</xsl:text>
		</p>
		
		<xsl:apply-templates select="$errors" />
		
		<textarea style="width: 900px; height: 400px;">
		<xsl:copy-of select="document(concat('udata://', @module, '/', @method))/udata" disable-output-escaping="no" />
		</textarea>
	</xsl:template>
	
	
	<!-- Common list resources -->
	<xsl:template match="items|lines">
		<xsl:param name="list-class" />
		
		<ul>
			<xsl:if test="$list-class">
				<xsl:attribute name="class">
					<xsl:value-of select="$list-class" />
				</xsl:attribute>
			</xsl:if>
			
			<xsl:apply-templates select="item" />
		</ul>
	</xsl:template>
	
	<xsl:template match="item[@name]">
		<!--<li umi:region="row">-->
		<li>
			<!--<a href="{@link}" umi:element-id="{@id}" umi:field-name="name" umi:empty="Enter something here" umi:delete="delete">-->
			<a href="{@link}">
				<xsl:value-of select="@name" />
			</a>
			<xsl:apply-templates select="items" />
		</li>
	</xsl:template>


	<xsl:template match="item">
		<!--<li umi:region="row">-->
		<li>
			<!--<a href="{@link}" umi:element-id="{@id}" umi:field-name="name" umi:empty="Enter something here" umi:delete="delete">-->
			<a href="{@link}">
				<xsl:value-of select="text()" />
			</a>
			<xsl:apply-templates select="items" />
		</li>
	</xsl:template>
	
	
	<xsl:template match="error">
		<p class="error" style="color: red; font-weight: bold;">
			<xsl:text>Error: </xsl:text>
			<xsl:value-of select="." />
		</p>
	</xsl:template>
	
	<xsl:template match="udata[@module = 'system' and @method = 'listErrorMessages']/items">
		<xsl:text>Errors list:</xsl:text>
		<ol>
			<xsl:apply-templates />
		</ol>
	</xsl:template>
	
	<xsl:template match="udata[@module = 'system' and @method = 'listErrorMessages']/items/item">
		<li style="color: red; font-weight: bold;">
			<xsl:value-of select="." />
		</li>
	</xsl:template>
	
	
	<xsl:template name="numpages">
		<xsl:param name="limit" />
		<xsl:param name="total" />
		
		<xsl:if test="$total > $limit">
			<xsl:apply-templates select="document(concat('udata://system/numpages/', $total, '/', $limit))/udata" />
		</xsl:if>
	</xsl:template>
	
	
	<xsl:template match="udata[@module = 'system' and @method = 'numpages']">
		<ul class="numpages">
			<xsl:apply-templates select="items/item" />
		</ul>
	</xsl:template>
</xsl:stylesheet>