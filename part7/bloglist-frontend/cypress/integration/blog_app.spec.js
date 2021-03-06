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

      describe('When logged in', function() {
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

        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.contains('new blog').click()

                cy.get('#title').type('testTitle')
                cy.get('#author').type('testAuthor')
                cy.get('#url').type('testUrl')

                cy.contains('create').click()
            })
            
            it('can be liked', function () {
                cy.contains('view').click()

                cy.get('#like-button').click()

                cy.contains('Like number increased')
            })

            it.only('can be deleted', function () {
                cy.contains('view').click()

                cy.on('window:confirm', (str) => {
                    expect(str).to.contains('want to remove')
                    return true
                })

                cy.get('#remove-button').click()

                cy.contains('testTitle').should('not.exist')
            })
        })

        describe.only('and multiple blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({ title: "BlogWithLeastLikes", author: "AA", likes: 10 })
                cy.createBlog({ title: "BlogWithMostLikes", author: "BB", likes: 30 })
                cy.createBlog({ title: "BlogWithMedianLikes", author: "CC", likes: 20 })
            })
            
            it('all blogs are shown', function () {
                cy.get('.blog')
                  .should(blogs => {
                    expect(blogs).to.have.length(3)
                })
            })

            it('blogs are shown by like order', function () {
                cy.get('.blog')
                .should(blogs => {
                    expect(blogs.eq(0)).to.contain('BlogWithMostLikes')
                    expect(blogs.eq(1)).to.contain('BlogWithMedianLikes')
                    expect(blogs.eq(2)).to.contain('BlogWithLeastLikes')
                })
            })
        })
      })
  })              