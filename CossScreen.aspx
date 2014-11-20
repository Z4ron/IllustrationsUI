<%@ Page EnableEventValidation = "false" enableViewState="true" enableViewStateMac="false" validateRequest=false Language="vb" AutoEventWireup="false" Codebehind="CossScreen.aspx.vb" Inherits="CossEnterpriseSuite.CossScreen"%>
<%@ Register TagPrefix="telerik" Namespace="Telerik.Web.UI" Assembly="Telerik.Web.UI" %>

<%@ Register assembly="Infragistics4.Web.v12.2, Version=12.2.20122.2031, Culture=neutral, PublicKeyToken=7dd5c3163f2cd0cb" namespace="Infragistics.Web.UI.GridControls" tagprefix="ig" %>

<%@ Register assembly="Infragistics4.Web.v12.2, Version=12.2.20122.2031, Culture=neutral, PublicKeyToken=7dd5c3163f2cd0cb" namespace="Infragistics.Web.UI" tagprefix="ig" %>

<%
    if IsNothing(Session("USER_DATA")) = True then
        Response.Redirect("..\default.aspx")
        Response.End()
    end if
%>

<HTML>
	<head>
<META http-equiv="Content-Type" content="text/html; charset=windows-1252">
<meta name="format-detection" content="telephone=no">
<%=Cache(Session("MY_COMPANY_DEFAULTS_KEY")).CssHtmlLinkStatement%>
<style type="text/css">.hidden {display:none;}</style>	
<style type="text/css">.visible {display:block;}</style>
<style type="text/css">.realGridRow{}</style>
<style type="text/css">.fakeGridRow{display:none;}</style>
<style type="text/css">.deletedRow{display:none;}</style>
<style type="text/css">#DivMiddle{z-index:101;left:209px;width:640px;position:absolute;top:0;height:100%;background-color:#FFF;display:none}#TopButtonPanel{z-index:101;left:8px;position:absolute}#DivToolTip{visibility:hidden;z-index:999}#InnerDivLeft,.InnerDivMiddle{width:216px;position:relative;height:100%}#DivToolTipShim,#DivShim{position:absolute;top:0;left:0;display:none}#DivWait,#DivWaitSync{background:#fff;visibility:hidden;z-index:999;left:0;width:300px;position:absolute;top:0;height:60px;border-width:5px}</style>
<script type="text/javascript" src="../JavaScript/Coss/cdcd.js?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>"></script>	
<asp:Literal id="WebDataGridScript" runat="server"></asp:Literal>
<script type="text/javascript">
    // if the current window does not have a parent 
    // and they have no user data in session then the
    // user has tried to access the page directly without
    // logging into the coss system
    try{
        if (parent.location.href == location.href){ 
    <%
            if IsNothing(Session("USER_DATA")) = True then
                Response.Redirect("..\default.aspx")
                Response.End()
            end if
    %>
        }
    }catch(e){}
</script>
<script type="text/javascript"><!-- #include virtual="../JavaScript/Coss/cdcsjs_Logoff.js" --></script>
<script type="text/javascript"><!-- #include virtual="../JavaScript/Coss/cdcsjs_CossScreen_Functions.js"--></script>
<script type="text/javascript" src="../JavaScript/Coss/cdcsjs_CossScreen_FunctionsExternal.js?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>"></script>
<script type="text/javascript" src="../JavaScript/Coss/net.js?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>"></script>
<script type="text/javascript"><!-- #include virtual="../JavaScript/Coss/AjaxSessionTimer.js" --></script>
<script type="text/javascript" src="../JavaScript/Coss/AjaxSessionTimer2.js?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>"></script>
<script type="text/javascript" src="../JavaScript/Coss/AjaxHeartbeat.js?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>"></script>
<link rel="stylesheet" href="../JavaScript/JQuery/jquery-ui-1.10.2.css?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>" /> 
<script type="text/javascript" src="../JavaScript/JQuery/jquery-1.6.2.min.js?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>"></script>
<script type="text/javascript" src="../JavaScript/JQuery/jquery-ui-1.10.2.js?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>"></script>
<script type="text/javascript" src="../JavaScript/JQuery/jquery.betterTooltip.js?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>"></script>
<script type="text/javascript" language="javascript">
    var ipadSignatureSupported = '<%=Session("CLIENT_DATA")("IPAD_SIGNATURE_SUPPORTED")%>';
    var suppressSignatureSupportedMessage = '<%=Session("CLIENT_DATA")("SUPPRESS_SIGNATURE_SUPPORTED_MESSAGE")%>';
    var cossIsClientLocked = '<%=Session("CLIENT_DATA")("cossIsClientLocked")%>';
