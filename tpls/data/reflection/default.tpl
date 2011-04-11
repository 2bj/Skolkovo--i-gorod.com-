<?php

$FORMS = Array();

$FORMS['reflection_block'] = <<<END

<i>Редактирование объекта</i>
<pre>
%groups%
</pre>
END;

$FORMS['reflection_group'] = <<<END

<hr />
<b>%title% (%name%)</b><br />

<table border="0" width="500">
	%fields%
</table>


END;


$FORMS['reflection_field_string'] = <<<END

	<tr>
		<td>
			%title%:
		</td>

		<td>
			<input type="text" name="%input_name%" value="%value%" size="50" />
		</td>
	</tr>

END;


$FORMS['reflection_field_text'] = <<<END

	<tr>
		<td>
			%title%:
		</td>

		<td>
			<textarea name="%input_name%" style="width: 200px">%value%</textarea>
		</td>
	</tr>

END;


$FORMS['reflection_field_wysiwyg'] = <<<END

	<tr>
		<td>
			%title%:
		</td>

		<td>
			<textarea name="%input_name%" style="width: 200px">%value%</textarea>
		</td>
	</tr>

END;


$FORMS['reflection_field_int'] = <<<END

	<tr>
		<td>
			%title%:
		</td>

		<td>
			<input type="text" name="%input_name%" value="%value%" size="15" />
		</td>
	</tr>

END;


$FORMS['reflection_field_boolean'] = <<<END

	<tr>
		<td>
			%title%:
		</td>

		<td>
			<input type="hidden" id="%input_name%" name="%input_name%" value="%value%" />
			<input onclick="javascript:document.getElementById('%input_name%').value = this.checked;" type="checkbox" %checked% value="1" />
		</td>
	</tr>

END;


$FORMS['reflection_field_password'] = <<<END

	<tr>
		<td>
			%title%:
		</td>

		<td>
			<input type="password" name="%input_name%" value="" size="50" />
		</td>
	</tr>

	<tr>
		<td>
			Подтверждение:
		</td>

		<td>
			<input type="password" name="%input_name%" value="" size="50" />
		</td>
	</tr>

END;


$FORMS['reflection_field_relation'] = <<<END
	<tr>
		<td>
			%title%:
		</td>

		<td>
			<select name="%input_name%">
				<option />
				%options%
			</select>
		</td>
	</tr>

END;

$FORMS['reflection_field_img_file'] = <<<END

	<tr>
		<td>
			%title%:
		</td>

		<td>
			<table width="100%">
				<tr>
					<td>
						<input type="file" name="%input_name%" />
					</td>

					<td>
						%data getPropertyOfObject(%object_id%, '%name%', 'avatar')%
					</td>
				</tr>
			</table>
		</td>
	</tr>


END;

?>