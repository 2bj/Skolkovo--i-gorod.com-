<?xml version="1.0" encoding="utf-8"?>
<!--<!DOCTYPE xsl:stylesheet SYSTEM	"ulang://i18n/smthng.dtd:file">-->
<xsl:stylesheet	version="1.0"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
		xmlns:xlink="http://www.w3.org/TR/xlink"
		xmlns:umi="http://www.umi-cms.ru/TR/umi"
		exclude-result-prefixes="xlink">

	<xsl:output encoding="utf-8" method="html" indent="yes"/>
	<xsl:include href="common.xsl" />

	<xsl:template match="/">
		<html class="u-eip">
			<head>
				<link rel="search" type="application/opensearchdescription+xml" href="/xsl/onlineSearch/description.xml" title="Search on UMI.CMS" />
				<xsl:value-of select="document('udata://system/includeQuickEditJs')/udata" disable-output-escaping="yes" />

				<title>
					<xsl:value-of select="result/@title" />
				</title>
			</head>
			
			<body>
				<div id="p" />
				<xsl:apply-templates select="document('udata://content/menu')/udata" />

				<h1 umi:element-id="{result/@pageId}" umi:field-name="h1" umi:delete="delete" umi:empty="Заголовок страницы">
					<xsl:value-of select="result/@header" />
				</h1>
				
				<xsl:apply-templates select="document('udata://system/listErrorMessages')/udata" />
				<xsl:apply-templates select="result" />
				
				<div id="debug" />
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>