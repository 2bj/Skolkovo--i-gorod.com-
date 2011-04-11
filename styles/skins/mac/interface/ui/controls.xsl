<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:umi="http://www.umi-cms.ru/TR/umi">
	
	
	<xsl:template match="@unix-timestamp">
		<xsl:value-of select="document(concat('udata://system/convertDate/', .))/udata" />
	</xsl:template>
	
	<xsl:template name="ui-smc-table">
		<xsl:param name="control-id" select="concat($module, '-', $method)" />
		<xsl:param name="control-lang-id" select="$lang-id" />
		<xsl:param name="control-domain-id" select="$domain-id" />
		
		<xsl:param name="control-module" select="$module" />
		<xsl:param name="control-params" />
		
		<xsl:param name="control-host" select="/result/@domain" />
		
		<xsl:param name="search-show">1</xsl:param>
		<xsl:param name="search-advanced-allow">0</xsl:param>

		<xsl:param name="show-toolbar">1</xsl:param>

		<xsl:param name="domains-show">0</xsl:param>
		
		<xsl:param name="content-type">pages</xsl:param>
		<xsl:param name="flat-mode">0</xsl:param>
		<xsl:param name="enable-objects-activity">0</xsl:param>

		<xsl:param name="disable-csv-buttons">0</xsl:param>
		<xsl:param name="hide-csv-import-button">0</xsl:param>
		
		<xsl:param name="js-add-buttons" />
		<xsl:param name="js-value-callback" />
		<xsl:param name="js-dataset-events" />
		<xsl:param name="js-ignore-props-edit">[]</xsl:param>

		<xsl:param name="menu" value="''" />

		<xsl:variable name="domains-list" select="document('udata://core/getDomainsList')/udata/domains/domain" />
		
		<script	type="text/javascript">
			var oTable   = null;
			var	oDataSet = null;

			$(document).ready(function() {
				TemplatesDataSet.getInstance();
				editableCell.ignorePropNames = <xsl:value-of select="$js-ignore-props-edit" />;

				oDataSet = new dataSet(
					'<xsl:value-of select="$control-module"/>',
					true,
					'<xsl:value-of select="$control-params" />'
				);

				oDataSet.addEventHandler('onBeforeExecute',	createConfirm(oDataSet));

				<xsl:value-of select="$js-dataset-events" />

				var	oInitFltr =	new	filter();
				
				var	oDefaultFilter = new filter();
				oDefaultFilter.setVirtualCopyChecking(true);
				oDefaultFilter.setViewMode(true);
				oDefaultFilter.setLang('<xsl:value-of select="$control-lang-id"/>');
				oDefaultFilter.setDomain('<xsl:value-of select="$control-domain-id"/>');

				oDataSet.setDefaultFilter(oDefaultFilter);

				oTable = new Control(oDataSet, TableItem, {
					id : 'tree-<xsl:value-of select="$control-id" />',
					<xsl:if test="$show-toolbar = 1">
						toolbar :	TableToolbar,
					</xsl:if>
					allowDrag :	false,
					iconsPath :	'/images/cms/admin/mac/tree/',
					container :	document.getElementById('table_container_<xsl:value-of select="$control-id" />'),
					
					<xsl:if test="$disable-csv-buttons = 1">
						disableCSVButtons:	true,
					</xsl:if>
					
					<xsl:if test="$hide-csv-import-button = 1">
						hideCsvImportButton:	true,
					</xsl:if>
					
					<xsl:if test="string-length($js-value-callback)">
						onGetValueCallback: <xsl:value-of select="$js-value-callback" />,
					</xsl:if>
					
					<xsl:choose>
						<xsl:when test="$content-type = 'objects'">
							flatMode : true,
							<xsl:if test="$enable-objects-activity = 1">
								enableObjectsActivity : true,
							</xsl:if>
							contentType : 'objects',
						</xsl:when>
						
						<xsl:when test="$content-type = 'types'">
							contentType : 'objectTypes',
							objectTypesMode : true,
							<xsl:if test="$flat-mode = 1">
								flatMode : true,
							</xsl:if>
						</xsl:when>
						
						<xsl:otherwise>
							<xsl:if test="$flat-mode = 1">
								flatMode : true,
							</xsl:if>
						</xsl:otherwise>
					</xsl:choose>
					nullparam: 0
				});

				var menu = [];
				<xsl:choose>
					<xsl:when test="string-length($menu)">
						<xsl:value-of select="$menu" />
					</xsl:when>
					<xsl:when test="$content-type = 'pages'"><![CDATA[
						var menu = [
							['view-page', 'view', ContextMenu.itemHandlers.viewElement],
							['add-page', 'add', ContextMenu.itemHandlers.addItem],
							['edit-page', 'edit', ContextMenu.itemHandlers.editItem],
							['change-activity', 'ico_unblock', ContextMenu.itemHandlers.activeItem],
							'-',							
							['csv-export', 'ico_csv_export', ContextMenu.itemHandlers.csvExport],
							['csv-import', 'ico_csv_import', ContextMenu.itemHandlers.csvImport],
							'-',
							['filter-by-node', false, ContextMenu.itemHandlers.filterItem],
							['change-template', false, ContextMenu.itemHandlers.templatesItem],
							['crossdomain-copy', false, ContextMenu.itemHandlers.moveItem],
							['delete', 'ico_del', ContextMenu.itemHandlers.deleteItem]
						]
				]]></xsl:when>
				
					<xsl:when test="$content-type = 'objects' and $enable-objects-activity = 1"><![CDATA[
						var menu = [
							['edit-item', 'edit', ContextMenu.itemHandlers.editItem],
							['change-activity', 'ico_unblock', ContextMenu.itemHandlers.activeObjectItem],
							['delete', 'ico_del', ContextMenu.itemHandlers.deleteItem]
						]
				]]></xsl:when>
				
					<xsl:when test="$content-type = 'objects' and not($enable-objects-activity = 1)"><![CDATA[
						var menu = [
							['edit-item', 'edit', ContextMenu.itemHandlers.editItem],
							//['change-activity', 'ico_unblock', ContextMenu.itemHandlers.activeObjectItem],
							['delete', 'ico_del', ContextMenu.itemHandlers.deleteItem]
						]
				]]></xsl:when>

					<xsl:otherwise>
						<xsl:value-of select="$menu" />
					</xsl:otherwise>
				</xsl:choose>
				

				var menuBuilder = function(o_menu) {
					Control.enabled = false;
					o_menu.a = [];
					for (var i = 0; i &lt; menu.length; i++) {
						var itm = menu[i];
						if (itm == '-') {
							if(o_menu.a.length &amp;&amp; o_menu.a[o_menu.a.length-1] == "-") continue;
							o_menu.a.push(itm);
						} else {
							var action = menu[i][2](menu[i]);
							if (typeof(action) == 'object') o_menu.a.push(action);
						}
					}
					return true;
				}
				
				var oMenu = $.cmenu.getMenu(menuBuilder);
				var cont = '#table_container_<xsl:value-of select="$control-id"/>';

				$(cont).bind('contextmenu', function (event) {
					var el = event.target;
					if (!el &amp;&amp; !el.parentNode) return;

					if (el.parentNode.className == 'column') {
						// show columns menu
						//$.cmenu.lockHiding = true;
						var controlId = el.parentNode.parentNode.parentNode.getAttribute('name');
						var inst = Control.getInstanceById(controlId);
						if (!inst) return false;
						$.cmenu.show($.cmenu.getMenu(inst.columnsMenu), inst.initContainer.offsetParent, event);
					} else if (Control.HandleItem) {
						// show item menu
						//$.cmenu.lockHiding = true;
						$.cmenu.show(oMenu, Control.HandleItem.control.initContainer.offsetParent, event);
					}
				});

				$(cont).bind('mousedown', function(event) {
					if(Control.HandleItem &amp;&amp; event.altKey) {
						// show context menu
						$.cmenu.lockHiding = true;
						$.cmenu.show(oMenu, Control.HandleItem.control.initContainer.offsetParent, event);
						return;
					}
				});

				/*$(cont).bind('mouseout', function () {
					$.cmenu.lockHiding = false;
				});*/


				var oRoot = oTable.setRootNode({
					'id' : 0,
					'allow-drag' : false,
					'force-draw' : false,
					'iconbase' : '/images/cms/admin/mac/tree/ico_domain.png',
					'name' : '<xsl:value-of	select="$control-host" />',
					'is-active'	: '1',
					'allow-copy' : false,
					'allow-activity' : false,
					'create-link' :	'/admin/content/add/0/page/?domain=<xsl:value-of select="$control-host"/>'
				});

				oRoot.filter = oInitFltr;

				<xsl:if test="$search-show = 1">
					new	filterController(oTable, 11, true, $('#search')[0], {
						<xsl:if test="$search-advanced-allow = 1">
							nativeAdvancedMode:false
						</xsl:if>
					});
				</xsl:if>
				
				<xsl:value-of select="$js-add-buttons" />

					SettingsStore.getInstance().addEventHandler("onloadcomplete", function() {
						for	(var i = 0;	i &lt; Control.instances.length; i++) {
							Control.instances[i].init();
						}
					});

				});
				<xsl:if test="($content-type = 'pages' or $domains-show = 1) and count($domains-list) > 1">
					function changeDomain(select) {
						if(!oTable || !oDataSet) return;
						select.id = "domainSelect" + oTable.id;

						var	oInitFltr =	new	filter();

						var	oDefaultFilter = new filter();
						oDefaultFilter.setVirtualCopyChecking(true);
						oDefaultFilter.setViewMode(true);
						oDefaultFilter.setLang('<xsl:value-of select="$control-lang-id"/>');
						oDefaultFilter.setDomain(select.value);
						oDataSet.setDefaultFilter(oDefaultFilter);
						oDataSet.clearFiltersCache();

						oTable.removeItem(oTable.getRootNodeId(), true);
						var root    = oTable.items[oTable.getRootNodeId()];
						root.loaded = false;
						if(root.isExpanded) root.expand();
						oTable.getSelectionCallback()(null, true);
					}
				</xsl:if>
		</script>
		
		<div id="search" class="filter-container" />
		<div class="clear" />
		<xsl:if test="($content-type = 'pages' or $domains-show = 1) and count($domains-list) > 1">
			<div class="domain_choice">
				<select onchange="javascript:changeDomain(this)">
					<xsl:apply-templates select="$domains-list" mode="domain-select" />
				</select>
			</div>
		</xsl:if>
		<div class="clear" />
		<div style="width: 100%;" class="tableItemContainer" oncontextmenu="return false">
			<table class="table-container allowContextMenu tableLists" id="table_container_{$control-id}" />
		</div>
	</xsl:template>

	<xsl:template match="domain" mode="domain-select">
		<option value="{@id}"><xsl:value-of select="@host"/></option>
	</xsl:template>


	<xsl:template name="tinymce">
		<script type="text/javascript" src="/js/tinymce/jscripts/tiny_mce/tinymce_defs.js"></script>
		<script type="text/javascript" src="/js/tinymce/jscripts/tiny_mce/tinymce_custom.js"></script>
		<script type="text/javascript" src="/js/tinymce/jscripts/tiny_mce/tiny_mce_src.js"></script>

		<script type="text/javascript">
			tinyMCE.init(jQuery.extend(window.mceCommonSettings, window.mceCustomSettings));
		</script>
	</xsl:template>


	<xsl:template name="ui-smc-tree">
		<xsl:param name="init">1</xsl:param>
		<xsl:param name="host" />
		<xsl:param name="control-id" />
		<xsl:param name="lang-id" select="$lang-id" />
		<xsl:param name="domain-id" />
		<xsl:param name="menu" value="''" />	
		
		<script type="text/javascript">
			$(document).ready(function() {
				TemplatesDataSet.getInstance();

				var oDataSet = new dataSet('<xsl:value-of select="$module"/>', true);
				// register confirm's
				oDataSet.addEventHandler('onBeforeExecute', createConfirm(oDataSet));

				var oInitFltr = new filter();
				oInitFltr.setParentElements(0);
				oInitFltr.setViewMode(false);
				oInitFltr.setLang('<xsl:value-of select="$lang-id"/>');

				var oDefaultFilter = new filter();
				oDefaultFilter.setVirtualCopyChecking(true);
				oDefaultFilter.setViewMode(false);
				oDefaultFilter.setDomain('<xsl:value-of select="$domain-id"/>');

				oDataSet.setDefaultFilter(oDefaultFilter);

				var oTree = new Control(oDataSet, TreeItem, {
					id : 'tree-<xsl:value-of select="$module" />-<xsl:value-of select="$method" />-<xsl:value-of select="$control-id" />',
					toolbar : TreeToolbar,
					iconsPath : '/images/cms/admin/mac/tree/',
					container : document.getElementById('tree_container_<xsl:value-of select="$control-id"/>')
				});

				var oRoot = oTree.setRootNode({
					'id' : 0,
					'allow-drag' : false,
					'iconbase' : '/images/cms/admin/mac/tree/ico_domain.png',
					'name' : '<xsl:value-of select="$host"/>',
					'is-active' : '1',
					'allow-copy' : false,
					'allow-activity' : false,
					'create-link' : '<xsl:value-of select="$lang-prefix" />/admin/content/add/0/page/?domain=<xsl:value-of select="$host"/>'
				});

				oRoot.filter = oInitFltr;

				var oFilterController = new filterController(oTree, 3, true, null, {nativeAdvancedMode:true});

				var menu = [];
				<xsl:value-of select="$menu" />

				var menuBuilder = function(o_menu) {
					//Control.enabled = false;
					o_menu.a = [];
					for (var i = 0; i &lt; menu.length; i++) {
						var itm = menu[i];
						if (itm == '-') {
							if(o_menu.a.length &amp;&amp; o_menu.a[o_menu.a.length-1] == "-") continue;
							o_menu.a.push(itm);
						} else {
							var action = menu[i][2](menu[i]);
							if (typeof(action) == 'object') o_menu.a.push(action);
						}
					}
					return true;
				}
				
				var oMenu = $.cmenu.getMenu(menuBuilder);
				var cont = '#tree_container_<xsl:value-of select="$control-id"/>';

				$(cont).bind('contextmenu', function (event) {
					// show context menu
					if (Control.HandleItem) {
						//$.cmenu.lockHiding = true;
						$.cmenu.show(oMenu, document.body, event);
					}
				});

				$(cont).bind('mousedown', function(event) {
					if(Control.HandleItem &amp;&amp; event.altKey) {
						// show context menu
						$.cmenu.lockHiding = true;
						$.cmenu.show(oMenu, document.body, event);
						return;
					}
				});

				/*$(cont).bind('mouseout', function () {
					$.cmenu.lockHiding = false;
				});*/

				<xsl:if test="$init = 1">
					SettingsStore.getInstance().addEventHandler("onloadcomplete", function() {
						for (var i = 0; i &lt; Control.instances.length; i++) {
							Control.instances[i].init();
						}
					});
				</xsl:if>

			});
		</script>		

		<xsl:if test="position() > 1">
			<div style="width:100%;border-bottom:1px dashed #aaa;margin:30px 0 30px 0;">
				<xsl:text> </xsl:text>
			</div>
		</xsl:if>
		<ul id="tree_container_{$control-id}" class="tree-container allowContextMenu" oncontextmenu="return false"></ul>
	</xsl:template>

	<xsl:template name="std-form-buttons-add">
		<div class="buttons">
			<div>
				<input type="submit" value="&label-save-add;" name="save-mode" />
				<span class="l" /><span class="r" />
			</div>
			<div>
				<input type="submit" value="&label-save-add-exit;" name="save-mode" />
				<span class="l" /><span class="r" />
			</div>
			<xsl:if test="/result/data/page">
				<div>
					<input type="submit" value="&label-save-add-view;" name="save-mode" />
					<span class="l" /><span class="r" />
				</div>
			</xsl:if>
			<div>
				<input type="button" value="&label-cancel;" onclick="javascript: window.location = '{/result/@referer-uri}';" />
				<span class="l" /><span class="r" />
			</div>
		</div>
	</xsl:template>

	<xsl:template name="std-form-buttons">
		<div class="buttons">
			<div>
				<input type="submit" value="&label-save;" name="save-mode" />
				<span class="l" /><span class="r" />
			</div>
			<div>
				<input type="submit" value="&label-save-exit;" name="save-mode" />
				<span class="l" /><span class="r" />
			</div>
			<xsl:if test="/result/data/page">
				<div>
					<input type="submit" value="&label-save-view;" name="save-mode" />
					<span class="l" /><span class="r" />
				</div>
			</xsl:if>
			<div>
				<input type="button" value="&label-cancel;" onclick="javascript: window.location = '{/result/@referer-uri}';" />
				<span class="l" /><span class="r" />
			</div>
		</div>
	</xsl:template>

	<xsl:template name="std-save-button">
		<div class="buttons">
			<div>
				<input type="submit" value="&label-save;" name="save-mode" />
				<span class="l" /><span class="r" />
			</div>
		</div>
	</xsl:template>

	<xsl:template name="std-form-name">
		<xsl:param name="value" />
		<xsl:param name="label" select="'&label-name;'" />
		<xsl:param name="show-tip"><xsl:text>1</xsl:text></xsl:param>

		<div class="field">
			<label>
				<span class="label">
					<acronym>
						<xsl:if test="$show-tip = '1'">
							<xsl:attribute name="class"><xsl:text>acr</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>&tip-page-name;</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:value-of select="$label" />
					</acronym>
				</span>
				<span>
					<input type="text" name="name" value="{$value}" />
				</span>
			</label>
		</div>
	</xsl:template>

	<xsl:template name="std-form-alt-name">
		<xsl:param name="value" />

		<div class="field">
			<label>
				<span class="label">
					<acronym class="acr">
						<xsl:attribute name="title"><xsl:text>&tip-alt-name;</xsl:text></xsl:attribute>
						<xsl:text>&label-alt-name;</xsl:text>
					</acronym>
				</span>
				<span>
					<input type="text" name="alt-name" value="{$value}" />
				</span>
			</label>
		</div>
	</xsl:template>
	
	<xsl:template name="std-form-is-active">
		<xsl:param name="value" />
	
		<div class="field">
			<label for="is-active">
				<span class="label">
					<input type="hidden" name="active" value="0" />
					<input type="checkbox" name="active" value="1" id="is-active" class="checkbox">
						<xsl:if test="$value">
							<xsl:attribute name="checked">checked</xsl:attribute>
						</xsl:if>
					</input>
					<acronym class="acr">
						<xsl:attribute name="title"><xsl:text>&tip-is-active;</xsl:text></xsl:attribute>
						<xsl:text>&label-active;</xsl:text>
					</acronym>
				</span>
			</label>
		</div>
	</xsl:template>
	
	<xsl:template name="std-form-is-visible">
		<xsl:param name="value" />
	
		<div class="field">
			<label for="is-visible">
				<span class="label">
					<input type="hidden" name="is-visible" value="0" />
					<input type="checkbox" name="is-visible" value="1" class="checkbox" id="is-visible">
						<xsl:if test="$value">
							<xsl:attribute name="checked">checked</xsl:attribute>
						</xsl:if>
					</input>
					<acronym class="acr">
						<xsl:attribute name="title"><xsl:text>&tip-is-visible;</xsl:text></xsl:attribute>
						<xsl:text>&label-is-visible;</xsl:text>
					</acronym>
				</span>
			</label>
		</div>
	</xsl:template>
	
	<xsl:template name="std-form-is-default">
		<xsl:param name="value" />
	
		<div class="field">
			<label for="is-default">
				<span class="label">
					<input type="hidden" name="is-default" value="0" />
					<input type="checkbox" name="is-default" value="1" class="checkbox" id="is-default">
						<xsl:if test="$value">
							<xsl:attribute name="checked">checked</xsl:attribute>
						</xsl:if>
					</input>
					<acronym class="acr">
						<xsl:attribute name="title"><xsl:text>&tip-is-default;</xsl:text></xsl:attribute>
						<xsl:text>&label-is-default;</xsl:text>
					</acronym>
				</span>
			</label>
		</div>
	</xsl:template>
	
	<xsl:template name="std-form-data-type">
		<xsl:param name="value" />
		<xsl:variable name="object-types" select="document(concat('udata://system/getObjectTypesList/', $value))/udata" />

		<xsl:if test="count($object-types//item) &gt; 1">
			<div class="field">
				<label>
					<span class="label">
						<acronym class="acr">
							<xsl:attribute name="title"><xsl:text>&tip-object-type;</xsl:text></xsl:attribute>
							<xsl:text>&label-type;</xsl:text>
						</acronym>
					</span>
					<span>
						<select name="type-id">
							<xsl:apply-templates select="$object-types//item" mode="std-form-item">
								<xsl:with-param name="value" select="$value" />
							</xsl:apply-templates>
						</select>
					</span>
				</label>
			</div>
		</xsl:if>
	</xsl:template>
	
	<xsl:template name="std-form-template-id">
		<xsl:param name="value" />
		<xsl:variable name="templates" select="document(concat('udata://system/getTemplatesList/', $domain-floated))/udata" />

		<div class="field">
			<label>
				<span class="label">
					<acronym class="acr">
						<xsl:attribute name="title"><xsl:text>&tip-template-id;</xsl:text></xsl:attribute>
						<xsl:text>&label-template;</xsl:text>
					</acronym>
				</span>
				<span>
					<select name="template-id">
						<xsl:apply-templates select="$templates//item" mode="std-form-item">
							<xsl:with-param name="value" select="$value" />
						</xsl:apply-templates>
					</select>
				</span>
			</label>
		</div>
	</xsl:template>
	
	<xsl:template match="item" mode="std-form-item">
		<xsl:param name="value" />
		
		<option value="{@id}">
			<xsl:if test="@id = $value">
				<xsl:attribute name="selected">selected</xsl:attribute>
			</xsl:if>
			<xsl:value-of select="." />
		</option>
	</xsl:template>

	<xsl:template name="std-page-permissions">
		<xsl:param name="page-id" select="0" />		

		<div id="permissionsContainer">
			<ul>				
				<xsl:choose>
					<xsl:when test="@id">
						<xsl:apply-templates select="document(concat('udata://users/permissions///', @id))/udata" mode="page-permissions"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:apply-templates select="document(concat('udata://users/permissions/', $module, '/', /result/data/page/basetype/@method, '//', /result/data/page/@parentId))/udata" mode="page-permissions"/>
					</xsl:otherwise>
				</xsl:choose>
			</ul>
		</div>		
	</xsl:template>

	<xsl:template match="users/user" mode="page-permissions">
		<li umi:id="{@id}" umi:access="{@access}"><xsl:value-of select="@login" /></li>
	</xsl:template>

	<xsl:template match="groups/group" mode="page-permissions">
		<li umi:id="{@id}" umi:access="{@access}"><xsl:value-of select="@title" /></li>
	</xsl:template>

	<xsl:template name="std-optioned-control">
		<xsl:param name="column1-title" />
		<xsl:param name="column2-title" />
		<xsl:param name="guide-id" />
		<xsl:param name="input-name" />
		<xsl:param name="type"><xsl:text>float</xsl:text></xsl:param>
		<table id="{generate-id()}" class="tableContent optioned">
			<thead>
				<th umi:type="rel"><xsl:value-of select="$column1-title" /></th>
				<th umi:type="{$type}" class="center"><xsl:value-of select="$column2-title" /></th>
				<th class="center">&nbsp;</th>
			</thead>
			<tbody>
				<xsl:apply-templates mode="field-optioned">
					<xsl:with-param name="input-name" select="$input-name" />
					<xsl:with-param name="type" select="$type" />
				</xsl:apply-templates>
			</tbody>
			<tfoot>
				<tr>
					<td>
						<select id="relationSelect{generate-id()}" umi:guide="{$guide-id}" umi:name="{$input-name}"></select>
						<input type="text" id="relationInput{generate-id()}" />
						<input type="hidden"  id="relationButton{generate-id()}" />
					</td>
					<td class="center"><input type="text" umi:type="{$type}" /></td>
					<td class="center"><a href="#" class="add"><img src="/images/cms/admin/mac/table/ico_add.gif" /></a></td>
				</tr>
			</tfoot>
		</table>		
	</xsl:template>

	<xsl:template match="field/values/value" mode="field-optioned">
		<xsl:param name="input-name" />
		<xsl:param name="type"><xsl:text>float</xsl:text></xsl:param>
		<xsl:variable name="position" select="position()" />		
		<tr>
			<td>
				<xsl:value-of select="object/@name" />
				<input type="hidden" name="{$input-name}[{$position}][rel]" value="{object/@id}" />
			</td>
			<td class="center">
			<xsl:choose>				
				<xsl:when test="$type='int'">					
					<input type="text" umi:type="{$type}" name="{$input-name}[{$position}][{$type}]" value="{@int}" />
					<input type="hidden" umi:type="float" name="{$input-name}[{$position}][float]" value="1" />
				</xsl:when>
				<xsl:when test="$type='varchar'">					
					<input type="text" umi:type="{$type}" name="{$input-name}[{$position}][{$type}]" value="{@varchar}" />
					<input type="hidden" umi:type="int" name="{$input-name}[{$position}][int]" value="1" />
				</xsl:when>
				<xsl:otherwise>					
					<input type="text" umi:type="float" name="{$input-name}[{$position}][float]" value="{@float}" />
					<input type="hidden" umi:type="int" name="{$input-name}[{$position}][int]" value="1" />
				</xsl:otherwise>
			</xsl:choose>
			</td>
			<td class="center">
				<a href="#" class="remove">
					<img src="/images/cms/admin/mac/table/ico_del.gif" />
				</a>
			</td>
		</tr>
	</xsl:template>
	
	<!--
	<xsl:template match="field[@type = 'img_file']" mode="form-modify" priority="3">
		<p>
			<xsl:text>Test</xsl:text>
		</p>
	</xsl:template>
	-->
	
	<xsl:template name="tinymce-js">
		<script type="text/javascript" src="/js/tinymce/jscripts/tiny_mce/tinymce_defs.js"></script>
		<script type="text/javascript" src="/js/tinymce/jscripts/tiny_mce/tinymce_custom.js"></script>
		<script type="text/javascript" src="/js/tinymce/jscripts/tiny_mce/tiny_mce_src.js"></script>

		<script type="text/javascript">
			tinyMCE.init(jQuery.extend(window.mceCommonSettings, window.mceCustomSettings));
		</script>
	</xsl:template>
</xsl:stylesheet>