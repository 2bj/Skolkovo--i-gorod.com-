<?php

$FORMS = Array();

$FORMS['personal_block'] = <<<END

%delivery_address%

END;

$FORMS['personal_cart_block'] = <<<END

<h3>Моя корзина</h3><br />


END;

$FORMS['personal_cart_block_empty'] = <<<END
END;


$FORMS['personal_orders_block'] = <<<END

<br /><br />
<h3>Мои заказы</h3><br />
%eshop basket('%template%')%

END;

$FORMS['personal_orders_block_empty'] = <<<END
END;


$FORMS['delivery_block'] = <<<END

<br />
%eshop delivery()%

<p><a href="%pre_lang%/eshop/delivery_add/">Добавить адрес &gt;&gt;</a></p>

END;

$FORMS['delivery_block_empty'] = <<<END


%eshop delivery_add()%

END;

?>