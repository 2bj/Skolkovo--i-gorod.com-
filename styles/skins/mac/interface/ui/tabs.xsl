<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM	"ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:variable name="tabs" select="document(concat('udata://system/get_module_tabs/', $module, '/', $method))/udata" />

	<xsl:template match="result" mode="tabs">
		<xsl:choose>
			<xsl:when test="count($tabs/items/item)">
				<div class="panel">
					<xsl:apply-templates select="$tabs" />
					
					<div class="content">
						<xsl:apply-templates select="." />
					</div>
				</div>
			</xsl:when>
			
			<xsl:otherwise>
				<xsl:apply-templates select="." />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	
	<xsl:template match="udata[@module = 'system' and @method = 'get_module_tabs']">
		<div class="tabs">
			<xsl:apply-templates select="items/item" />
		</div>
	</xsl:template>
	
	<xsl:template match="udata[@module = 'system' and @method = 'get_module_tabs']/items/item">
		<a href="{@link}">
			<xsl:attribute name="class">
				<xsl:text>header</xsl:text>
				<xsl:if test="@active"><xsl:text> act</xsl:text></xsl:if>
				<xsl:choose>
					<xsl:when test="position() = 1"><xsl:text> first</xsl:text></xsl:when>
					<xsl:when test="position() = last()"><xsl:text> last</xsl:text></xsl:when>
					<xsl:otherwise>
						<xsl:choose>
							<xsl:when test="@active" />
							<xsl:when test="preceding-sibling::node()[@active]"><xsl:text> next</xsl:text></xsl:when>
							<xsl:otherwise><xsl:text> prev</xsl:text></xsl:otherwise>
						</xsl:choose>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<span class="c">
				<xsl:value-of select="@label" />
			</span>
			<span class="l" /><span class="r" />
		</a>
	</xsl:template>

</xsl:stylesheet>