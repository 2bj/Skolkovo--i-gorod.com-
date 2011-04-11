<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:variable name="dominant-type-id" select="document(concat('udata://system/getDominantTypeId/', $param1))/udata" />
	
	<xsl:template match="data[@type = 'list']">
		<div id="eip_page">
			<h3>
				<xsl:text>Выберите тип страницы:</xsl:text>
			</h3>
			<div id="eip_page_types_choice">
				<xsl:apply-templates select="hierarchy-type" />
				<div style="clear:both;"></div>
			</div>
			<xsl:apply-templates select="hierarchy-type" mode="subtypes" />
		</div>
	</xsl:template>
	
	<xsl:template match="hierarchy-type">
		<div class="eip_page_type_choice">
			<xsl:choose>
				<xsl:when test="count(document(concat('udata://system/getObjectTypesList/', @module, '/', @method))/udata/items/item) &gt; 1000">
					<xsl:attribute name="onclick">showSubtypes(this, '<xsl:value-of select="@module" />');</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="onclick">submitAddPage('<xsl:value-of select="@id" />');</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
			<img src="/images/cms/admin/mac/icons/medium/{@module}.png" />
			<div class="eip_page_type_choice_title"><xsl:value-of select="." /></div>
		</div>
	</xsl:template>

	<xsl:template match="hierarchy-type" mode="subtypes">
		<xsl:apply-templates select="document(concat('udata://system/getObjectTypesList/', @module, '/', @method))/udata">
			<xsl:with-param name="hierarchy-type-id" select="@id" />
			<xsl:with-param name="hierarchy-type-module" select="@module" />
		</xsl:apply-templates>
	</xsl:template>

	<xsl:template match="udata[@method = 'getObjectTypesList']" />
	
	<xsl:template match="udata[@method = 'getObjectTypesList' and count(//item) > 1]">
		<xsl:param name="hierarchy-type-id" />
		<xsl:param name="hierarchy-type-module" />
		<form id="eip_page_subtype_{$hierarchy-type-module}" method="get" style="display:none;">
			<xsl:apply-templates select="//item">
				<xsl:with-param name="hierarchy-type-id" select="$hierarchy-type-id" />
			</xsl:apply-templates>
			<div class="eip_buttons">
				<input type="submit" value="Продолжить" class="primary ok" />
				<input type="button" value="&label-cancel;" class="back" onclick="hideSubtypes(this.form);" />
				<div style="clear:both;"></div>
			</div>
			<input type="hidden" name="hierarchy-type-id" value="{$hierarchy-type-id}" />
		</form>
	</xsl:template>
	
	<xsl:template match="udata[@method = 'getObjectTypesList']//item">
		<xsl:param name="hierarchy-type-id" />
		<div>
			<label>
				<xsl:if test="@id = $dominant-type-id">
					<xsl:attribute name="style"><xsl:text>font-weight: bold</xsl:text></xsl:attribute>
				</xsl:if>
				<input type="radio" value="{@id}" style="float:none;" 
					name="object-type[{$hierarchy-type-id}]" id="object-type-{$hierarchy-type-id}">
					<xsl:if test="@id = $dominant-type-id">
						<xsl:attribute name="checked"><xsl:text>checked</xsl:text></xsl:attribute>
					</xsl:if>
				</input>
				<xsl:text>&#160;</xsl:text>
				<xsl:value-of select="." />
			</label>
		</div>
	</xsl:template>
</xsl:stylesheet>