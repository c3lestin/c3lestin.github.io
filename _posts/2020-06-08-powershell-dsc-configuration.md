---
layout: post
title: "Powershell: DSC Configuration"
date: 2020-06-08
tags: [PowerShell,DSC,Everything]
share-img: "/img/share-img/2016-11-06-powershell-hashtable-everything-you-wanted-to-know-about.png"
---

Desired State Configuration [(DSC)](https://docs.microsoft.com/en-us/powershell/scripting/dsc/getting-started/wingettingstarted?view=powershell-7) automates administrations and make it less an hassle, it decreases the complexity of scripting in windows and Linux systems and increase the speed of iteration, it is basically configuration as code (Infrastructure As Code). This feature is available beginning the release of powershell version 4.<!--more-->

# Index

* TOC
{:toc}

# Why DSC configuration ?
Let's say you have configured your systems and everything is working fine, you went on vacation, but before you leave you gave access to another team within your organization to the system, let's say the servers, and when you come back some roles and features have been deleted or added, little tweaks were made either intentionally or unintentionally by your fellow colleagues which unfortunately break your golden system configuration(s) well most of the time you find yourself asking "God what did change!" you spend countless hours trying to figure out what have changed, well this is where PowerShell Desired State Configurations become handy, DSC `ENSURE` that your system has the correct configurations no matter what by preventing configurations drift. But wait not only that, it can also avoid waste of resources by ensuring your system is configured the way it should be, the desired way in order to prevent costly deployment failure.

Now let's say you had DSC configuration implemented in your system, in that case the changes that your fellow engineers made on the system while you were on vacation DSC would have take care of them by making sure that the system configuration get reverted to it's original state.

# Structure of a DSC configuration
A DSC configuration is nothing more than a special kind of powershell function, as you can see below it is pretty straight forward.

``` powershell
Configuration *config_name*
{
   Import-DscResource -Module PSDesiredStateConfiguration
   Node *node_name*
   {
      WindowsFeature *role_name*
      {
          Ensure      = "Present"
          Name        = "Web-Server"  
      }
   }
}
```




