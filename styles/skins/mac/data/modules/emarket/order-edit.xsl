<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/">
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xlink="http://www.w3.org/TR/xlink">

	<!-- Edit order -->
	<xsl:template match="/result[@method = 'order_edit']/data/object" mode="form-modify">
		<xsl:variable name="order-info" select="document(concat('udata://emarket/order/', @id))/udata" />
		<xsl:variable name="customer-id" select="$order-info/customer/object/@id" />
		
		<!-- Информация о заказе -->
		<xsl:apply-templates select=".//group[@name = 'order_props']" mode="form-modify">
			<xsl:with-param name="show-name"><xsl:text>0</xsl:text></xsl:with-param>
		</xsl:apply-templates>
		
		<!-- Информация о заказчике -->
		<xsl:apply-templates select="$order-info/customer" />
		
		<xsl:apply-templates select=".//group[@name = 'order_payment_props' or @name = 'order_delivery_props']" mode="form-modify">
			<xsl:with-param name="show-name"><xsl:text>0</xsl:text></xsl:with-param>
		</xsl:apply-templates>
		
		<!-- Наименования заказа (с удалением) -->
		<xsl:apply-templates select="$order-info" mode="order-items" />
		
		<!-- Список всех заказов покупателя -->
		<xsl:apply-templates select="document(concat('udata://emarket/ordersList/', $customer-id, '?links'))/udata" />
	</xsl:template>
	
	<xsl:template match="group[@name = 'order_props']" mode="form-modify">
		<div class="panel properties-group">
			<div class="header">
				<span>
					<xsl:value-of select="@title" />
				</span>
				<div class="l" /><div class="r" />
			</div>
			
			<div class="content">
				<xsl:apply-templates select="field" mode="form-modify" />
				<xsl:call-template name="std-form-buttons" />
			</div>
		</div>
	</xsl:template>
	

	<xsl:template match="field[@name = 'number']" mode="form-modify">
		<div class="field">
			<label>
				<span class="label">
					<acronym>
						<xsl:value-of select="concat(@title, ': #', .)" />
					</acronym>
				</span>
			</label>
		</div>
	</xsl:template>
	
	<xsl:template match="field[@name = 'customer_id']" mode="form-modify">
		<div class="field">
			<label>
				<span class="label">
					<acronym>
						<xsl:value-of select="concat(@title, ': ')" />
						<xsl:apply-templates select="values/item[@selected = 'selected']" mode="order-customer-link" />
					</acronym>
				</span>
			</label>
		</div>
	</xsl:template>
	
	<xsl:template match="item" mode="order-customer-link">
		<xsl:variable name="customer-info" select="document(concat('uobject://', @id))/udata" />
		<xsl:variable name="fname" select="$customer-info//property[@name = 'fname']/value" />
		<xsl:variable name="lname" select="$customer-info//property[@name = 'lname']/value" />
		<xsl:variable name="login" select="$customer-info//property[@name = 'login']/value" />
		
		<xsl:value-of select="concat($fname, ' ', $lname, ' (', $login, ')')" />
	</xsl:template>
	
	
	<xsl:template match="field[@name = 'order_items' or @name = 'total_original_price']" mode="form-modify" />
	<xsl:template match="field[@name = 'total_price' or @name = 'total_amount']" mode="form-modify" />

	<xsl:template match="field[@name='delivery_address']" mode="form-modify">
		<xsl:variable name="address" select="document(concat('uobject://', values/item[@selected]/@id))/udata" />		
		<div class="field text">
			<label for="{generate-id()}">
				<span class="label">
					<acronym>
						<xsl:apply-templates select="." mode="sys-tips" />
						<xsl:value-of select="@title" />
					</acronym>
					<xsl:apply-templates select="." mode="required_text" />
					<xsl:text>&nbsp;(</xsl:text>
					<a href="{$lang-prefix}/admin/emarket/delivery_address_edit/{values/item[@selected]/@id}/">
						<xsl:text>&label-edit;</xsl:text>
					</a>
					<xsl:text>)</xsl:text>
				</span>
				<span>
					<xsl:apply-templates select="document(concat('uobject://', values/item[@selected]/@id))/udata/object" mode="delivery-address" />
				</span>				
			</label>
		</div>
	</xsl:template>
	
	
	<xsl:template match="udata" mode="order-items">
		<xsl:variable name="order-info" select="document(concat('uobject://', @id))/udata" />
	
		<div class="panel properties-group">
			<div class="header">
				<span>
					<xsl:text>&label-order-items-group;</xsl:text>
				</span>
				<div class="l" /><div class="r" />
			</div>
			
			<div class="content">
				<table class="tableContent">
					<thead>
						<tr>
							<th>
								<xsl:text>&label-order-items-group;</xsl:text>
							</th>
							
							<th>
								<xsl:text>&label-order-items-current-price;</xsl:text>
							</th>
							
							<th>
								<xsl:text>&label-order-items-discount;</xsl:text>
							</th>
							
							<th>
								<xsl:text>&label-order-items-original-price;</xsl:text>
							</th>
							
							<th>
								<xsl:text>&label-order-items-amount;</xsl:text>
								
							</th>
							
							<th>
								<xsl:text>&label-order-items-summ;</xsl:text>
							</th>
							
							<th>
								<xsl:text>&label-delete;</xsl:text>
							</th>
						</tr>
					</thead>
					<tbody>
						<xsl:apply-templates select="items/item" mode="order-items" />
						<xsl:apply-templates select="discount" mode="order-summary" />
						<xsl:apply-templates select="$order-info//group[@name = 'order_delivery_props']" mode="order_delivery" />
						
						<tr>
							<td>
								<strong>
									<xsl:text>&label-order-items-result;</xsl:text>
								</strong>
							</td>
							
							<td colspan="4" />
							
							<td>
								<strong>
									<xsl:apply-templates select="summary/price/actual" mode="price" />
								</strong>
							</td>
							<td />
						</tr>
					</tbody>
				</table>
				
				<xsl:call-template name="std-form-buttons" />
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="item" mode="discount-size">
		<xsl:apply-templates select="document(@xlink:href)/udata/object" mode="modificator-size" />
	</xsl:template>
	
	<xsl:template match="object" mode="modificator-size" />
	
	<xsl:template match="object[.//property[@name = 'proc']]" mode="modificator-size">
		<xsl:value-of select="concat(' &#8212; ', .//property[@name = 'proc']/value, '%')" />
	</xsl:template>
	
	<xsl:template match="object[.//property[@name = 'size']]" mode="modificator-size">
		<xsl:value-of select="concat(', ', .//property[@name = 'size']/value)" />
	</xsl:template>
	
	<xsl:template match="discount" mode="order-summary">
		<tr>
			<td>
				<strong>
					<xsl:text>&label-order-discount;</xsl:text>
				</strong>
			</td>
			
			<td colspan="5">
				<a href="{$lang-prefix}/admin/emarket/discount_edit/{@id}/">
					<xsl:value-of select="@name" />
				</a>
				<xsl:apply-templates select="document(concat('uobject://', @id, '.discount_modificator_id'))//item" mode="discount-size" />
				<xsl:apply-templates select="description" />
			</td>
			<td />
		</tr>
	</xsl:template>

	<xsl:template match="discount/description" />
	<xsl:template match="discount/description[. != '']">
		<xsl:value-of select="concat(' (', ., ')')" disable-output-escaping="yes" />
	</xsl:template>

	<xsl:template match="item" mode="order-items">
		<tr>
			<td>
				<xsl:apply-templates select="." mode="order-item-name" />
			</td>
			
			<td>
				<xsl:choose>
					<xsl:when test="price/original &gt; 0">
						<xsl:apply-templates select="price/original" mode="price" />
					</xsl:when>
					<xsl:otherwise>
						<xsl:apply-templates select="price/actual" mode="price" />
					</xsl:otherwise>
				</xsl:choose>
			</td>
			
			<td>
				<xsl:apply-templates select="discount" />
			</td>
			
			<td>
				<xsl:apply-templates select="price/actual" mode="price" />
			</td>
			
			<td>
				<input type="text" name="order-amount-item[{@id}]" value="{amount}" size="3" />
			</td>
			
			<td>
				<xsl:apply-templates select="total-price/actual" mode="price" />
			</td>
			
			<td class="center">
				<input type="checkbox" name="order-del-item[]" value="{@id}" class="check" />
			</td>
		</tr>
	</xsl:template>
	
	<xsl:template match="item" mode="order-item-name">
		<xsl:value-of select="@name" />
	</xsl:template>
	
	<xsl:template match="item[page]" mode="order-item-name">
		<a href="{$lang-prefix}/admin/catalog/edit/{page/@id}/">
			<xsl:value-of select="@name" />
		</a>
	</xsl:template>
	
	<xsl:template match="discount">
		<a href="{$lang-prefix}/admin/emarket/discount_edit/{@id}/">
			<xsl:attribute name="title">
				<xsl:value-of select="description" disable-output-escaping="yes" />
			</xsl:attribute>
			
			<xsl:value-of select="@name" />
		</a>
		<xsl:apply-templates select="document(concat('uobject://', @id, '.discount_modificator_id'))//item" mode="discount-size" />
	</xsl:template>

	<xsl:template match="udata[@method = 'ordersList']" />

	<xsl:template match="udata[@method = 'ordersList' and count(items/item)]">
		<div class="panel properties-group">
			<div class="header">
				<span>
					<xsl:text>&label-customer-order;</xsl:text>
				</span>
				<div class="l" /><div class="r" />
			</div>
			
			<div class="content">
				<table class="tableContent">
					<thead>
						<tr>
							<th>
								<xsl:text>&label-orders-name;</xsl:text>
							</th>
							<th>
								<xsl:text>&label-orders-date;</xsl:text>
							</th>
							<th>
								<xsl:text>&label-orders-status;</xsl:text>
							</th>
						</tr>
					</thead>
					<tbody>
						<xsl:apply-templates select="items/item" />
					</tbody>
				</table>
				<xsl:call-template name="std-form-buttons" />
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="udata[@method = 'ordersList']/items/item">
		<xsl:variable name="order-info" select="document(concat('uobject://', @id))/udata" />
		
		<tr>
			<td>
				<a href="{$lang-prefix}/admin/emarket/order_edit/{@id}/">
					<xsl:value-of select="concat('&js-order-name;', $order-info//property[@name = 'number']/value)" />
				</a>
			</td>
			
			<td>
				<xsl:apply-templates select="$order-info//property[@name = 'order_date']/value/@unix-timestamp" />
			</td>
			
			<td>
				<xsl:value-of select="$order-info//property[@name = 'status_id']/value/item/@name" />
			</td>
		</tr>
	</xsl:template>

	<xsl:template match="*" mode="price">
		<xsl:value-of select="." />
	</xsl:template>
	
	<xsl:template match="*[../@prefix]" mode="price">
		<xsl:value-of select="concat(../@prefix, ' ', .)" />
	</xsl:template>
	
	<xsl:template match="*[../@suffix]" mode="price">
		<xsl:value-of select="concat(., ' ', ../@suffix)" />
	</xsl:template>
	
	
	<xsl:template match="customer">
		<div class="panel properties-group">
			<div class="header">
				<span>
					<xsl:text>&label-order-customer-group;</xsl:text>
				</span>
				<div class="l" /><div class="r" />
			</div>
			
			<div class="content">
				<table class="tableContent">
					<xsl:apply-templates select="object/properties/group/property" mode="customer-info" />
				</table>
				
				<xsl:call-template name="std-form-buttons" />
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="property[@name = 'last_request_time']" mode="customer-info" priority="1" />
	<xsl:template match="property[@name = 'is_activated']" mode="customer-info" priority="1" />
	<xsl:template match="property[@name='delivery_addresses']" mode="customer-info" />

	<xsl:template match="property[not(@name='delivery_addresses')]" mode="customer-info">
		<tr>
			<td class="eq-col">
				<xsl:value-of select="title" />
			</td>
			
			<td>
				<xsl:apply-templates select="." mode="value" />
			</td>
		</tr>
	</xsl:template>

	<xsl:template match="object" mode="delivery-address">
		<table class="tableContent">
			<xsl:apply-templates select="properties/group/property" mode="customer-info" />
		</table>
	</xsl:template>

	<xsl:template match="property" mode="delivery-address">
		<tr>
			<td class="eq-col">
				<xsl:value-of select="title" />
			</td>

			<td>
				<xsl:apply-templates select="." mode="value" />
			</td>
		</tr>
	</xsl:template>
	
	<xsl:template match="property" mode="value">
		<xsl:value-of select="value" />
	</xsl:template>
	
	<xsl:template match="property[@type = 'boolean']" mode="value">
		<xsl:text>&label-no;</xsl:text>
	</xsl:template>
	
	<xsl:template match="property[@type = 'boolean' and value = '1']" mode="value">
		<xsl:text>&label-yes;</xsl:text>
	</xsl:template>
	
	<xsl:template match="property[@type = 'relation']" mode="value">
		<xsl:apply-templates select=".//item" mode="value" />
	</xsl:template>
	
	<xsl:template match="property[@type = 'relation']/value/item" mode="value">
		<xsl:value-of select="@name" />
	</xsl:template>
	
	<xsl:template match="property[@type = 'relation']/value/item[not(position() = last())]" mode="value">
		<xsl:value-of select="@name" />
	</xsl:template>
	
	
	<xsl:template match="group[@name = 'order_delivery_props']" mode="order_delivery" />
	
	<xsl:template match="group[@name = 'order_delivery_props' and count(property[@name = 'delivery_id']/value/item) &gt; 0]" mode="order_delivery">
		<xsl:variable name="delivery-item" select="property[@name = 'delivery_id']/value/item" />
		<xsl:variable name="delivery-price" select="property[@name = 'delivery_price']/value" />
	
		<tr>
			<td>
				<strong>
					<xsl:text>&label-order-delivery;</xsl:text>
				</strong>
			</td>
			<td colspan="4">
				<a href="{$lang-prefix}/admin/emarket/delivery_edit/{$delivery-item/@id}/">
					<xsl:value-of select="$delivery-item/@name" />
				</a>
			</td>
			
			<td>
				<xsl:apply-templates select="document(concat('udata://emarket/applyPriceCurrency/', $delivery-price, '/'))/udata/price/actual" mode="price" />
			</td>
			<td />
		</tr>
	</xsl:template>
</xsl:stylesheet>