</script>
<script type="text/javascript" src="../JavaScript/JQuery/jquery.signaturepad.js?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>" defer="defer"></script>
<script type="text/javascript" src="../JavaScript/json2.min.js?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>"></script>
<script type="text/javascript" src="../JavaScript/canvas-all.js?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>"></script>
<script language="javascript" type="text/javascript">       
			$(document).ready(function() {
				$('.btt').betterTooltip({ speed: 150, delay: 200 });
                if ('<%=Session("USER_DATA")("SubCompanyID")%>' == '3030') {
					$('#imgCaseHeaderProductLogo', parent.document).attr('src', '/CossEnterpriseSuite/Custom/IPIPELINE/IPIPELINE/3030/companylogo.gif');
					$('#imgCaseHeaderProductLogo', parent.document).show();
					for (var tc=0;tc < 6; tc++) {
						var tabId = '#tab' + tc.toString();
						try{$(tabId, parent.document).click(function() {$('#imgCaseHeaderProductLogo', parent.document).hide();});} catch (e) {}
					}
				}
			});
    var inCompactMode = false;
    <% If Session("COMPACT") Is Nothing = False Then %>
        var test = ("<%= Session("COMPACT") %>".toLowerCase() == "true");
        inCompactMode = test;
    <% End If %>
</script>
<script type="text/javascript" src="../JavaScript/JQuery/jquery.ix.js?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>"></script>
        <%If UCase(Cstr(Session("CLIENT_DATA")("IsClientInClickWrapSignatureProcess"))) = "YES" Then %>
            <% dim userAgent
                userAgent = UCase(Cstr(Request.ServerVariables("HTTP_USER_AGENT")))
                select case true 
                    case (Instr(userAgent, "IPAD") > 0 or Instr(userAgent, "IPHONE") > 0)
                        'Response.Write("<div style='position: absolute; top: 100; left: 100; z-index: 999; border:2px red solid;'>" & cssVer & "</div>")
                    %>
                        <script src="../JavaScript/JQuery/jquery-ui-1.8.9.custom.min.js?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>" type="text/javascript"></script>
                        <link href="../Css/redmond/jquery-ui-1.8.9.custom.css?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>" rel="stylesheet" type="text/css" />
                        <script src="../JavaScript/JQuery/jquery.touch.js?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>" type="text/javascript"></script>
                        <script src="../JavaScript/JQuery/jquery.scrollTo.js?v=<%=Session("MY_JAVASCRIPT_CSS_VERSION")%>" type="text/javascript"></script>
                   <%
                end select
            %>
        <% End If %>
        <script type="text/javascript">
            function changeNeedsConcept() { changeConcept("cossNEEDS_ANALYSIS_CONCEPT"); }
            function changeIllustrationsConcept() { changeConcept("cossILLUSTRATIONS_CONCEPT"); }
            function changeAdvMktConcept() { changeConcept("cossADVANCED_MARKETING_CONCEPT"); }
            function changeConcept(concept) {
                try { cdcsjs_SaveSequenceXml(); } catch (e) { }
                try { cdcrjs_SaveFormattedFieldValues(); } catch (e) { }
                try {
                    cdcd(concept).value = $find('ddlConcept').get_selectedItem().get_value();
                    cdcsjs_SetDirty2Flag('Client');
                } catch (e) { }
                cdcd('cossScreenName').value = '';
                try { cdcd('cossddlConceptChanged').value = 'YES'; } catch (e) { }
                try {
                    if (PerformOnSubmit() == true) {
                        document.forms[0].submit();
                    }
                } catch (e) {
                    document.forms[0].submit();
                }
            }
            function changeIllustrationsState() {
                try {
                    try { cdcsjs_SaveSequenceXml(); } catch (e) { }
                    try { cdcrjs_SaveFormattedFieldValues(); } catch (e) { }
                    cdcd('cossddlStateChanged').value = 'YES';
                } catch (e) { } 
            }
            function changeIllustrationsProductType() {
                try {
                    try { cdcsjs_SaveSequenceXml(); } catch (e) { }
                    try { cdcrjs_SaveFormattedFieldValues(); } catch (e) { }
                    cdcd('cossddlPIProductTypeChanged').value = 'YES'; 
                } catch (e) { } }
            function changeIllustrationsPlanName() {
                try {
                    try { cdcsjs_SaveSequenceXml(); } catch (e) { }
                    try { cdcrjs_SaveFormattedFieldValues(); } catch (e) { }
                    cdcd('cossddlPIPlanNameChanged').value = 'YES'; 
                } catch (e) { } }
            function telerikComboBoxOnClientKeyPressing(sender, eventArgs) {
                //did user press BACKSPACE key?
                var evt = eventArgs.get_domEvent();
                if (evt) {
                    if (evt.keyCode == 8) {
                        //yes - then just backspace - do not go to previous screen
                        var text = sender.get_text();
                        if (text.length > 0) {
                            var newText = text.substring(0, text.length - 1);
                            sender.set_text(unescape(newText));
                        }
                        evt.cancelBubble = true;
                        evt.returnValue = false;
                        if (evt.stopPropagation) {
                            evt.stopPropagation();
                            evt.preventDefault();
                        }
                        return false;
                    }
                }
            }
                    
        </script>
