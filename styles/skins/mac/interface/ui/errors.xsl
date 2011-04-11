<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM	"ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
	<xsl:template match="data[error]">
		<xsl:apply-templates />
	</xsl:template>
	
	<xsl:template match="data/error">
		<div id="errorList">
			<p class="error"><strong><xsl:text>&label-errors-found;:</xsl:text></strong></p>
			
			<ol class="error">
				<li>
					<xsl:value-of select="." />
				</li>
			</ol>
		</div>
	</xsl:template>
	
	<xsl:template match="udata[@module = 'system' and @method = 'listErrorMessages']">
		<div id="errorList">
			<p class="error"><strong><xsl:text>&label-errors-found;:</xsl:text></strong></p>
		
			<ol class="error">
				<xsl:apply-templates select="items/item" />
			</ol>
		</div>
	</xsl:template>
	
	<xsl:template match="udata[@module = 'system' and @method = 'listErrorMessages'][count(items/item) = 0]" />
	
	<xsl:template match="udata[@module = 'system' and @method = 'listErrorMessages']/items/item">
		<li>
			<xsl:value-of select="." />
		</li>
	</xsl:template>
	
	<!-- Temporary template to make dev a little bit easy -->
	<xsl:template match="data">
		<div id="errorList">
			<p class="error"><strong><xsl:text>&label-errors-found;:</xsl:text></strong></p>

			<ol class="error">
				<li>
					<xsl:text>&error-method-doesnt-exists;</xsl:text>
				</li>
			</ol>
		</div>
	</xsl:template>
</xsl:stylesheet>