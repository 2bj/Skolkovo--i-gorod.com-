<?php

$FORMS = Array();

$FORMS['block'] = <<<END
					<!--left-->
						<div id="left" class="equal">
							<div class="top_left_bg equal">
								<div class="bottom_left_bg equal">
									<div class="left-indent">
										<div class="wrapper-box module_menu">
											<div class="clear">
												<div class="boxIndent">
													<img style="margin-left:28px;" title="Ошибка 404 — страница не найдена" src="/images%pre_lang%/h1_404_.gif" alt="Ошибка 404 — страница не найдена" />
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
											<p>Запрошенная Вами страница не найдена. Возможно, мы удалили или переместили ее. Возможно, вы пришли по устаревшей ссылке или неверно ввели адрес. Воспользуйтесь поиском или картой сайта.</p>
											<p><span style="color: #ff6600; font-size: medium; margin-bottom:10px;"><strong>Карта сайта</strong></span></p>
											%content sitemap()%
											</td></tr>
										</table>
									</div>
								</div>
							</div>
						</div>
END;

?>