<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
				xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
				xmlns:php="http://php.net/xsl"
				extension-element-prefixes="php"
				exclude-result-prefixes="xsl php">

<xsl:output method="xml" encoding="utf-8"/>

<xsl:variable name="currency" select="document('udata://emarket/currencySelector/')/udata/items" />
<xsl:variable name="default-currency" select="$currency/item[@default = 'default']/@codename" />

<xsl:key name="property" match="/umidump/types/type[base/@module = 'catalog']//field" use="@id"/>
<xsl:key name="type" match="/umidump/types/type[base/@module = 'catalog']" use="@id"/>

<xsl:template match="umidump[@version='2.0']">
	<xsl:variable name="date" select="php:function('date', 'Y-m-d')" />

	<КоммерческаяИнформация ВерсияСхемы="2.04" ДатаФормирования="{$date}">
		<Классификатор>
			<Ид><xsl:value-of select="meta/source-name" /></Ид>
			<Наименование>Классификатор с сайта "<xsl:value-of select="meta/domain" />"</Наименование>
			<Владелец>
				<Ид><xsl:value-of select="meta/domain" /></Ид>
				<Наименование>Сайт http://<xsl:value-of select="meta/domain" /></Наименование>
			</Владелец>

			<Группы>
				<xsl:apply-templates select="meta/branches/id" mode="group" />
			</Группы>

			<Свойства>
				<xsl:apply-templates select="/umidump/types/type[base/@module = 'catalog']//field" mode="property" />
			</Свойства>
		</Классификатор>

		<Каталог СодержитТолькоИзменения="false">
			<Ид><xsl:value-of select="meta/source-name" /></Ид>
			<ИдКлассификатора>280af51d-ef93-11de-9de0-001c7e202cbc</ИдКлассификатора>
			<Наименование>Каталог товаров сайта "<xsl:value-of select="meta/domain" />"</Наименование>
			<Владелец>
				<Ид><xsl:value-of select="meta/domain" /></Ид>
				<Наименование>Сайт http://<xsl:value-of select="meta/domain" /></Наименование>
			</Владелец>

			<Товары>
				<xsl:apply-templates select="pages/page[basetype/@module = 'catalog' and basetype/@method = 'object']" mode="good" />
			</Товары>
		</Каталог>

	</КоммерческаяИнформация>
</xsl:template>

<xsl:template match="meta/branches/id" mode="group">
	<xsl:param name="id" select="string(.)" />
	<xsl:apply-templates select="/umidump/pages/page[@id = $id and basetype/@module = 'catalog' and basetype/@method = 'category']" mode="group" />
</xsl:template>

<xsl:template match="page" mode="group">
	<xsl:param name="id" select="@id" />
	<xsl:param name="subgroups" select="/umidump/pages/page[@parentId = $id and basetype/@module = 'catalog' and basetype/@method = 'category']" />

	<Группа>
		<Ид><xsl:value-of select="@id"/></Ид>
		<Наименование><xsl:value-of select="name"/></Наименование>
		<xsl:if test="count($subgroups)">
			<Группы>
				<xsl:apply-templates select="$subgroups" mode="group" />
			</Группы>
		</xsl:if>
	</Группа>

</xsl:template>

