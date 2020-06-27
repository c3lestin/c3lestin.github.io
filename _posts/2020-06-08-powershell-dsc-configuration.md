---
layout: post
title: "Powershell: DSC Configuration"
date: 2020-06-08
tags: [Automation,PowerShell,DSC,Everything]
share-img: "/img/share-img/2016-11-06-powershell-hashtable-everything-you-wanted-to-know-about.png"
---

Desired State Configuration [(DSC)](https://docs.microsoft.com/en-us/powershell/scripting/dsc/getting-started/wingettingstarted?view=powershell-7) automates administrations and make it less an hassle, it decreases the complexity of scripting in windows and Linux systems and increase the speed of iteration, it is basically configuration as code (Infrastructure As Code). This feature is available beginning the release of powershell version 4.<!--more-->

# Index

* TOC
{:toc}

# Why DSC configuration ?
When our golden system configuration(s) break or change, most of the time we find ourself asking "God what did change!" we spend countless hours trying to figure out what have changed, this is where PowerShell Desired State Configurations become handy, DSC can `ENSURE` that our system has the correct configurations no matter what by preventing configurations drift. DSC  ensure our system is configured the way it should be.

# DSC Structure
A configuration is nothing more than a special kind of powershell function, the following example shows the anatomy of a simple DSC configuration.

``` posh
Configuration myconfig
{
   Import-DscResource -Module PSDesiredStateConfiguration
   Node mynode
   {
      WindowsFeature myrole
      {
          Ensure      = "Present"
          Name        = "Web-Server"  
      }
   }
}
```

{:.box-note}
**myconfig** is the name of the configuration, **mynode** is the machine the configuration will be applied to, **myrole** is the resource we will configure on the target node.

## Configuration block
Any DSC script starts first with the word `Configuration` followed by a `name`  then a `script block` {...},
the following example shows that `myconfig` is the name of the configuration.

``` posh
Configuration myconfig
{
   
}
```

the second example shows that `Enceladus` is the name of the configuration.

``` posh
Configuration Enceladus
{
   
}
```
Now we have our first block, what's next?
Well as you can notice both our configuration block `myconfig` and `Enceladus` are empty, let's import resources to one of our DSC config.

``` posh
Configuration Enceladus
{
   Import-DscResource -Module PSDesiredStateConfiguration
   
}
```

In the upcoming paragraphs we will talk more about DSC resources, here in the above example was just to show you how we can use the `Import-DscResource` cmdlet 
following a module name containing resources we can use, in that case the `PSDesiredStateConfiguration` module.

# Key Components of DSC

Working with DSC will have you familiar with the following terms such as:

* `DSC Resources`
* `DSC Configurations`
* `LCM`
* `Pull Model`
* `Push Model`
 
## DSC Resources
 
Desired State Configuration Resources provide the building blocks for a DSC configuration. A resource exposes properties that can be configured `schema` and contains the PowerShell script functions that the Local Configuration Manager `LCM` calls to what Microsoft call the `make it so` phase.
 
## DSC Configurations
 
 Configurations are codes that define what the resources should do, they consists of the following parts:

* The Configuration block.
* One or more Node blocks.
* One or more resource blocks.
 
## LCM

The Local Configuration Manager `LCM` is the engine of Desired State Configuration (DSC). The LCM runs on every target node, and is responsible for parsing and enacting configurations that are sent to the node. It is also responsible for a number of other aspects of DSC, including the following.

* Determining refresh mode (push or pull).
* Specifying how often a node pulls and enacts configurations.
* Associating the node with pull service.
* Specifying partial configurations.

## Pull Model
In pull mode, pull clients are configured to get their desired state configurations from a remote pull service. 

![pullmode](https://github.com/c3lestin/c3lestin.github.io/raw/master/_img/pull_mode.png)

## Push Model
Push mode refers to a user actively applying a configuration to a target node by calling the `Start-DscConfiguration` cmdlet.

![pushmode](https://github.com/c3lestin/c3lestin.github.io/raw/master/_img/push_mode.png)
