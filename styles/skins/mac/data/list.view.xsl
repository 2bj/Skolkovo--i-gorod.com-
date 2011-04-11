<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="data[@type = 'list' and @action = 'view']">
		<xsl:call-template name="ui-smc-table" />
	</xsl:template>

	<xsl:include href="udata://core/importSkinXsl/list.view.xsl"/>
	<xsl:include href="udata://core/importSkinXsl/list.view.custom.xsl"/>
</xsl:stylesheet>