</head>
	<body class="cossscreen-body" onload="cdcsjs_startKeepAlive();cdcsjs_FormatSpecifiedValuesGridsOnBlurForNonIE();" onkeydown="cdcsjs_CheckKeyCode(event);" onunload="return PerformUnLoad();" type="text/javascript" id="BODY1" bgProperties="fixed">
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<form onSubmit="return PerformOnSubmit();" id="Form1" method="post" runat="server">
	    <telerik:RadScriptManager ID="RadScriptManager1" runat="server" />
        <telerik:RadComboBox ID="RadComboBox1" EnableViewState="false" Display="false" Height="0" Width="0" Enabled="false" runat="server"></telerik:RadComboBox>
	    <telerik:RadListBox ID="RadListBox1" EnableViewState="false" Display="false" Height="0" Width="0" Enabled="false" runat="server"></telerik:RadListBox>
			<div id="DivLeft" class="divleftstyle" >
				<div id="InnerDivLeft" ms_positioning="GridLayout">
<%
				If Session("CURRENT_TAB_NAME") = "ILLUSTRATIONS" Then
%>		            <asp:label id="lblConcept" runat="server" CssClass="csd_concept_label" ><%=GetGlobalResourceString( "Concept")%>:</asp:label>
                    <telerik:RadComboBox CssClass="csd_concept_dropdownlist" Width="195" DropDownWidth="250" DropDownCssClass="csd_dropdownlist_dropdown" InputCssClass="csd_dropdownlist_input" ID="ddlConcept" runat="server" AutoPostBack="True" />
                    <telerik:RadComboBox CssClass="csd_concept_dropdownlist" Width="195" DropDownWidth="250" DropDownCssClass="csd_dropdownlist_dropdown" InputCssClass="csd_dropdownlist_input" ID="ddlAdvancedMarketingConcept" runat="server" AutoPostBack="True" />
                    <telerik:RadComboBox CssClass="csd_concept_dropdownlist" Width="195" DropDownWidth="250" DropDownCssClass="csd_dropdownlist_dropdown" InputCssClass="csd_dropdownlist_input" ID="ddlNeedsAnalysisConcept" runat="server" AutoPostBack="True" />
					<asp:label id="lblState" CssClass="csd_state_label" runat="server" ><%=GetGlobalResourceString( "State")%>:</asp:label>
                    <telerik:RadComboBox CssClass="csd_state_dropdownlist" Width="195" DropDownWidth="250" DropDownCssClass="csd_dropdownlist_dropdown" InputCssClass="csd_dropdownlist_input" MaxHeight="300" ID="ddlState" runat="server" AutoPostBack="True" />
					<asp:label id="lblProduct" CssClass="csd_product_label" runat="server" ><%=GetGlobalResourceString( "ProductType")%>:</asp:label>
                    <telerik:RadComboBox CssClass="csd_product_dropdownlist" Width="195" DropDownWidth="250" DropDownCssClass="csd_dropdownlist_dropdown" InputCssClass="csd_dropdownlist_input" ID="ddlPIProductType" runat="server" AutoPostBack="True" />
					<asp:label id="lblPlan" CssClass="csd_plan_label" runat="server"><%=GetGlobalResourceString( "Product")%>:</asp:label>
                    <telerik:RadComboBox CssClass="csd_plan_dropdownlist" Width="195" DropDownWidth="250" DropDownCssClass="csd_dropdownlist_dropdown" InputCssClass="csd_dropdownlist_input" ID="ddlPIPlanName" runat="server" AutoPostBack="True" />
