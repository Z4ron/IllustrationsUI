var b=!0,c=!1;
window.confirmExit=function(a){document.all&&(a=event);a||(a=window.event);if(a&&!opener&&(a.altKey==b&&0==a.keyCode||a.target==document||0>a.clientX||0>a.clientY))if(a=cdcd("__EVENTTARGET"),null!=a){if(-1==a.value.indexOf("UltraWebTab1")&&(a=!1,null!=document.getElementById("cossCheckForOnBeforeUnloadEvent")&&"True"==document.getElementById("cossCheckForOnBeforeUnloadEvent").value&&(a=b),a==b))return c=b,""}else if(a=!1,null!=document.getElementById("cossCheckForOnBeforeUnloadEvent")&&"True"==document.getElementById("cossCheckForOnBeforeUnloadEvent").value&&
(a=b),a==b)return c=b,""};window.handleTheUnload=function(){!opener&&c==b&&(c=!1,window.open("/CossEnterpriseSuite/WebForms/checker.htm","","top=0,left=0,height=50,width=300"))};