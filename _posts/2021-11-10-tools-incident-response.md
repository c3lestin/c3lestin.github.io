---
layout: post
title: "Security Incident Response: Useful Tools (Part I)"
date: 2021-11-10
tags: [IT Security,Cybersecurity,Incident Response,Everything]
share-img: "https://github.com/c3lestin/c3lestin.github.io/raw/master/_img/Ux7xZKPDDwGGin4V-image-1650975047445.png"
---

I have gathered some handy tools that would definitely help when responding to Security Incidents, this is part I in a 5 part series.<!--more-->

# Index

* TOC
{:toc}

# Nmap

Nmap is short for Network Mapper. It is a free and open-source tool to scan networks, the tool can be used to discover hosts and services by sending packets and analyzing the responses, nmap also is used for auditing purpose.

This post does not cover the basics, i assume you already have a minimum knowledge using the tool. In case not, google is your friend, some great [Books](https://nmap.org/book/) are also available to learn the basic.


## Nmap with `ndiff`

Using nmap with the [ndiff](https://linux.die.net/man/1/ndiff) utility tool you can compare nmap scan results. 

**Scenario I** - Let's say you only want a certain services running on your machine(s), here in my kali box for instance i don't at any circumstances want to see that the `ntp`, `rpcbind` and the `openvpn` services running.

***Golden Sate***

``` console
sgra@kali:$ service --status-all
[ - ]  apparmor
[ - ]  arpwatch
[ - ]  atftpd
[ - ]  gdomap
[ + ]  haveged
[ - ]  nginx
[ - ]  nmbd
[ - ]  ntp
[ + ]  open-vm-tools
[ - ]  openvpn
[ - ]  postgresql
[ + ]  procps
[ - ]  ptunnel
[ - ]  pulseaudio-enable-autospawn
[ - ]  redsocks
[ - ]  rpcbind
[ - ]  rsync
[ - ]  tftpd-hpa
```
Let's run nmap and output the file into an  `xml` file for our desired state.  

``` console
sgra@kali:$ nmap localhost -oX goldenstate.xml 
```

**localhost :** *nmap to run the scan against my local machine [ 127.0.0.1 ]*\
**-oX :** *this argument instruct nmap to save the data into an `xml` file name `goldenstate.xml`*\
Now we have a baseline, let's change the state of our configuration, we will **start** `openvpn` and the `rpcbind` service.  


``` console
sgra@kali:$ service openvpn start
sgra@kali:$ service rpcbind start
```

***Non-compliant state***

``` console
sgra@kali:$ service --status-all
[ - ]  apparmor
[ - ]  arpwatch
[ - ]  atftpd
[ - ]  gdomap
[ + ]  haveged
[ - ]  nginx
[ - ]  nmbd
[ - ]  ntp
[ + ]  open-vm-tools
[ + ]  openvpn
[ - ]  postgresql
[ + ]  procps
[ - ]  ptunnel
[ - ]  pulseaudio-enable-autospawn
[ - ]  redsocks
[ + ]  rpcbind
[ - ]  rsync
[ - ]  tftpd-hpa
```

Let's run nmap and output the file into an  `xml` file for our non-compliant state.  

``` console
sgra@kali:$ nmap localhost -oX newstate.xml 
```

If we take a look in our working directory we can see that we have the following two `xml` files.

``` console
sgra@kali:$ ls
goldenstate.xml  newstate.xml
```

Finally we can use the `ndiff` utility tool to compare the two state, our `goldenstate.xml` and the `newstate.xml`.

``` console
sgra@kali:$ ndiff goldenstate.xml newstate.xml
-Nmap 7.92 scan initiated Thu Nov 11 00:08:01 2021 as: nmap -oX goldenstate.xml 127.0.0.1
+Nmap 7.92 scan initiated Thu Nov 11 00:08:58 2021 as: nmap -oX newstate.xml 127.0.0.1
```

A `+` sign can be identified in the second line of the output this is handy tough when investigating incident, because here the result is clearly state that a new service that was not previously running is started. 


Now this is purely manual, you can also automate with `ndiff` using cron jobs so in a monthly, weekly or even in a daily basis to scan your network and report on any changes to the network. So much more can be done with the [ndiff utility tool](https://linux.die.net/man/1/ndiff). 

<br />

# Windows
Windows has a plethora of in-house command-line tool that can help when responding to security incidents, let's list a couple of them. 

## wmic and wmi

Nowadays there are a plethora of tools than can automate what we will see in the following paragraph with the  WMIC tool, but sometimes in some specific case you might need to run them manually when responding to security incident, be aware that the tool `WMIC` is deprecated as of Windows 10, version 21H1, superseded by Windows PowerShell for `WMI` which we will show the side by side comparison on how to use them.

<br />

**WMIC** vs **WMI** \
How they list briefly running processes on windows system ?

Using wmic 
``` console
wmic process list brief
```
<br />

``` console
HandleCount  Name                                                           Priority  ProcessId  ThreadCount  WorkingSetSize
0            System Idle Process                                            0         0          4            8192
6024         System                                                         8         4          237          98304
0            Secure System                                                  8         56         0            14311424
0            Registry                                                       8         108        4            46645248
53           smss.exe                                                       11        416        2            212992
...
```
<br />

Using wmi
``` console
Get-Process | Select-Object -Property HandleCount,Name,BasePriority,Id,@{Name='ThreadCount';Expression ={$_.Threads.Count}},WorkingSet | ft
```
<br />

``` console
HandleCount Name                                                          BasePriority    Id ThreadCount WorkingSet
----------- ----                                                          ------------    -- ----------- ----------
        206 AdobeIPCBroker                                                           8  7216           5    1773568
        151 AdobeUpdateService                                                       8  4388           3    1474560
        237 AGMService                                                               8  4428           3    2998272
        701 AGSService                                                               8  4444           3   10321920
        525 ApplicationFrameHost                                                     8 11644           4    3346432
        147 AppVShNotify                                                             8  1668           1     962560
```
as you can see there is no real difference when it comes to their output, we will proceed with a couple of scenarios which we will make use of both tools.

# FTK Imager

FTK® Imager is a data preview and imaging tool that lets you quickly assess electronic evidence. Create forensic images of local hard drives, CDs and DVDs, thumb drives or other USB devices, entire folders, or individual files from various places.

## Run FTK Imager from a flash drive (Imager Lite)

**Prerequisites:**

- A computer other than the target system

**Procedure:**

1. On a machine other than the system to be imaged, install FTK Imager
2. Insert a flash drive formatted with either the FAT32 or NTFS file system
3. Copy the entire "**FTK Imager**" installation folder (typically "`C:\\Program Files\\AccessData\\FTK Imager`" or "`C:\\Program Files (x86)\\AccessData\\FTK Imager`") to your flash drive
4. Insert the flash drive in the system to be imaged
5. Navigate to the folder you created on the flash drive
6. Run **FTK Imager.exe** (as Administrator) and use Imager as you normally would

**Note:** Because a live system is constantly changing, imaging a live system may produce an image that is not replicable. FTK Imager will write to the system RAM and perhaps the hard drive page file during the imaging process. Be aware of the risks of imaging a live system and make the decision carefully.


**Please note:**

64-bit versions of FTK imager (version 3.4.3 and higher) require Microsoft Foundation Class (MFC) add-on files to run. If the target machine does not have any MFC files available, then errors will occur about missing MFC files.  
  
To ensure that newer versions of FTK imager can function without error, when being run from a removable, please also copy the MFC files to the removable.

I.e. Copy all `mfc100\*`, `mfc110\*`, `mfc120\*`, and `mfc140\*` files from a "`c:\\windows\\system32`" folder to the directory on the removable that contains the executable for FTK Imager, or copy to the root of the removable drive.

FTK Imager 4.5.0 needs 3 extra DLLs from `Microsoft Visual C++ 2015 redistributable` to function (which can be found in the "`c:\\windows\\system32`" folder) that you may need to copy to the removable drive as well:

\* mfc140u.dll  
\* msvcp140.dll  
\* vcruntime140.dll

## Example of memory capture

Tips before you begin:

{:.box-warning}
It is advisable not to run **FTK Imager** for memory capture on the system you are capturing it from, create instead a portable version (follow the steps above to do that)  

{:.box-warning}
Do not save the memory capture image on the system your are capturing it from, that's really bad! Instead save the memory capture file in another location.

{:.box-warning}
Make sure you have enough space on the drive your are backing up the memory capture file, don't try to back up a 32GB RAM system on a 2GB USB drive.

{:.box-warning}
Name your files correctly, for instance an image of a x64 Windows 11 Enterprise system having 8GB of RAM could be named `Windows11E-x64-8GBRAM.mem`

{:.box-warning}
Make sure you calculate the HASH of the memory capture file when capture is complete, this is very important, since this file SHOULD NOT change.

Hereunder, as you can see there are two external drives `FTK Portable (E:)` and `MEM-FILE (F:)` connected to the system that the image will be captured from, one contains a portable version of FTK Imager and the other is where the captured memory file will be backed up.

{:.box-warning}
Be careful when working with external drives on potential affected systems, you don't want to ransom yourself.

![image-1650973734124.png](https://github.com/c3lestin/c3lestin.github.io/raw/master/_img/g76Rk0oazLNxaWRs-image-1650973734124.png)

#### FTK Imager memory capture process

When it comes to capture memory on Windows systems, I still prefer using **FTK Imager** over other tools, it is easy to manipulate and straight to the point, hereunder is the process of having a memory dump of a windows 11 system.

**Step I:** Browse `E:\FTK Imager` folder in your USB or other external drive and search for the `FTK Imager.exe` executable and run it as Administrator (Click Yes on UAC)


![image-1650974812662.png](https://github.com/c3lestin/c3lestin.github.io/raw/master/_img/5bVV8Ev8emPOVM6P-image-1650974812662.png)

**Step II:** Click `File` and then `Capture Memory...`

![image-1650975047445.png](https://github.com/c3lestin/c3lestin.github.io/raw/master/_img/Ux7xZKPDDwGGin4V-image-1650975047445.png)

Filled Information is based on the specs of my own system, fill yours accordingly.

**Destination path**: `F:\Cases\00\Images` this is a path on my other drive which the memory file will be copied over  
**Destination filename:** `Windows11E-x64-8GBRAM.mem` for the moment i don't need to include pagefile.sys and memcapture.ad1

![image-1650975555217.png](https://github.com/c3lestin/c3lestin.github.io/raw/master/_img/xB64IvySebToR0Um-image-1650975555217.png)

then click on `Capture Memory` this will take a couple of minutes to dump the RAM contents.

![image-1650977853471.png](https://github.com/c3lestin/c3lestin.github.io/raw/master/_img/UTir4ZlojKk2IKQh-image-1650977853471.png)

![image-1650977916814.png](https://github.com/c3lestin/c3lestin.github.io/raw/master/_img/Wiy5MhCUXpwHg2PM-image-1650977916814.png)

A message notifying you that the capture has been done successfully will be displayed, click `Close` and browse your destination path `F:\Cases\00\Images\Windows11E-x64-8GBRAM.mem` to confirm image is there.

![image-1650978103593.png](https://github.com/c3lestin/c3lestin.github.io/raw/master/_img/drO9X3HlSxPu17xJ-image-1650978103593.png)

Now this is the right moment to calculate and document your memory dump file **HASH**, because from that point on, it **CANNOT** and **SHOULD NOT** be changed.

<table border="1" id="bkmrk-case-00-evidence-mem" style="border-collapse: collapse; width: 100%; height: 89.3907px;"><tbody><tr style="height: 29.7969px;"><td style="width: 18.9505%; height: 29.7969px;">Case</td><td style="width: 81.0495%; height: 29.7969px;">00</td></tr><tr style="height: 29.7969px;"><td style="width: 18.9505%; height: 29.7969px;">Evidence</td><td style="width: 81.0495%; height: 29.7969px;">Memory Dump</td></tr><tr style="height: 29.7969px;"><td style="width: 18.9505%; height: 29.7969px;">Filename</td><td style="width: 81.0495%; height: 29.7969px;">Windows11E-x64-8GBRAM.mem</td></tr><tr><td style="width: 18.9505%;">Hash MD5</td><td style="width: 81.0495%;">7C29FBD53E56ADB8526D338847C9F2A1  
</td></tr></tbody></table>

<br />
