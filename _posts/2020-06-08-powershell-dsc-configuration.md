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
When our golden system configuration(s) break or change, most of the time we find ourself asking "God what did change!" we spend countless hours trying to figure out what have changed, this is where PowerShell Desired State Configurations become handy, DSC can `ENSURE` that our system has the correct configurations no matter what by preventing configurations drift. DSC  ensure our system is configured the way it should.

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

[comment]: <> ({:.box-note})
[comment]: <> (**myconfig** is the name of the configuration, **mynode** is the machine the configuration will be applied to, **myrole** is the resource we will configure on the target node.)

I will explain each block in details.

# Key Components of DSC

Working with dsc will make you very familiar with the following terms such as:

* `DSC Configurations`
* `DSC Resources`
* `LCM`
* `Pull Model`
* `Push Model`
 
 
## DSC Configurations
 
 Configurations are codes that define what the resources should do, they consists of the following parts:

* The Configuration block.
* One or more Node blocks.
* One or more resource blocks.

### The Configuration block
Any Desired State Configuration document script starts with the word `Configuration` followed by the `name`  then a `script block` {...},
the following example shows `myconfig` acting as the name of a dsc configuration.

``` posh
Configuration myconfig
{
   
}
```

the second example shows `Enceladus` as the name of the configuration.

``` posh
Configuration Enceladus
{
   
}
```
Congratulations! You have your first configuration block, now what's next?
Well as you can notice, both our configuration block `myconfig` and `Enceladus` are empty, let's change that by  importing resources from a module into the DSC config.

To do that we use the `Import-DscResource` cmdlet following the module name containing the resources we want to use, in that case the `PSDesiredStateConfiguration` module, now you must be wondering, how to know which module contains which resources? Good question, keep reading.

``` posh
Configuration Enceladus
{
   Import-DscResource -Module PSDesiredStateConfiguration
   
}
```
Ok, we now know how to import resources from a module into a configuration block, great but i want  you to understand more so, let dive into the details of dsc resources.

## DSC Resources
 
The best way to give you a good understanding of dsc resources is to create a real world scenario, here is one, create a dsc configuration named `Enceladus` purpose is to make sure the windows service `BITS` status is "stopped" and stays "stopped" on the local machine.

Here is what we know about this request so far:
* Name of the configuration (`Enceladus`)
* Name of the target Node (`localmachine`)

Here is what we don't know:
* Name of the module containing the resource to be used (...)
* Name of the Resource (...)
* Name of the Resource properties (...)

Windows PowerShell has a built-in function named `Get-DscResource` when executed, retrieves all the PowerShell DSC resources present on the computer.

``` posh
Get-DscResource
```

Output:

```
ImplementedAs   Name                      ModuleName                     Version    Properties
-------------   ----                      ----------                     -------    ---------- 
                                                                                                                
PowerShell      PSRepository              PowerShellGet                  2.2.1      {Name, DependsOn, Ensure, InstallationPolicy...}                                                                                                                  
PowerShell      Archive                   PSDesiredStateConfiguration    1.1        {Destination, Path, Checksum, Credential...}                                                                                                                      
PowerShell      Package                   PSDesiredStateConfiguration    1.1        {Name, Path, ProductId, Arguments...}
Composite       ProcessSet                PSDesiredStateConfiguration    1.1        {DependsOn, PsDscRunAsCredential, Path, Credent...
PowerShell      Registry                  PSDesiredStateConfiguration    1.1        {Key, ValueName, DependsOn, Ensure...}
PowerShell      Script                    PSDesiredStateConfiguration    1.1        {GetScript, SetScript, TestScript, Credential...}
PowerShell      Service                   PSDesiredStateConfiguration    1.1        {Name, BuiltInAccount, Credential, Dependencies...
Composite       ServiceSet                PSDesiredStateConfiguration    1.1        {DependsOn, PsDscRunAsCredential, Name, Startup...
PowerShell      User                      PSDesiredStateConfiguration    1.1        {UserName, DependsOn, Description, Disabled...}
PowerShell      WaitForAll                PSDesiredStateConfiguration    1.1        {NodeName, ResourceName, DependsOn, PsDscRunAsC...
PowerShell      WindowsPackageCab         PSDesiredStateConfiguration    1.1        {Ensure, Name, SourcePath, DependsOn...}
PowerShell      WindowsProcess            PSDesiredStateConfiguration    1.1        {Arguments, Path, Credential, DependsOn...}
PowerShell      Archive                   PSDscResources                 2.12.0.0   {Destination, Path, Checksum, Credential...}

```

Now if we look closely to the output, we can quickly notice that the "Name" column has a resource called `Service` and the "ModuleName" column explicitely tell us
the module name the resource belongs to, in that case it's belong to the `PSDesiredStateConfiguration` module.

```
ImplementedAs   Name                      ModuleName                     Version    Properties
-------------   ----                      ----------                     -------    ----------                                                                                                            
PowerShell      Service                   PSDesiredStateConfiguration    1.1        {Name, BuiltInAccount, Credential, Dependencies...
```

Now to make sure that we can use the recently discovered `Service` resource for our scenario, let's retrieve all it's properties with the following command:


``` posh
Get-DscResource -Name "Service" -Module "PSDesiredStateConfiguration" | Select-Object -ExpandProperty Properties
```

Output:

```
Name                 PropertyType   IsMandatory Values
----                 ------------   ----------- ------
Name                 [string]              True {}
BuiltInAccount       [string]             False {LocalService, LocalSystem, NetworkService}
Credential           [PSCredential]       False {}
Dependencies         [string[]]           False {}
DependsOn            [string[]]           False {}
Description          [string]             False {}
DisplayName          [string]             False {}
Ensure               [string]             False {Absent, Present}
Path                 [string]             False {}
PsDscRunAsCredential [PSCredential]       False {}
StartupType          [string]             False {Automatic, Disabled, Manual}
State                [string]             False {Running, Stopped}

```
This output will be explained in detail.
 
## LCM

The Local Configuration Manager (LCM) is the engine of Desired State Configuration (DSC). The LCM runs on every target node, and is responsible for parsing and enacting configurations that are sent to the node. It is also responsible for a number of other aspects of DSC, including the following.

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
