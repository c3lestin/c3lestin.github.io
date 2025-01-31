---
layout: post
title: "News: Cisco Network recent cyber attack"
subtitle: article by Marckenley Celestin
cover-img: "https://github.com/c3lestin/c3lestin.github.io/raw/master/_img/cisco-hack.png"
date: 2022-08-29
tags: [cybersecurity,news,cyberattack,Everything]
share-img: "https://github.com/c3lestin/c3lestin.github.io/raw/master/_img/cisco-hack.png"
---

This blog post is to share with you some preventive measures that you can apply right now to prepare and build your security defense in the event of a similar attack at your Organization, these suggestions will be related to the [recent attack on CISCO](https://blog.talosintelligence.com/2022/08/recent-cyber-attack.html){:target="_blank"}.
<!--more-->

CISCO knew about the incident since **May 24th** and disclosed it on **August 10th** after the attackers have [leaked confidential data](https://tools.cisco.com/security/center/resources/corp_network_security_incident){:target="_blank"} in the dark web. 

# Index

* TOC
{:toc}

# What did happen?

{:.box-warning}
**On May 24th**, an internal CISCO employee’s personal google cloud account were compromised which contained all the credentials synced by the victim’s browser. The attackers via [vishing](https://en.wikipedia.org/wiki/Voice_phishing){:target="_blank"} (Voice Phishing attack) succeeded in tricking the employee to accept Multi Factor Authentication (MFA) via repeated push notification ***(MFA Fatigue)*** which in return grant them access to CISCO virtual private network (VPN) in the context of the targeted user, from there the attackers were able to pivot to other systems (such as the domain controllers) within the environment and established some persistence mechanism to maintain access.

# **Defense I** – Cyber Security Awareness

- Awareness, awareness. Make sure that **Cyber Security Awareness** is provided  to each and every single employee within your Organization this is a **MUST**, your employees **SHOULD** be cyber security aware, they need to consider cybersecurity an essential part of their role, because human error is a frightful exploit that can lead to big fines and extreme business damage. 

- Now you might be wondering, okay! But how to do that ? Well, you know, I do not mean that everyone of your organization should be an expert in cybersecurity, but instead they should be trained and empowered with relevant information to their role, this will help them stay safe when working at the office and from home.  **Role-based training** is a must for any technical and non-technical users within your organization. 



# **Defense II** – Use of a better/modern Defense-in-Depth strategy 

- Using [multiple security layers](https://www.cisa.gov/uscert/bsi/articles/knowledge/principles/defense-in-depth){:target="_blank"} will help reducing vulnerabilities, contains the evolving threats, and most importantly will prepare your Organization for better risk management. 

- Do not rely on the traditional perimeter-based IT security models, they are not suitable anymore for today business instead adopt a “**Zero Trust**” security model. 

# **Defense III** – Build an Incident Response Team 

When you have threat actors inside your network **you want to identify them as fast as possible**, every second that they spend inside your network the outcome can be very but very destructive.  Now, your organization might not have a Security Incident Response Team (SIRT) or even a plan to build one, well [ENISA](https://www.enisa.europa.eu/){:target="_blank"} provided an [interactive map](https://www.enisa.europa.eu/topics/csirts-in-europe/csirt-inventory/certs-by-country-interactive-map#country=Belgium){:target="_blank"} of currently known CSIRTs by country.  

[![eucsirt](https://github.com/c3lestin/c3lestin.github.io/raw/master/_img/eu-sirt.png)](https://www.enisa.europa.eu/topics/csirts-in-europe/csirt-inventory/certs-by-country-interactive-map#country=Belgium){:target="_blank"}

&nbsp;
&nbsp;
&nbsp;

Or may be your organization already have a Security Incident Response Team (SIRT), ask yourself how mature are they?  I invite you to use the [SIM3v1 self-assessment tool](https://www.enisa.europa.eu/topics/csirts-in-europe/csirt-capabilities/csirt-maturity/csirt-survey){:target="_blank"} from [ENISA](https://www.enisa.europa.eu/){:target="_blank"} to assess the maturity of your current incident response team. 

[![sim3](https://github.com/c3lestin/c3lestin.github.io/raw/master/_img/simv3.png)](https://www.enisa.europa.eu/topics/csirts-in-europe/csirt-capabilities/csirt-maturity/csirt-survey){:target="_blank"}

&nbsp;

Now that I suggested some high-level defense mechanism, let us take a look further on some of the TTPs (Tactics, Techniques and Procedures) used by the attackers to pivot further post compromise, [the CISCO SIRT team already did a good job mapping the TTPs used by the attackers to the MITRE ATT&CK Framework](https://blog.talosintelligence.com/2022/08/recent-cyber-attack.html){:target="_blank"}, I will briefly touch some of them, no need to re-write them in this article. 

{:.box-warning}
The CISCO Security Incident Response Team (SIRT) stated that “ post the compromise they ***periodically observed*** the threat actors issuing commands containing typographical errors, indicating manual operator interaction was occurring within the environment.” 

This clearly suggests to me that the team had them on the radar for days or even weeks, learning about the attackers intentions and what's their next move going to be.

# **Defense IV** – Learn and grasp the attacker real intentions 
Now this is more a technique to better respond than a defensive method, if you have identified attackers inside your organization network,  you can turn the situation in your favor by using the compromised asset(s) as a honeypot while in parallel containing (this should be dynamic in nature not linear), this will help identify IOCs (Indicators of Compromises) which your Security Incident Response Team (SIRT) can use to scan the enterprise for other compromised systems.  Failure to **properly contain** the incident can and will lead to **improper eradication**.

To summarize make sure you do : 
- Proper Scoping
- Full containment
- Complete eradication of the threat actor’s wrongdoing 
- Recover your systems

The rest of this post will briefly analyze the use of an attack method called **Living Off The Land** (LOtL)  leveraging  an operating system built-in tools for enumeration and persistence. I mean why drop other tools to a victim's system while you can already use the in-house tools. 

# **Defense V** – Monitor your employees’ IT system use behavior

{:.box-warning}
In the statement of the CISCO SIRT team provided they stated that “…After the attackers established access to the VPN, they ***then began to use the compromised user account to logon to a large number of systems*** before beginning to pivot further into the environment... The Attackers worked to exfiltrate the dumped NTDS over SMB (TCP/445) from the domain controller to the VPN system under their control.” 

In this example below, the attacker is trying to dump `ntds.dit` file which **stores password hashes** for all users in the domain by using the [ntdsutil.exe](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/cc753343(v=ws.11)){:target="_blank"} and other windows built-in tools.  Also two other commands trying to create a minidump `LSASS.EXE`, the objective is the same to extract usernames and passwords using tools such as Mimikatz. 


```posh
powershell ntdsutil.exe 'ac i ntds' 'ifm' 'create full c:\users\public' q q
```
&nbsp;

```posh
tasklist | findstr lsass
```
&nbsp;

```posh
rundll32.exe C:\windows\System32\comsvcs.dll, MiniDump [LSASS_PID] C:\windows\temp\lsass.dmp full
```

<br>

## How can you defend against this?
- Monitoring the behavior of your employees the way they are using IT systems they have access to is crucial, by knowing what their normal behavior looks like you can quickly identify any suspicious behavior (anormal behavior).  

- EDR tools should be finetuned to be sensible in detecting any attempt to copy or temper system files such as `ntds.dit`, etc.. and block any direct access to those files. 

- Limit who has access to your company domain controllers, I mean someone from HR, Marketing, etc… should not be able to RDP to your domain controllers, it makes sense right? You need to restrict administrative access as much as possible. 

- Make sure your Organization can detect at least well-know TTPs being used by advanced APT groups such as: 
  - [ATT&CK Technique : OS Credential Dumping: LSASS Memory (T1003.001)](https://attack.mitre.org/techniques/T1003/001/){:target="_blank"}
  - [ATT&CK Technique : OS Credential Dumping: Security Account Manager (T1003.002)](https://attack.mitre.org/techniques/T1003/002/){:target="_blank"}
  - [ATT&CK Technique : OS Credential Dumping: NTDS (T1003.003)](https://attack.mitre.org/techniques/T1003/003/){:target="_blank"}
  - [ATT&CK Technique : Process Injection (T1055)](https://attack.mitre.org/techniques/T1055/){:target="_blank"}
  - [ATT&CK Technique : Remote Access Software (T1219)](https://attack.mitre.org/techniques/T1219/){:target="_blank"}




# **Defense VI** – Know your system 
Make sure you can identify when your IT systems are in a **compliant state** and when they are not, this is helpful in spotting intruders, beacons and detecting communication to C2 channels. 


# Recommendations from CISCO
- Implementation of strong device verification mechanism by enforcing stricter controls around device status to limit or block enrollment and access from unmanaged or unknown devices. 
- Prior to allowing VPN connections from remote endpoints, ensure that posture checking is configured to enforce a baseline set of security controls
- Segment your Orgranization for better security and also to respond better in the event of a security incident
- Centralized log collection
- Backup, backup and backup your data and ensure that backups are offline and periodically tested


<br>

# Conclusion
This is a brief insight related to the recent cyber-attack on cisco, they are much more to learn from this attack tough, [the talos team mapped the attackers TTPs to the MITRE ATT&CK](https://blog.talosintelligence.com/2022/08/recent-cyber-attack.html){:target="_blank"} i suggest to go over them, assess if your company already have mitigation in place against at least the well-known TTPs.

Security is the responsibility of everyone within your organization, the attacks are becoming more and more sophisticated, assess your company critical assets, align your organization’s security function to the company’s business strategy goals  and objectives, if  your organization still perceive cyber security as a business blocker rather than a business enabler that means your security program is failing to align with the business strategy, then it should be re-think, rebuilt incorporating security into the fabric of your organization. 

**Your organization should achieve its mission thanks in part to security, not despite security.** 

# Article links
- [csirtsnetwork.eu](https://csirtsnetwork.eu/){:target="_blank"}
- [MITRE ATT&CK Framework](https://attack.mitre.org/){:target="_blank"}
- [Cisco Talos](https://blog.talosintelligence.com/2022/08/recent-cyber-attack.html){:target="_blank"}
- [Cisco Blog](https://tools.cisco.com/security/center/resources/corp_network_security_incident){:target="_blank"}
- [Cybersecuirty and Infrastructure Security Agency (CISA)](https://www.cisa.gov/cybersecurity){:target="_blank"}
- [Microsoft Management and Tools](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/cc753343(v=ws.11)){:target="_blank"}
- [Wikipedia Vishing Definition](https://en.wikipedia.org/wiki/Voice_phishing){:target="_blank"}

# Daily IOC Intel
- [Cybershelter IOC Hunter](https://blog.cybershelter.be/iochunter/){:target="_blank"}

