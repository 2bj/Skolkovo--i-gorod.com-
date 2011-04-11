<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output encoding="utf-8" method="html" ident="yes" />
	
	<xsl:param name="param0">0</xsl:param>
	
	<!-- Current language info -->
	<xsl:variable name="lang-prefix" select="/result/@pre-lang"/>
	<xsl:variable name="lang-current" select="/result/@interface-lang"/>
	<xsl:variable name="lang-id" select="/result/@lang-id"/>

	<!-- Current interface info -->
	<xsl:variable name="iface-lang" select="/result/@interface-lang"/>

	
	<!-- Current domain info -->
	<xsl:variable name="domain"	select="/result/@domain"/>
	<xsl:variable name="domain-id" select="/result/@domain-id"/>
	<xsl:variable name="domain-floated"	select="/result/@domain-floated"/>
	
	<!-- Current module::method -->
	<xsl:variable name="module"	select="/result/@module"/>
	<xsl:variable name="method"	select="/result/@method"/>
	
	<!-- Header of current page -->
	<xsl:variable name="header"	select="document('udata://core/header')/udata"/>
	
	<!-- Result data tag properties -->
	<xsl:variable name="data-type" select="/result/data/@type"/>
	<xsl:variable name="data-action" select="/result/data/@action"/>
	<xsl:variable name="data-total"	select="/result/data/@total"/>
	<xsl:variable name="data-offset" select="/result/data/@offset"/>
	<xsl:variable name="data-limit"	select="/result/data/@limit"/>

	<!-- Main modules menu data -->
	<xsl:variable name="modules-menu" select="document('udata://config/menu')/udata"/>
	
	<!-- Navibar -->
	<xsl:variable name="navibar" select="document(concat('udata://system/getSubNavibar/', /result/data/page/@parentId))/udata" />
	
	<!-- Errors list -->
	<xsl:variable name="errors"	select="document('udata://system/listErrorMessages')/udata"/>

	<xsl:param name="param0" />
	
	<xsl:include href="ui/errors.xsl" />
	
	<xsl:include href="layout.xsl" />
	

	<xsl:include href="udata://core/importSkinXsl" />
	<xsl:include href="udata://core/importSkinXsl/common.xsl"/>
	<xsl:include href="udata://core/importSkinXsl/common.custom.xsl"/>
	
	<xsl:template match="result">
		<xsl:apply-templates />
	</xsl:template>
	
	<xsl:template match="data">
		<p class="error">
			<strong>
				<xsl:text>Ошибка: </xsl:text>
			</strong>
			<xsl:text>Не могу отобразить этот тип страницы "</xsl:text>
			<strong>
				<xsl:value-of select="concat($data-type, '.', $data-action)" />
			</strong>
			<xsl:text>" &#8212; еще не научили.</xsl:text>
			
		</p>
	</xsl:template>
</xsl:stylesheet>