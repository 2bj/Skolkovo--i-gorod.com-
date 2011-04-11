<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
				xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
				xmlns:date="http://exslt.org/dates-and-times"
				exclude-result-prefixes="date">

<xsl:output method="xml" />

<xsl:key name="parent_test" match="page" use="@id"/>
<xsl:variable name="deliveryIncluded" select="'deliveryIncluded'" />
<xsl:variable name="sales_notes" select="'sales_notes'" />
<xsl:variable name="rate" select="'rate'" />
<xsl:variable name="plus" select="'plus'" />
<xsl:variable name="is_cbrf" select="'is_cbrf'" />
<!--+ =====================================
	+ 		Special properties
	+ =====================================-->
<!-- vendor.model -->
<xsl:variable name="typePrefix" select="'typePrefiks'" />
<xsl:variable name="vendor" select="'proizvoditel'" />
<xsl:variable name="model" select="'model'" />

<!-- book -->
<xsl:variable name="author" select="'author'" />
<xsl:variable name="publisher" select="'publisher'" />
<xsl:variable name="series" select="'series'" />
<xsl:variable name="year" select="'year'" />
<xsl:variable name="isbn" select="'isbn'" />

<!-- artist.title -->
<xsl:variable name="artist" select="'artist'" />
<xsl:variable name="title" select="'nazvanie'" />
<xsl:variable name="media" select="'media'" />
<xsl:variable name="starring" select="'starring'" />
<xsl:variable name="director" select="'director'" />
<xsl:variable name="originalName" select="'originalName'" />
<xsl:variable name="country" select="'country'" />

<!-- event-ticket -->
<xsl:variable name="place" select="'place'" />
<xsl:variable name="hall" select="'hall'" />
<xsl:variable name="hall-plan" select="'hall_plan'" />
<xsl:variable name="hall_part" select="'hall_part'" />
<xsl:variable name="date" select="'date'" />
<xsl:variable name="is_premiere" select="'premiere'" />
<xsl:variable name="is_kids" select="'for-kids'" />

<!-- tour -->
<xsl:variable name="worldRegion" select="'worldRegion'" />
<xsl:variable name="region" select="'region'" />
<xsl:variable name="days" select="'days'" />
<xsl:variable name="dataTour" select="'dataTour'" />
<xsl:variable name="hotel_stars" select="'hotel_stars'" />
<xsl:variable name="room" select="'room'" />
<xsl:variable name="meal" select="'meal'" />
<xsl:variable name="included" select="'included'" />
<xsl:variable name="transport" select="'transport'" />
<xsl:variable name="price_min" select="'price_min'" />
<xsl:variable name="price_max" select="'price_max'" />

<xsl:variable name="currency" select="document('udata://emarket/currencySelector/')/udata/items" />
<xsl:variable name="default-currency" select="$currency/item[@default = 'default']/@codename" />

<xsl:template match="/">
	<xsl:apply-templates select="umidump" />
</xsl:template>

<xsl:template match="object" />


<xsl:template match="umidump[@version='2.0']">
	<xsl:variable name="date" select="concat(substring-before(date:date-time(), 'T'), ' ', substring(substring-after(date:date-time(), 'T'), 1, 5))" />
	<yml_catalog date="{$date}">
		<shop>
			<name><xsl:value-of select="meta/site-name" /></name>
			<company><xsl:value-of select="meta/site-name" /></company>
			<xsl:if test="phone"> 
				<phone><xsl:value-of select="phone" /></phone>
			</xsl:if>
			<url><xsl:value-of select="concat('http://', meta/domain)" /></url>
			<currencies>
				<xsl:choose>
					<xsl:when test="count($currency/item)">
						<xsl:apply-templates select="$currency/item" mode="currency-list" />
					</xsl:when>
					<xsl:otherwise>
						<currency id="RUB" rate="1"/>
					</xsl:otherwise>
				</xsl:choose>
			</currencies>
			<categories>
				<xsl:apply-templates select="pages/page[basetype/@method = 'category']" />
			</categories>
			<offers>
				<xsl:apply-templates select="pages/page[basetype/@method = 'object']" />
			</offers>
		</shop>
	</yml_catalog>
</xsl:template>

<xsl:template match="item" mode="currency-list">
	<currency id="{@codename}" rate="{@rate}" />
</xsl:template>

<xsl:template match="page[basetype/@method = 'category']">
	<category>
		<xsl:attribute name="id"><xsl:value-of select="@id"/></xsl:attribute>
		<xsl:for-each select="key('parent_test', @parentId)">
			<xsl:if test="@parentId != 0">
				<xsl:attribute name="parentId"><xsl:value-of select="@parentId"/></xsl:attribute>
			</xsl:if>
		</xsl:for-each>
		<xsl:value-of select="name"/>
	</category>
