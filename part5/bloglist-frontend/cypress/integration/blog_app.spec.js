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


    it('login is available', function() {
      cy.contains('Log in to application')
    })
  })              