# Index

* TOC
{:toc}


## C01

You are viewing the result for challenge C01

#### Challenge

{:.box-warning}
**Challenge: C01** Write a dsc configuration named `Europa` that will always set your local machine computer description to: **This is my automation machine.**, when found the resource name you'll use to execute the task give it a descriptive name of **EuropaDescription**.

<br>

#### Details
[x] Name of the configuration (**Europa**)
[x] Name of the module containing the resource to be used (**ComputerManagementDsc**)
[x] Name of the target Node (**$env:COMPUTERNAME**)
[x] Name of the Resource (**Computer**)
[x] Name of the Resource description (**EuropaDescription**)
[x] Name of the Resource properties we need (**Name, Description**)

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
