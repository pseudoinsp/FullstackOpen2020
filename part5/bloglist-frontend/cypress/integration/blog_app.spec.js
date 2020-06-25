describe('Blog app', function() {
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
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('testelek')
            cy.get('#password').type('alma123')
            cy.get('#login-button').click()
        
            cy.get('.error')
                .contains('Unsuccessful login')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
      })

      describe.only('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('testelek')
            cy.get('#password').type('helloka')
            cy.get('#login-button').click()
        
            cy.contains('logged in')
        })
    
        it('A blog can be created', function() {
            cy.contains('new blog').click()

            cy.get('#title').type('testTitle')
            cy.get('#author').type('testAuthor')
            cy.get('#url').type('testUrl')

            cy.contains('create').click()

            cy.contains('testAuthor')
        })
      })
  })              