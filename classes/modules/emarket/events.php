<?php
	new umiEventListener('cron', 'emarket', 'onCronSyncCurrency');
	// Notification listeners
	new umiEventListener('systemModifyPropertyValue', 'emarket', 'onModifyProperty');
	new umiEventListener('systemModifyObject', 'emarket', 'onModifyObject');
	new umiEventListener('order-status-changed', 'emarket', 'onStatusChanged');
	new umiEventListener('order-payment-status-changed', 'emarket', 'onPaymentStatusChanged');
	new umiEventListener('order-delivery-status-changed', 'emarket', 'onDeliveryStatusChanged');
	// Reservation listeners
	new umiEventListener('systemModifyPropertyValue', 'emarket', 'onOrderPropChange');
	new umiEventListener('systemDeleteObject', 'emarket', 'onOrderDelete');
?>
