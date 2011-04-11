<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM	"ulang://common">

<xsl:stylesheet version="1.0" exclude-result-prefixes="xlink"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xlink="http://www.w3.org/TR/xlink">
	<xsl:output	encoding="utf-8" indent="yes" method="html" />
	
	<xsl:param name="param0">0</xsl:param>
	
	<!-- Current language info -->
	<xsl:variable name="lang-prefix" select="/result/@pre-lang"/>
	<xsl:variable name="lang-id" select="/result/@lang-id"/>

	<!-- Current interface info -->
	<xsl:variable name="iface-lang" select="/result/@interface-lang"/>

	<!-- Current user id -->
	<xsl:variable name="current-user-id" select="/result/@user-id" />
	
	<!-- Current domain info -->
	<xsl:variable name="domain"	select="/result/@domain"/>
	<xsl:variable name="domain-id" select="/result/@domain-id"/>
	<xsl:variable name="domain-floated"	select="/result/@domain-floated"/>
	
	<!-- Header and title of current page -->
	<xsl:variable name="header"	select="document('udata://core/header')/udata"/>
	<xsl:variable name="title" select="concat('&cms-name; - ', $header)" />

	<!-- Current module::method -->
	<xsl:variable name="module"	select="/result/@module"/>
	<xsl:variable name="method"	select="/result/@method"/>
	
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
	
	<!-- Interface langs list -->
	<xsl:variable name="site-langs" select="document('udata://system/getLangsList')/udata" />
	
	<!-- Favourite modules (modules dock) -->
	<xsl:variable name="favorites" select="document(concat('udata://users/getFavourites/', $current-user-id))/udata"/>
	
	<!-- "Is cache enabled" flag -->
	<xsl:variable name="cache-enabled" select="document('udata://core/cacheIsEnabled')/udata"/>
	
	<!-- Context manual url -->
	<xsl:variable name="context-manul-url" select="document('udata://core/contextManualUrl')/udata" />

	<xsl:include href="interface/navigation.xsl" />
	<xsl:include href="interface/layout.xsl" />
	<xsl:include href="udata://core/importSkinXsl/"/>
	

</xsl:stylesheet>