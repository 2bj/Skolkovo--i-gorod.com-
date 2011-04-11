<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM	"ulang://common">

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="udata[@module = 'system' and @method = 'getSubNavibar']">
		<div id="breadcrumb">
			<a href="{$lang-prefix}/admin/">
				<xsl:text>&system-main-page;</xsl:text>
			</a>
			<xsl:apply-templates />
		</div>
		
	</xsl:template>
	
	<xsl:template match="udata[@module = 'system' and @method = 'getSubNavibar']/module">
		<xsl:text>\</xsl:text>
		<a href="/admin/{.}/">
			<xsl:value-of select="@label" />
		</a>
	</xsl:template>
	
	<xsl:template match="udata[@module = 'system' and @method = 'getSubNavibar']/method">
		<span>
			<xsl:text>\</xsl:text>
			<span>
				<xsl:value-of select="@label" />
			</span>
		</span>
	</xsl:template>
</xsl:stylesheet>