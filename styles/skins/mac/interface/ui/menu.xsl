<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:umi="http://www.umi-cms.ru/TR/umi">
	<xsl:template match="udata[@module = 'config' and @method = 'menu']">
		<ul>
			<xsl:apply-templates select="items/item[@priority &lt; 100 and position() mod 2 = 1]" />
		</ul>
		
		<ul>
			<xsl:apply-templates select="items/item[@priority &lt; 100 and position() mod 2 = 0]" />
		</ul>

		<div class="clear" style="border-top:solid 1px #b2c7d5; border-bottom:solid 1px white;" />

		<ul>
			<xsl:apply-templates select="items/item[@priority &gt; 100 and position() mod 2 = 1]" />
		</ul>
		
		<ul>
			<xsl:apply-templates select="items/item[@priority &gt; 100 and position() mod 2 = 0]" />
		</ul>
	</xsl:template>
	
	<xsl:template match="udata[@module = 'config' and @method = 'menu']/items/item">
		<li>
			<a href="{$lang-prefix}/admin/{@name}/" umi:module="{@name}" >
				<img src="/images/cms/admin/mac/icons/small/{@name}.png" />
				<xsl:value-of select="@label" />
			</a>
		</li>
	</xsl:template>
</xsl:stylesheet>