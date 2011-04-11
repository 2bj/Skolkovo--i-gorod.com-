<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
				xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
				xmlns:php="http://php.net/xsl"
				extension-element-prefixes="php"
				exclude-result-prefixes="xsl php">

<xsl:output method="xml" encoding="utf-8"/>

<xsl:variable name="currency" select="document('udata://emarket/currencySelector/')/udata/items" />
<xsl:variable name="default-currency" select="$currency/item[@default = 'default']/@codename" />

<xsl:template match="umidump[@version='2.0']">
	<xsl:variable name="date" select="php:function('date', 'Y-m-d')" />

	<КоммерческаяИнформация ВерсияСхемы="2.04" ДатаФормирования="{$date}">
		<ПакетПредложений СодержитТолькоИзменения="false">
			<Ид><xsl:value-of select="meta/source-name" /></Ид>
			<Наименование>Пакет предложений</Наименование>
			<ИдКаталога><xsl:value-of select="meta/source-name" /></ИдКаталога>
			<ИдКлассификатора><xsl:value-of select="meta/source-name" /></ИдКлассификатора>
			<Владелец>
				<Ид><xsl:value-of select="meta/domain" /></Ид>
				<Наименование>Сайт http://<xsl:value-of select="meta/domain" /></Наименование>
			</Владелец>

			<xsl:apply-templates select="$currency" mode="currency" />

			<xsl:apply-templates select="pages" />
		</ПакетПредложений>
	</КоммерческаяИнформация>
</xsl:template>

<xsl:template match="items" mode="currency">
	<ТипыЦен>
		<xsl:apply-templates select="item" mode="currency" />
	</ТипыЦен>
</xsl:template>

<xsl:template match="item" mode="currency">
	<ТипЦены>
		<Ид><xsl:value-of select="@id" /></Ид>
		<Наименование>Розничная</Наименование>
		<Валюта><xsl:value-of select="@codename" /></Валюта>
		<Налог>
			<Наименование>НДС</Наименование>
			<УчтеноВСумме>true</УчтеноВСумме>
		</Налог>
	</ТипЦены>
</xsl:template>

<xsl:template match="pages">
	<Предложения>
		<xsl:apply-templates select="page" />
	</Предложения>
</xsl:template>

<xsl:template match="page">
	<xsl:param name="properties" select="properties/group/property" />
	<xsl:param name="id">
		<xsl:choose>
			<xsl:when test="string-length($properties[@name = '1c_product_id']/value)">
				<xsl:value-of select="$properties[@name = '1c_product_id']/value" />
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="@id" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:param>
	<Предложение>
		<Ид><xsl:value-of select="$id" /></Ид>
		<Штрихкод><xsl:value-of select="$properties[@name = 'bar_code']/value" /></Штрихкод>
		<Наименование><xsl:value-of select="name" /></Наименование>
		<xsl:apply-templates select="$currency" mode="prices">
			<xsl:with-param name="price" select="$properties[@name = 'price']" />
		</xsl:apply-templates>

		<Количество>1,00</Количество>
	</Предложение>
</xsl:template>

<xsl:template match="items" mode="prices">
	<xsl:param name="price" />
	<Цены>
		<xsl:apply-templates select="item" mode="prices">
			<xsl:with-param name="price" select="$price" />
		</xsl:apply-templates>
	</Цены>
</xsl:template>

<xsl:template match="item" mode="prices">
	<xsl:param name="price" />
	<xsl:param name="value">
		<xsl:choose>
			<xsl:when test="$default-currency != @codename">
				<xsl:value-of select="document(concat('udata://emarket/getPriceByCurrency/', number($price/value), '/', @id))/udata/price/actual" />
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$price/value" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:param>
	
	<Цена>
		<Представление><xsl:value-of select="$value" />&#160;<xsl:value-of select="@codename" /></Представление>
		<ИдТипаЦены><xsl:value-of select="@id" /></ИдТипаЦены>
		<ЦенаЗаЕдиницу><xsl:value-of select="$value" /></ЦенаЗаЕдиницу>
		<Валюта><xsl:value-of select="@codename" /></Валюта>
		<Единица>шт</Единица>
		<Коэффициент>1</Коэффициент>
	</Цена>
</xsl:template>

<!-- -->
<xsl:template match="umidump">
	<error>Unknown umidump version</error>
</xsl:template>

<xsl:include href="custom/offersCommerceML.xsl" />

</xsl:stylesheet>
