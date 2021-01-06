/// <reference types="cypress" />

describe('Test with backend', () => {

    beforeEach('login to the app', () => {        
        cy.loginApplicatication()
        cy.intercept('GET', '**/tags', 'fixture:tags.json')        
    })

    it('verify correct request and response', () => {
        cy.intercept('POST', '**/articles').as('postArticles')
        cy.contains('New Article').click()
        cy.get('[formcontrolname="title"]').type('This is a title')
        cy.get('[formcontrolname="description"]').type('This is a description')
        cy.get('[formcontrolname="body"]').type('This is a body of the article')
        cy.contains('Publish Article').click()
        cy.wait('@postArticles')
        cy.get('@postArticles').then( xhr => {
            console.log(xhr)
            expect(xhr.response.statusCode).to.equal(200)
            expect(xhr.request.body.article.body).to.equal('This is a body of the article')
            expect(xhr.response.body.article.description).to.equal('This is a description')
        })
    })

    it.only('should gave tags with routing object', () => {
        cy.get('.tag-list')
        .should('contain', 'HuManIty')
        .should('contain', 'Black‌Lives‌Matter')
        .should('contain', 'test')
    })

})