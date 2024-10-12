public class InventorySlot
{
    public Item Item {get; private set;}
    public int ItemCount {get; private set;}

    public InventorySlot(Item item, int count)
    {
        Item = item;
        ItemCount = count;
    }

    public void SetupSlot (Item item, int count)
    {
        Item = item;
        ItemCount = count;
    }

    public void Add(int count)
    {
        ItemCount += count;
    }

    public void Remove(int count)
    {
        ItemCount -= count;
        if (ItemCount <= 0)
        {
            Item = null;
            ItemCount = 0;
        }
    }
}