describe('empty spec', () => {
  beforeEach(()=>{
    cy.visit('https://pikabu.ru/')
  })


  it('Check registration', () => {
    cy.contains('Регистрация').click()
    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    const testname = `testname${id}`
    cy.get('.input__input[placeholder="Никнейм на Пикабу *"]').type(testname)
    cy.get('.input__input[placeholder="Пароль *"]').type(testname+'{enter}')
    cy.url().should('include',`testname${id}`)
    //Will work with disabled captcha
  })


  it('Check header items', () => {

    cy.contains('Лучшее').click()
    cy.url().should('include', '/best')

    cy.contains('Свежее').click()
    cy.url().should('include', '/new')

    cy.contains('Подписки').click()
    cy.url().should('include', '/subs')

    cy.contains('Сообщества').click()
    cy.url().should('include', '/communities')

    cy.contains('Компании').click()
    cy.url().should('include', '/companies')

    cy.get('.logo').click()
    cy.url().should('eq','https://pikabu.ru/')


    cy.get('.header-right-menu__search').trigger('mouseover').should('have.class', 'header-right-menu__search_focus').type('MyText').wait(3000).type('{enter}')
    cy.url().should("include",'q=MyText')
    cy.get('.header-right-menu__notification').trigger('mouseover')
    cy.get('.overlay .notification__main').should('include.html','Приветствуем на Пикабу!')

  })



})