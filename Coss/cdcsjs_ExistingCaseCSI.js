function SetWritingAgent(b,c){try{$get("lblWritingAgentName").innerHTML=c}catch(d){}var a=$get("CossScreenFrame").contentWindow;if(a){try{a.SetTheDirtyFlag()}catch(e){}try{a.document.getElementById("lblWritingAgentName").innerHTML=c}catch(f){}try{a.document.getElementById("hidWritingAgentID").value=b}catch(g){}try{a.document.getElementById("hidWritingAgentName").value=c}catch(h){}try{a.document.getElementById("fldaClient.WritingAgentID").value=b}catch(i){}try{a.document.getElementById("fldaClient.WritingAgentName").value=
c}catch(j){}try{a.document.getElementById("cossDirty").value="YES"}catch(k){}}}function SetUserName(b){try{$get("lblUserFullName").innerHTML=b}catch(c){}var d=$get("CossScreenFrame").contentWindow;if(d){var a=d.document.getElementById("hidWritingAgentID");if(a&&(""==a.value||"SELF"==a.value.toUpperCase()))a.value="SELF",SetWritingAgent(a.value,b);if((a=d.document.getElementById("fldaClient.WritingAgentID"))&&(""==a.value||"SELF"==a.value.toUpperCase()))a.value="SELF",SetWritingAgent(a.value,b)}};