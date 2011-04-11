<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet [ <!ENTITY nbsp "&#160;"> ]>

<xsl:stylesheet	version="1.0"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
		xmlns:php="http://php.net/xsl"
		xsl:extension-element-prefixes="php"
		exclude-result-prefixes="php">

	<xsl:output encoding="utf-8" method="html" indent="yes"/>

	<xsl:template match="/">
		<xsl:apply-templates />
	</xsl:template>

	<xsl:template match="/udata">
		<xsl:apply-templates mode="print-reciept" />
	</xsl:template>

	<xsl:template match="/udata[@module='emarket' and @method='order']">
		<xsl:apply-templates select="document(concat('uobject://',/udata/@id))/udata/object" mode="print-reciept" />
	</xsl:template>

	<xsl:template match="/udata/object" mode="print-reciept">
		<xsl:variable name="payment" select="document(concat('uobject://',//property[@name='payment_id']/value/item/@id))/udata/object/properties" />
		<xsl:variable name="price" select="//property[@name='total_price']/value" />
		<xsl:variable name="customer" select="document(concat('uobject://',//property[@name='customer_id']/value/item/@id))/udata/object" />
		<xsl:variable name="name-string" select="concat($customer//property[@name='lname']/value, ' ', $customer//property[@name='fname']/value, ' ', $customer//property[@name='father_name']/value)" />
		<xsl:variable name="address"  select="document(concat('uobject://',//property[@name='delivery_address']/value/item[1]/@id))/udata/object" />
		<xsl:variable name="address-string" select="concat($address//property[@name='index']/value,', ',$address//property[@name='region']/value,', ',$address//property[@name='city']/value,', ',$address//property[@name='street']/value,', д. ',$address//property[@name='house']/value,', кв.',$address//property[@name='flat']/value)" />


		<html>
			<head id="header">
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<title>Квитанция для физических лиц</title>
				<style>
					.invoice-error {
						margin: 24px;
						padding: 24px;
						border: solid red 1px;
						color: red;
						font-weight: bold;
					}
					#receipt {font-size: 10pt;}
					#receipt H1 {font-size: 12pt;}
					#receipt p, #receipt ul, #receipt ol, #receipt h1 {margin-top:6px; margin-bottom:6px}
					#receipt td {font-size: 9pt; padding-left: 4px;}
					#receipt td.small {font-size: 7pt;}
					#receipt small {font-size: 7pt;}
					.u {
						text-decoration: underline;
						margin-left: 2px;
						margin-right: 2px;
					}
					#invoice {}
					#invoice table.tbl {
						border-left: solid 2px black;
						border-top: solid 2px black;
						width: 620px;
					}
					#invoice table.tbl td {
						border-right: solid 2px black;
						border-bottom: solid 2px black;
						padding: 2px 6px;
					}
				</style>
			</head>
			<body id="receipt">
				<div style="width:180mm;">
					Для оплаты выбранных товаров, пожалуйста, распечатайте данную квитанцию.
					Вы сможете произвести по ней оплату в Сбербанке или любом другом банке, обслуживающем физических лиц.<br />
					<hr/>
				</div>
				<table border="0" cellspacing="0" cellpadding="0" style="width:180mm; height:145mm;">
					<tr valign="top">
						<td style="width:50mm; height:70mm; border:1pt solid #000000; border-bottom:none; border-right:none;" align="center">
							<b>Извещение</b><br /><span style="font-size:53mm"> <br /></span><b>Кассир</b>
						</td>
						<td style="border:1pt solid #000000; border-bottom:none;" align="center">
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr><td align="right"><small><i>Форма № ПД-4</i></small></td></tr>
								<tr><td style="border-bottom:1pt solid #000000;"><xsl:value-of select="$payment//property[@name='reciever']/value" /></td></tr>
								<tr><td align="center"><small>(наименование получателя платежа)</small></td></tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td style="width:37mm; border-bottom:1pt solid #000000;"><xsl:value-of select="$payment//property[@name='reciever_inn']/value" /></td>
									<td style="width:9mm;"> </td>
									<td style="border-bottom:1pt solid #000000;"><xsl:value-of select="$payment//property[@name='reciever_account']/value" /></td>
								</tr>
								<tr>
									<td align="center"><small>(ИНН получателя платежа)</small></td>
									<td><small> </small></td>
									<td align="center"><small>(номер счета получателя платежа)</small></td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td>в </td>
									<td style="width:73mm; border-bottom:1pt solid #000000;" class="small"><xsl:value-of select="$payment//property[@name='reciever_bank']/value" /></td>
									<td align="right">БИК  </td>
									<td style="width:33mm; border-bottom:1pt solid #000000;"><xsl:value-of select="$payment//property[@name='bik']/value" /></td>
								</tr>
								<tr>
									<td></td>
									<td align="center"><small>(наименование банка получателя платежа)</small></td>
									<td></td>
									<td></td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td width="1%" style="white-space:nowrap;">Номер кор./сч. банка получателя платежа  </td>
									<td width="100%" style="border-bottom:1pt solid #000000;"><xsl:value-of select="$payment//property[@name='reciever_bank_account']/value" /></td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td style="width:60mm; border-bottom:1pt solid #000000;"><xsl:text>Счет № </xsl:text><span id="py-order-name-1"><xsl:text>И/</xsl:text><xsl:value-of select="@id" /><xsl:text>/Ф</xsl:text></span><xsl:text> от </xsl:text><xsl:value-of select="php:function('date', 'd.m.Y')" /></td>
									<td style="width:2mm;"> </td>
									<td style="border-bottom:1pt solid #000000;color:white;"> - </td>
								</tr>
								<tr>
									<td align="center"><small>(наименование платежа)</small></td>
									<td><small> </small></td>
									<td align="center"><small>(номер лицевого счета (код) плательщика)</small></td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td width="1%" style="white-space:nowrap;">Ф.И.О. плательщика  </td>
									<td width="99%" style="border-bottom:1pt solid #000000;">  <span id="py-fio-1"><xsl:value-of select="$name-string" /></span>  </td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td width="1%" style="white-space:nowrap;">Адрес плательщика  </td>
									<td width="99%" style="border-bottom:1pt solid #000000;">  <span id="py-address-1"><xsl:value-of select="$address-string" /></span>  </td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td>Сумма платежа  <span class="u" id="py-order-price-1"><xsl:value-of select="floor($price)" /></span> руб. <span class="u"> <xsl:value-of select="round((number($price)-floor($price))*100)" /> </span> коп.</td>
									<td align="right">  Сумма платы за услуги  _____ руб. ____ коп.</td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td>Итого  _______ руб. ____ коп.</td>
									<td align="right">  «______»________________ 200____ г.</td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td>
										<small>С условиями приема указанной в платежном документе суммы, в т.ч. с суммой взимаемой платы за услуги банка, ознакомлен и согласен.</small>
									</td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td align="right"><b>Подпись плательщика _____________________</b></td>
								</tr>
							</table>
						</td>
					</tr>
					<tr valign="top">
						<td style="width:50mm; height:70mm; border:1pt solid #000000; border-right:none;" align="center">
							<span style="font-size:50mm"> <br /></span><b>Квитанция</b><br /><span style="font-size:8pt"> <br /></span><b>Кассир</b>
						</td>
						<td style="border:1pt solid #000000;" align="center">
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr><td align="right"><small> </small></td></tr>
								<tr><td style="border-bottom:1pt solid #000000;"><xsl:value-of select="$payment//property[@name='reciever']/value" /></td></tr>
								<tr><td align="center"><small>(наименование получателя платежа)</small></td></tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td style="width:37mm; border-bottom:1pt solid #000000;"><xsl:value-of select="$payment//property[@name='reciever_inn']/value" /></td>
									<td style="width:9mm;"> </td>
									<td style="border-bottom:1pt solid #000000;"><xsl:value-of select="$payment//property[@name='reciever_account']/value" /></td>
								</tr>
								<tr>
									<td align="center"><small>(ИНН получателя платежа)</small></td>
									<td><small> </small></td>
									<td align="center"><small>(номер счета получателя платежа)</small></td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td>в </td>
									<td style="width:73mm; border-bottom:1pt solid #000000;" class="small"><xsl:value-of select="$payment//property[@name='reciever_bank']/value" /></td>
									<td align="right">БИК  </td>
									<td style="width:33mm; border-bottom:1pt solid #000000;"><xsl:value-of select="$payment//property[@name='bik']/value" /></td>
								</tr>
								<tr>
									<td></td>
									<td align="center"><small>(наименование банка получателя платежа)</small></td>
									<td></td>
									<td></td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td width="1%" style="white-space:nowrap;">Номер кор./сч. банка получателя платежа  </td>
									<td width="100%" style="border-bottom:1pt solid #000000;"><xsl:value-of select="$payment//property[@name='reciever_bank_account']/value" /></td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td style="width:60mm; border-bottom:1pt solid #000000;"><xsl:text>Счет № </xsl:text><span id="py-order-name-2"><xsl:text>И/</xsl:text><xsl:value-of select="@id" /><xsl:text>/Ф</xsl:text></span><xsl:text> от </xsl:text><xsl:value-of select="php:function('date', 'd.m.Y')" /></td>
									<td style="width:2mm;"> </td>
									<td style="border-bottom:1pt solid #000000;color:white;"> - </td>
								</tr>
								<tr>
									<td align="center"><small>(наименование платежа)</small></td>
									<td><small> </small></td>
									<td align="center"><small>(номер лицевого счета (код) плательщика)</small></td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td width="1%" style="white-space:nowrap;">Ф.И.О. плательщика  </td>
									<td width="99%" style="border-bottom:1pt solid #000000;">  <span id="py-fio-2"><xsl:value-of select="$name-string" /></span>  </td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td width="1%" style="white-space:nowrap;">Адрес плательщика  </td>
									<td width="99%" style="border-bottom:1pt solid #000000;">  <span id="py-address-2"><xsl:value-of select="$address-string" /></span>  </td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td>Сумма платежа <span class="u" id="py-order-price-2"><xsl:value-of select="floor($price)" /></span> руб. <span class="u"> <xsl:value-of select="round((number($price)-floor($price))*100)" /> </span> коп.</td>
									<td align="right">  Сумма платы за услуги  _____ руб. ____ коп.</td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td>Итого  _______ руб. ____ коп.</td>
									<td align="right">  «______»________________ 200____ г.</td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td>
										<small>С условиями приема указанной в платежном документе суммы, в т.ч. с суммой взимаемой платы за услуги банка, ознакомлен и согласен.</small>
									</td>
								</tr>
							</table>
							<table border="0" cellspacing="0" cellpadding="0" style="width:122mm; margin-top:3pt;">
								<tr>
									<td align="right"><b>Подпись плательщика _____________________</b></td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>