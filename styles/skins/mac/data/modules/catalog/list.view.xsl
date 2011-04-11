<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM	"ulang://common/catalog" [
	<!ENTITY sys-module		   'catalog'>
	<!ENTITY sys-method-add		   'add'>
	<!ENTITY sys-method-edit	'edit'>
	<!ENTITY sys-method-del		   'del'>
	<!ENTITY sys-method-list	'tree'>

	<!ENTITY sys-type-list		  'category'>
	<!ENTITY sys-type-item		  'object'>
	<!ENTITY sys-method-acivity	   'activity'>
]>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="data" priority="1">
		<div class="imgButtonWrapper" xmlns:umi="http://www.umi-cms.ru/TR/umi">
			<a id="addCategory" href="{$lang-prefix}/admin/&sys-module;/&sys-method-add;/{$param0}/&sys-type-list;/" class="type_select_gray" umi:type="catalog::category">
				<xsl:text>&label-add-list;</xsl:text>
			</a>
			<a id="addObject" href="{$lang-prefix}/admin/&sys-module;/&sys-method-add;/{$param0}/&sys-type-item;/" class="type_select_gray" umi:type="catalog::object">
				<xsl:text>&label-add-item;</xsl:text>
			</a>
		</div>

		<xsl:call-template name="ui-smc-table">
			<xsl:with-param name="js-add-buttons">
				createAddButton(
					$('#addCategory')[0], oTable,
					'<xsl:value-of select="$lang-prefix" />/admin/&sys-module;/&sys-method-add;/{id}/&sys-type-list;/', ['category', true]
				);
				
				createAddButton(
					$('#addObject')[0],	oTable,
					'<xsl:value-of select="$lang-prefix" />/admin/&sys-module;/&sys-method-add;/{id}/&sys-type-item;/', ['category']
				);
			</xsl:with-param>
		</xsl:call-template>

	</xsl:template>


</xsl:stylesheet>