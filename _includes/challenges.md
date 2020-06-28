

# C01

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
