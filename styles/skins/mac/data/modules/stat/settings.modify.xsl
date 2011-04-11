<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="data[@type = 'settings' and @action = 'modify']">				
		<form method="post" action="do/" enctype="multipart/form-data">
			<xsl:apply-templates select="." mode="settings.modify" />
		</form>
		<script type="text/javascript" language="javascript">
        <![CDATA[
			function ClearButtonClick () {
				var callback = function () {
					window.location.href = "]]><xsl:value-of select="$lang-prefix"/>/admin/stat/clear/do<![CDATA[";
				};

				openDialog({
					title       : "]]>&label-stat-clear;<![CDATA[",
					text        : "]]>&label-stat-clear-confirm;<![CDATA[",
					OKText      : "]]>&label-clear;<![CDATA[",
					cancelText  : "]]>&label-cancel;<![CDATA[",
					OKCallback	: callback
				});                

				return false;
			}
        ]]>
        </script>
		<div class="panel">
			<div class="header" onclick="panelSwitcher(this);">
				<span>&label-stat-clear;</span>
				<div class="l" /><div class="r" />
			</div>
			<div class="content">
				&label-stat-clear-help;
				<div class="buttons">
					<div>
						<input type="button" value="&label-stat-clear;" onclick="javascript:ClearButtonClick();" />
						<span class="l" />
						<span class="r" />
					</div>
				</div>
			</div>
		</div>
	</xsl:template>
	
</xsl:stylesheet>