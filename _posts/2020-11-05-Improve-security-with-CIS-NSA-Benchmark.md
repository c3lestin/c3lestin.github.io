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
<script>var electricZoneWidget=function(){async function e(e,t){let r,o=await fetch(`${t}/embed${encodeURIComponent(new URL(e).pathname).replace(/:|%3A/g,"_").replace(/%2F/g,"/")}.json`);if(o.ok)return await o.json();throw Error("Failed to fetch post data")}function t(){let e=new URL(window.location.search,window.location.origin).searchParams.get("posturl");if(console.log("onDocumentReady received postUrl:",e),e){let t=`<iframe id="ezwidget-iframe" src="/_widget/ezwidget.html?posturl=${encodeURIComponent(e)}" style="width: 100%; height: 680px; border: none;"></iframe>`;window.parent.postMessage({action:"setEmbedCode",embedCode:t},"*"),r(e)}else console.warn("Warning: post URL not received")}async function r(t,r){console.log("load postUrl:",t,"host:",r);try{r||"undefined"==typeof siteUrl?r||(r=window.location.origin):r=siteUrl,console.log("load after host check postUrl:",t,"host:",r);let o=await e(new URL(t,r).href,r);!function e(t,r,o,n){let i=e=>{let t=document.createElement("div");return t.innerHTML=e,t.textContent||t.innerText},l=t.excerpt.substring(0,250)+"...",a=document.getElementById("widget-template").textContent.trim();a=a.replace(/{{postUrl}}/g,o);let d=document.createElement("div");d.innerHTML=a,d.querySelector("img.post-image").src=t.image,d.querySelector("h2.post-title").innerText=i(t.title),console.log("truncatedExcerpt:",l),d.querySelector(".post-excerpt").innerHTML=i(l)+`<a href="${o}" target="_blank">Read more...</a>`,d.querySelector(".dashicon-button").setAttribute("data-post-identifier",null);let c=n||"${host}",s,g=`<iframe id="ezwidget-iframe" src="${c}/_widget/ezwidget.html?posturl=${encodeURIComponent(o)}&host=${encodeURIComponent(c)}" style="width: 100%; height: 680px; border: none;"></iframe>`;d.querySelector("#embed-code").value=g,console.log("post:",t);let p=document.getElementById("electriczone-widget");for(p.innerHTML="";d.firstChild;)p.appendChild(d.firstChild);document.querySelector(".close-dialog-button").addEventListener("click",function(){document.querySelector(".ez-embed-share-dialog-close").style.display="none"}),document.getElementById("share-button").addEventListener("click",async function(){let e=!!document.getElementById("ezwidget-iframe"),t;t=window.parent!==window?window.parent.document.querySelector(".ez-embed-share-dialog-close"):document.querySelector(".ez-embed-share-dialog-close"),e||(t.style.display="block"===t.style.display?"none":"block");let r=document.getElementById("embed-code");r.value=g,r.select();try{await navigator.clipboard.writeText(g)}catch(o){console.error("Failed to copy text: ",o)}}),console.log("post:",t)}(o,null,t,r)}catch(n){console.error("Error fetching post data on electriczone.eu:",n)}}return"loading"===document.readyState?window.addEventListener("DOMContentLoaded",t):t(),{load:r}}();</script>
