<?php
	$permissions = array(
		'purchasing' => array(
			'price', 'stores', 'ordersList', 'basketAddLink', 'applyPriceCurrency',
			'order', 'basket', 'cart',
			'purchase', 'gateway', 'receipt',
			'currencySelector', 'selectCurrency'
		),
		
		'personal' => array(
			'ordersList', 'customerDeliveryList'
		),

		'compare' => array(
			'getCompareList', 'getCompareLink',
			'addToCompare', 'removeFromCompare', 'resetCompareList',
			'jsonAddToCompareList', 'jsonRemoveFromCompare', 'jsonResetCompareList'
		),
		
		'control' => array(
			'orders', 'ordersList', 'del', 'order_edit',  'order.edit', 
			'currency', 'currency_add', 'currency_edit', 'currency.edit',
			'delivery', 'delivery_add', 'delivery_edit', 'delivery_address_edit', 'delivery.edit',
			'discounts', 'discount_add', 'discount_edit', 'getModificators', 'getRules', 'discount', 'discount.edit',
			'payment', 'payment_add', 'payment_edit', 'payment.edit',
			'stores', 'store_add', 'store_edit', 'store', 'store.edit'
		)
	);
?>