<xsl:template match="page" mode="good">
	<xsl:param name="parent-id" select="@parentId" />
	<xsl:param name="property" select="properties/group/property" />
	<xsl:param name="id">
		<xsl:choose>
			<xsl:when test="string-length($property[@name = '1c_product_id']/value)">
				<xsl:value-of select="$property[@name = '1c_product_id']/value" />
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="@id" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:param>

	<Товар>
		<Ид><xsl:value-of select="$id"/></Ид>
		<Артикул><xsl:value-of select="$property[@name = 'artikul']/value" /></Артикул>
		<Штрихкод><xsl:value-of select="$property[@name = 'bar_code']/value" /></Штрихкод>
		<Наименование><xsl:value-of select="name" /></Наименование>
		<ПолноеНаименование><xsl:value-of select="name" /></ПолноеНаименование>
		<БазоваяЕдиница Код="796" НаименованиеПолное="Штука" МеждународноеСокращение="PCE">шт</БазоваяЕдиница>
		<Картинка><xsl:value-of select="$property[@name = 'photo']/value" /></Картинка>

		<Группы>
			<xsl:if test="@parentId">
				<Ид><xsl:value-of select="@parentId" /></Ид>
			</xsl:if>
		</Группы>

		<ЗначенияСвойств>
			<xsl:apply-templates select="key('type', @type-id)/fieldgroups/group[not(@name = 'common' or @name = 'cenovye_svojstva' or @name = 'product' or @name = 'menu_view' or @name = 'more_params' or @name = 'rate_voters' or @name = 'locks' or @name = 'catalog_stores_props')]/field[not(@name = 'photo')]"  mode="good-property">
				<xsl:with-param name="prop-values" select="properties//property" />
			</xsl:apply-templates>
		</ЗначенияСвойств>

		<ЗначенияРеквизитов>
			<ЗначениеРеквизита>
				<Наименование>ВидНоменклатуры</Наименование>
				<Значение><xsl:value-of select="/umidump/pages/page[@id = $parent-id]/name" /></Значение>
			</ЗначениеРеквизита>
			<ЗначениеРеквизита>
				<Наименование>ТипНоменклатуры</Наименование>
				<Значение>Товар</Значение>
			</ЗначениеРеквизита>
			<ЗначениеРеквизита>
				<Наименование>Полное наименование</Наименование>
				<Значение><xsl:value-of select="name" /></Значение>
			</ЗначениеРеквизита>
			<ЗначениеРеквизита>
				<Наименование>Вес</Наименование>
				<Значение><xsl:value-of select="properties//property[@name = 'weight']/value" /></Значение>
			</ЗначениеРеквизита>
		</ЗначенияРеквизитов>
	</Товар>
</xsl:template>

<xsl:template match="field" mode="good-property">
	<xsl:param name="id" select="@id" />
	<xsl:param name="prop-values" />
	<xsl:param name="prop-value" select="$prop-values[@id = $id]/value" />
	<ЗначенияСвойства>
		<Ид><xsl:value-of select="$id" /></Ид>
		<xsl:choose>
			<xsl:when test="type/@data-type = 'relation' and count($prop-value/item)">
				<xsl:for-each select="$prop-value/item">
					<Значение><xsl:value-of select="@name" /></Значение>
				</xsl:for-each>
			</xsl:when>
			<xsl:when test="type/@data-type = 'symlink' and count($prop-value/page)">
				<xsl:for-each select="$prop-value/page">
					<Значение><xsl:value-of select="name" /></Значение>
				</xsl:for-each>
			</xsl:when>
			<xsl:when test="type/@data-type = 'date' and string-length($prop-value/@unix-timestamp)">
				<Значение><xsl:value-of select="php:function('date', 'Y-m-d H:i', string($prop-value/@unix-timestamp))" /></Значение>
			</xsl:when>
			<xsl:otherwise>
				<Значение><xsl:value-of select="$prop-value" /></Значение>
			</xsl:otherwise>
		</xsl:choose>
	</ЗначенияСвойства>
</xsl:template>

<xsl:template match="field" mode="property">
	<xsl:if test="generate-id(.) = generate-id(key('property', ./@id))">
		<Свойство>
			<Ид><xsl:value-of select="@id" /></Ид>
			<Наименование><xsl:value-of select="@title" /></Наименование>
		</Свойство>
	</xsl:if>
</xsl:template>



<!-- -->
<xsl:template match="umidump">
	<error>Unknown umidump version</error>
</xsl:template>

<xsl:include href="custom/catalogCommerceML.xsl" />

</xsl:stylesheet>
