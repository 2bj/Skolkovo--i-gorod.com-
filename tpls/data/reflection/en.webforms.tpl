<?php

$FORMS = Array();

$FORMS['error_no_form'] = '<b>Форма не определена</b><br />Обратитесь к администрации ресурса';

$FORMS['send_successed'] = <<<END
					<!--left-->
						<div id="left" class="equal">
							<div class="top_left_bg equal">
								<div class="bottom_left_bg equal">
									<div class="left-indent">
										<div class="wrapper-box module_menu">
											<div class="clear">
												<div class="boxIndent">
													<img style="margin-left:28px;" title="Your message has been sent" src="/images/en/h1_webforms_sent_.gif" alt="Your message has been sent" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					<!--right-->
					<!--center-->
						<div id="container" class="equal">
							<div class="clear">
								<div class="article-text-indent">
									<div class="clear">
										<table class="contentpaneopen">
											<tr><td valign="top">
											<p>Your message has been sent.</p>
											</td></tr>
										</table>
									</div>
								</div>
							</div>
						</div>
END;

$FORMS['form_block'] = <<<END
<form enctype="multipart/form-data" method="post" action="%pre_lang%/webforms/send/">
	<input type="hidden" name="system_form_id" value="%form_id%" />
	<input type="hidden" name="system_template" value="%template%" />
	%address_select%
	%groups%
</form>
END;

$FORMS['address_select_block']  = <<<END
<table border="0">
    <tr>
        <td style="align:right; padding-right:10px;">
            Получатель
        </td>

        <td>
            <select name="system_email_to" style="width: 300px;height:auto;">
                %options%
            </select>
        </td>
    </tr>
</table>
END;

$FORMS['address_select_block_line']  = <<<END
	<option value="%id%">%text%</option>
END;

$FORMS['address_separate_block']  = <<<END
<b>Выберите адреса из списка</b><br />
%lines%
<br />
END;

$FORMS['address_separate_block_line']  = <<<END
<input type="checkbox" id="%id%" name="system_email_to[]" value="%value%" /> <label for="%id%">%description%</label><br />
END;

$FORMS['reflection_block'] = <<<END
%groups%
%system captcha()%
<table border="0">
<tr>
	<td style="padding-left:180px; padding-top:10px;">
		<input type="submit" value="Send" />
	</td>
</tr>
</table>
END;

$FORMS['reflection_group'] = <<<END

<p><span style="color: #ff6600; font-size: medium; margin-bottom:10px;"><strong>%title%</strong></span></p>

<table border="0">
	%fields%
</table>


END;

$FORMS['reflection_field_string'] = <<<END

	<tr>
		<td style="text-align:left; padding-right:10px; width:170px;">
			%title%:
		</td>

		<td>
			<input type="text" name="%input_name%" value="%value%" size="50"  style="width:300px; margin:0 0 10px 0;" />
		</td>
	</tr>

END;


$FORMS['reflection_field_text'] = <<<END

	<tr>
		<td style="text-align:left; padding-right:10px;">
			%title%:
		</td>

		<td>
			<textarea name="%input_name%" style="width:300px;">%value%</textarea>
		</td>
	</tr>

END;

$FORMS['reflection_field_boolean'] = <<<END

	<tr>
		<td style="width:100%;">
			%title%:
		</td>

		<td>
			<input type="hidden" id="%input_name%" name="%input_name%" value="%value%" />
			<input onclick="javascript:document.getElementById('%input_name%').value = this.checked;" type="checkbox" %checked% value="1" />
		</td>
	</tr>

END;

$FORMS['reflection_field_file'] = <<<END

	<tr>
		<td style="width:100%;">
			%title%:
		</td>

		<td>
            <input type="file" name="%input_name%" style="width:300px;" />			
		</td>
	</tr>
END;

$FORMS['reflection_field_relation'] = <<<END
    <tr>
        <td style="width:100%;">
            %title%:
        </td>

        <td>
            <select name="%input_name%" style="width: 205px" class="textinputs" style="width:300px;">
                <option />
                %options%
            </select>
        </td>
    </tr>

END;

$FORMS['reflection_field_relation_option'] = <<<END
    <option value="%id%">%name%</option>
END;


$FORMS['reflection_field_relation_option_a'] = <<<END
    <option value="%id%" selected="selected">%name%</option>
END;


$FORMS['reflection_field_multiple_relation'] = <<<END
    <tr>
        <td style="width:100%;">
            %title%:
        </td>

        <td>
            <select name="%input_name%" class="textinputs" multiple style="width:300px;">
                <option />
                %options%
            </select>
        </td>
    </tr>

END;

$FORMS['reflection_field_multiple_relation_option'] = <<<END
    <option value="%id%">%name%</option>
END;


$FORMS['reflection_field_multiple_relation_option_a'] = <<<END
    <option value="%id%" selected="selected">%name%</option>
END;

?>