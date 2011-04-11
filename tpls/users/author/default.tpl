<?php

$FORMS = Array();

$FORMS['user_block'] = <<<END

<span class="user"><img src="/images/cms/ico_forum_user.gif" alt="Зарегистрированный пользователь" title="Зарегистрированный пользователь" />&nbsp;&nbsp;<b><span style="display: none;">%login%</span> <span umi:object-id="%block-object-id%" umi:field-name="lname">%lname%</span> <span umi:object-id="%block-object-id%" umi:field-name="fname">%fname%</span> (<span umi:object-id="%block-object-id%" umi:field-name="login">%login%</span>)</b></span>

END;

$FORMS['guest_block'] = <<<END

<span><img src="/images/cms/ico_forum_guest.gif" alt="Незарегистрированный пользователь" title="Незарегистрированный пользователь" style="margin-right:5px;"/>&nbsp;<b>%nickname%</b><!-- (Гость)--></span>

END;

$FORMS['sv_block'] = <<<END

<span class="user"><img src="/images/cms/ico_forum_sv.gif" alt="Зарегистрированный пользователь" title="Зарегистрированный пользователь" />&nbsp;&nbsp;<b><span style="display: none;">%login%</span> <span umi:object-id="%block-object-id%" umi:field-name="lname">%lname%</span> <span umi:object-id="%block-object-id%" umi:field-name="fname">%fname%</span> (<span umi:object-id="%block-object-id%" umi:field-name="login">%login%</span>)</b></span>

END;


?>