<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xlink="http://www.w3.org/TR/xlink">
<xsl:output method="text" encoding="utf-8" indent="no" />
<xsl:strip-space elements="*"/>



	<xsl:template match="/result">
		<xsl:apply-templates select="data" />
	</xsl:template>
	
	
	<xsl:template match="data" />
	
	
	<xsl:template match="data[@total > 0 and page]">
		<xsl:variable name="first-type-id" select="page[position() = 1]/@type-id" />
		<xsl:variable name="first-type" select="document(concat('utype://', $first-type-id))/udata" />
		<xsl:variable name="type-fields" select="$first-type//group[@visible = 'visible']/field[@visible = 'visible']" />
		
		<xsl:text>Id;Name;Alt name;</xsl:text>
		<xsl:apply-templates select="$type-fields" mode="csv-header" />
		<xsl:text disable-output-escaping="yes">&#10;</xsl:text>

		<xsl:text>id;name;alt_name;</xsl:text>
		<xsl:apply-templates select="$type-fields" mode="csv-names" />
		<xsl:text disable-output-escaping="yes">&#10;</xsl:text>

		<xsl:apply-templates select="page|object">
			<xsl:with-param name="type-fields" select="$type-fields" />
		</xsl:apply-templates>
	</xsl:template>
	
	<xsl:template match="data[@total > 0 and object]">
		<xsl:variable name="first-type-id" select="object[position() = 1]/@type-id" />
		<xsl:variable name="first-type" select="document(concat('utype://', $first-type-id))/udata" />
		<xsl:variable name="type-fields" select="$first-type//group[@visible = 'visible']/field[@visible = 'visible']" />
		
		<xsl:text>Id;Name;</xsl:text>
		<xsl:apply-templates select="$type-fields" mode="csv-header" />
		<xsl:text disable-output-escaping="yes">&#10;</xsl:text>

		<xsl:text>id;name;</xsl:text>
		<xsl:apply-templates select="$type-fields" mode="csv-names" />
		<xsl:text disable-output-escaping="yes">&#10;</xsl:text>

		<xsl:apply-templates select="page|object">
			<xsl:with-param name="type-fields" select="$type-fields" />
		</xsl:apply-templates>
	</xsl:template>


	<xsl:template match="field" mode="csv-header">
		<xsl:value-of select="@title" /><xsl:text>;</xsl:text>
	</xsl:template>

	
	<xsl:template match="field" mode="csv-names">
		<xsl:value-of select="@name" /><xsl:text>;</xsl:text>
	</xsl:template>


	<xsl:template match="page">
		<xsl:param name="type-fields" />
		<xsl:variable name="page-info" select="document(@xlink:href)/udata" />
		
		<xsl:value-of select="@id" />
		<xsl:text>;</xsl:text>
		<xsl:value-of select="name" />
		<xsl:text>;</xsl:text>
		<xsl:value-of select="@alt-name" />
		<xsl:text>;</xsl:text>
		
		<xsl:apply-templates select="$type-fields" mode="values">
			<xsl:with-param name="properties" select="$page-info//property[not(@type = 'symlink')]" />
		</xsl:apply-templates>
		
		<xsl:text disable-output-escaping="yes">&#10;</xsl:text>
	
	</xsl:template>
	
	<xsl:template match="object">
		<xsl:param name="type-fields" />
		<xsl:variable name="object-info" select="document(@xlink:href)/udata" />
		
		<xsl:value-of select="@id" />
		<xsl:text>;</xsl:text>
		<xsl:value-of select="@name" />
		<xsl:text>;</xsl:text>
		
		<xsl:apply-templates select="$type-fields" mode="values">
			<xsl:with-param name="properties" select="$object-info//property[not(@type = 'symlink')]" />
		</xsl:apply-templates>
		
		<xsl:text disable-output-escaping="yes">&#10;</xsl:text>
	
	</xsl:template>
	
	
	<xsl:template match="field" mode="values">
		<xsl:param name="properties" />
		<xsl:variable name="field-name" select="@name" />
		<xsl:variable name="property" select="$properties[@name = $field-name]" />
		
		<xsl:apply-templates select="$property" />
		<xsl:text>;</xsl:text>
	</xsl:template>

	
	<xsl:template match="property[@type = 'string' or @type = 'text' or @type = 'wysiwyg']">
		<xsl:value-of select="value/." />
	</xsl:template>

	
	<xsl:template match="property[@type = 'price' or @type = 'int' or @type = 'float' or @type = 'boolean']">
		<xsl:value-of select="value/." />
	</xsl:template>
	
	<xsl:template match="property[@type = 'file' or @type = 'img_file' or @type = 'swf_file']">
		<xsl:value-of select="value/@path" />
	</xsl:template>
	
	<xsl:template match="property[@type = 'relation']">
		<xsl:apply-templates select="value/item" />
	</xsl:template>
	
	<xsl:template match="value/item">
		<xsl:value-of select="@name" /><xsl:text>|</xsl:text>
	</xsl:template>
	
	<xsl:template match="value/item[position() = last()]">
		<xsl:value-of select="@name" />
	</xsl:template>
	
	<xsl:template match="property[@type = 'tags']">
		
	</xsl:template>
	

</xsl:stylesheet>