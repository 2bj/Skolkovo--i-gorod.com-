<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="group[@name='import']" mode="settings.modify">
		<div class="panel">
			<div class="header" onclick="panelSwitcher(this);">
				<span>
					<xsl:value-of select="@label" />
				</span>
				<div class="l" /><div class="r" />
			</div>
			<div class="content">
				&old_import_text;

				<div class="buttons">
					<div>
						<input type="button" value="&old_import_button;"  onclick="javascript:document.location.href='/admin/blogs20/import_old_blogs/'" />
						<span class="l" />
						<span class="r" />
					</div>
				</div>
			</div>
		</div>
	</xsl:template>

</xsl:stylesheet>
