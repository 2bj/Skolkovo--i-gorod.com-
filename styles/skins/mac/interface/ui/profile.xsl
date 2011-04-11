<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM	"ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template name="profile">
		<xsl:variable name="user-login" select="document(concat('uobject://', $current-user-id, '.login'))//value/." />
		
		<a id="profile" href="/admin/users/edit/{$current-user-id}/">
			<xsl:text>&profile; (</xsl:text>
			<xsl:value-of select="$user-login" />
			<xsl:text>)</xsl:text>
			<span class="l" /><span class="r" />
		</a>
	</xsl:template>
</xsl:stylesheet>