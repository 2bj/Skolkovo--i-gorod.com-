<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="/result[@method = 'sitetree']/data[@type = 'list' and @action = 'view']">
		<xsl:apply-templates select="domain" mode="list-view"/>
	</xsl:template>


	<xsl:template match="domain" mode="list-view">
		<xsl:call-template name="ui-smc-tree">
			<xsl:with-param name="control-id" select="@id" />
			<xsl:with-param name="init" select="position() = last()" />
			<xsl:with-param name="domain-id" select="@id" />
			<xsl:with-param name="host" select="@host" />
			<xsl:with-param name="menu"><![CDATA[
				var menu = [
					['view-page', 'view', ContextMenu.itemHandlers.viewElement],
					['add-page', 'add', ContextMenu.itemHandlers.addItem],
					['edit-page', 'ico_edit', ContextMenu.itemHandlers.editItem],
					['change-activity', 'ico_unblock', ContextMenu.itemHandlers.activeItem],
					'-',
					['filter-by-node', false, ContextMenu.itemHandlers.filterItem],
					['change-template', false, ContextMenu.itemHandlers.templatesItem],
					['crossdomain-copy', false, ContextMenu.itemHandlers.moveItem],
					['delete', 'ico_del', ContextMenu.itemHandlers.deleteItem]
				]
			]]></xsl:with-param>
		</xsl:call-template>
	</xsl:template>
	
	
	<xsl:template match="/result[@method = 'tickets']/data[@type = 'list' and @action = 'view']">
		<xsl:call-template name="ui-smc-table">
			<xsl:with-param name="content-type">objects</xsl:with-param>
			<xsl:with-param name="control-params">tickets</xsl:with-param>
		</xsl:call-template>
	</xsl:template>

</xsl:stylesheet>