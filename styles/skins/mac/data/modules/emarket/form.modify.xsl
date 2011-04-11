<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/">
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xlink="http://www.w3.org/TR/xlink">

	<xsl:include href="order-edit.xsl" />

	<!-- Edit discount settings -->
	<xsl:template match="/result[@method = 'discount_add' or @method = 'discount_modify']/data" priority="1">
		<form method="post" action="do/" enctype="multipart/form-data">
			<input type="hidden" name="referer" value="{/result/@referer-uri}"/>
			<input type="hidden" name="domain" value="{$domain-floated}"/>
			
			<xsl:apply-templates mode="form-modify" />
			
			<xsl:apply-templates select=".//field[@name = 'discount_type_id']/values/item" />
		</form>
	</xsl:template>

	<xsl:template match="/result[not(@method = 'discount_edit')]//field[@name = 'is_active']" mode="form-modify" />
	<xsl:template match="/result[not(@method = 'discount_edit')]//field[@name = 'description']" mode="form-modify" />
	<xsl:template match="field[@name = 'discount_modificator_id']" mode="form-modify" />
	<xsl:template match="field[@name = 'discount_rules_id']" mode="form-modify" />
	
	<xsl:template match="field[@name = 'discount_type_id']" mode="form-modify">
		<div class="field text">
			<label for="{generate-id()}">
				<span class="label">
					<acronym>
						<xsl:apply-templates select="." mode="sys-tips" />
						<xsl:value-of select="@title" />
					</acronym>
				</span>
				
				<xsl:apply-templates select="values/item" mode="discount-type" />
			</label>
		</div>
	</xsl:template>
	
	<xsl:template match="values/item" mode="discount-type">
		<xsl:variable name="description" select="document(concat('uobject://', @id, '.description'))/udata/property" />
		<p>
			<label>
				<input type="radio" class="checkbox discount-type-id" name="{../../@input_name}" value="{@id}">
					<xsl:if test="@selected = 'selected'">
						<xsl:attribute name="checked" select="'checked'" />
					</xsl:if>
				</input>
				<acronym>
					<xsl:value-of select="." />
					<xsl:apply-templates select="$description" mode="desc" />
				</acronym>
			</label>
		</p>
	</xsl:template>
	
	<xsl:template match="property[@name = 'description']" mode="desc">
		<em>
			<xsl:value-of select="concat(' (', value, ')')" />
		</em>
	</xsl:template>
	
	<xsl:template match="field[@name = 'discount_type_id']/values/item">
		<div class="panel properties-group discount-params" id="{@id}">
			<xsl:if test="not(@selected = 'selected')">
				<xsl:attribute name="style"><xsl:text>display: none;</xsl:text></xsl:attribute>
			</xsl:if>

			<div class="header">
				<span>
					<xsl:value-of select="." />
				</span>
				<div class="l" /><div class="r" />
			</div>
			
			<div class="content">
				<xsl:apply-templates select="../../../field[@name = 'discount_modificator_id']" mode="modify-modificators">
					<xsl:with-param name="discount-type-id" select="@id" />
				</xsl:apply-templates>
				
				<xsl:apply-templates select="../../../field[@name = 'discount_rules_id']" mode="modify-rules">
					<xsl:with-param name="discount-type-id" select="@id" />
				</xsl:apply-templates>

				<xsl:call-template name="std-form-buttons-add" />
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="field[@name = 'discount_modificator_id']" mode="modify-modificators">
		<xsl:param name="discount-type-id" />
		
		<xsl:variable name="modificators"
			select="document(concat('udata://emarket/getModificators/', $discount-type-id, '/', $param0))/udata" />
		<div class="field">
			<label>
				<span class="label">
					<acronym>
						<xsl:apply-templates select="." mode="sys-tips" />
						<xsl:value-of select="@title" />
					</acronym>
				</span>
				
				<xsl:apply-templates select="$modificators/items/item">
					<xsl:with-param name="input-name" select="@input_name" />
				</xsl:apply-templates>
			</label>
		</div>
	</xsl:template>
	
	<xsl:template match="udata[@method = 'getModificators']//item">
		<xsl:param name="input-name" />
		<xsl:variable name="description" select="document(concat('uobject://', @id, '.description'))/udata/property" />
		<xsl:variable name="item-id" select="@id" />
		
		<p>
			<label>
				<input type="radio" class="checkbox" name="{$input-name}" value="{@id}">
					<xsl:if test="@selected = 'selected'">
						<xsl:attribute name="checked"><xsl:text>checked</xsl:text></xsl:attribute>
					</xsl:if>
				</input>
				<acronym>
					<xsl:value-of select="@name" />
					<xsl:apply-templates select="$description" mode="desc" />
				</acronym>
			</label>
		</p>
	</xsl:template>
	
	
	<xsl:template match="field[@name = 'discount_rules_id']" mode="modify-rules">
		<xsl:param name="discount-type-id" />
		<xsl:variable name="rules"
			select="document(concat('udata://emarket/getRules/', $discount-type-id, '/', $param0))/udata" />

		<div class="field">
			<label>
				<span class="label">
					<acronym>
						<xsl:apply-templates select="." mode="sys-tips" />
						<xsl:value-of select="@title" />
					</acronym>
				</span>
				
				<xsl:apply-templates select="$rules/items/item">
					<xsl:with-param name="input-name" select="@input_name" />
				</xsl:apply-templates>
			</label>
		</div>
	</xsl:template>
	
	<xsl:template match="udata[@method = 'getRules']//item">
		<xsl:param name="input-name" />
		<xsl:variable name="description" select="document(concat('uobject://', @id, '.description'))/udata/property" />
		
		<p>
			<label>
				<input type="checkbox" class="checkbox" name="{$input-name}" value="{@id}">
					<xsl:if test="@selected = 'selected'">
						<xsl:attribute name="checked"><xsl:text>checked</xsl:text></xsl:attribute>
					</xsl:if>
				</input>
				
				<acronym>
					<xsl:value-of select="@name" />
					<xsl:apply-templates select="$description" mode="desc" />
				</acronym>
			</label>
		</p>
	</xsl:template>



	<!-- Edit discount properties -->
	<xsl:template match="/result[@method = 'discount_edit']/data" priority="1">
		<form method="post" action="do/" enctype="multipart/form-data">
			<input type="hidden" name="referer" value="{/result/@referer-uri}"/>
			<input type="hidden" name="domain" value="{$domain-floated}"/>
			
			<xsl:apply-templates mode="form-modify" />
			
			<!-- Select modificator and apply data::getEditForm -->
			<xsl:apply-templates select=".//field[@name = 'discount_modificator_id']/values/item" mode="discount-edit" />
			
			<!-- Select rules and apply data::getEditForm -->
			<xsl:apply-templates select=".//field[@name = 'discount_rules_id']/values/item" mode="discount-edit" />
		</form>
	</xsl:template>
	
	<xsl:template match="field/values/item" mode="discount-edit">
		<xsl:apply-templates select="document(concat('udata://data/getEditForm/', @id))/udata">
			<xsl:with-param name="item-id" select="@id" />
		</xsl:apply-templates>
	</xsl:template>
	
	<xsl:template match="udata[@method = 'getEditForm']">
		<xsl:param name="item-id" />
		
		<xsl:apply-templates select="group" mode="form-modify">
			<xsl:with-param name="item-id" select="$item-id" />
		</xsl:apply-templates>
	</xsl:template>
	
	<xsl:template match="udata[@method = 'getEditForm']/group" mode="form-modify">
		<xsl:param name="item-id" />
		<xsl:variable name="label" select="document(concat('uobject://', $item-id))/udata//property[@name = 'rule_type_id' or @name = 'modificator_type_id']//item/@name" />
		
		<div class="panel properties-group">
			<div class="header">
				<span>
					<xsl:value-of select="$label" />
				</span>
				<div class="l" /><div class="r" />
			</div>
			
			<div class="content">
				<xsl:apply-templates select="field" mode="form-modify" />
				<xsl:call-template name="std-form-buttons" />
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="udata//field[@name = 'modificator_type_id' or @name = 'rule_type_id']" mode="form-modify" priority="1" />
	<xsl:template match="/result[@method = 'discount_edit']//field[@name = 'discount_type_id']" mode="form-modify" />
	
	<!-- Payment and delivery systems -->
	<xsl:template mode="form-modify" 
		match="/result[@method = 'payment_add' or @method = 'payment_edit' or @method = 'delivery_add' or @method = 'delivery_edit']/data/object">
		<xsl:apply-templates mode="form-modify">
			<xsl:with-param name="show-type"><xsl:text>0</xsl:text></xsl:with-param>
		</xsl:apply-templates>
	</xsl:template>
	
	
	<!-- Stores -->
	<xsl:template match="/result[@method = 'store_add' or @method = 'store_edit']/data">
		<form method="post" action="do/" enctype="multipart/form-data">
			<input type="hidden" name="referer" value="{/result/@referer-uri}" id="form-referer" />
			<input type="hidden" name="domain" value="{$domain-floated}"/>
			
			<xsl:apply-templates mode="form-modify">
				<xsl:with-param name="group-title"><xsl:text>&label-store-common;</xsl:text></xsl:with-param>
			</xsl:apply-templates>
		</form>
	</xsl:template>


	<!-- Delivery -->
	<xsl:template match="/result[@method = 'delivery_address_edit']/data/object" mode="form-modify">
		<xsl:apply-templates select="properties/group" mode="form-modify">
			<xsl:with-param name="show-name"><xsl:text>0</xsl:text></xsl:with-param>
		</xsl:apply-templates>
	</xsl:template>
	
	<!-- Payment -->
	<xsl:template match="field[@name = 'payment_type_id' or @name='delivery_type_id']" mode="form-modify">
		<div class="field" id="{generate-id()}" xmlns:umi="http://www.umi-cms.ru/TR/umi" umi:type="{@type-id}">			
			<label for="relationSelect{generate-id()}">
				<span class="label">
					<acronym>
						<xsl:apply-templates select="." mode="sys-tips" />
						<xsl:value-of select="@title" />
					</acronym>
					<xsl:apply-templates select="." mode="required_text" />
				</span>
				<span>
					<select name="{@input_name}" id="relationSelect{generate-id()}">
						<xsl:apply-templates select="." mode="required_attr" />						
						<xsl:apply-templates select="values/item" mode="type-select" />
					</select>
				</span>
			</label>			
		</div>
	</xsl:template>
	
	<xsl:template match="field/values/item" mode="type-select">
		<xsl:variable name="type-id" select="document(concat('uobject://', @id))/udata/object/properties/group/property[@name='payment_type_id' or @name='delivery_type_id']/value" />
		<option value="{@id}">
			<xsl:if test="$type-id=/result/data/object/@type-id">
				<xsl:attribute name="selected"><xsl:text>selected</xsl:text></xsl:attribute>
			</xsl:if>			
			<xsl:value-of select="." />
		</option>
	</xsl:template>	
	
</xsl:stylesheet>