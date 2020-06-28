# Index

* TOC
{:toc}


## C01

You are viewing the result for challenge C01.

#### Challenge

{:.box-warning}
**Challenge: C01** Write a dsc configuration named `Europa` that will always set your local machine computer description to: **This is my automation machine.**, when found the resource name you'll use to execute the task give it a descriptive name of **EuropaDescription**.

#### Details
* Name of the configuration (**Europa**)
* Name of the module containing the resource to be used (**ComputerManagementDsc**)
* Name of the target Node (**$env:COMPUTERNAME**)
* Name of the Resource (**Computer**)
* Name of the Resource description (**EuropaDescription**)
* Name of the Resource properties we need (**Name, Description**)

#### Configuration

The configuration code

```posh
Configuration Europa
{
    Import-DscResource -Module ComputerManagementDsc
    Node $env:COMPUTERNAME
    {
        Computer EuropaDescription
        {
            Name        = "$env:COMPUTERNAME"
            Description = "This is my automation machine."
        }
    }
}

```
**Note**: Applying this DSC Config might reboot your machine.
