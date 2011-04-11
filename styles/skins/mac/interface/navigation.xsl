<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<!-- Navigation -->
	<xsl:include href="ui/menu.xsl" />
	<xsl:include href="ui/navibar.xsl" />
	<xsl:include href="ui/site-langs.xsl" />
	<xsl:include href="ui/favourites.xsl" />
	<xsl:include href="ui/profile.xsl" />
	<xsl:include href="ui/tabs.xsl" />
	<xsl:include href="ui/panel-buttons.xsl" />
	
	<!-- UI -->
	<xsl:include href="ui/errors.xsl" />
	<xsl:include href="ui/controls.xsl" />
	
	
	<xsl:template match="udata">
		<textarea style="width: 400px; height: 200px;">
			<xsl:copy-of select="." />
		</textarea>
	</xsl:template>
</xsl:stylesheet>