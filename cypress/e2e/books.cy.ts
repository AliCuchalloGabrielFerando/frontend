import cypress from "cypress";

describe('Books', () => {
  it('can list, show, create, edit and delete books', () => {
    //List books
    cy.visit('/') ;
    cy.get('[data-cy=link-books]').click();
    //Crear book
    cy.get('[href="/libros/crear"]').click()
    .get('[data-cy=input-book-title]').type('Nuevo libro test')
    .get('[data-cy=button-submit-book]').click()
    .get('[data-cy=book-list]').contains('Nuevo libro test');

    //ver libro
    cy.get('[data-cy^=link-to-visit-book-]').last().click()
    .get('h1').should('contain.text','Nuevo libro test')
    .get('[href="/libros"]').click();

    //editar libro
    cy.get('[data-cy^=link-to-edit-book-]').last().click()
    .get('[data-cy=input-book-title]').clear().type('Editado libro test')
    .get('[data-cy=button-submit-book]').click()
    .get('[data-cy=book-list]').contains('Editado libro test');
    
    //eliminar libro
    cy.get('[data-cy^=link-to-delete-book-]').last().click().as('eliminando');
    cy.wait(3000);
    cy.get('[data-cy^=link-to-visit-book-]').last().should('not.contain','Editado libro test');

  }) 
})