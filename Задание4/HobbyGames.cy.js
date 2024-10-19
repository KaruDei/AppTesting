describe('HobbyGamesTests', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })

  beforeEach(() => {
    cy.visit('https://hobbygames.ru/')
  });
  
  it('Search product', () => {
    cy.get('#header__search__form')
      .find('input')
      .type('Dungeons & Dragons')
      .get('.search__popup_head')
      .get('.search__popup__item')
      .should('have.length', 5)
      .eq(0)
      .find('.search__popup__item__name a')
      .click();
    
    cy.url()
      .should('eq', 'https://hobbygames.ru/dungeons-and-dragons-jenciklopedija-chudovishh')
  
    cy.get('#header__search__form')
      .find('input')
      .type('Dungeons & Dragons')
      .get('.input--search__btn')
      .click();

    cy.url()
      .should('eq', 'https://hobbygames.ru/catalog/search?keyword=Dungeons%20%26%20Dragons')
    
  })
  
  it('Catalog and filters', () => {
    let lastPrice = 0.0

    cy.get('.main-nav__item[data-target="drop-1"]')
      .find('.h2 a')
      .eq(0)
      .click()

    cy.url()
      .should('eq', 'https://hobbygames.ru/catalog-all')

    cy.get('.col-lg-4 .product-item')
      .should('have.length', 30)

    cy.get('#category-left .category-left__categories')
      .get('li[data-id="28588"] a')
      .click()

    cy.url()
      .should('eq', 'https://hobbygames.ru/nastolnie')

    cy.get('.block .content .row .col-xs-6')
      .get('input[name="price_from"]')
      .clear()
      .type('5000')

    cy.get('.block .content .row .col-xs-6')
      .get('input[name="price_to"]')
      .clear()
      .type('5250')

    cy.wait(2000)

    cy.get('.checkboxes .col-xs-12')
      .eq(0)
      .get('label[for="product-availability-deliver"]')
      .click()
    
    cy.wait(2000)

    cy.get('.checkboxes .col-xs-12')
      .eq(1)
      .get('label[for="product-availability-pickup"]')
      .click()

    cy.wait(2000)

    cy.get('div.sortBy')
      .eq(0)
      .click()
      .get('.cs-options ul li')
      .eq(1)
      .click()

    cy.wait(2000)

    cy.get('.product-item .actions-block .product-cart a.to-cart span.not-cart span.price')
      .each((el) => {
        const price = parseFloat(el.text().replace('\u00A0','').replace('₽', '').replace(' ', '').trim())
        if (price != lastPrice) expect(price).to.be.greaterThan(lastPrice)
        lastPrice = price
      })
  })
  
  it('Product page', () => {
    cy.get('#header__search__form')
      .find('input')
      .type('Dungeons & Dragons')
      .get('.search__popup_head')
      .get('.search__popup__item')
      .should('have.length', 5)
      .eq(0)
      .find('.search__popup__item__name a')
      .click();
    
    cy.url()
      .should('eq', 'https://hobbygames.ru/dungeons-and-dragons-jenciklopedija-chudovishh')
    
    cy.get('ul.flat-tab-nav li a')
      .should('have.length', 4)
      .eq(1)
      .click()
  
    cy.url()
      .should('eq', 'https://hobbygames.ru/dungeons-and-dragons-jenciklopedija-chudovishh/otzyvy')
    
    cy.get('ul.flat-tab-nav li a')
      .should('have.length', 4)
      .eq(2)
      .click()

    cy.url()
      .should('eq', 'https://hobbygames.ru/dungeons-and-dragons-jenciklopedija-chudovishh/voprosy')

    cy.get('ul.flat-tab-nav li a')
      .should('have.length', 4)
      .eq(3)
      .click()

    cy.url()
      .should('eq', 'https://hobbygames.ru/dungeons-and-dragons-jenciklopedija-chudovishh/nalichie')

    cy.get('ul.flat-tab-nav li a')
      .should('have.length', 4)
      .eq(0)
      .click()

    cy.url()
      .should('eq', 'https://hobbygames.ru/dungeons-and-dragons-jenciklopedija-chudovishh')
  })
  
  it('Add product to favorites', () => {
    cy.get('#header__search__form')
      .find('input')
      .type('Dungeons & Dragons')
      .get('.search__popup_head')
      .get('.search__popup__item')
      .should('have.length', 5)
      .eq(0)
      .find('.search__popup__item__name a')
      .click();
    
    cy.url()
      .should('eq', 'https://hobbygames.ru/dungeons-and-dragons-jenciklopedija-chudovishh')
    
    cy.get('.append-to-favorites[data-id="74045"]')
      .eq(1)
      .click()

    cy.get('.remove-from-favorites[data-id="74045"]')
      .eq(1)
      .click()

    cy.get('.append-to-favorites[data-id="74045"]')
      .eq(1)
      .click()

    cy.get('#favorites-counter')
      .should('have.text', '1')

    cy.get('.user-favorites__link')
      .click()

    cy.url()
      .should('eq', 'https://hobbygames.ru/account/favorites')

    cy.get('#favorites-counter')
      .should('not.have.css', 'display', 'none')

    cy.get('.product-item')
      .should('have.length', 1)
      .get('.button-remove-from-favorite')
      .click()

    cy.get('#favorites-counter')
      .should('have.css', 'display', 'none')
  })

  it('Add product to cart and checkout', () => {
    let totalPrice = 0.0
    const address = "ул 10 лет Октября, д 1"
    const message = "Message"

    cy.get('#header__search__form')
      .find('input')
      .type('Dungeons & Dragons')
      .get('.search__popup_head')
      .get('.search__popup__item')
      .should('have.length', 5)
      .eq(0)
      .find('.search__popup__item__name a')
      .click();
    
    cy.url()
      .should('eq', 'https://hobbygames.ru/dungeons-and-dragons-jenciklopedija-chudovishh')
      
    cy.get('.to-cart[data-id="74045"]')
      .eq(1)
      .click()
    
    cy.get('.cart-icon')
      .should('have.text', '1')

    cy.get('a.cart-status')
      .click()

    cy.url()
      .should('eq', 'https://hobbygames.ru/zakaz')

    cy.get('.qty__value span')
      .should('have.text', '1')

    cy.get('.action-plus')
      .click()
    cy.wait(2000)

    cy.get('.qty__value span')
      .should('have.text', '2')
      
    totalPrice = 0.0
    cy.get('#product-table .item-list')
      .should('have.length', 1)
      .each((el)=>{
        totalPrice += parseFloat(el.find('.total-prices span.price').text().replace(' ', '').trim())
        cy.log(totalPrice)
      })

    // cy.get('.total-price')
    //   .should('have.text', totalPrice)

    cy.get('.action-minus')
      .click()
    cy.wait(2000)

    cy.get('.qty__value span')
      .should('have.text', '1')

    totalPrice = 0.0
    cy.get('#product-table .item-list')
      .should('have.length', 1)
      .each((el)=>{
        totalPrice += parseFloat(el.find('.total-prices span.price').text().replace(' ', '').trim())
        cy.log(totalPrice)
      })
    
    // cy.get('.total-price')
    //   .should('have.text', totalPrice)

    cy.get('.btn-next[data-step="delivery"]')
      .click()

    cy.wait(2000)
    
    cy.get('#delivery-0')
      .click()
    
    cy.get('#delivery-address-street-and-house-0')
      .type(address)

    cy.get('label[for="delivery-address-no-flat-office-0"]')
      .click()
    
    cy.get('#delivery-comment-0')
      .type(message)
  })
})