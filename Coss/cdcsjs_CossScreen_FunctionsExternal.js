function showOutputPopup(){try{showMyOutput()}catch(a){}try{winOutputPopup.focus()}catch(b){}}
function DivWaitSyncSetVisible(a){var b=cdcd("DivWaitSync"),d=cdcd("DivShim");!0==a?(b.style.display="block",b.style.height="60px",b.style.width="300px",b.style.top=screen.height/2-120+"px",b.style.left=screen.width/2-150+"px",d.style.width=b.offsetWidth,d.style.height=b.offsetHeight,d.style.top=b.style.top,d.style.left=b.style.left,d.style.zIndex=b.style.zIndex-1,d.style.display="block",cdcd("DivWaitSync").style.visibility="visible"):(b.style.display="none",d.style.display="none",cdcd("DivWaitSync").style.visibility=
"hidden")}function InitializeApplicationScreenAlerts(){try{var a=parent.cdcd("uc_ApplicationScreenAlertsControl_divAlert");null!=a&&"object"==typeof a&&((v_hidAlertTableHTML=cdcd("hidAlertTableHTML").value)?(a.style.visibility="visible",a.style.display="block",a.innerHTML=v_hidAlertTableHTML):(a.style.visibility="hidden",a.style.display="none"))}catch(b){}}
function GetAndLoadAllTheSequences(){try{window.status="starting cdcsjs_GetFormsXml()...";if(cdcsjs_GetFormsXml()==_t){window.status="starting cdcsjs_LoadPackageXml()...";PackageXmlDocument=cdcsjs_LoadPackageXml();window.status="starting cdcsjs_LoadFormSequenceXml()...";FormSequenceXmlDocument=cdcsjs_LoadFormSequenceXml();ScreenSequenceXmlDocument=null;for(var a=1;5E3>a;)window.status="starting cdcsjs_LoadScreenSequenceXml()...",ScreenSequenceXmlDocument=cdcsjs_LoadScreenSequenceXml(),null==ScreenSequenceXmlDocument?
a++:a=5001;return null==PackageXmlDocument||null==FormSequenceXmlDocument||null==ScreenSequenceXmlDocument?!1:!0}return!1}catch(b){alert("GetAllFormSequences\n\n("+b.number+") "+b.description)}}
function HideTheButtons(a,b,d,c){try{parent.cdcd("ddlCaseAction").disabled=_t}catch(e){}try{parent.cdcd("mycases").disabled=_t}catch(h){}try{parent.cdcd("lnkAdmin").disabled=_t}catch(l){}try{parent.cdcd("lnkSync").disabled=_t}catch(f){}try{parent.cdcd("lnkSignOut").disabled=_t}catch(i){}try{parent.cdcd("lnkHelp").disabled=_t}catch(n){}try{parent.cdcd("lnkTour").disabled=_t}catch(p){}try{parent.cdcd("CaseNotesLink").disabled=_t}catch(q){}for(var m=0;10>m;m++)try{parent.cdcd("tab"+m).disabled=_t}catch(r){}if(!0==
a)try{cdcd("btnSave").disabled=_t}catch(s){}if(!0==d){try{cdcd("btnBack").disabled=_t}catch(j){}hideBackButtonAlias()}if(!0==c){try{cdcd("btnNext").disabled=_t}catch(g){}hideNextButtonAlias()}if(!0==b)try{cdcd("btnReportsViewPDF").disabled=_t}catch(k){}try{cdcd("btnViewAttachments").disabled=_t}catch(t){}try{cdcd("btnComposites").disabled=_t}catch(u){}try{cdcd("btnPolicyDetails").disabled=_t}catch(v){}try{cdcd("ddlConcept").disabled=_t}catch(w){}try{cdcd("ddlPIProductType").disabled=_t}catch(x){}try{cdcd("ddlState").disabled=
_t}catch(y){}try{cdcd("ddlPIPlanName").disabled=_t}catch(z){}try{cdcd("btnIllustrations").disabled=_t}catch(B){}try{cdcd("btnCalcResults").disabled=_t}catch(o){}try{cdcd("btnEmailIllust").disabled=_t}catch(C){}try{cdcd("btnRefreshInforce").disabled=_t}catch(D){}try{cdcd("btnSinglePageQuote").disabled=_t}catch(E){}try{cdcd("btnSimpleQuote").disabled=_t}catch(F){}try{cdcd("btnFullQoute").disabled=_t}catch(G){}try{cdcd("btnTestPrint").disabled=_t}catch(H){}}
function cdcsjs_ShowWaitMessage(a){try{var b=cdcd("DivWait"),d=cdcd("DivShim");!0==a?(b.style.display="block",b.style.height="80px",b.style.width="300px",b.style.top="100px",b.style.left=document.body.offsetWidth/2-150+"px",d.style.width=b.offsetWidth,d.style.height=b.offsetHeight,d.style.top=b.style.top,d.style.left=b.style.left,d.style.zIndex=b.style.zIndex-1,d.style.display="block",b.style.visibility="visible"):(b.style.display="none",d.style.display="none",b.style.visibility="hidden")}catch(c){cdcsjs_PopupError("cdcsjs_ShowWaitMessage()",
c)}}function TelerikVisibilityPatch(){"undefined"!=typeof Telerik&&"undefined"!=typeof Telerik.Web.UI.RadInputControl&&(Telerik.Web.UI.RadInputControl.prototype.set_visible=function(a){!0==a&&null!=this._originalDisplay?(this.get_wrapperElement().style.display=this._originalDisplay,this.repaint()):!1==a&&this.get_visible()&&(this._originalDisplay=this.get_wrapperElement().style.display,this.get_wrapperElement().style.display="none")})}
function PerformOnSubmit(){_g11=_Y;try{if(!1==cossCustomFormValidation())return _g11=_N,_f}catch(a){}try{if(!1==Screen_Submit())return _g11=_N,_f}catch(b){}cdcd("cossShowPleaseWait").value==_Y&&cdcsjs_ShowWaitMessage(_t);return _t}function PerformUnLoad(){try{cdcsjs_MouseWait()}catch(a){}try{Screen_Unload()}catch(b){}}
function ProcessSaveButton(){try{cdcrjs_SaveFormattedFieldValues()}catch(a){}cdcsjs_IsClientLocked()==_f&&cdcsjs_IsSelectedScreenValidated();if(!0!=_g99){try{if(cossCustomFormValidation()==_f)return _g11=_N,_f}catch(b){}try{if(cossSaveButtonHandler()==_f)return _g11=_N,_f}catch(d){}if(Screen_Submit()==_f)return _g11=_N,_f}_g99=!0;try{cdcsjs_SaveSequenceXml()}catch(c){}HideTheButtons(!1,!0,!0,!0);tree.set_enabled(_f);return!0}
function ProcessViewButton(){try{cdcrjs_SaveFormattedFieldValues()}catch(a){}cdcsjs_IsClientLocked()==_f&&cdcsjs_IsSelectedScreenValidated();if(!0!=_g99){try{if(cossCustomFormValidation()==_f)return _g11=_N,_f}catch(b){}try{if(cossViewButtonHandler()==_f)return _g11=_N,_f}catch(d){}if(Screen_Submit()==_f)return _g11=_N,_f}_g99=!0;HideTheButtons(!0,!1,!0,!0);try{cdcsjs_SaveSequenceXml()}catch(c){}_g14=_Y;tree.set_enabled(_f);return!0}
function ProcessNextButton(){try{cdcrjs_SaveFormattedFieldValues()}catch(a){}cdcsjs_IsClientLocked()==_f&&cdcsjs_IsSelectedScreenValidated();if(!0!=_g99){try{if(cossCustomFormValidation()==_f)return _g11=_N,_f}catch(b){}try{if(cossNextButtonHandler()==_f)return _g11=_N,_f}catch(d){}if(Screen_Submit()==_f)return _g11=_N,_f}_g99=!0;HideTheButtons(!0,!0,!0,!1);_g4=_t;tree.set_enabled(_f);var c=tree.get_selectedNode();try{var e=c.get_value().split(",");cdcd("coss"+_g20+"_"+_g21+"_"+_g22+_g23).value=e[0];
cdcd("coss"+_g20+"_"+_g21+"_"+_g22+_g24).value=e[1];cdcd("cossScreenName").value=e[1]}catch(h){}cdcd("cossButtonClicked").value=_g25;_g14=_Y;var e=cdcd("coss"+_g20+"_"+_g21+"_"+_g22+_g23).value,l=cdcd("coss"+_g20+"_"+_g21+"_"+_g22+_g24).value,f=cdcsjs_GetScreensNodeList(e),i=!1;for(jj=0;jj<f.length&&!0!=i;jj++)if(c=cdcsjs_GetAttributeText(f[jj],"n"),c==l)for(c=jj+1;c<f.length;c++)if("1"==cdcsjs_GetAttributeText(f[c],"v")){c=cdcsjs_GetAttributeText(f[c],"n");cdcd("coss"+_g20+"_"+_g21+"_"+_g22+_g24).value=
c;cdcd("cossScreenName").value=c;i=!0;break}if(!0==i){try{cdcsjs_SaveSequenceXml()}catch(n){}document.forms[0].submit();return _t}alert("The form-screen name '"+e+"-"+l+"' is not in the screen sequence xml.");tree.set_enabled(_t);ShowTheButtons();return _f}
function PerformGoToScreen(a){try{cdcrjs_SaveFormattedFieldValues()}catch(b){}cdcsjs_IsClientLocked()==_f&&cdcsjs_IsSelectedScreenValidated();if(!0!=_g99){try{if(cossCustomFormValidation()==_f)return _g11=_N,_f}catch(d){}try{if(cossNextButtonHandler()==_f)return _g11=_N,_f}catch(c){}if(Screen_Submit()==_f)return _g11=_N,_f}_g99=!0;HideTheButtons(!0,!0,!0,!0);_g4=_t;tree.Enabled=_f;_g14=_Y;var e=cdcd("coss"+_g20+"_"+_g21+"_"+_g22+_g23).value,h="";-1<a.indexOf(",")?(h=a.split(","),e=h[0],h=h[1]):h=
a;if(null!=cdcsjs_SelectSingleScreenXmlNode(e,h))return cdcsjs_UpdateScreenInScreenSequence(a,"visible"),cdcd("coss"+_g20+"_"+_g21+"_"+_g22+_g24).value=a,cdcd("cossScreenName").value=a,cdcsjs_SaveSequenceXml(),document.forms[0].submit(),_t;alert("The form-screen name '"+e+"-"+h+"' is not in the screen sequence xml.");tree.set_enabled(_t);ShowTheButtons();return _f}
function ShowTheButtons(){try{parent.cdcd("ddlCaseAction").disabled=_f}catch(a){}try{parent.cdcd("mycases").disabled=_f}catch(b){}try{parent.cdcd("lnkAdmin").disabled=_f}catch(d){}try{parent.cdcd("lnkSync").disabled=_t}catch(c){}try{parent.cdcd("lnkSignOut").disabled=_f}catch(e){}try{parent.cdcd("lnkHelp").disabled=_f}catch(h){}try{parent.cdcd("lnkTour").disabled=_f}catch(l){}try{parent.cdcd("CaseNotesLink").disabled=_f}catch(f){}for(var i=0;10>i;i++)doAdvanceSales(i);processit();try{cdcd("btnReportsViewPDF").disabled=
_f}catch(n){}try{cdcd("btnViewAttachments").disabled=_f}catch(p){}try{cdcd("btnComposites").disabled=_f}catch(q){}try{cdcd("btnPolicyDetails").disabled=_f}catch(m){}try{cdcd("ddlConcept").disabled=_f}catch(r){}try{cdcd("ddlPIProductType").disabled=_f}catch(s){}try{cdcd("ddlState").disabled=_f}catch(j){}try{cdcd("ddlPIPlanName").disabled=_f}catch(g){}try{cdcd("btnIllustrations").disabled=_f}catch(k){}try{cdcd("btnCalcResults").disabled=_f}catch(t){}try{cdcd("btnEmailIllust").disabled=_f}catch(u){}try{cdcd("btnRefreshInforce").disabled=
_f}catch(v){}try{cdcd("btnSinglePageQuote").disabled=_f}catch(w){}try{cdcd("btnSimpleQuote").disabled=_f}catch(x){}try{cdcd("btnFullQoute").disabled=_f}catch(y){}try{cdcd("btnTestPrint").disabled=_f}catch(z){}}
function ProcessBackButton(){try{cdcrjs_SaveFormattedFieldValues()}catch(a){}cdcsjs_IsClientLocked()==_f&&cdcsjs_IsSelectedScreenValidated();if(!0!=_g99){try{if(cossCustomFormValidation()==_f)return _g11=_N,_f}catch(b){}try{if(cossBackButtonHandler()==_f)return _g11=_N,_f}catch(d){}if(Screen_Submit()==_f)return _g11=_N,_f}_g99=!0;HideTheButtons(!0,!0,!1,!0);_g4=_t;tree.set_enabled(_f);var c=tree.get_selectedNode();try{var e=c.get_value().split(",");cdcd("coss"+_g20+"_"+_g21+"_"+_g22+_g23).value=e[0];
cdcd("coss"+_g20+"_"+_g21+"_"+_g22+_g24).value=e[1];cdcd("cossScreenName").value=e[1]}catch(h){}cdcd("cossButtonClicked").value=_g26;_g14=_Y;var e=cdcd("coss"+_g20+"_"+_g21+"_"+_g22+_g23).value,l=cdcd("coss"+_g20+"_"+_g21+"_"+_g22+_g24).value,f=cdcsjs_GetScreensNodeList(e),i=!1;for(jj=0;jj<f.length&&!0!=i;jj++)if(c=cdcsjs_GetAttributeText(f[jj],"n"),c==l)for(c=jj-1;-1<c;c--)if("1"==cdcsjs_GetAttributeText(f[c],"v")){c=cdcsjs_GetAttributeText(f[c],"n");cdcd("coss"+_g20+"_"+_g21+"_"+_g22+_g24).value=
c;cdcd("cossScreenName").value=c;i=!0;break}if(!0==i){try{cdcsjs_SaveSequenceXml()}catch(n){}document.forms[0].submit();return _t}alert("The form-screen name '"+e+"-"+l+"' is not in the screen sequence xml.");tree.set_enabled(_t);ShowTheButtons();return _f}function beforeTreeNodeClick(a){if(null==a.get_value())return _f;_prevnode=tree.get_selectedNode();_g2=a;try{cdcrjs_SaveFormattedFieldValues()}catch(b){}cdcsjs_IsClientLocked()==_f&&cdcsjs_IsSelectedScreenValidated();return!0}
function afterTreeNodeClick(a){if(null==a.get_value())return _f;if(cdcsjs_IsClientLocked()==_f){if(_g99!=_t){try{if(cossCustomFormValidation()==_f)return null!=_prevnode&&(_prevnode.select(),_prevnode.scrollIntoView()),_f}catch(b){}try{if(Screen_Submit()==_f)return null!=_prevnode&&(_prevnode.select(),_prevnode.scrollIntoView()),_f}catch(d){}}try{cdcsjs_SaveSequenceXml()}catch(c){}HideTheButtons(!0,!0,!0,!0);tree.set_enabled(_f);_g99=_t}try{var e=a.get_value().split(",");cdcd("coss"+_g20+"_"+_g21+
"_"+_g22+_g23).value=e[0];cdcd("coss"+_g20+"_"+_g21+"_"+_g22+_g24).value=e[1];cdcd("cossScreenName").value=e[1]}catch(h){}return _t}function TreeScreenNavigator_BeforeNodeSelectionChange(a,b){if(beforeTreeNodeClick(b.get_node())==_f){try{b.set_cancel(!0)}catch(d){}return _f}}function TreeScreenNavigator_AfterNodeSelectionChange(a,b){if(afterTreeNodeClick(b.get_node())==_f){try{b.set_cancel(!0)}catch(d){}return _f}}blnFinishedLoading=!1;
function FinishedLoading(){try{if(!0==blnFinishedLoading)return cdcd("cossScreenIsLoading").value=_N,!0;doFinishLoading();cdcd("cossScreenIsLoading").value=_N;blnFinishedLoading=!0}catch(a){}}
function setupThePage(){try{window.status="starting setupThePage()...";var a=!1;try{window.status="rendering controls...";try{cdcrjs_RenderScreenCompilerControls()}catch(b){}try{cdcrjs_CreateJQueryTabControls()}catch(d){}a=!0}catch(c){}if(!0==a){try{$.isAppleMobile()||($("#divCSDOutput").get(0).style.visibility="hidden")}catch(e){$.err(e)}$("divCSDOutput").ready(function(){window.status="loading data into controls...";try{cdcrjs_LoadScreenCompilerRenderedControls()}catch(a){}})}try{cdcsjs_MakeFramesScrollable()}catch(h){}try{cdcrjs_AdjustObjectsForHeader()}catch(l){}$("divCSDOutput").ready(function(){setupThePageProcess()})}catch(f){alert("setupThePage\n\n("+
f.number+") "+f.description)}}
function setupThePageProcess(){var a="1";try{window.status="starting setupThePageProcess()...";a="2";null!=cdcd("cossScreenIsLoading")&&(a="2a",cdcd("cossScreenIsLoading").value=_Y);a="3";(-1<navigator.userAgent.indexOf("MSIE 9.0")||-1<navigator.userAgent.indexOf("Firefox"))&&processit2();_g14=_Y;a="4";TelerikVisibilityPatch();a="6";HideTheButtons(!0,!0,!0,!0);a="7";"cossApplicationStartupScreen"==cdcd("cossScreenName").value&&(a="8",cdcd("cossAutoPostBack").value=_Y);processit6();a="9";_g22=cdcd("cossOverrideScreensProjectFileName").value;
a="10";_g20=cdcd("cossCurrentApplication").value;a="11";_g21=cdcd("cossCurrentTabName").value;a="12";_g11=cdcd("cossScreenIsSubmitting").value;a="13";try{cdcrjs_ClearServerProcedureName()}catch(b){}try{cdcrjs_ClearSelectedKeys()}catch(d){}try{cdcrjs_ClearParentEntityName()}catch(c){}try{cdcrjs_ClearParentEntityID()}catch(e){}try{cdcrjs_ClearEntityName()}catch(h){}try{cdcrjs_ClearEntityID()}catch(l){}try{cdcd("DivWait").style.visibility="hidden"}catch(f){}try{cdcd("DivWaitSync").style.visibility="hidden"}catch(i){}try{cdccjs_MapTheAliasNames()}catch(n){}try{cdcrjs_MapOtherAliases()}catch(p){}try{cdcrjs_RestoreFormattedFieldValues()}catch(q){}try{cdcrjs_SetupGrids()}catch(m){}try{cdccjs_LoadTopazTL462HSBSignatures()}catch(r){}try{cdccjs_LoadInterlinkEPadInkSignatures()}catch(s){}a=
"14";"YESANDLOGOFF"==cdcd("cossSaveClient").value.toUpperCase()&&processit3();a="15";cdcd("cossSaveClient").value=_N;a="16";cdcd("cossPopupScreenName").value="";a="17";cdcd("cossRefresh").value=_N;a="18";cdcsjs_SetupScreenEventHandling();a="19";cdcrjs_PullQueryStringValues();a="20";try{if(0<cdcd("AURA_UIENGINE_SRC").value.length)for(var j=cdcd("AURA_UIENGINE_SRC").value.split(","),g=0;g<j.length;g++)if(0<j[g].length){var k=j[g].split("|");cdcd(k[0]).src=k[1]}}catch(t){}try{if(0<cdcd("HANOVER_UIENGINE_SRC").value.length){j=
cdcd("HANOVER_UIENGINE_SRC").value.split(",");for(g=0;g<j.length;g++)0<j[g].length&&(k=j[g].split("|"),cdcd(k[0]).src=k[1])}}catch(u){}try{if(0<cdcd("CUSTOM_ASSEMBLY_UIENGINE_SRC").value.length){j=cdcd("CUSTOM_ASSEMBLY_UIENGINE_SRC").value.split(",");for(g=0;g<j.length;g++)0<j[g].length&&(k=j[g].split("|"),cdcd(k[0]).src=k[1])}}catch(v){}try{processit4()}catch(w){}try{parent.cdcsjs_ShowWaitMessage(!1)}catch(x){}if(!1==blncossMessageToDisplay){try{cossMessageToDisplay()}catch(y){}blncossMessageToDisplay=
!0}a="21";InitializeApplicationScreenAlerts();a="22";ShowTheButtons();a="23";CheckTheButtonState();processit5();a="23a";_seqloaded=!1;a="24";null!=cdcd("cossScreenName")&&(a="24a","cossApplicationStartupScreen"!=cdcd("cossScreenName").value&&(a="25",_seqloaded=GetAndLoadAllTheSequences()));a="26";tree=$find("TreeScreenNavigator");a="27";if(tree){a="28";_g17=tree;a="29";_g19=_g17.get_nodes();try{cdccjs_MapTheTreeNodesAlias()}catch(z){}}a="30";Screen_Load();a="31";AnyObject_LostFocus();a="32";if(tree){a=
"32a";if(cdcsjs_IsSelectedScreenValidated)cdcsjs_IsClientLocked()==_f&&(a="33",cdcsjs_IsSelectedScreenValidated());else{a="33a";cdccjs_ValidateObjects();a="33b";try{cossCustomFormValidation()}catch(B){}}a="34";if(cdcd("cossAutoPostBack").value==_Y)return a="35",document.forms[0].submit(),a="35a",!0;var a="36",o=tree.get_selectedNode(),a="37";o&&(a="38",window.setTimeout(function(){try{o.scrollIntoView()}catch(a){}},200));a="39";tree.set_enabled(!0);a="40";window.status="Ready";a="41";_isPageSetup=
!0}else a="41b",alert("tree is nothing  _xx="+a);a="44";FinishedLoading();a="43";showOutputPopup();a="45";_g14=_N;a="5";parent.window.scrollTo(0,0);try{cdcd("RadScriptManager1_TSM").disabled=!0}catch(C){}try{cdcd("RadComboBox1_ClientState").disabled=!0}catch(D){}try{cdcd("RadNumericTextBox1_ClientState").disabled=!0}catch(E){}try{cdcd("RadMaskedTextBox1_ClientState").disabled=!0}catch(F){}try{cdcd("RadDateInput1_ClientState").disabled=!0}catch(G){}try{cdcrjs_DisableTelerikClientStateJavaScript()}catch(H){}try{cossAfterScreenRendered()}catch(I){}}catch(A){alert("setupThePageProcess\n\n("+
A.number+") "+A.description+"\n\nLine="+a)}}
function uncToURL(a){if(-1<navigator.userAgent.indexOf("Firefox")){var b;"csd_image"==a&&(b=document.getElementsByClassName(a));"iframe"==a&&(b=document.getElementsByTagName(a));for(elm in b)try{if(-1<b[elm].src.indexOf("%5C")||-1<b[elm].src.indexOf("%5c"))document.getElementById(b[elm].id).src=b[elm].src.replace(/%5C/g,"/"),document.getElementById(b[elm].id).src=document.getElementById(b[elm].id).src.replace("webforms//","webforms/../../")}catch(d){}}}function SetWritingAgent(){}
function FinishDrawingTheScreen(){Sys.Application.add_init(setupThePage)};