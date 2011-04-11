<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
	version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xlink="http://www.w3.org/TR/xlink"
	xmlns:umi="http://www.umi-cms.ru/TR/umi"
	exclude-result-prefixes="xlink">


	<xsl:template match="udata[@method = 'getObjectsList']//item">
		<li umi:region="row">
			<p>
				<a href="{@link}" umi:element-id="{@id}" umi:field-name="name" umi:delete="delete" umi:empty="Enter something here">
					<xsl:value-of select="." />
				</a>
			</p>
		</li>
		<xsl:apply-templates select="document(@xlink:href)/udata//group[@name = 'test_group']" />
	</xsl:template>
	
	<xsl:template match="group[@name = 'test_group']">
		<p>
			<table border="1">
				<xsl:apply-templates select="property" />
			</table>
		</p>
	</xsl:template>
	
	
	<xsl:template match="group[@name = 'test_group']/property">
		<tr>
			<td>
				<xsl:value-of select="title" />
			</td>

			<td umi:element-id="{../../../@id}" umi:field-name="{@name}">
				<xsl:apply-templates select="." mode="render" />
			</td>

		</tr>
	</xsl:template>


	<xsl:template match="property" mode="render">
		<xsl:text>Unkown field type: </xsl:text>
		<xsl:value-of select="@type" />
	</xsl:template>

	<xsl:template match="property[@type = 'string']" mode="render">
		<xsl:value-of select="value" />
	</xsl:template>
	
	<xsl:template match="property[@type = 'text']" mode="render">
		<xsl:attribute name="style">white-space: pre</xsl:attribute>
		<xsl:value-of select="value" />
	</xsl:template>
	
	<xsl:template match="property[@type = 'date']" mode="render">
		<xsl:value-of select="document(concat('udata://system/convertDate/', value/@unix-timestamp, '/(Y-m-d%20H:i)'))/udata" />
	</xsl:template>
	
	<xsl:template match="property[@type = 'tags']" mode="render">
		<xsl:value-of select="combined" />
	</xsl:template>
	
	<xsl:template match="property[@type = 'int' or @type = 'float' or @type = 'price' or @type = 'counter']" mode="render">
		<xsl:value-of select="value" />
	</xsl:template>
	
	<xsl:template match="property[@type = 'wysiwyg']" mode="render">
		<xsl:value-of select="value" disable-output-escaping="yes" />
	</xsl:template>
	
	<xsl:template match="property[@type = 'img_file']" mode="render">
		<img src="{value/.}" />
	</xsl:template>
	
	<xsl:template match="property[@type = 'symlink']" mode="render">
		<ul class="symlink">
			<xsl:apply-templates select="value/page" mode="render" />
		</ul>
	</xsl:template>
	
	<xsl:template match="page" mode="render">
		<li>
			<a href="{@link}" umi:element-id="{@id}" umi:field-name="name">
				<xsl:value-of select="name" />
			</a>
		</li>
	</xsl:template>
	
	
	<xsl:template match="property[@type = 'relation']" mode="render">
		<xsl:apply-templates select="value/item" mode="render" />
	</xsl:template>
	
	<xsl:template match="item" mode="render">
		<span umi:object-id="{@id}" umi:field-name="name">
			<xsl:value-of select="@name" />
		</span>
		<xsl:text>, </xsl:text>
	</xsl:template>
	
	<xsl:template match="item[position() = last()]" mode="render">
		<span umi:object-id="{@id}" umi:field-name="name">
			<xsl:value-of select="@name" />
		</span>
	</xsl:template>

</xsl:stylesheet>