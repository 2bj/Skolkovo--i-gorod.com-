<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
		<xsl:template match="data" priority="1">
				<xsl:call-template name="ui-smc-table">
					<xsl:with-param name="flat-mode">1</xsl:with-param>
				</xsl:call-template>
		</xsl:template>
		
		<xsl:template match="/result[@method = 'view_noactive_comments']/data" priority="1">
				<xsl:call-template name="ui-smc-table">
					<xsl:with-param name="control-params">noactive</xsl:with-param>
					<xsl:with-param name="flat-mode">1</xsl:with-param>
				</xsl:call-template>
		</xsl:template>
		
</xsl:stylesheet>