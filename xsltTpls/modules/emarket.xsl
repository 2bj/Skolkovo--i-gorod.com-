<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet	version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xlink="http://www.w3.org/TR/xlink"
	xmlns:umi="http://www.umi-cms.ru/TR/umi">

	<!-- Item price -->
	<xsl:template match="udata[@module = 'emarket' and @method = 'price']">
		<h2>
			<xsl:text>Стоимость товара</xsl:text>
		</h2>

		<xsl:apply-templates />
	</xsl:template>
	
	<xsl:template match="price/actual">
		<p class="actual-price">
			<strong>
				<xsl:text>Цена: </xsl:text>
				
				<xsl:value-of select="../@prefix" />
				<xsl:value-of select="." />
				<xsl:text> </xsl:text>
				<xsl:value-of select="../@suffix" />
			</strong>
		</p>
	</xsl:template>
	
	<xsl:template match="price/original">
		<p class="original-price">
			<strike>
				<xsl:text>Цена без скидки: </xsl:text>
				
				<xsl:value-of select="../@prefix" />
				<span umi:element-id="{../../@element-id}" umi:field-name="price">
					<xsl:value-of select="." />
				</span>
				<xsl:text> </xsl:text>
				<xsl:value-of select="../@suffix" />
			</strike>
		</p>
	</xsl:template>
	
	<xsl:template match="currencies/price/original">
		<p class="original-price">
			<strike>
				<xsl:text>Цена без скидки: </xsl:text>
				
				<xsl:value-of select="../@prefix" />
				<xsl:value-of select="." />
				<xsl:text> </xsl:text>
				<xsl:value-of select="../@suffix" />
			</strike>
		</p>
	</xsl:template>
	
	<xsl:template match="price/previous">
		<p class="previous-price">
			<strike class="price">
				<xsl:text>Старая цена: </xsl:text>
				
				<xsl:value-of select="../@prefix" />
				<xsl:value-of select="." />
				<xsl:text> </xsl:text>
				<xsl:value-of select="../@suffix" />
			</strike>
		</p>
	</xsl:template>
	
	<!-- Item discount -->
	<xsl:template match="discount">
		<h3>
			<xsl:text>Скидки</xsl:text>
		</h3>

		<p class="discount">
			<h4 umi:object-id="{@id}" umi:field-name="name">
				<xsl:value-of select="@name" />
			</h4>
			<br />
			<em umi:object-id="{@id}" umi:field-name="description">
				<xsl:value-of select="description" />
			</em>
		</p>
	</xsl:template>
	
	<!-- Item currency -->
	<xsl:template match="currencies">
		<h3>
			<xsl:text>В других валютах:</xsl:text>
		</h3>
		
		<ul class="currencies">
			<xsl:apply-templates />
		</ul>
	</xsl:template>
	
	<!-- Item stores state -->
	<xsl:template match="udata[@module = 'emarket' and @method = 'stores']">
		<dl class="stores">
			<dt>
				<xsl:text>Наличие на складах</xsl:text>
			</dt>
			<xsl:apply-templates select="stores" />
		</dl>
		<p>
			<strong>
				<xsl:text>Всего: </xsl:text>
				<xsl:value-of select="stores/@total-amount" />
				<xsl:text> наименований</xsl:text>
			</strong>
		</p>
	</xsl:template>
	
	<xsl:template match="stores[count(store) = 0]">
		<xsl:text>Нет данных</xsl:text>
	</xsl:template>
	
	<xsl:template match="stores">
		<xsl:apply-templates select="store" />
	</xsl:template>
	
	<xsl:template match="store">
		<dd>
			<xsl:value-of select="item/@name" />
			<xsl:text> - </xsl:text>
			<strong>
				<xsl:value-of select="@amount" />
			</strong>
			<xsl:text> наименований</xsl:text>
		</dd>
	</xsl:template>
	
	
	<!-- Catalog option fileds render -->
	<xsl:template match="property[@type = 'optioned']">
		<dl class="option">
			<dt>
				<xsl:value-of select="title" />
			</dt>
			<input type="hidden" name="options[{@name}]" value="" />
			<xsl:apply-templates select="value/option" />
		</dl>
	</xsl:template>
	
	<xsl:template match="option">
		<xsl:variable name="element-id" select="../../../../../@id" />
		<xsl:variable name="field-name" select="../../@name" />
		
		<dd>
			<input
				type="radio" 
				name="options[{$field-name}]"
				value="{object/@id}"
				id="option-{$element-id}-{$field-name}-{object/@id}"	
			/>
			
			<label for="option-{$element-id}-{$field-name}-{object/@id}">
				<span umi:object-id="{object/@id}" umi:field-name="name">
					<xsl:value-of select="object/@name" />
				</span>
				<xsl:apply-templates select="@float" />
			</label>
		</dd>
	</xsl:template>
	
	<xsl:template match="option/@float">
		<xsl:text> - </xsl:text>
		<span umi:element-id="{../../../../../../@id}" umi:field-name="{../../../@name}[rel:{../object/@id}][float]">
			<xsl:value-of select="round(.)" />
		</span>
		<xsl:text> руб.</xsl:text>
	</xsl:template>
	
	
	<xsl:template match="result[@module = 'emarket' and (@method = 'order' or @method = 'basket' or @method = 'cart')]">
		<xsl:apply-templates select="document(concat('udata://emarket/', @method, '/'))/udata" />
	</xsl:template>
	

	<!-- Render order/basket state -->
	<xsl:template match="udata[@method = 'order' or @method = 'basket']">
		<xsl:variable name="order-info" select="document(@xlink:href)/udata" />
		
		<xsl:apply-templates select="error" />
		
		<xsl:apply-templates select="items" />
		
		<xsl:apply-templates select="summary" />
		
		<xsl:apply-templates select="discount" />
		
		<xsl:apply-templates select="customer" />
		
		<xsl:apply-templates select="$order-info" mode="status" />
	</xsl:template>
	

	<!-- Order items list -->
	<xsl:template match="udata[@method = 'order' or @method = 'basket' or @method = 'cart']/items">
		<table>
			<tr>
				<th>
					<xsl:text>#</xsl:text>
				</th>

				<th>
					<xsl:text>Наименования</xsl:text>
				</th>
				
				<th>
					<xsl:text>Дополнительные опции</xsl:text>
				</th>
				
				<th>
					<xsl:text>Количество</xsl:text>
				</th>
				
				<th>
					<xsl:text>Цена за ед.</xsl:text>
				</th>
				
				<th>
					<xsl:text>Цена</xsl:text>
				</th>
				
				<th>
					<xsl:text>Скидки</xsl:text>
				</th>
			</tr>
			
			<xsl:apply-templates select="item" />
		</table>
	</xsl:template>
	
	
	<xsl:template match="udata[@method = 'order' or @method = 'basket' or @method = 'cart']/items/item" priority="1">
		<tr>
			<td>
				<xsl:value-of select="concat(position(), '.')" />
			</td>
			
			<td>
				<p>
					<a href="{page/@link}">
						<xsl:value-of select="@name" />
					</a>
				</p>
				
				<p>
					<xsl:text>Номинальная стоимость: </xsl:text>
					<xsl:value-of select="document(concat(page/@xlink:href, '.price'))/udata//property[@name = 'price']/value/." />
					<xsl:text> руб.</xsl:text>
				</p>
			</td>
			
			<td>
				<xsl:apply-templates select="options" />
			</td>
			
			<td>
				<xsl:value-of select="amount" />
			</td>
			
			<td>
				<xsl:apply-templates select="price" />
			</td>
			
			<td>
				<xsl:apply-templates select="total-price" />
			</td>
			
			<td>
				<xsl:apply-templates select="discount" />
			</td>
		</tr>
	</xsl:template>
	
	<xsl:template match="udata[@method = 'order' or @method = 'basket' or @method = 'cart']//options">
		<ul>
			<xsl:apply-templates select="option" />
		</ul>
	</xsl:template>
	
	<xsl:template match="udata[@method = 'order' or @method = 'basket' or @method = 'cart']//option">
		<li>
			<span umi:object-id="{@id}" umi:field-name="name">
				<xsl:value-of select="@name" />
			</span>
		</li>
	</xsl:template>
	
	
	<xsl:template match="udata[@method = 'order' or @method = 'basket' or @method = 'cart']//option[@price > 0]">
		<li>
			<span umi:object-id="{@id}" umi:field-name="name">
				<xsl:value-of select="@name" />
			</span>
			<xsl:value-of select="concat(' ( +', @price, ' руб.)')" />
		</li>
	</xsl:template>
	
	<xsl:template match="udata[@method = 'order' or @method = 'basket' or @method = 'cart']//price | udata[@method = 'order' or @method = 'basket']//total-price">
		<div>
			<xsl:value-of select="actual" />
			<xsl:text> руб.</xsl:text>
		</div>
	</xsl:template>
	
	<xsl:template match="udata[@method = 'order' or @method = 'basket' or @method = 'cart']//price[original > 0] | udata[@method = 'order']//total-price[original > 0]">
		<div>
			<strike>
				<xsl:value-of select="original" />
				<xsl:text> руб.</xsl:text>
			</strike>
			<xsl:text> </xsl:text>
		</div>
		<div style="color: red; font-weight: bold;">
			<xsl:value-of select="actual" />
			<xsl:text> руб.</xsl:text>
		</div>
	</xsl:template>
	
	<xsl:template match="udata[@method = 'order' or @method = 'basket' or @method = 'cart']//item//discount">
		<p>
			<strong>
				<xsl:value-of select="@name" />
			</strong>
		</p>
		
		<p>
			<xsl:value-of select="description" />
		</p>
	</xsl:template>
	
	
	<!-- Order info -->
	<xsl:template match="udata" mode="status">
		<p><xsl:text>TODO: Вывести состояние заказа (transaction status)</xsl:text></p>
	</xsl:template>
	
	
	<!-- Order summary -->
	<xsl:template match="udata[@method = 'order' or @method = 'basket' or @method = 'cart']/summary">
		<h3>
			<xsl:text>Summary</xsl:text>
			
		</h3>
		<xsl:apply-templates select="price" />
		<p>
			<xsl:text>Товаров в корзине: </xsl:text>
			<xsl:value-of select="amount" />
		</p>
	</xsl:template>
	
	
	<!-- Order discount -->
	<xsl:template match="udata[@method = 'order' or @method = 'basket']/discount">
		<h4>
			<xsl:text>Скидка на заказ: </xsl:text>
			<xsl:value-of select="@name" />
		</h4>
		<p>
			<xsl:value-of select="description" />
		</p>
	</xsl:template>
	
	
	
	<!-- Purchasing -->
	<xsl:template match="result[@module = 'emarket' and @method = 'purchase']">
		<xsl:apply-templates select="document('udata://emarket/purchase')/udata" />
	</xsl:template>

	<xsl:template match="udata[@module = 'emarket' and @method = 'purchase']">
		<xsl:apply-templates select="purchasing" />
	</xsl:template>
	
	<xsl:template match="purchasing">
		<xsl:value-of select="concat('Purchasing method ', @stage, '::', @step, '() called')" />
	</xsl:template>
	
	<xsl:template match="purchasing[@stage = 'delivery' and @step = 'choose']">
		<form method="post" action="/emarket/purchase/delivery/choose/do">
			<p>
				<xsl:text>Выберите один из способов доставки:</xsl:text>
			</p>

			<ul class="delivery">
				<xsl:apply-templates select=".//item" />
			</ul>
			
			<p>
				<input type="submit" />
			</p>
		</form>
	</xsl:template>
	
	<xsl:template match="purchasing[@stage = 'delivery']/items/item" priority="1">
		<li>
			<input type="radio" name="delivery-id" value="{@id}" id="delivery-{@id}">
				<xsl:if test="@active = 'active'">
					<xsl:attribute name="checked"><xsl:text>checked</xsl:text></xsl:attribute>
				</xsl:if>
			</input>
			<label for="delivery-{@id}">
				<xsl:value-of select="@name" />
				<xsl:apply-templates select="@price" />
			</label>
		</li>
	</xsl:template>
	
	<xsl:template match="purchasing//item/@price">
		<xsl:text> - бесплатно</xsl:text>
	</xsl:template>
	
	<xsl:template match="purchasing//item/@price[. > 0]">
		<xsl:value-of select="concat(' (', ., ')')" />
	</xsl:template>


	<xsl:template match="purchasing[@stage = 'payment' and @step = 'choose']">
		<form method="post" action="/emarket/purchase/payment/choose/do">
			<ul class="payment">
				<xsl:apply-templates select=".//item" />
			</ul>
			
			<p>
				<input type="submit" />
			</p>
		</form>
	</xsl:template>


	<xsl:template match="purchasing[@stage = 'payment']/items/item" priority="1">
		<li>
			<input type="radio" name="payment-id" value="{@id}" id="payment-{@id}">
				<xsl:if test="@active = 'active'">
					<xsl:attribute name="checked"><xsl:text>checked</xsl:text></xsl:attribute>
				</xsl:if>
			</input>
			<label for="payment-{@id}">
				<xsl:value-of select="@name" />
			</label>
		</li>
	</xsl:template>
	
	
	<xsl:template match="customer">
		<h3>
			<xsl:text>Персональные данные</xsl:text>
		</h3>
		
		<ul>
			<li>
				<xsl:text>Имя: </xsl:text>
				<xsl:value-of select="//property[@name = 'fname']/value" />
			</li>
			
			<li>
				<xsl:text>Фамилия: </xsl:text>
				<xsl:value-of select="//property[@name = 'lname']/value" />
			</li>
			
			<li>
				<xsl:text>Отчество: </xsl:text>
				<xsl:value-of select="//property[@name = 'father_name']/value" />
			</li>
			
			<li>
				<xsl:text>E-mail: </xsl:text>
				<xsl:value-of select="//property[@name = 'e-mail']/value" />
			</li>
		</ul>
	</xsl:template>



































</xsl:stylesheet>