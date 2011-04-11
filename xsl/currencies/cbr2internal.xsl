<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" doctype-system="exchange.dtd" encoding="utf-8"/>

	<xsl:template match="ValCurs">
		<Exchange>
			<xsl:apply-templates match="Valute" />
		</Exchange>
	</xsl:template>

	<xsl:template match="Valute">
		<Exchange_Rates>
			<Home_Country>
				<xsl:text>RUB</xsl:text>
			</Home_Country>
			
			<New_Country>
				<xsl:value-of select="CharCode" />
			</New_Country>
			
			<Rate>
				<xsl:value-of select="Value" />
			</Rate>
			
			<Nominal>
				<xsl:value-of select="Nominal" />
			</Nominal>
		</Exchange_Rates>
	</xsl:template>
</xsl:stylesheet>
