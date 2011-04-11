<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:date="http://exslt.org/dates-and-times" exclude-result-prefixes="date">
	<xsl:output method="xml" doctype-system="exchange.dtd" encoding="UTF-8"/>
	<xsl:template match="Envelope" >
		<Exchange>
			<xsl:apply-templates macth="Cube/Cube/Cube" mode="currency-info" />
		</Exchange>
	</xsl:template>
	<xsl-template match="Cube/Cube/Cube" mode="currency-info" >
		<Exchange_Rates>
			<Home_Country></Home_Country>
			<New_Country></New_Country>
			<Rate></Rate>
		</Exchange_Rates>
	</xsl-template>
</xsl:stylesheet>
