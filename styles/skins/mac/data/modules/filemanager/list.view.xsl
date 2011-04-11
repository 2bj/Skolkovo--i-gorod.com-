<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM	"ulang://common/catalog" [
	<!ENTITY sys-module		   'filemanager'>
	<!ENTITY sys-method-add		   'add_shared_file'>
]>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="data" priority="1">

		<div class="imgButtonWrapper">
			<a href="{$lang-prefix}/admin/&sys-module;/&sys-method-add;/">&label-add-file;</a>
		</div>

		<xsl:call-template name="ui-smc-table">
			
		</xsl:call-template>
	</xsl:template>


</xsl:stylesheet>