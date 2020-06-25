describe('Note app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Teszt Elek',
            username: 'testelek',
            password: 'helloka'
        }

        cy.request('POST', 'http://localhost:3001/api/users/', user) 
        cy.visit('http://localhost:3000')
    })


    it('login from is shown', function() {
        cy.contains('Log in to application')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('testelek')
            cy.get('#password').type('helloka')
            cy.get('#login-button').click()
        
            cy.contains('logged in')
        })
    
        it.only('fails with wrong credentials', function() {
            cy.get('#username').type('testelek')
            cy.get('#password').type('alma123')
            cy.get('#login-button').click()
        
            cy.get('.error')
                .contains('Unsuccessful login')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
      })
  })              