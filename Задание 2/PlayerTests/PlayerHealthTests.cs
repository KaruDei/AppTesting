using NUnit.Framework;
using UnityEngine;

public class _playerHealthTests
{
    private GameObject _playerObject;
    private Player _player;

    [SetUp]
    public void SetUp_playerHealthTests()
    {
        _playerObject = new GameObject();
        _player = _playerObject.AddComponent<Player>();
    }

    [Test]
    public void _playerHealthAreEqualOneHundredAndIsAlive()
    {
        Assert.AreEqual(100, _player.Health.CurrentHealth);
        Assert.True(_player.Health.IsAlive);
    }

    [Test]
    public void _playerHealthCanTakeDamageAndCanHealAndCanDie()
    {
        _player.Health.TakeDamage(75);
        Assert.AreEqual(25, _player.Health.CurrentHealth);
        Assert.True(_player.Health.IsAlive);

        _player.Health.Heal(25);
        Assert.AreEqual(50, _player.Health.CurrentHealth);
        Assert.True(_player.Health.IsAlive);

        _player.Health.TakeDamage(100);
        Assert.AreEqual(0, _player.Health.CurrentHealth);
        Assert.False(_player.Health.IsAlive);
    }

    [Test]
    public void _playerHealthCantTakeDamageAndCantHealWhenIsNotAlive()
    {
        Assert.True(_player.Health.IsAlive);
        _player.Health.TakeDamage(100);
        Assert.AreEqual(0, _player.Health.CurrentHealth);
        Assert.False(_player.Health.IsAlive);

        _player.Health.TakeDamage(75);
        Assert.AreEqual(0, _player.Health.CurrentHealth);
        Assert.False(_player.Health.IsAlive);

        _player.Health.Heal(25);
        Assert.AreEqual(0, _player.Health.CurrentHealth);
        Assert.False(_player.Health.IsAlive);
    }

    [TearDown]
    public void TearDown_playerHealthTests()
    {
        Object.DestroyImmediate(_playerObject);
    }
}