<%              End If
%>
                <telerik:RadTreeView ID="TreeScreenNavigator" ShowLineImages="false" 
                    OnClientNodeClicking="TreeScreenNavigator_BeforeNodeSelectionChange" 
                    OnClientNodeClicked="TreeScreenNavigator_AfterNodeSelectionChange" 
                    Runat="server" >
                </telerik:RadTreeView>

				</div>
			</div>

		<div id="DivMiddle">
		<div class="InnerDivMiddle" ms_positioning="GridLayout">
        <!--TELERIK PLACEHOLDER OBJECTS STARTS HERE  These allow us to precompile the telerik html-->      
        <telerik:RadNumericTextBox EnableViewState="false" Display="false" Enabled="false" ID="RadNumericTextBox1" Height="0" Width="0" runat="server"></telerik:RadNumericTextBox>
        <telerik:RadMaskedTextBox EnableViewState="false" Display="false" Enabled="false" ID="RadMaskedTextBox1" Height="0" Width="0" runat="server"></telerik:RadMaskedTextBox>
        <telerik:RadDateInput EnableViewState="false" Display="false" Enabled="false" ID="RadDateInput1" Height="0" Width="0" runat="server"></telerik:RadDateInput>
        <telerik:RadAjaxManager ID="RadAjaxManager1" Display="false" runat="server"></telerik:RadAjaxManager> 
        <!--TELERIK PLACEHOLDER OBJECTS ENDS HERE  These allow us to precompile the telerik html-->      
		<!--SCREEN DESIGNER OUTPUT STARTS HERE-->
		<asp:placeholder id="CenterPlaceHolder" runat="server"></asp:placeholder>
        <!--SCREEN DESIGNER OUTPUT ENDS HERE-->
        <!--PLACEHOLDER_TELERIK_SPAN_STATEMENTS-->
		<asp:panel id="TopButtonPanel" style="TOP: 10px;" runat="server" Width="625px" Height="22px" BackColor="White" BorderStyle="none" BorderWidth="1px" BorderColor="Silver" ForeColor="White">
			<asp:label id="lblGlobalDefaultMode" CssClass="csd_label" runat="server" ><%=Cache(Session("MY_COMPANY_DEFAULTS_KEY")).SettingsGlobalDefaultsMenuCaption%></asp:label>
			<asp:Button CssClass="csd_button btn_prev"  id="btnBack" runat="server" ></asp:Button>
			<asp:Button CssClass="csd_button btn_next"  id="btnNext" runat="server" ></asp:Button>						
		</asp:panel>
	</div>
	<iframe id="DivToolTipShim" src="javascript:false;" scrolling="no" frameborder="0"></iframe>
	<div id="DivToolTip" name="DivToolTip"></div></div>
		<div id="DivRight" Class="divrightstyle">
			<asp:Button CssClass="csd_button" id="btnSave" runat="server"  Width="85%"></asp:Button><br />
			<asp:label id="lblBlank4" runat="server" Width="100%" Height="5px"></asp:label> 
			<asp:Button CssClass="csd_button" id="btnRefreshInforce" runat="server"  Width="85%"></asp:Button><br />
			<asp:label id="lblBlank9" runat="server" Width="100%" Height="5px"></asp:label> 
            <asp:Button CssClass="csd_button" ID="btnPolicyDetails" runat="server" Width="85%"  /><br />
			<asp:label id="lblBlank5" runat="server" Width="100%" Height="5px"></asp:label> 
            <asp:Button CssClass="csd_button" ID="btnReportsViewPDF" runat="server" Width="85%" /><br />
			<asp:label id="lblBlank6" runat="server" Width="100%" Height="5px"></asp:label> 
            <asp:Button CssClass="csd_button" ID="btnViewAttachments" runat="server" Width="85%" /><br />
			<asp:label id="Label2" runat="server" Width="100%" Height="5px"></asp:label> 
            <asp:Button CssClass="csd_button" ID="btnComposites" runat="server" Width="85%"  /><br />
			<asp:label id="Label7" runat="server" Width="100%" Height="5px"></asp:label> 
            <asp:Button CssClass="csd_button" ID="btnIllustrations" runat="server" Width="85%"  /><br />
            <asp:Button CssClass="csd_button" ID="btnSinglePageQuote" runat="server" Width="85%" /><br />
			<asp:label id="Label3" runat="server" Width="100%" Height="5px"></asp:label> 
            <asp:Button CssClass="csd_button" ID="btnSimpleQuote" runat="server" Width="85%" /><br />
			<asp:label id="Label4" runat="server" Width="100%" Height="5px"></asp:label> 
            <asp:Button CssClass="csd_button" ID="btnFullQoute" runat="server" Width="85%" /><br />
			<asp:label id="Label5" runat="server" Width="100%" Height="5px"></asp:label> 
            <asp:Button CssClass="csd_button" ID="btnTestPrint" runat="server" Width="85%"  /><br />
