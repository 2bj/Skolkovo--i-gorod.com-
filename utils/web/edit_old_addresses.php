<?php
    session_start();?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Редактирование списка адресатов</title>
        <style>
        <!--
        * {
            font-family : Arial, Verdana, sans-serif;
            font-size   : 12px;
        }
        .border_1 {
            border: 1px solid #ccc;            
        }
        td.border_1{
            padding: 5px;
        }
        -->
        </style>
    </head>
    <body>
<?php    require('standalone.php');$v9f738ea192c096f20b6773f406fa713a = false;$v2285c8dbaad09008016f9b367370fb67   = cmsController::getInstance()->getModule('users');if($v2285c8dbaad09008016f9b367370fb67) {if($v2285c8dbaad09008016f9b367370fb67->is_auth()) {$v7ad6e70c936a7223ff2f1663258f4a0a  = $_SESSION['user_id'];$v9f738ea192c096f20b6773f406fa713a = permissionsCollection::getInstance()->isAllowedMethod($v7ad6e70c936a7223ff2f1663258f4a0a, 'webforms', 'addresses');}else {$v9f738ea192c096f20b6773f406fa713a = false;}}else {$v9f738ea192c096f20b6773f406fa713a = false;}if($v9f738ea192c096f20b6773f406fa713a) {if(isset($_REQUEST['data'])) {mysql_query('TRUNCATE TABLE cms_webforms');$va94ce50ec7c649aefc2936a423013e83 = '';foreach($_REQUEST['data'] as $v588c0a1a673b745f043a36c5455c4872 => $vb9487e1745a731d532ccdf6bb5640e71) {if(!isset($vb9487e1745a731d532ccdf6bb5640e71['delete'])) {$v8c1604c64857e79a748c27062fedf5a2 = intval($v588c0a1a673b745f043a36c5455c4872);$vd3e55d269cde4b1b1313422eb43525e0 = mysql_real_escape_string($vb9487e1745a731d532ccdf6bb5640e71['email']);$v91e566a78df9ba5c964241b032cd4cd3  = mysql_real_escape_string($vb9487e1745a731d532ccdf6bb5640e71['description']);$va94ce50ec7c649aefc2936a423013e83  .= '("'.$v588c0a1a673b745f043a36c5455c4872.'", "'.$vd3e55d269cde4b1b1313422eb43525e0.'", "'.$v91e566a78df9ba5c964241b032cd4cd3.'"),';}}if(strlen($va94ce50ec7c649aefc2936a423013e83)) {$va94ce50ec7c649aefc2936a423013e83 = 'INSERT INTO cms_webforms(id, email, descr) VALUES'.substr($va94ce50ec7c649aefc2936a423013e83, 0, strlen($va94ce50ec7c649aefc2936a423013e83)-1);mysql_query($va94ce50ec7c649aefc2936a423013e83);}}if(isset($_REQUEST['new'])) {$vd3e55d269cde4b1b1313422eb43525e0 = mysql_real_escape_string($_REQUEST['new']['email']);$v91e566a78df9ba5c964241b032cd4cd3  = mysql_real_escape_string($_REQUEST['new']['description']);if(strlen($vd3e55d269cde4b1b1313422eb43525e0) && strlen($v91e566a78df9ba5c964241b032cd4cd3)) {$va94ce50ec7c649aefc2936a423013e83   = 'INSERT INTO cms_webforms(email, descr) VALUES("'.$vd3e55d269cde4b1b1313422eb43525e0.'", "'.$v91e566a78df9ba5c964241b032cd4cd3.'")';mysql_query($va94ce50ec7c649aefc2936a423013e83);}}$va94ce50ec7c649aefc2936a423013e83    = "SELECT * FROM cms_webforms";$v39039f6df7f3f60965be6337ab051e66 = mysql_query($va94ce50ec7c649aefc2936a423013e83);?>
        <form method="post">
        <table width="100%" cellspacing="0" class="border_1">
            <tr class="border_1">
                <td width="45%" class="border_1" style="text-align:center;"><b>E-Mail</b></td>
                <td width="45%" class="border_1" style="text-align:center;"><b>Описание</b></td>
                <td width="10%" class="border_1" style="text-align:center;"><b>Удалить</b></td>
            </tr>
<?php
    while($vad4f3b23a9c1baee57e5d091271a0053 = mysql_fetch_assoc($v39039f6df7f3f60965be6337ab051e66)) {$v908d34ef19bb2a6c62cda86d350d382b = $vad4f3b23a9c1baee57e5d091271a0053['id'];?>
            <tr class="border_1">
                <td class="border_1"><input style="width:100%;" type="text" name="data[<?php echo $v908d34ef19bb2a6c62cda86d350d382b;?>][email]"       value="<?php echo $vad4f3b23a9c1baee57e5d091271a0053['email'] ?>" /></td>
                <td class="border_1"><input style="width:100%;" type="text" name="data[<?php echo $v908d34ef19bb2a6c62cda86d350d382b;?>][description]" value="<?php echo $vad4f3b23a9c1baee57e5d091271a0053['descr'] ?>" /></td>
                <td class="border_1"><input style="width:100%;" type="checkbox" name="data[<?php echo $v908d34ef19bb2a6c62cda86d350d382b;?>][delete]" /></td>
            </tr>
<?php
    }?>
            <tr class="border_1">
                <td class="border_1"><input style="width:100%;" type="text" name="new[email]" /></td>
                <td class="border_1"><input style="width:100%;" type="text" name="new[description]" /></td>
                <td class="border_1">&nbsp;</td>
            </tr>
            <tr class="border_1">
                <td colspan="3" align="right" class="border_1"><input type="submit" value="Сохранить" /></td>                
            </tr>
        </table>
        </form>
<?php
  }else {?>
        <table width="100%" style="border:0;">
            <tr><td align="center">
            <form method="post" action="/users/login_do/">
            <table style="border:0">
                <tr>
                    <td>Логин</td>
                    <td><input type="text" name="login" value="" /></td>
                </tr>
                <tr>
                    <td>Пароль</td>
                    <td><input type="password" name="password" value="" /></td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align:right;"><input type="submit" value="Войти" /></td>                    
                </tr>
            </table>
            </form>
            </td></tr>
        </table>
<?php
  }?>
    </body>
</html>
