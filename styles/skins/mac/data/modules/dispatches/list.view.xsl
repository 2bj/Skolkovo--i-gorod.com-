<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM	"ulang://common/" [
	<!ENTITY sys-module 'dispatches'>
]>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="data[@type = 'list' and @action = 'view']">
		<xsl:if test="$method != 'messages'">
			<div class="imgButtonWrapper">
				<xsl:if test="$method = 'lists'">
					<a id="addDispatch" href="{$lang-prefix}/admin/&sys-module;/add/dispatch/">&label-add-list;</a>
				</xsl:if>
				<xsl:if test="$method = 'subscribers'">
					<a id="addDispatch" href="{$lang-prefix}/admin/&sys-module;/add/subscriber/">&label-add-subscriber;</a>
				</xsl:if>
			</div>
		</xsl:if>
		<xsl:call-template name="ui-smc-table">
			<xsl:with-param name="control-params" select="$method" />
			<xsl:with-param name="content-type">objects</xsl:with-param>
			<xsl:with-param name="enable-objects-activity" select="$method = 'lists'" />
		</xsl:call-template>
	</xsl:template>

</xsl:stylesheet>