<%          If Session("CURRENT_TAB_NAME") = "ILLUSTRATIONS" AndAlso _
	           Cache(Session("MY_COMPANY_DEFAULTS_KEY")).ShowCossCalcResults = True AndAlso _
			   String.Compare(Session("CLIENT_DATA")("cossILLUSTRATIONS_CONCEPT"), "Rate Book Compare", True) <> 0 Then
%>  			<asp:label id="Label1" runat="server" Width="100%" Height="5px"></asp:label> 
                <asp:Button CssClass="csd_button" ID="btnCalcResults" runat="server" Width="85%"  /><br />
<%			End If 
            If Session("CURRENT_TAB_NAME") = "ILLUSTRATIONS" AndAlso _
               String.Compare(Session("CLIENT_DATA")("cossILLUSTRATIONS_CONCEPT"), "Illustration", True) = 0 Then
%>			    <asp:label id="Label8" runat="server" Width="100%" Height="5px"></asp:label> 
                <asp:Button CssClass="csd_button" ID="btnEmailIllust" runat="server" Width="85%" Enabled="true"  Visible="False" /><br />
<%			End If 
            If Session("CURRENT_TAB_NAME") = "ILLUSTRATIONS" AndAlso _
	           Cache(Session("MY_COMPANY_DEFAULTS_KEY")).ShowExportToExcel = True AndAlso _
			   String.Compare(Session("CLIENT_DATA")("cossILLUSTRATIONS_CONCEPT"), "Rate Book Compare", True) <> 0 Then
