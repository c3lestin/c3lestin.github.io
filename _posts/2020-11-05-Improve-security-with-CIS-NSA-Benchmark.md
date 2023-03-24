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
      
var electricZoneWidget = (function () {

  async function fetchData(postUrl, host) {
    const urlPath = new URL(postUrl).pathname;
    const encodedPostUrl = encodeURIComponent(urlPath).replace(/:|%3A/g, '_').replace(/%2F/g, '/');
    const urlToFetch = `${host}/embed${encodedPostUrl}.json`;
  
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch post data');
    }
  }
  
  
  

  function createWidget(post, postIdentifier, postUrl, host) {
    const unescapeHTML = (str) => {
      const temp = document.createElement('div');
      temp.innerHTML = str;
      return temp.textContent || temp.innerText;
    };


    const truncatedExcerpt = post.excerpt.substring(0, 250) + '...';

    const templateScript = document.getElementById('widget-template')
    let template = templateScript.textContent.trim();
    template = template.replace(/{{postUrl}}/g, postUrl);
  
    const templateElement = document.createElement('div');
    templateElement.innerHTML = template;

    

  
   
    templateElement.querySelector('img.post-image').src = post.image;
    templateElement.querySelector('h2.post-title').innerText = unescapeHTML(post.title);
    console.log('truncatedExcerpt:', truncatedExcerpt);
    templateElement.querySelector('.post-excerpt').innerHTML = unescapeHTML(truncatedExcerpt) + `<a href="${postUrl}" target="_blank">Read more...</a>`;
    templateElement.querySelector('.dashicon-button').setAttribute('data-post-identifier', postIdentifier);


    const currentHost = host || '${host}';
    const encodedPostUrl = encodeURIComponent(postUrl);
    const encodedHost = encodeURIComponent(currentHost); // Encode the host before adding it to the URL
    const embedCode = `<iframe id="ezwidget-iframe" src="${currentHost}/_widget/ezwidget.html?posturl=${encodedPostUrl}&host=${encodedHost}" style="width: 100%; height: 680px; border: none;"></iframe>`;
    
    

    templateElement.querySelector('#embed-code').value = embedCode;
    
  
    console.log('post:', post);
  
    const widgetContainer = document.getElementById('electriczone-widget');
    widgetContainer.innerHTML = '';
    while (templateElement.firstChild) {
      widgetContainer.appendChild(templateElement.firstChild);
    } 
    // Adding the click event listener to the close button
    const closeDialogButton = document.querySelector('.close-dialog-button');
    closeDialogButton.addEventListener('click', function () {
      document.querySelector('.ez-embed-share-dialog-close').style.display = 'none';
    });
  
    document.getElementById('share-button').addEventListener('click', async function () {
      const hasIframe = !!document.getElementById('ezwidget-iframe');
      let popover;
    
      if (window.parent !== window) { // If we're inside an iframe
        popover = window.parent.document.querySelector('.ez-embed-share-dialog-close');
      } else {
        popover = document.querySelector('.ez-embed-share-dialog-close');
      }
    
      if (!hasIframe) {
        popover.style.display = popover.style.display === 'block' ? 'none' : 'block';
      }
    
      const embedCodeTextarea = document.getElementById('embed-code');
      embedCodeTextarea.value = embedCode;
      embedCodeTextarea.select();
    
      try {
        await navigator.clipboard.writeText(embedCode);
        //fancy stuff here if wanted.
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    });
    
    
    console.log('post:', post);

  }


  function onDocumentReady() {
    const postUrl = new URL(window.location.search, window.location.origin).searchParams.get('posturl');
    console.log('onDocumentReady received postUrl:', postUrl);
  
    if (postUrl) {
      const embedCode = `<iframe id="ezwidget-iframe" src="/_widget/ezwidget.html?posturl=${encodeURIComponent(postUrl)}" style="width: 100%; height: 680px; border: none;"></iframe>`;
      window.parent.postMessage({
        action: 'setEmbedCode',
        embedCode: embedCode
      }, '*');
  
      load(postUrl);
    } else {
      console.warn('Warning: post URL not received');
    }    
  }
  



  async function load(postUrl, host) {
    console.log('load postUrl:', postUrl, 'host:', host);
    try {
      if (!host && typeof siteUrl !== 'undefined') {
        host = siteUrl;
      } else if (!host) {
        host = window.location.origin;
      }
      console.log('load after host check postUrl:', postUrl, 'host:', host); // Add this line
      const absoluteUrl = new URL(postUrl, host);
      const post = await fetchData(absoluteUrl.href, host);
      createWidget(post, null, postUrl, host);
    } catch (error) {
      console.error('Error fetching post data on electriczone.eu:', error);
    }
  }
  
  
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', onDocumentReady);
  } else {
    onDocumentReady();
  }
  
  
  return {
    load: load
  };

})();


</script>

<!-- <script>
    document.addEventListener('DOMContentLoaded', function() {
      const urlParams = new URLSearchParams(window.location.search);
      const postUrl = decodeURIComponent(urlParams.get('posturl'));
      const host = decodeURIComponent(urlParams.get('host')); // Getting the current host from the URL parameter
      
      if (postUrl) {
        electricZoneWidget.load(postUrl, host);
      } else {
        console.error('Error loading widget: post URL not received');
      }
    });
  </script>

  <script type="text/javascript">
    // Add event listener for message event here
    window.addEventListener('message', function (event) {
      if (event.data.action === 'setEmbedCode') {
        const embedCodeElement = document.getElementById("embed-code");
        if (embedCodeElement) {
          embedCodeElement.value = event.data.embedCode;
        } else {
          console.error('Element with ID "embed-code" not found.');
        }
      }
    });
  
    (function() {
      const postUrl = '{{ page.embed }}' || '{{ site.baseurl }}{{ page.url }}';
      const host = '{{ site.url }}';
      document.addEventListener('DOMContentLoaded', function () {
        console.log('Script postUrl:', postUrl, 'host:', host);
        electricZoneWidget.load(postUrl, host);
      });
    })();
  </script>
