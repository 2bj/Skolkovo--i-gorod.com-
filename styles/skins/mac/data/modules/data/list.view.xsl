<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/data" [
	<!ENTITY sys-module        'data'>
	<!ENTITY sys-method-type-view    'types'>
	<!ENTITY sys-method-type-add    'type_add'>
	<!ENTITY sys-method-type-edit    'type_edit'>
	<!ENTITY sys-method-type-del    'type_del'>
	<!ENTITY sys-method-del        'del'>
	<!ENTITY sys-method-trash-del    'trash_del'>
	<!ENTITY sys-method-restore    'trash_restore'>
	<!ENTITY sys-method-empty    'trash_empty'>
	<!ENTITY sys-method-guide-view    'guide_items'>
	<!ENTITY sys-method-guide-add    'guide_add'>
]>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="data[@type = 'list' and @action = 'view']">
		<div class="imgButtonWrapper">
			<a href="{$lang-prefix}/admin/&sys-module;/&sys-method-type-add;/{$param0}/" id="addType">&label-type-add;</a>
		</div>
	
		<xsl:call-template name="ui-smc-table">
			<xsl:with-param name="content-type">types</xsl:with-param>
			<xsl:with-param name="js-value-callback"><![CDATA[
				function (value, name, item) {
					var data = item.getData();
					return data.title;
				}
			]]></xsl:with-param>
			<xsl:with-param name="menu"><![CDATA[
				var menu = [
					['edit-item', 'ico_edit', ContextMenu.itemHandlers.editItem],
					['delete',    'ico_del',  ContextMenu.itemHandlers.deleteItem]
				]
			]]></xsl:with-param>
			<xsl:with-param name="js-add-buttons">
				createAddButton(
					$('#addType')[0], oTable,
					'<xsl:value-of select="$lang-prefix" />/admin/&sys-module;/&sys-method-type-add;/{id}/', ['*',true]
				);
			</xsl:with-param>
		</xsl:call-template>
	</xsl:template>
	
	<xsl:template match="/result[@method = 'guides']/data[@type = 'list' and @action = 'view']">
		<div class="imgButtonWrapper">
			<a href="{$lang-prefix}/admin/&sys-module;/&sys-method-guide-add;/7/" id="addType">&label-guide-add;</a>
		</div>
	
		<xsl:call-template name="ui-smc-table">
			<xsl:with-param name="content-type">types</xsl:with-param>
			<xsl:with-param name="control-params">guides</xsl:with-param>
			<xsl:with-param name="js-value-callback"><![CDATA[
				function (value, name, item) {
					var data = item.getData();
					return data.title;
				}
			]]></xsl:with-param>
			<xsl:with-param name="menu"><![CDATA[
				var menu = [
					['view-guide-items', 'view',     ContextMenu.itemHandlers.guideViewItem],
					['edit-item',        'ico_edit', ContextMenu.itemHandlers.editItem],
					['delete',           'ico_del',  ContextMenu.itemHandlers.deleteItem]
				]
			]]></xsl:with-param>
		</xsl:call-template>
	</xsl:template>
	
	<xsl:template match="/result[@method = 'trash']">
		<script type="text/javascript">
			function showClearTrashConfirm() {
				openDialog({
					OKText     : getLabel('js-trash-confirm-ok'),
					cancelText : getLabel('js-trash-confirm-cancel'),
					title      : getLabel('js-trash-confirm-title'),
					text       : getLabel('js-trash-confirm-text'),
					OKCallback : function () {						
						window.location.href = '<xsl:text>/admin/&sys-module;/&sys-method-empty;/</xsl:text>';
					}
				});
			}
		</script>
		<div class="imgButtonWrapper">
			<a href="javascript:void(0);" class="del" onclick="javascript:showClearTrashConfirm();">&label-empty-all;</a>
		</div>
		<xsl:call-template name="ui-smc-table">
			<xsl:with-param name="control-params">trash</xsl:with-param>
			<xsl:with-param name="content-type">pages</xsl:with-param>
			<xsl:with-param name="flat-mode">1</xsl:with-param>
			<xsl:with-param name="show-toolbar">0</xsl:with-param>
			<xsl:with-param name="disable-csv-buttons">1</xsl:with-param>
			<xsl:with-param name="js-ignore-props-edit">['name']</xsl:with-param>
			<xsl:with-param name="menu">
			<![CDATA[
				var menu = [			
					['edit-item', 'ico_restore', ContextMenu.itemHandlers.restoreItem],
					['delete',    'ico_del',  ContextMenu.itemHandlers.deleteItem]
				]
			]]>
			</xsl:with-param>
		</xsl:call-template>
	</xsl:template>

</xsl:stylesheet>