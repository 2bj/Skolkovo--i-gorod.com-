<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM	"ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="udata[@module = 'users' and @method = 'getFavourites']">
		<div>
			<span id="dock_help" style="display: none;">
				<xsl:text>&dock-usage-tip;</xsl:text>
			</span>
			<xsl:apply-templates select="items/item" />
		</div>
		<img src="/images/cms/admin/mac/common/doc_close.png" />
	</xsl:template>
	
	<xsl:template match="udata[@module = 'users' and @method = 'getFavourites']/items/item">
		<a id="dockitem_{@id}" xmlns:umi="http://www.umi-cms.ru/TR/umi"  umi:module="{@id}" href="{$lang-prefix}/admin/{@id}/">
			<img title="{@label}" src="/images/cms/admin/mac/icons/medium/{@id}.png" />
		</a>
	</xsl:template>

	<xsl:template  match="udata[@module = 'users' and @method = 'loadUserSettings']" mode="settings-store" >{<xsl:apply-templates select="items/item" mode="settings-store" />}</xsl:template>

	<xsl:template match="item" mode="settings-store">"<xsl:value-of select="@key" />":{<xsl:apply-templates select="value" mode="settings-store" />}<xsl:if test="not(position() = last())">,</xsl:if></xsl:template>
	
	<xsl:template match="value" mode="settings-store">"<xsl:value-of select="@tag" />":"<xsl:value-of select="text()" />"<xsl:if test="not(position() = last())">,</xsl:if></xsl:template>

</xsl:stylesheet>