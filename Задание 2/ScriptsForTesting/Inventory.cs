using System.Collections.Generic;
using UnityEngine;

public class Inventory
{
    public List<InventorySlot> Slots = new();

    public Inventory(int slotsCount)
    {
        for (int i = 0; i < slotsCount; i++)
            Slots.Add(new InventorySlot(null, 0));
    }

    public bool AddItem(Item item, int count = 1)
    {
        bool isAdded = false;
        foreach (InventorySlot slot in Slots)
        {
            if (slot.Item == item)
            {
                slot.Add(count);
                isAdded = true;
                break;
            }
            else if (slot.Item == null && slot.ItemCount == 0)
            {
                slot.SetupSlot(item, count);
                isAdded = true;
                break;
            }
        }

        if (!isAdded)
        {
            Debug.Log("Full inventory");
            return false;
        }
        else
            return true;
    }

    public bool RemoveItem(Item item, int count = 1)
    {
        bool isRemoved = false;
        int remains = count;

        if (CanRemoveItem(item, count))
        {
            foreach (InventorySlot slot in Slots)
            {
                if (slot.Item == item)
                {
                    if (slot.ItemCount - remains > 0)
                    {
                        slot.Remove(remains);
                        remains -= remains;
                    }
                    else
                    {
                        slot.Remove(remains - slot.ItemCount);
                        remains -= slot.ItemCount;
                    }

                    if (remains == 0)
                    {
                        isRemoved = true;
                        break;
                    }
                }
            }
        }

        if (!isRemoved)
        {
            Debug.Log("Item removed error!");
            return false;
        }
        else
            return true;
    }

    private bool CanRemoveItem(Item item, int neededCount)
    {
        int count = 0;

        foreach (InventorySlot slot in Slots)
        {
            if (slot.Item == item)
                count += slot.ItemCount;
        }

        if (count >= neededCount)
            return true;
        else
            return false;
    }
}
