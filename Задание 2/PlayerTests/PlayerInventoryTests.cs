using NUnit.Framework;
using UnityEngine;

public class PlayerInventoryTests
{
    private GameObject _playerObject;
    private Player _player;
    private Item _item;

    [SetUp]
    public void SetUp()
    {
        _playerObject = new();
        _player = _playerObject.AddComponent<Player>();
        _item = new Item("Apple");
    }

    [Test]
    public void PlayerInventoryHasFiveSlots()
    {
        Assert.AreEqual(5, _player.Inventory.Slots.Count);
    }

    [Test]
    public void PlayerInventoryCanAddItem()
    {
        Assert.True(_player.Inventory.AddItem(_item, 4));
        Assert.AreEqual("Apple", _player.Inventory.Slots[0].Item.ItemName);
        Assert.AreEqual(4, _player.Inventory.Slots[0].ItemCount);
    }

    [Test]
    public void PlayerInventoryCanRemoveItem()
    {
        Assert.True(_player.Inventory.AddItem(_item, 4));
        Assert.AreEqual("Apple", _player.Inventory.Slots[0].Item.ItemName);
        Assert.AreEqual(4, _player.Inventory.Slots[0].ItemCount);

        Assert.True(_player.Inventory.RemoveItem(_item, 2));
        Assert.AreEqual("Apple", _player.Inventory.Slots[0].Item.ItemName);
        Assert.AreEqual(2, _player.Inventory.Slots[0].ItemCount);
    }

    [TearDown]
    public void TearDown()
    {
        Object.DestroyImmediate(_playerObject);
    }
}
