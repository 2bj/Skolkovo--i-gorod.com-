<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/vote">

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
    <xsl:template match="field[@name = 'answers' and @type = 'relation']" mode="form-modify"/>

	<xsl:template match="page|object" mode="form-modify">
		<xsl:apply-templates select="properties/group" mode="form-modify" />
		<xsl:if test="$data-action = 'modify'">
			<xsl:call-template name="answers-list-group"/>
		</xsl:if>
	</xsl:template>	

	<xsl:template name="answers-list-group">
		<div class="panel properties-group">
			<div class="header">
				<span><xsl:text>&label-group-answers;</xsl:text></span>
				<div class="l" /><div class="r" />
			</div>

			<div class="content">				
				<xsl:call-template name="answers_list_form"/>						
			</div>
		</div>
	</xsl:template>

	<xsl:template match="item">
		<xsl:param name="title" select="."/>
		<xsl:param name="id" select="@id"/>

		<tr>
			<td>
				<input type="text" name="answer[{$id}]" value="{$title}"/>
			</td>
			<td style="text-align:center;">&nbsp;</td>
		</tr>
	</xsl:template>


	<xsl:template name="answers_list_form">
		<xsl:attribute name="id">answers_list</xsl:attribute>
		<table border="0" width="100%">
			<tbody>
				<tr>
					<td style="text-align:center;">
						<br/>
						<img src="/images/cms/loading.gif"/>
						<br/>&label-wait;
					</td>
				</tr>
			</tbody>
		</table>
		<script type="text/javascript">
			var listDrawCallback = function(xml) {				
				if(!xml) return;
				var poll_id = $("data", xml).get(0).getAttribute('object_id');
				var objects = $("object", xml).get();
				var html = "&lt;p&gt;&lt;table width=\"100%\" &gt;&lt;tbody&gt;";
				html += "&lt;tr&gt;&lt;td width=\"100%\" &gt;&label-text;&lt;/td&gt;&lt;td style=\"width:45px;\" &gt;&label-count;&lt;/td&gt;&lt;td style=\"width:45px;\" &gt;&label-delete;&lt;/td&gt;&lt;/tr&gt;";
				for(i=0; i &lt; objects.length; i++) {
					var id = objects[i].getAttribute('id');
					var count = 0;
					var props = objects[i].getElementsByTagName('property');
					for(j=0; j &lt; props.length; j++) {
						if(props[j].getAttribute('name') == 'count') {
							var countNode = props[j].getElementsByTagName('value').item(0).firstChild;
							//Bugfix #0002677: Expecting firstChild in value to be #textNode containing needle value
							count = (props[j].getElementsByTagName('value')).item(0).firstChild.nodeValue;
						}
					}
					html += "&lt;tr&gt;&lt;td&gt;&lt;input style=\"width:100%;\" type=\"text\" name=\"data["+id+"][name]\" value=\"" +
							objects[i].getAttribute('name') + "\" onkeydown=\"return onKeyDownCallback(event)\" /&gt;\n&lt;/td&gt;"+
							"&lt;td&gt;&lt;input style=\"width:40px;\" type=\"text\" name=\"data["+id+"][count]\" value=\"" +
							count + "\" onkeydown=\"return onKeyDownCallback(event)\" /&gt;"+
							"&lt;input type=\"hidden\" name=\"data["+id+"][poll_rel]\" value=\""+poll_id+"\" /&gt;" +
							"&lt;/td&gt;\n&lt;td style=\"text-align:center;\" &gt;&lt;input type=\"checkbox\" name=\"dels[]\" value=\""+id+"\" class=\"check\" /&gt;&lt;/td&gt;"+
							"&lt;/tr&gt;";
				}
				html += "&lt;tr&gt;&lt;td&gt;&lt;input style=\"width:100%;\" type=\"text\" name=\"data[new][name]\" value=\"\" onkeydown=\"return onKeyDownCallback(event)\" /&gt;&lt;/td&gt;"+
						"&lt;td&gt;&nbsp;"+
						"&lt;input type=\"hidden\" name=\"data[new][poll_rel]\" value=\""+poll_id+"\" /&gt;" +
						"&lt;/td&gt;&lt;td&gt;&nbsp;&lt;/td&gt;"+
						"&lt;/tr&gt;";
				html += "&lt;/tbody&gt;&lt;/table&gt;&lt;/p&gt;";
				html += "&lt;div class=\"buttons\"&gt;&lt;div class=\"tbutton\"&gt;&lt;input type=\"button\" value=\"&label-save;\" onClick=\"javascript:saveAnswersList();\" /&gt;&lt;span class=\"l\"&gt;&lt;/span&gt;&lt;span class=\"r\"&gt;&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;";
				var FormContent = $('#answers_list');
				FormContent.html(html);
			}
			var _poll_id = parseInt("<xsl:value-of select="$param0"/>");
			if(_poll_id != 0) {
				$.post("<xsl:value-of select="$lang-prefix"/>/admin/vote/answers_list/<xsl:value-of select="$param0"/>/.xml?viewMode=full",
					   {},
					   listDrawCallback);
			} else {
				$('#answers_list').html("&lt;table border=\"0\" width=\"100%\" &gt;&lt;tbody&gt;&lt;tr&gt;&lt;td align=\"center\" valign=\"middle\"&gt;&error_save_page_first;&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;");
			}
			function onKeyDownCallback(e) {
				var keynum;
				if(window.event) // IE
				{
					keynum = e.keyCode;
				}
				else if(e.which) // Netscape/Firefox/Opera
				{
					keynum = e.which;
				}
				if(keynum == 13) {
					saveAnswersList();
					return false;
				}
			}
			function saveAnswersList() {
				var data = new Object();
				$('#answers_list input').each(function() {
					var type = this.getAttribute('type');
					if(type == 'checkbox') {
						if(this.checked)
							data['dels['+this.value+']'] = this.value;
					} else {
						data[this.getAttribute('name')] = this.value;
					}
				});
				$('#answers_list').html('&lt;table border=\"0\" width=\"100%\" &gt;&lt;tbody&gt;&lt;tr&gt;&lt;td style=\"text-align:center;\" &gt;&lt;br /&gt;&lt;img src=\"/images/cms/loading.gif\" /&gt;&lt;br /&gt;&label-wait;&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;');
				$.post("<xsl:value-of select="$lang-prefix"/>/admin/vote/answers_list/<xsl:value-of select="$param0"/>/do/.xml?viewMode=full",
					   data,
					   listDrawCallback);
			}
		</script>
	</xsl:template>

</xsl:stylesheet>