%>  			<asp:label id="Label6" runat="server" Width="100%" Height="5px"></asp:label> 
                <asp:Button CssClass="csd_button" ID="btnExportToExcel" runat="server" Width="85%"  /><br /><br />
<%			Else 
%>              <br />  
<%          End If 
%>			 
            <asp:label id="lblResources" runat="server" CssClass="csd_label_bold"><%=GetGlobalResourceString( "Resources")%></asp:label><br />
            <telerik:RadTreeView ID="TreeResourceNavigator" ShowLineImages="true" Runat="server"></telerik:RadTreeView>            
<%          If String.IsNullOrEmpty(Session("ADVERTISEMENT_IMAGE_URL")) = False Then
                Dim strStyle As String = String.Empty
                If String.Compare(Session("CURRENT_TAB_NAME"), "NEEDS_ANALYSIS", True) = 0 Then
                    strStyle = "position:absolute;top:350px;"
                ElseIf String.Compare(Session("CURRENT_TAB_NAME"), "ADVANCED_MARKETING", True) = 0 Then
                    strStyle = "position:absolute;top:400px;"
                ElseIf String.Compare(Session("CURRENT_TAB_NAME"), "FORMS", True) = 0 Then
                    strStyle = "position:absolute;top:150px;"
                End If
                If String.IsNullOrEmpty(Session("ADVERTISEMENT_IMAGE_TARGET_URL")) = False Then
                    strStyle &= "cursor:pointer;"
                    Dim strParms As String
                    Dim strGuid As String = System.Guid.NewGuid.ToString.Replace("-",String.Empty)                    
                    If Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowCentered = True
                        strParms = "top='+(screen.height-" & Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowHeight & ")/2+'" & _
                                   ",left='+(screen.width-" & Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowWidth & ")/2+'" & _
                                   ",height=" & Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowHeight & _
                                   ",width=" & Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowWidth & _
                                   ",toolbar=" & Convert.ToInt32(Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowToolbar).ToString & _
                                   ",status=" & Convert.ToInt32(Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowStatusbar).ToString & _
                                   ",menubar=" & Convert.ToInt32(Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowMenubar).ToString & _
                                   ",resizable=" & Convert.ToInt32(Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowResizable).ToString
                    Else
                        strParms = "top=" & Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowTop & _
                                   ",left=" & Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowLeft & _
                                   ",height=" & Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowHeight & _
                                   ",width=" & Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowWidth & _
                                   ",toolbar=" & Convert.ToInt32(Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowToolbar).ToString & _
                                   ",status=" & Convert.ToInt32(Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowStatusbar).ToString & _
                                   ",menubar=" & Convert.ToInt32(Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowMenubar).ToString & _
                                   ",resizable=" & Convert.ToInt32(Cache(Session("MY_COMPANY_DEFAULTS_KEY")).AdvertisementWindowResizable).ToString
                    End If               
%>                  <img src="<%=Session("ADVERTISEMENT_IMAGE_URL")%>" style="<%=strStyle%>" onclick="window.open('<%=Session("ADVERTISEMENT_IMAGE_TARGET_URL")%>','<%=strGuid%>','<%=strParms%>');" />
<%              Else
                    If Session("ADVERTISEMENT_IMAGE_URL").ToLower.EndsWith(".swf") = True Then
                        'this is a flash file
%>                      <object style="<%=strStyle%>" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="118" height="600" codebase="http://active.macromedia.com/flash5/cabs/swflash.cab#version=5,0,0,0">
	                        <param name="MOVIE" value="<%=Session("ADVERTISEMENT_IMAGE_URL")%>">
	                        <param name="PLAY" value="true">
	                        <param name="LOOP" value="true">
	                        <param name="QUALITY" value="high">
	                        <param name="SCALE" value="noborder">
	                        <embed src="<%=Session("ADVERTISEMENT_IMAGE_URL")%>"
		                        width="118" height="600" play="true" loop="true" quality="high" scale="noborder" pluginspace="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"> 
	                        </embed>
                        </object>
