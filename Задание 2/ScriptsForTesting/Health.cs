public class Health
{
    public int MaxHealth {get; private set;}
    public int CurrentHealth {get; set;}
    public bool IsAlive;
    public Health (int maxHealth)
    {
        MaxHealth = maxHealth;
        CurrentHealth = MaxHealth;
        IsAlive = true;
    }    

    public void Heal(int points)
    {
        if (!IsAlive)
            return;

        CurrentHealth += points;
        if (CurrentHealth >= MaxHealth)
            CurrentHealth = MaxHealth;
    }

    public void TakeDamage(int points)
    {
        if (!IsAlive)
            return;
            
        CurrentHealth -= points;
        if (CurrentHealth <= 0)
        {
            CurrentHealth = 0; 
            IsAlive = false;
        }
    }
}
