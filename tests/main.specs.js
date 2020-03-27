const {splashTime, cleanupTime} = require('./__fixtures__/test-config')

describe('Integration test', () => {
    it('Does not do much!', () => {
        cy.visit('tests/__fixtures__/test.html')
        cy.get('#splash')
            .should($targets => {
                const splash = $targets[0]
                console.log(splash.style.opacity)
                expect(splash.style.display).to.equal('flex')
                expect(splash.style.opacity).to.equal('1')
            })
        cy.get('#splash > div')
            .should($targets => {
                const splashContent = $targets[0]
                expect(splashContent.style.backgroundImage).to.equal('url("./test-image.jpg")')
            })
        cy.get('#root')
            .should('have.css', 'display', 'none')
        cy.wait(splashTime + cleanupTime)
        cy.get('#splash')
            .should('be', null)
        cy.get('#root')
            .should('have.css', 'display', 'block')
    })
})