</xsl:template>

<xsl:template match="page[basetype/@method = 'object']">
	<xsl:param name="price" select="number(.//property[@name = 'price']/value)" />
	<xsl:if test="$price &gt; 0">
		<offer>
			<xsl:choose>
				<xsl:when test=".//property[@name = $vendor]/value != '' and .//property[@name = $model]/value != ''">
					<xsl:attribute name="type">vendor.model</xsl:attribute>
				</xsl:when>
				<xsl:when test=".//property[@name = $isbn]/value != ''">
					<xsl:attribute name="type">book</xsl:attribute>
				</xsl:when>
				<xsl:when test=".//property[@name = $title]/value != ''">
					<xsl:attribute name="type">artist.title</xsl:attribute>
				</xsl:when>
				<xsl:when test=".//property[@name = $place]/value != ''">
					<xsl:attribute name="type">event-ticket</xsl:attribute>
				</xsl:when>
				<xsl:when test=".//property[@name = $transport]/value != ''">
					<xsl:attribute name="type">tour</xsl:attribute>
				</xsl:when>
			</xsl:choose>
			<xsl:attribute name="available">
				<xsl:choose>
					<xsl:when test=".//property[@name = 'common_quantity']/value &gt; 0"><xsl:text>true</xsl:text></xsl:when>
					<xsl:otherwise><xsl:text>false</xsl:text></xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<url><xsl:value-of select="concat('http://', /umidump/meta/domain, @link)" /></url>
			<price><xsl:value-of select="$price"/></price>
			<currencyId>
				<xsl:choose>
					<xsl:when test="string-length($default-currency)"><xsl:value-of select="$default-currency" /></xsl:when>
					<xsl:otherwise>RUR</xsl:otherwise>
				</xsl:choose>
			</currencyId>
			<categoryId><xsl:value-of select="@parentId"/></categoryId>
			<xsl:if test=".//property[@name = 'photo']/value != ''">
				<picture>
					<xsl:value-of select="concat('http://', /umidump/meta/domain, .//property[@name = 'photo']/value)"/>
				</picture>
			</xsl:if>
			<!-- 
				<delivery>!!!delivery(true|false)!!!</delivery>
			-->
			<xsl:choose>
				<!-- vendor.model -->
				<xsl:when test="(.//property[@name = $vendor]/value != '') and (.//property[@name = $model]/value != '')">
					<xsl:if test=".//property[@name = $typePrefix]/value != ''">
						<typePrefix><xsl:value-of select=".//property[@name = $typePrefix]/value"/></typePrefix>
					</xsl:if>
					<vendor><xsl:value-of select=".//property[@name = $vendor]/value"/></vendor>
					<model><xsl:value-of select=".//property[@name = $model]/value"/></model>
				</xsl:when>
				<!-- book -->
				<xsl:when test=".//property[@name = $isbn]/value != ''">
					<xsl:if test=".//property[@name = $author]/value != ''">
						<author><xsl:value-of select=".//property[@name = $author]/value"/></author>
					</xsl:if>
					<name><xsl:value-of select="name"/></name>
					<xsl:if test=".//property[@name = $publisher]/value != ''">
						<publisher><xsl:value-of select=".//property[@name = $publisher]/value"/></publisher>
					</xsl:if>
					<xsl:if test=".//property[@name = $series]/value != ''">
						<series><xsl:value-of select=".//property[@name = $series]/value"/></series>
					</xsl:if>
					<xsl:if test=".//property[@name = $year]/value != ''">
						<year><xsl:value-of select=".//property[@name = $year]/value"/></year>
					</xsl:if>
					<xsl:if test=".//property[@name = $isbn]/value != ''">
						<ISBN><xsl:value-of select=".//property[@name = $isbn]/value"/></ISBN>
					</xsl:if>
				</xsl:when>
				<!-- artist.title -->
				<xsl:when test=".//property[@name = $title]/value != ''">
					<xsl:if test=".//property[@name = $artist]/value != ''">
						<artist><xsl:value-of select=".//property[@name = $artist]/value"/></artist>
					</xsl:if>
					<title><xsl:value-of select=".//property[@name = $title]/value"/></title>
					<xsl:if test=".//property[@name = $year]/value != ''">
						<year><xsl:value-of select=".//property[@name = $year]/value"/></year>
					</xsl:if>
					<xsl:if test=".//property[@name = $media]/value != ''">
						<media><xsl:value-of select=".//property[@name = $media]/value"/></media>
					</xsl:if>
					<xsl:if test=".//property[@name = $starring]/value != ''">
						<starring><xsl:value-of select=".//property[@name = $starring]/value"/></starring>
					</xsl:if>
					<xsl:if test=".//property[@name = $director]/value != ''">
						<director><xsl:value-of select=".//property[@name = $director]/value"/></director>
					</xsl:if>
					<xsl:if test=".//property[@name = $originalName]/value != ''">
						<originalName><xsl:value-of select=".//property[@name = $originalName]/value"/></originalName>
					</xsl:if>
					<xsl:if test=".//property[@name = $country]/value != ''">
						<country><xsl:value-of select=".//property[@name = $country]/value"/></country>
					</xsl:if>
				</xsl:when>
				<!-- event-ticket -->
				<xsl:when test=".//property[@name = $place]/value != ''">
					<name><xsl:value-of select="name"/></name>
					<place><xsl:value-of select=".//property[@name = $place]/value"/></place>
					<xsl:if test="(.//property[@name = $hall]/value != '') and (.//property[@name = $hall-plan]/value != '')">
						<hall plan="{.//property[@name = $hall-plan]/value}"><xsl:value-of select=".//property[@name = $hall]/value"/></hall>
					</xsl:if>
					<xsl:if test=".//property[@name = $hall_part]/value != ''">
						<hall_part><xsl:value-of select=".//property[@name = $hall_part]/value"/></hall_part>
					</xsl:if>
					<xsl:if test=".//property[@name = $date]/value != ''">
						<date><xsl:value-of select=".//property[@name = $date]/value"/></date>
					</xsl:if>
					<xsl:if test=".//property[@name = $is_premiere]/value != ''">
						<is_premiere><xsl:value-of select=".//property[@name = $is_premiere]/value"/></is_premiere>
					</xsl:if>
					<xsl:if test=".//property[@name = $is_kids]/value != ''">
						<is_kids><xsl:value-of select=".//property[@name = $is_kids]/value"/></is_kids>
					</xsl:if>
				</xsl:when>
				<!-- tour -->
				<xsl:when test=".//property[@name = $transport]/value != ''">
					<xsl:if test=".//property[@name = $worldRegion]/value != ''">
						<worldRegion><xsl:value-of select=".//property[@name = $worldRegion]/value"/></worldRegion>
					</xsl:if>
					<xsl:if test=".//property[@name = $country]/value != ''">
						<country><xsl:value-of select=".//property[@name = $country]/value"/></country>
					</xsl:if>
					<xsl:if test=".//property[@name = $region]/value != ''">
						<region><xsl:value-of select=".//property[@name = $region]/value"/></region>
					</xsl:if>
					<xsl:if test=".//property[@name = $days]/value != ''">
						<days><xsl:value-of select=".//property[@name = $days]/value"/></days>
					</xsl:if>
					<xsl:if test=".//property[@name = $dataTour]/value != ''">
						<dataTour><xsl:value-of select=".//property[@name = $dataTour]/value"/></dataTour>
					</xsl:if>
					<name><xsl:value-of select="name"/></name>
					<xsl:if test=".//property[@name = $hotel_stars]/value != ''">
						<hotel_stars><xsl:value-of select=".//property[@name = $hotel_stars]/value"/></hotel_stars>
					</xsl:if>
					<xsl:if test=".//property[@name = $room]/value != ''">
						<room><xsl:value-of select=".//property[@name = $room]/value"/></room>
					</xsl:if>
					<xsl:if test=".//property[@name = $meal]/value != ''">
						<meal><xsl:value-of select=".//property[@name = $meal]/value"/></meal>
					</xsl:if>
					<xsl:if test=".//property[@name = $included]/value != ''">
						<included><xsl:value-of select=".//property[@name = $included]/value"/></included>
					</xsl:if>
					<xsl:if test=".//property[@name = $transport]/value != ''">
						<transport><xsl:value-of select=".//property[@name = $transport]/value"/></transport>
					</xsl:if>
					<xsl:if test=".//property[@name = price_min]/value != ''">
						<price_min><xsl:value-of select=".//property[@name = price_min]/value"/></price_min>
					</xsl:if>
					<xsl:if test=".//property[@name = price_max]/value != ''">
						<price_max><xsl:value-of select=".//property[@name = price_max]/value"/></price_max>
					</xsl:if>
				</xsl:when>
				<xsl:otherwise>
					<name><xsl:value-of select="name"/></name>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:if test=".//property[@name = 'description']/value != ''">
				<description><xsl:value-of select=".//property[@name = 'description']/value"/></description>
			</xsl:if>
		</offer>
	</xsl:if>
</xsl:template>

<xsl:include href="custom/YML.xsl" />

</xsl:stylesheet>