<%                  Else
                        If strStyle.Length > 0 Then
%>                          <img src="<%=Session("ADVERTISEMENT_IMAGE_URL")%>" style="<%=strStyle%>" />
<%                      Else
%>                          <img src="<%=Session("ADVERTISEMENT_IMAGE_URL")%>" />
<%                      End If
                    End If
                End If
            End If
%>
            <iframe id="PerformancePost" src="" scrolling="no" frameborder="0" height="0px" width="0px"></iframe>

    	</div>	
		<!-- #include virtual="StaticHiddenFields.inc" -->			
		<input type="hidden" name="hidGoToTabNumber" id="hidGoToTabNumber" value="" />
		<input type="hidden" name="hidChangingTabs" id="hidChangingTabs" value="" />
		<input type="hidden" name="CHANGING_TABS" value="">
		<input type="hidden" name="IPIPELINE_VIEW_FORM" value="">
		<input type="hidden" name="IPIPELINE_VIEW_ILLUSTRATION" value="">
		<input type="hidden" id="hidAlertTableHTML" name="hidAlertTableHTML" runat="server" />
		<input type="hidden" name="fldaClient.WritingAgentID" value="<%=Session("CLIENT_DATA")("WritingAgentID")%>">
        <input type="hidden" name="fldaClient.WritingAgentName" value="<%=Session("CLIENT_DATA")("WritingAgentName")%>">
        <asp:HiddenField ID="hidWritingAgentID" runat="server"  />  
        <asp:HiddenField ID="hidWritingAgentName" runat="server" />  
        <asp:Literal ID="LabelJavaScriptLiteral" runat="server" />
       </form>
<iframe id="DivShim" src="javascript:false;" scrolling="no" frameborder="0"></iframe>
	<div id="DivWait" name="DivWait" class="csd_textbox">
		<table width="300px" height="80px" cellpadding="2" cellspacing="0">
			<tr><td>&nbsp;</td></tr>
			<tr><td align="center"><span class="csd_label_bold"><%=GetGlobalResourceString( "GeneratingTheOutputPleaseWait")%></span></td></tr>
			<tr><td align="center"><img src="../images/ajax-cnn-transparent.gif"></td></tr>
			<tr><td>&nbsp;</td></tr>
		</table>
	</div>
	<div id="DivWaitSync" name="DivWaitSync" class="csd_textbox">
		<table width="300px" height="60px" cellpadding="2" cellspacing="0">
	    	<tr><td>&nbsp;</td></tr>
	    	<tr><td align="center"><span class="csd_label_bold"><%=GetGlobalResourceString( "SynchronizingTheDataPleaseWait")%></span></td></tr>
			<tr><td align="center"><img src="../images/ajax-cnn-transparent.gif"></td></tr>
			<tr><td>&nbsp;</td></tr>
		</table>
	</div>		 
	<div></div>
</body>
<!--PLACEHOLDER_SCREEN_JAVASCRIPT-->
<!--PLACEHOLDER_LOAD_TELERIK_DDL_CONTROLS_JAVASCRIPT-->
<!--PLACEHOLDER_TELERIK_EVENT_CALLERS-->
<!--PLACEHOLDER_TELERIK_JAVASCRIPT_STATEMENTS-->
<!--PLACEHOLDER_LOAD_CONTROLS_JAVASCRIPT-->
</HTML> 


