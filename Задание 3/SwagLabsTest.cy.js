describe('Swag Labs Test', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
  })

  it('Fill Login and Password field', () => {
    //cy.visit('https://www.saucedemo.com')

    const loginItem = "standard_user"
    const password = "secret_sauce"

    cy.get('#user-name')
      .type(loginItem)
      .should('have.value', loginItem)

    cy.get('#password')
      .type(password)
      .should('have.value', password)

    cy.get('#login-button')
      .click()
    
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
  })

  it('Sort by price and check price filtered by asc/desc', () => {
    const loginItem = "standard_user"
    const password = "secret_sauce"

    // Login
    cy.get('#user-name')
      .type(loginItem)
      .should('have.value', loginItem)

    cy.get('#password')
      .type(password)
      .should('have.value', password)

    cy.get('#login-button')
      .click()
    
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')

    // Test
    let lastPrice = 0.0

    // asc
    cy.get('.product_sort_container')
      .children('option')
      .should('have.length', 4)
      .eq(2)
      .should('have.value', 'lohi')
    
    cy.get('.product_sort_container')
      .select('lohi')

    cy.get('.inventory_item[data-test = "inventory-item"]')
      .each((el) => {
        const price = parseFloat(el.find('.inventory_item_price[data-test="inventory-item-price"]').text().replace('$', ''))
        cy.log("Price: " + price)
        cy.log("LastPrice: " + price)
        if (price != lastPrice)
        {
          expect(price).to.be.greaterThan(lastPrice)
        }

        lastPrice = price
      })

    // desc
    cy.get('.product_sort_container')
      .children('option')
      .should('have.length', 4)
      .last()
      .should('have.value', 'hilo')

    cy.get('.product_sort_container')
      .select('hilo')

    cy.get('.inventory_item[data-test = "inventory-item"]')
      .each((el) => {
        const price = parseFloat(el.find('.inventory_item_price[data-test="inventory-item-price"]').text().replace('$', ''))
        cy.log("Price: " + price)
        if (price != lastPrice)
        {
          expect(price).to.be.lessThan(lastPrice)
        }

        lastPrice = price
      })
  })

  it('Add two products to cart and chekout', () => {
    const loginItem = "standard_user"
    const password = "secret_sauce"
    const firstName = "User"
    const lastName = "User"
    const postalCode = 606060
    const finishPrice = 0.0

    // Login
    cy.get('#user-name')
      .type(loginItem)
      .should('have.value', loginItem)

    cy.get('#password')
      .type(password)
      .should('have.value', password)

    cy.get('#login-button')
      .click()
    
    cy.url()
      .should('eq', 'https://www.saucedemo.com/inventory.html')

    // Test
    cy.get('.inventory_item[data-test="inventory-item"]')
      .should('have.length', 6)
      .eq(0)
      .find('.btn[data-test = "add-to-cart-sauce-labs-backpack"]')
      .click()

    cy.get('.inventory_item[data-test="inventory-item"]')
      .should('have.length', 6)
      .eq(1)
      .find('.btn[data-test = "add-to-cart-sauce-labs-bike-light"]')
      .click()

    cy.get('.shopping_cart_link')
      .click()

    cy.url()
      .should('eq', "https://www.saucedemo.com/cart.html")
    
    cy.get('.cart_list[data-test = "cart-list"]')
      .children('.cart_item')
      .should('have.length', 2)

    cy.get('.btn[data-test = "checkout"]')
      .click()
    
    cy.url()
      .should('eq', "https://www.saucedemo.com/checkout-step-one.html")

    cy.get('.form_input[data-test="firstName"]')
      .type(firstName)
      .should('have.value', firstName)

    cy.get('.form_input[data-test="lastName"]')
      .type(lastName)
      .should('have.value', lastName)

    cy.get('.form_input[data-test="postalCode"]')
      .type(postalCode)
      .should('have.value', postalCode)
    
    cy.get('.submit-button[data-test = "continue"]')
      .click()

    cy.url()
      .should('eq', "https://www.saucedemo.com/checkout-step-two.html")

    // cy.get('.cart_list[data-test = "cart-list"]')
      // .children('.cart_item[data-test="inventory-item"')
      // .should('have.length', 2)
      // .each((el) => {
        // const price = parseFloat(el.find().text().replace('$', ''))
        // finishPrice += price
      // })
    // 
    // cy.get()
    

    cy.get('.btn[data-test="finish"]')
      .click()

    cy.url()
      .should('eq', "https://www.saucedemo.com/checkout-complete.html")

    cy.get('.btn[data-test="back-to-products"]')
      .click()

    cy.url()
      .should('eq', "https://www.saucedemo.com/inventory.html")
  })
  
})