---
layout: post
title: "Powershell: DSC (Desired State Configuration)"
date: 2020-08-24
tags: [PowerShell,Everything]
---

What is powershell DSC configuration ?

Desired State Configuration automates administrations and make it less an hassle, it decreases the complexity of scripting in windows and Linux systems and increase the speed of iteration, it is basically configuration as code (Infrastructure As Code). This feature is available beginning the release of powershell version 4.

Why should I use DSC configuration ?

Let's say you have configured your systems and everything is working fine, you went on vacation, but before you leave you gave access to another team within your organization to the system, let's say the servers, and when you come back some roles and features have been deleted or added, little tweaks were made either intentionally or unintentionally by your fellow colleagues which unfortunately break your golden system configuration(s) well most of the time you find yourself asking "God what did change!" you spend countless hours trying to figure out what have changed, well this is where PowerShell Desired State Configurations become handy, DSC ENSURE* that your system has the correct configurations no matter what by preventing configurations drift. But wait not only that, it can also avoid waste of resources by ensuring your system is configured the way it should be, the desired way in order to prevent costly deployment failure. Now let's say you had DSC configuration implemented in your system, in that case the changes that your fellow engineers made on the system while you were on vacation DSC would have take care of them by making sure that the system configuration get reverted to it's original state.

<!--more-->

``` powershell
    Configuration MyDSCConfig
    {
         #This command import the DSC resource
         Import-DscResource -Module PSDesiredStateConfiguration
         
         #The node that will get the config
         Node localhost
         {
            WindowsFeature CheckWebServer
            {
                Ensure      = "Present"
                Name        = "Web-Server"
            }
         }
     }
    
     #Run your configuration
     MyDSCConfig
      
     #Apply your configuration
     Start-DscConfiguration MyDSCConfig
```