<script type="text/javascript">    

    $(window).bind("load", function() {
        cdcd('DivMiddle').style.display = 'inline';

        /*if (typeof setSessionStorageForDynamicLabels == 'function') { 
         setSessionStorageForDynamicLabels(); 
        }

        if (typeof setDynamicLabels == 'function') { 
         setDynamicLabels(); 
        }*/
    });


   // if (typeof setSessionStorageForDynamicLabels == 'function') { setSessionStorageForDynamicLabels(); } if (typeof setDynamicLabels == 'function') { setDynamicLabels(); }

    $(document).ready(function () {
        uncToURL('csd_image'); uncToURL('iframe'); FinishDrawingTheScreen(); 
        var ajaxTimer = new AjaxTimeoutTimer((<%=Session.Timeout%> - 1) * 60 * 1000); //Specify a time length
           
   <% If CallConvertValueToBoolean(m_objCossClientData("ShowiGoTab")) = True Then                                            
          If CallConvertValueToBoolean(m_objCossClientData("ProductIllustrationRequired")) = True Then                       
             If CallConvertValueToBoolean(m_objCossClientData("ClientDataHasIllustrationCalcResults")) = True Then           
    %>         try {parent.window.EnableFormsTab();} catch(e){}  
    <%       Else %>                                                                                                         
               try {parent.window.DisableFormsTab();} catch(e){}
    <%       End If %>
    <%    Else %>                                                                                                                      
            try {parent.window.EnableFormsTab();} catch(e){}
   <%    End If
     End If %>
});



</script>




<% 	If String.IsNullOrEmpty(Session("MESSAGE_TO_DISPLAY")) = False Then
		Response.Write("<script type='text/javascript'>" & Session("MESSAGE_TO_DISPLAY") & "</script>")
		Session("MESSAGE_TO_DISPLAY") = String.Empty
	End If

	Response.Write(Session("cossServerProcedureOnScreenLoad"))
	
	If String.IsNullOrEmpty(Session("MESSAGE_TO_BROADCAST")) = False Then
		Response.Write("<script type=""text/javascript"">alert(""" & Session("MESSAGE_TO_BROADCAST") & """);</script>")
		Session("MESSAGE_TO_BROADCAST") = String.Empty
	End If
%>

<% If String.Compare(m_objCossClientData("AppLocked"), "X", True) = 0 Then %>

    <%  If CallConvertValueToBoolean(m_objCossClientData("ShowNeedsTab")) = True Then    %>
        <%      If Cache(Session("MY_COMPANY_DEFAULTS_KEY")).DisableNeedsTabWhenAppLocked = True Then    %>
                    <script type="text/javascript">
                        try { parent.cdcd('tab<%=Session("NEEDS_TAB")%>').onclick = function () { alert('<%=Cache(Session("MY_COMPANY_DEFAULTS_KEY")).DisableNeedsTabWhenAppLockedClickMessage %>'); return; }; } catch (e) { } 
                    </script>
        <%      End If %>
    <%  End If %>

    <%  If CallConvertValueToBoolean(m_objCossClientData("ShowIllustrationsTab")) = True Then    %>
        <%      If Cache(Session("MY_COMPANY_DEFAULTS_KEY")).DisableIllustrationsTabWhenAppLocked = True Then    %>
                    <script type="text/javascript">
                        try { parent.cdcd('tab<%=Session("ILLUSTRATIONS_TAB")%>').onclick = function () { alert('<%=Cache(Session("MY_COMPANY_DEFAULTS_KEY")).DisableIllustrationsTabWhenAppLockedClickMessage %>'); return; }; } catch (e) { } 
                    </script>
        <%      End If %>
    <%  End If %>

    <%  If CallConvertValueToBoolean(m_objCossClientData("ShowAdvancedSalesTab")) = True Then    %>
        <%      If Cache(Session("MY_COMPANY_DEFAULTS_KEY")).DisableAdvancedSalesTabWhenAppLocked = True Then    %>
                    <script type="text/javascript">
                        try { parent.cdcd('tab<%=Session("ADVANCED_SALES_TAB")%>').onclick = function () { alert('<%=Cache(Session("MY_COMPANY_DEFAULTS_KEY")).DisableAdvancedSalesTabWhenAppLockedClickMessage %>'); return; }; } catch (e) { } 
                    </script>
        <%      End If %>
    <%  End If %>


<% End If %>