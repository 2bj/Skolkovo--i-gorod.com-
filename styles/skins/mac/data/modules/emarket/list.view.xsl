<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common" [
]>


<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xlink="http://www.w3.org/TR/xlink">
	<xsl:template match="/result[@method = 'orders']/data[@type = 'list' and @action = 'view']">
		<xsl:call-template name="ui-smc-table">
			<xsl:with-param name="content-type">objects</xsl:with-param>
			<xsl:with-param name="control-params">orders</xsl:with-param>
			<xsl:with-param name="domains-show">1</xsl:with-param>
			<xsl:with-param name="hide-csv-import-button">1</xsl:with-param>
			<xsl:with-param name="js-ignore-props-edit">['order_items', 'number', 'customer_id']</xsl:with-param>
		</xsl:call-template>
	</xsl:template>


	<xsl:template match="/result[@method = 'discounts']/data[@type = 'list' and @action = 'view']">
		<div class="imgButtonWrapper">
			<a href="{$lang-prefix}/admin/emarket/discount_add/">
				<xsl:text>&label-add-discount;</xsl:text>
			</a>
		</div>
		
		<xsl:call-template name="ui-smc-table">
			<xsl:with-param name="content-type">objects</xsl:with-param>
			<xsl:with-param name="control-params">discounts</xsl:with-param>
			<xsl:with-param name="js-ignore-props-edit">['discount_type_id']</xsl:with-param>
		</xsl:call-template>
	</xsl:template>


	<xsl:template match="/result[@method = 'currency']/data[@type = 'list' and @action = 'view']">
		<div class="imgButtonWrapper">
			<a href="{$lang-prefix}/admin/emarket/currency_add/">
				<xsl:text>&label-add-currency;</xsl:text>
			</a>
		</div>
		
		<xsl:call-template name="ui-smc-table">
			<xsl:with-param name="content-type">objects</xsl:with-param>
			<xsl:with-param name="control-params">currency</xsl:with-param>
		</xsl:call-template>
	</xsl:template>


	<xsl:template match="/result[@method = 'delivery']/data[@type = 'list' and @action = 'view']">
		<div class="imgButtonWrapper" xmlns:umi="http://www.umi-cms.ru/TR/umi">
			<a href="{$lang-prefix}/admin/emarket/delivery_add/" class="type_select" umi:type="emarket::delivery" umi:prevent-default="true">
				<xsl:text>&label-add-delivery;</xsl:text>
			</a>
		</div>
				
		<xsl:call-template name="ui-smc-table">
			<xsl:with-param name="content-type">objects</xsl:with-param>
			<xsl:with-param name="control-params">delivery</xsl:with-param>
			<xsl:with-param name="js-ignore-props-edit">['delivery_type_id']</xsl:with-param>
		</xsl:call-template>
	</xsl:template>
	
	<xsl:template match="/result[@method = 'payment']/data[@type = 'list' and @action = 'view']">
		<div class="imgButtonWrapper" xmlns:umi="http://www.umi-cms.ru/TR/umi">
			<a href="{$lang-prefix}/admin/emarket/payment_add/" class="type_select" umi:type="emarket::payment" umi:prevent-default="true">&label-add-payment;</a>			
		</div>
		
		<xsl:call-template name="ui-smc-table">
			<xsl:with-param name="content-type">objects</xsl:with-param>
			<xsl:with-param name="control-params">payment</xsl:with-param>
			<xsl:with-param name="js-ignore-props-edit">['payment_type_id']</xsl:with-param>
		</xsl:call-template>
	</xsl:template>
	
	<xsl:template match="/result[@method = 'stores']/data[@type = 'list' and @action = 'view']">
		<div class="imgButtonWrapper">
			<a href="{$lang-prefix}/admin/emarket/store_add/">&label-add-store;</a>
		</div>
		
		<xsl:call-template name="ui-smc-table">
			<xsl:with-param name="content-type">objects</xsl:with-param>
			<xsl:with-param name="control-params">stores</xsl:with-param>
		</xsl:call-template>
	</xsl:template>
</xsl:stylesheet>