<?php
$C_LANG = Array();
$C_LANG['module_name'] = "Структура";

$C_LANG['module_title'] = 'Управления содержимым';
$C_LANG['module_description'] = 'Модуль предназначен для управления текстовыми и графическими материалами сайта, работе с разделами, добавления новых материалов. ';

$C_LANG['sitetree'] = 'Модуль управления содержимым сайта';
$C_LANG['content'] = 'Страница не найдена';
$C_LANG['config'] = 'Настройки модуля';
$C_LANG['add_page'] = 'Добавить страницу';
$C_LANG['add_page_do'] = 'Добавить страницу...';
$C_LANG['del_page'] = 'Удаление страницы...';
$C_LANG['edit_page'] = 'Редактирование страницы';
$C_LANG['edit_page_do'] = 'Редактирование страницы...';
$C_LANG['templates_do'] = 'Сохранение настроек...';

$C_LANG['edit_domain'] = 'SEO Умолчания';
$C_LANG['edit_domain_do'] = "Сохранение...";

$C_LANG['sitemap'] = 'Карта сайта';
$C_LANG['pagesByDomainTags'] = 'Страницы с тегами';

$C_LANG['tpl_edit'] = "Редактирование шаблона";


$LANG_EXPORT = Array();
$LANG_EXPORT['content_mainpage'] = 'Главная страница';
$LANG_EXPORT['content_module'] = 'Модуль';
$LANG_EXPORT['content_error'] = 'Ошибка';
$LANG_EXPORT['content_cifi_upload_text'] = 'Закачать';
$LANG_EXPORT['content_page_permission'] = 'У вас нет доступа к этой странице.';
$LANG_EXPORT['content_error_404'] = 'Документ не найден.';
$LANG_EXPORT['content_error_404_header'] = '404 - Документ не найден.';
$LANG_EXPORT['content_error_unhandled'] = 'Макрос "content" не обработан по неизвестной причиние.';
$LANG_EXPORT['content_sitemap'] = 'Карта сайта';
$LANG_EXPORT['content_sitetree'] = 'Структура';
$LANG_EXPORT['content_newpage'] = 'Новая страница';
$LANG_EXPORT['content_error_insert_null'] = 'Ошибка макроса (content insert): Вы не указали, какую страницу хотите вставить.';
$LANG_EXPORT['content_error_insert_nopage'] = 'Ошибка макроса (content insert): Указанной страницы не существует.';
$LANG_EXPORT['content_error_insert_recursy'] = 'Ошибка макроса (content insert): Возможна рекурсия.';
$LANG_EXPORT['content_hiddenpage'] = '(скрытая)';

$LANG_EXPORT['content_usesitemap'] = <<<END
<p>Запрошенная Вами страница не найдена. Возможно, мы удалили или переместили ее. Возможно, вы пришли по устаревшей ссылке или неверно ввели адрес. Воспользуйтесь поиском или картой сайта.</p>

<h2 class="orange">Карта сайта</h2>
%content sitemap()%
END;


$LANG_EXPORT['tempform_fname'] = "Имя, фамилия <span style='color:red'>*</span>";
$LANG_EXPORT['tempform_cname'] = "Наименование компании";
$LANG_EXPORT['tempform_email'] = "E-mail";
$LANG_EXPORT['tempform_adress'] = "Адрес";
$LANG_EXPORT['tempform_phone'] = "Телефон";
$LANG_EXPORT['tempform_fax'] = "Факс";
$LANG_EXPORT['tempform_message'] = "Ваше сообщение <span style='color:red'>*</span>";

$LANG_EXPORT['tepmform_ok'] = "Ваше сообщение успешно отправлено.";
$LANG_EXPORT['tempform_failed'] = "При отправке сообщений возникла ошибка. Извините за временные неудобства.";

$LANG_EXPORT['tempform_header'] = "ONLINE поддержка";

$LANG_EXPORT['error_free_max_pages'] = "Достигнут предел в 10 страниц для Free-версии UMI.CMS";

?>