---
layout: post
title: "Powershell: DSC Configuration (Part I)"
date: 2020-06-08
tags: [Automation,PowerShell,DSC,Everything]
share-img: "/img/share-img/2016-11-06-powershell-hashtable-everything-you-wanted-to-know-about.png"
---

Desired State Configuration [(DSC)](https://docs.microsoft.com/en-us/powershell/scripting/dsc/getting-started/wingettingstarted?view=powershell-7) automates administrations and make it less an hassle, it decreases the complexity of scripting in windows and Linux systems and increase the speed of iteration, it is basically configuration as code (Infrastructure As Code). This feature is available beginning the release of powershell version 4.<!--more-->

# Index

* TOC
{:toc}

# Why DSC configuration ?
When our golden system configuration(s) break or change, most of the time we find ourself asking "**What did change?**" we spend countless hours trying to figure out what have changed, this is where PowerShell Desired State Configurations become handy, DSC can `ENSURE` that our system has the correct configurations no matter what by preventing configurations drift.

The main advantages of DSC are: 

- Simplyfying system admnistrators task  (*A system admin, can for example configured one or more devices automatically*)
- Identical configurations everywhere (*Very handy for standardisation*)


# DSC Structure
A configuration is nothing more than a special kind of powershell function, the following example shows the anatomy of a basic DSC configuration.

``` posh
Configuration myconfig
{
   Import-DscResource -Module ModuleName
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

Explanation of each block in details.

# Key Components of DSC

When working with dsc you will become very familiar with the following terms such as:

* **DSC Configurations**
* **DSC Resources**
* **LCM**
* **Pull Model**
* **Push Model**
 
 
## DSC Configurations
 
 Configurations are codes that define what the resources should do, they consists of the following parts:

* One Configuration block.
* One or more Node blocks.
* One or more resource blocks.

### The Configuration block
Any Desired State Configuration document script starts with the word `Configuration` followed by a desired **name**  then a **script block** `{...}`,
the following example shows **myconfig** acting as the name of a dsc configuration, the name can be any name you want it to. 

``` posh
Configuration myconfig
{
   
}
```

the second example shows **Enceladus** as the name of the configuration.

``` posh
Configuration Enceladus
{
   
}
```
Congratulations! You have your first configuration block, now what's next?
Well as you can notice, both our configuration block **myconfig** and **Enceladus** are empty, let's change that by  importing resources from a module into the DSC config.

To do that we use the `Import-DscResource` cmdlet following the module name containing the resources we want to use, in that case the `PSDesiredStateConfiguration` module, now you must be wondering, how do we know which module contains the right resources to use? Good question, please keep reading.

``` posh
Configuration Enceladus
{
   Import-DscResource -Module PSDesiredStateConfiguration
   
}
```
Ok, we now know how to import resources from a module into a configuration block, great but i want  you to understand more so, let's dive into the details of dsc resources.

#### DSC Resources
 
The best way to give you a good understanding of dsc resources is to create a real world scenario, here is one, create a dsc configuration named **Enceladus** purpose is to make sure the windows service `BITS` status is **stopped** and stays **stopped** on the local machine.

Here is what we know about this request so far:
* Name of the configuration (**Enceladus**)
* Name of the target Node (**localmachine**)

Here is what we don't know:
* Name of the module containing the resource to be used (...)
* Name of the Resource (...)
* Name of the Resource properties (...)

Windows PowerShell has a built-in function named `Get-DscResource` when executed, retrieves all the PowerShell DSC resources present on the computer, if you've never worked before with DSC, then when you execute the `Get-DscResource` command you mostly will be welcomed with the PowerShell in-box resources shown in the output result. Now of course they might not be enough for the needs of your company, but don't worry there is plethora of Custom DSC Resources from  Microsoft and Other vendors you can use or you can even create your own DSC Resources.  We will talk about how to create, where to get community dsc resources and how to import them in a dedicated post, but if you want to explorer them already the PowerShell team at Microsoft has a git repo `https://github.com/powershell/dscresources` with some official resource kit modules or visit the `www.powershellgallery.com` for community-submited DSC resource modules.

Ok enough, let's run this command to gather available local DSC resource.

**Command:**
``` posh
Get-DscResource
```

**Output:**
*certain values were omitted for the sake of displaying not too much data, yours might look slightly different.*

```
ImplementedAs   Name                      ModuleName                     Version    Properties
-------------   ----                      ----------                     -------    ----------
PowerShell      PSRepository              PowerShellGet                  2.2.1      {Name, DependsOn, Ensure, InstallationPolicy...}
PowerShell      Registry                  PSDesiredStateConfiguration    1.1        {Key, ValueName, DependsOn, Ensure...}
PowerShell      Script                    PSDesiredStateConfiguration    1.1        {GetScript, SetScript, TestScript, Credential...}
PowerShell      Service                   PSDesiredStateConfiguration    1.1        {Name, BuiltInAccount, Credential, Dependencies...
Composite       ServiceSet                PSDesiredStateConfiguration    1.1        {DependsOn, PsDscRunAsCredential, Name, Startup...
PowerShell      User                      PSDesiredStateConfiguration    1.1        {UserName, DependsOn, Description, Disabled...}
PowerShell      WindowsProcess            PSDesiredStateConfiguration    1.1        {Arguments, Path, Credential, DependsOn...}
PowerShell      Archive                   PSDscResources                 2.12.0.0   {Destination, Path, Checksum, Credential...}
```

Now if we look closely to the output, we can quickly notice that the ***Name*** column has a resource called `Service` and the ***ModuleName*** column explicitely tell us
the module name the resource belongs to, in that case it's belong to the `PSDesiredStateConfiguration` module, which is one of the built-in Windows Powershell module that reside in `"${env:SystemRoot}\System32\WindowsPowerShell\v1.0\Modules"` folder. 


```
ImplementedAs   Name                      ModuleName                     Version    Properties
-------------   ----                      ----------                     -------    ----------                                                                                                            
PowerShell      Service                   PSDesiredStateConfiguration    1.1        {Name, BuiltInAccount, Credential, Dependencies...
```

Now to make sure that we can use the recently discovered `Service` resource for our scenario, let's retrieve all it's properties with the following command:

**Command**
``` posh
Get-DscResource -Name "Service" -Module "PSDesiredStateConfiguration" | Select-Object -ExpandProperty Properties
```

**or** 

``` posh
(Get-DscResource -Name "Service" -Module "PSDesiredStateConfiguration").Properties
```

**Output:**

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

Great! we have a promising output, notice that in the ***Name*** column there is a property called `State` it is ***NotMandatory*** and it can only be assigned one of those two values {***Running*** or ***Stopped***} their ***PropertyType*** should be a string, in the other hand if you look at the `Name` property in the ***Name*** column this one ***IsMandatory*** and only accepts a string as ***PropertyType***.

Whenever you notice the ***IsMandatory*** set to `True` that is mean in order to use the resource, we need to set the mandatory property into our configuration.


Understand the nested blocks (the **node** block and the **resource** block)


### The Node block
The `Node` block  is where you target the machine that the configuration will be applied to, it is always nested within the configuration block. 
You write the node block with the word `Node` following the name of **the machine** , then a  **script block** `{...}` 

```posh
Configuration Enceladus
{
    Import-DscResource -Module PSDesiredStateConfiguration
    Node $env:COMPUTERNAME
    {
 
    }
}
```
<br>

### The Resource block
This block starts first wirh the **name** of the resource, it tells the configuration which one to use from the **imported DSC module**, it is always nested within the `Node` block, for example in the following scenario we used the  `Service` resource, service is it's name and it is a resource in the `PSDesiredStateConfiguration ` module then we give it a descriptive name of **EnceladusBits** this name can be anything you want, then right after that a **script block** `{...}`

```posh
Configuration Enceladus
{
    Import-DscResource -Module PSDesiredStateConfiguration
    Node $env:COMPUTERNAME
    {
        Service EnceladusBits
        {

        }
    }
}
```

Now let's write our final configuration based on what we have learn so far, so the scenario was to create a dsc configuration named **Enceladus**, purpose was to make sure the windows service `BITS` status was **stopped** and stay **stopped** on the local machine.

Here is everything we gathered and know:

* Name of the configuration (**Enceladus**)
* Name of the module containing the resource to be used (**PSDesiredStateConfiguration**)
* Name of the target Node (**localmachine**)
* Name of the Resource (**Service**)
* Name of the Resource properties we need (**Name**, **State**)


```posh
Configuration Enceladus
{
    Import-DscResource -Module PSDesiredStateConfiguration
    Node $env:COMPUTERNAME
    {
        Service EnceladusBits
        {
            Name  = "BITS"
            State = "Stopped"
        }
    }
}
```


You should be pretty confident by now on writing your first dsc configuration, now let's test what you have learn.

{:.box-warning}
**Challenge: C01** Write a dsc configuration named `Europa` that will always set your local machine computer description to: **This is my automation machine.**. 
The resource you will use, when found, give it a descriptive name of **EuropaDescription**.


* Name of the configuration (**Europa**)
* Name of the module containing the resource to be used (**...**)
* Name of the target Node (**localmachine**)
* Name of the Resource (**...**)
* Name of the Resource description (**EuropaDescription**)
* Name of the Resource properties we need (**...**)


You are so far learning the basics and we will keep doing so until part 3 of this article, it is really important that you know how everything works before diving into some more advanced DSC concepts. I recommend first to solve the challenge before revealing it, thus will ensure you understand what we have discussed so far.

{:.box-note}
**Result:** [(*reveal C01*)](/challenge/?utm_source=blog&utm_medium=blog&utm_content=recent#c01)


# DSC Configuration phases

Before we go further, let's talk about the phases your configuration named `Europa` will go through, this is  very important to understand. So grab a cup of coffee or tea and let's dive in.
Tere are two phases you will be dealing with when working with DSC Configuration:

## The Authoring and Staging Phase

## The Enacting and Reporting Phase

We will dive into each phase.

* **The Authoring and Staging  Phase:**
This phase is all about preparations, this is where we can write configuration documents that explicitly define what and how the resources should be configured on the targeted system(s), as a matter of fact since the beginning of this article we have been using the **authoring** and the **staging** phase. 


* **The Enacting Phase:**
This phase is when we apply the staged configuration to the targeted system(s) workstations or servers


* **The Reporting Phase:**
Ok! you've staged your configuration and applied it, but of course you want to keep track for any configuration drift, this is where the **reporting** phase becomes handy.


<br>

We have authored already a Configuration named `Europa` in our [(reveal C01)](/challenge/?utm_source=blog&utm_medium=blog&utm_content=recent#c01) challenge, let's author and staged a new one to demonstrate the phases. 

Here is our new scenario: 

{:.box-warning}
**Scenario** Author a DSC configuration named `Cassini` on your localmachine that will ensure **Windows Update Service** is **running** and **start up type** is **automatic**
give the resource name a descriptive name of **WindowsUpdate**

Let's go through all the phases with this scenario. 

**Phase 1:** Authoring and Staging

```posh
Configuration Cassini
{
    Import-DscResource -Module PSDesiredStateConfiguration
    Node $env:COMPUTERNAME
    {
        Service WindowsUpdate
        {
            Name        = "wuauserv"
            State       = "Running"
            StartupType = "Automatic"
        }
    }
}
```

The next phase will be the **Enacting Phase**, you must know that the `Cassini` configuration we just authored need to be **compiled** first before we can **Enact** (apply) it.
When you compile a DSC Configuration, it creates **MOF**(Managed Object Format) file.


## Compile a DSC Configuration

To do the compiling it is very simple, just write the name of the configuration in our case it is `Cassini` follow by the `-OutPath`  and `-Verbose` parameter, the verbose parameter is not mandatory but i suggest you put it so you can  see what's happening in the compiling process,
but before you start compiming, you need to load your configuration first into memory, you can check the `Function` drive to confirm if it's there. Remember that a i said a DSC Configuration after all is nothing more than a special kind of PowerShell function. 

**Command:**

```posh
 Get-ChildItem Function:
```

**Output:**

```
CommandType     Name                                    Version    Source
-----------     ----                                    -------    ------
Function        BuildResourceCommonParameters           1.0        WindowsOptionalFeatureSet
Function        BuildResourceString                     1.0        WindowsOptionalFeatureSet
Configuration   Cassini
Function        Configuration                           1.1        PSDesiredStateConfiguration
Function        Connect-TO                              1.0.0.0    CYB.PowerShellProfile.ISE
Function        ConvertFrom-SddlString                  3.1.0.0    Microsoft.PowerShell.Utility
Function        Disable-DscDebug                        1.1        PSDesiredStateConfiguration
```

Notice something?  you can see in the output above that the `Cassini` configuration is loaded into the function drive and ready to be compiled.
Now you can run the following command to compile.



**Command:**
```posh
Cassini -OutputPath "C:\temp\Demo\DSC" -Verbose
```

This will generated the **MOF** file containing my config in the `C:\temp\Demo\DSC` folder. 


**Output:**

```
    Directory: C:\temp\Demo\DSC


Mode         LastWriteTime          Length   Name                                                                                                                                                                                                             
----         -------------------    ------   ----                                                                                                                                                                                                             
-a----       08-Jun-20     17:04    1886     CYB00356.mof
```
**Congratulation!** you've compiled your first DSC Configuration, notice the generated `CYB00356.mof` file,  since we explicitely set the target node to be the localhost `$env:COMPUTERNAME` in the **Node** block in the DSC configuration, then the compiled **MOF** file name will be the name of the **target_node_name.MOF** 


{:.box-warning}
If when you run your command line you welcome  with an error saying ***'Cassini : The term 'Cassini' is not recognized as the name of a cmdlet, function, script file, or operable program.'*** 
then that's mean the configuration was not loaded in memory to fix this, select with your mouse your authored configuration and load it into memory and then re-run your command. 


 
[comment]: <> (## LCM)

[comment]: <> (The Local Configuration Manager **(LCM)** is the engine of Desired State Configuration (DSC). The LCM runs on every target node, and is responsible for parsing and enacting configurations that are sent to the node. It is also responsible for a number of other aspects of DSC, including the following.)

[comment]: <> (* Determining refresh mode (push or pull).)
[comment]: <> (* Specifying how often a node pulls and enacts configurations.)
[comment]: <> (* Associating the node with pull service.)
[comment]: <> (* Specifying partial configurations.)

[comment]: <> (## Pull Model)
[comment]: <> (In pull mode, pull clients are configured to get their desired state configurations from a remote pull service.) 

[comment]: <> (![pullmode](https://github.com/c3lestin/c3lestin.github.io/raw/master/_img/pull_mode.png))

[comment]: <> (## Push Model)
[comment]: <> (Push mode refers to a user actively applying a configuration to a target node by calling the `Start-DscConfiguration` cmdlet.)

[comment]: <> (![pushmode](https://github.com/c3lestin/c3lestin.github.io/raw/master/_img/push_mode.png))
