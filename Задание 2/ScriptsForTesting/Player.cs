using UnityEngine;

public class Player : MonoBehaviour
{
    public Health Health = new Health(100);
    public Inventory Inventory = new Inventory(5);

    [ContextMenu("GetInfo")]
    public void GetInfo()
    {
        Debug.Log("Health: " + Health.CurrentHealth);
        Debug.Log("MaxHealth: " + Health.MaxHealth);
    }
}