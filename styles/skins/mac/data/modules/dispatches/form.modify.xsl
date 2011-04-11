<?xml version="1.0"	encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/" [
	<!ENTITY sys-module 'dispatches'>
]>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:umi="http://www.umi-cms.ru/TR/umi">
<!-- 
	<xsl:template match="group[@name = 'rate_voters']" mode="form-modify"/>
	<xsl:template match="group[@name = 'menu_view']" mode="form-modify"/>
 -->

	<xsl:template match="data[@type = 'form' and (@action = 'modify' or @action = 'create')]">
		<form method="post" action="do/" enctype="multipart/form-data">
			<input type="hidden" name="referer" value="{/result/@referer-uri}"/>
			<input type="hidden" name="domain" value="{$domain-floated}"/>
			<xsl:apply-templates mode="form-modify" />
			<xsl:apply-templates select="object/release" mode="form-modify" />
		</form>
	</xsl:template>

	<xsl:template match="properties/group" mode="form-modify">
		<xsl:variable name="label_name">
			<xsl:choose>
				<xsl:when test="$param0 = 'subscriber'"><xsl:text>&label-email-name;</xsl:text></xsl:when>
				<xsl:otherwise><xsl:text>&label-name;</xsl:text></xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:if test="($method = 'edit') and (position() = 1) and (../../@type-id = '680')">
			<div class="imgButtonWrapper">
				<a id="addDispatchMessage" href="{$lang-prefix}/admin/&sys-module;/add_message/{../../@id}/">&label-add-message;</a>
				<a class="view" href="{$lang-prefix}/admin/&sys-module;/releases/{../../@id}/">&label-releases-list;</a>
				<a class="view" href="{$lang-prefix}/admin/&sys-module;/subscribers/{../../@id}/">&label-subscribers;</a>
			</div>
			<div class="clear" style="margin-bottom:20px;" />
		</xsl:if>
		<div class="panel properties-group">
			<div class="header">
				<span>
					<xsl:value-of select="@title" />
				</span>
				<div class="l" /><div class="r" />
			</div>
			<div class="content">
				<xsl:if test="position() = 1">
					<xsl:call-template name="std-form-name">
						<xsl:with-param name="value" select="../../@name" />
						<xsl:with-param name="label" select="$label_name" />
						<xsl:with-param name="show-tip" select="0" />
					</xsl:call-template>
				</xsl:if>
				<xsl:apply-templates select="field" mode="form-modify" />
				<xsl:choose>
					<xsl:when test="$data-action = 'create'">
						<xsl:call-template name="std-form-buttons-add" />
					</xsl:when>
					<xsl:otherwise>
						<xsl:call-template name="std-form-buttons" />
					</xsl:otherwise>
				</xsl:choose>
			</div>
		</div>
	</xsl:template>

	<xsl:template match="release[message]" mode="form-modify">
		<script type="text/javascript">
			var dispatchId = <xsl:value-of select="number($param0)" />;			
			<![CDATA[
			function getFormData(sFormName) {
				 var sData = "";
				 //var arrObjForm  = document.getElementsByName(sFormName);
				 var oObjForm = jQuery("form").get(0);//arrObjForm[0];
				 if (oObjForm && oObjForm.elements && oObjForm.elements.length) {
					for (iI=0; iI<oObjForm.elements.length; iI++) {
						oElement = oObjForm.elements[iI];
						if (oElement.name && oElement.name.length) {
							var sVal = "";
							if(oElement.type=='checkbox') {
								sVal = (oElement.checked? 1: 0);
							} else if (oElement.tagName.toUpperCase()==='SELECT'  && oElement.multiple) {
								var iOpt=0;
								for (iOpt=0; iOpt<oElement.options.length; iOpt++) {
									var theOpt=oElement.options[iOpt];
								}
							} else {
								sVal = oElement.value;
							}
							sData += oElement.name + "=" + sVal + "&";
						}
					}
				}
				return sData;
			}

			function sendMessagesPacket(iDispatchId) {
				var sParams = getFormData('disp_edt_frm');

				var sDataSrc = "/admin/dispatches/release_send/"+iDispatchId+"?"+new Date().getTime();
				jQuery.ajax({
							url  : sDataSrc,
							type : "POST",
							//dataType : "xml",
							data : sParams,
							error: function(request, status, error) {
										sendAborted(getLabel('js-dispatch-server-error') + ". (status: " + status + ")", 'red');
									},
							success: function(data, status, request) {
										if (data) {
											if (jQuery("error", data).size()) {
												sendAborted(jQuery("error", data).text(), true);
											} else {
												try {													
													var iTotal = parseInt(jQuery("total", data).text());
													var iSended = parseInt(jQuery("sended", data).text());
													var iPercent = iTotal == 0 ? 0 : Math.ceil(iSended * 100 / iTotal);
													var sPercent = iPercent + '%';
													if (iTotal != 0) {
														jQuery('#dlg-progress-bar').css({ width : sPercent});
														jQuery('#dlg-progress-lbl').html(sPercent);
														jQuery('#dlg-message').html(getLabel('js-dispatch-send1') + "<strong>" + iSended + "</strong>" +getLabel('js-dispatch-send2') +"<strong>" + iTotal + "</strong>" +getLabel('js-dispatch-send3'));
														if (iPercent < 100) {
															// ++Progress
															sendMessagesPacket(iDispatchId);
														} else {
															sendAborted(getLabel('js-dispatch-send-sucess') + iTotal, 'green', false);
														}
													} else {
														sendAborted(getLabel('js-dispatch-no-subscribers'));
													}
												} catch(theErr) {
													sendAborted(getLabel('js-dispatch-unknown-error') + ": " + theErr, 'red');
												}
											}
										} else {
											sendAborted(getLabel('js-dispatch-unknown-response'), 'red'); // TODO
										}
								}
				});
			}

			function sendAborted(sStatus, sColor, canRepeat) {
				if (typeof(canRepeat) == 'undefined') var canRepeat = true;
				if (typeof(sColor) === 'string') {
					jQuery('#dlg-message').css("color", sColor);
				}
				jQuery('#dlg-message').text(sStatus);
				jQuery('#dlg-ok-button').show();
				if (canRepeat) jQuery('#dlg-repeat-button').show();
			}

			function repeatSend() {
				jQuery('#dlg-ok-button').hide();
				jQuery('#dlg-repeat-button').hide();
				jQuery('#dlg-message').html('&nbsp;');
				sendMessagesPacket(dispatchId);
			}
			
			function sendRelease(iDispatchId) {
				var but_ex = getLabel('js-dispatch-dialog-title');
				var sDialog =	'<div id="dlg-progress">' + 
										'<span id="dlg-progress-lbl">0%</span>' +
										'<div id="dlg-progress-bar"></div>' +
										'<div id="dlg-message" style="margin-top:2px"></div>' +
										'<div class="eip_buttons">' +
											'<input type="button" class="back" style="display:none" onclick="document.location.href = document.location.href" id="dlg-ok-button" value="' + getLabel('js-dispatch-dialog-close') + '" />' +
											'<input type="button" class="primary ok" style="display:none" onclick="javascript:repeatSend()" id="dlg-repeat-button" value="' + getLabel('js-dispatch-dialog-repeat') + '" />' +
											'<div style="clear: both;"/>'+
										'</div>' + 
									'</div>';
				openDialog({					
					title: but_ex,
					text : sDialog,
					stdButtons : false
				});
				sendMessagesPacket(iDispatchId);
			}

		]]>
		</script>
		<div class="panel properties-group">
			<div class="header">
				<span>
					<xsl:text>&label-new-release-messages;</xsl:text>
				</span>
				<div class="l" /><div class="r" />
			</div>
			<div class="content">
				<table class="tableContent">
					<thead>
						<tr>
							<th>&label-message-name;</th>
							<th class="col">&label-edit;</th>
							<th class="col">&label-delete;</th>
						</tr>
					</thead>
					<xsl:apply-templates select="message" mode="form-modify"/>
				</table>
				<div class="buttons">
					<div>
						<input type="button" value="&label-fill-release;" onclick="window.location='{$lang-prefix}/admin/dispatches/fill_release/{$param0}';return false;" />
						<span class="l" /><span class="r" />
					</div>
					<div>
						<input type="submit" value="&label-send-release;" onclick="javascript:sendRelease('{../@id}');return false;" />
						<span class="l" /><span class="r" />
					</div>					
				</div>
			</div>
		</div>
	</xsl:template>

	<xsl:template match="message" mode="form-modify">
		<tbody>
			<tr>
				<td>
					<a href="{$lang-prefix}/admin/&sys-module;/edit/{@id}/">
						<xsl:value-of select="@name"/>
					</a>
				</td>
				<td class="center">
					<a href="{$lang-prefix}/admin/&sys-module;/edit/{@id}/">
						<img src="/images/cms/admin/mac/ico_edit.gif" title="&label-edit;" alt="&label-edit;"/>
					</a>
				</td>
				<td class="center">
					<a href="{$lang-prefix}/admin/&sys-module;/del/{@id}/">
						<img src="/images/cms/admin/mac/ico_del.gif" title="&label-delete;" alt="&label-delete;"/>
					</a>
				</td>
			</tr>
		</tbody>
	</xsl:template>

	<xsl:template match="field[
		@name = 'uid' or
		@name = 'subscribe_date' or
		@name = 'release_reference' or
		@name = 'disp_last_release' or
		@name = 'forced_subscribers' or
		@name = 'new_relation'
	]" mode="form-modify"/>

	<xsl:template match="field[@name = 'news_relation']" mode="form-modify">
		<div class="field relation" id="{generate-id()}" umi:type="{@type-id}" umi:empty="empty">
			<label for="relationSelect{generate-id()}">
				<span class="label">
					<acronym>
						<xsl:apply-templates select="." mode="sys-tips" />
						<xsl:value-of select="@title" />
					</acronym>
					<xsl:apply-templates select="." mode="required_text" />
				</span>
				<span>
					<select name="{@input_name}" id="relationSelect{generate-id()}">
						<xsl:apply-templates select="." mode="required_attr" />
						<xsl:if test="@multiple = 'multiple'">
							<xsl:attribute name="multiple">multiple</xsl:attribute>
							<xsl:attribute name="style">height: 62px;</xsl:attribute>
						</xsl:if>
						<option value=""></option>
						<xsl:apply-templates select="values/item" />
					</select>
					<xsl:if test="count(values/item/@selected)">
						<a title="&label-fill-release;" href="javascript:void(0);" onclick="window.location='{$lang-prefix}/admin/dispatches/fill_release/{$param0}';return false;"><img src="/images/cms/field_add.png" /></a>
					</xsl:if>
				</span>
				
			</label>
			
		</div>
	</xsl:template>
</xsl:stylesheet>