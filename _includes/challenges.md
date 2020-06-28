# Index

* TOC
{:toc}


## C01

You are viewing the result for challenge C01

#### Challenge

{:.box-warning}
**Challenge: C01** Write a dsc configuration named `Europa` that will always set your local machine computer description to: **This is my automation machine.**. 
The resource you will use, when found, give it a descriptive name of **EuropaDescription**.

<br>

#### Details
* Name of the configuration (**Europa**)
* Name of the module containing the resource to be used (**ComputerManagementDsc**)
* Name of the target Node (**$env:COMPUTERNAME**)
* Name of the Resource (**Computer**)
* Name of the Resource description (**EuropaDescription**)
* Name of the Resource properties we need (**Name, Description**)

<br>

#### Configuration
your config should look like something like this
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
