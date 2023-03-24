---
layout: post
title: "IT Security: System Hardening with CIS & NSA (Part I)"
date: 2020-11-05
tags: [Cybersecurity,CIS,NSA,Everything]
share-img: "https://www.cisecurity.org/wp-content/themes/cis/assets/images/CIS_Benchmarks.png"
---

Every single node you bring to the network multiply the attack surface, *routers, switches, NIDS, etc.…* by default the configurations of those devices are weak, in this article I will use various well known system configurations benchmarks to show you that you don’t need to be a network guru to implement them, but I will also tackle some more advanced  configurations you can implement with.<!--more-->

Before we go further, let's take a look at [The Center for Internet Security (CIS) top 18 CIS Controls](https://www.cisecurity.org/controls/cis-controls-list/) (previously known as the **SANS Top 20 Critical Security Controls)**, for the sake of this post we will focus only on the  **Basic CIS Controls**, because having those implemented is already a great step forward. 


#### CIS Basic Controls

- Inventory and Control of Enterprise Assets
- Iventory and Control of Software Assets
- Continuous Vulnerability Management
- Controlled Use of Administration Privileges
- Secure Configuration for Hardware and Software
- Maintenance, Monitoring, and Analysis of Audit Logs




[...] Writing, please come back later for full article.


<iframe id="ezwidget-iframe" src="https://www.electriczone.eu/_widget/ezwidget.html?posturl=%2Feucitizens&host=https%3A%2F%2Fwww.electriczone.eu" style="width: 100%; height: 680px; border: none;"></iframe>
<script>
      
var electricZoneWidget=function(){async function e(e,t){let o=new URL(e).pathname,r=encodeURIComponent(o).replace(/:|%3A/g,"_").replace(/%2F/g,"/"),n=`${t}/embed${r}.json`,i=await fetch(n);if(i.ok){let l=await i.json();return l}throw Error("Failed to fetch post data")}function t(){let e=new URL(window.location.search,window.location.origin).searchParams.get("posturl");if(console.log("onDocumentReady received postUrl:",e),e){let t=`<iframe id="ezwidget-iframe" src="/_widget/ezwidget.html?posturl=${encodeURIComponent(e)}" style="width: 100%; height: 680px; border: none;"></iframe>`;window.parent.postMessage({action:"setEmbedCode",embedCode:t},"*"),o(e)}else console.warn("Warning: post URL not received")}async function o(t,o){console.log("load postUrl:",t,"host:",o);try{o||"undefined"==typeof siteUrl?o||(o=window.location.origin):o=siteUrl,console.log("load after host check postUrl:",t,"host:",o);let r=new URL(t,o),n=await e(r.href,o);!function e(t,o,r,n){let i=e=>{let t=document.createElement("div");return t.innerHTML=e,t.textContent||t.innerText},l=t.excerpt.substring(0,250)+"...",a=document.getElementById("widget-template"),d=a.textContent.trim();d=d.replace(/{{postUrl}}/g,r);let c=document.createElement("div");c.innerHTML=d,c.querySelector("img.post-image").src=t.image,c.querySelector("h2.post-title").innerText=i(t.title),console.log("truncatedExcerpt:",l),c.querySelector(".post-excerpt").innerHTML=i(l)+`<a href="${r}" target="_blank">Read more...</a>`,c.querySelector(".dashicon-button").setAttribute("data-post-identifier",null);let s=n||"${host}",g=encodeURIComponent(r),u=encodeURIComponent(s),p=`<iframe id="ezwidget-iframe" src="${s}/_widget/ezwidget.html?posturl=${g}&host=${u}" style="width: 100%; height: 680px; border: none;"></iframe>`;c.querySelector("#embed-code").value=p,console.log("post:",t);let m=document.getElementById("electriczone-widget");for(m.innerHTML="";c.firstChild;)m.appendChild(c.firstChild);let h=document.querySelector(".close-dialog-button");h.addEventListener("click",function(){document.querySelector(".ez-embed-share-dialog-close").style.display="none"}),document.getElementById("share-button").addEventListener("click",async function(){let e=!!document.getElementById("ezwidget-iframe"),t;t=window.parent!==window?window.parent.document.querySelector(".ez-embed-share-dialog-close"):document.querySelector(".ez-embed-share-dialog-close"),e||(t.style.display="block"===t.style.display?"none":"block");let o=document.getElementById("embed-code");o.value=p,o.select();try{await navigator.clipboard.writeText(p)}catch(r){console.error("Failed to copy text: ",r)}}),console.log("post:",t)}(n,null,t,o)}catch(i){console.error("Error fetching post data on electriczone.eu:",i)}}return"loading"===document.readyState?window.addEventListener("DOMContentLoaded",t):t(),{load:o}}();document.addEventListener("DOMContentLoaded",function(){let e=new URLSearchParams(window.location.search),t=decodeURIComponent(e.get("posturl")),o=decodeURIComponent(e.get("host"));t?electricZoneWidget.load(t,o):console.error("Error loading widget: post URL not received")}),window.addEventListener("message",function(e){if("setEmbedCode"===e.data.action){let t=document.getElementById("embed-code");t?t.value=e.data.embedCode:console.error('Element with ID "embed-code" not found.')}}),function(){let e="{{ page.embed }}",t="{{ site.url }}";document.addEventListener("DOMContentLoaded",function(){console.log("Script postUrl:",e,"host:",t),electricZoneWidget.load(e,t)})}();

</script>
