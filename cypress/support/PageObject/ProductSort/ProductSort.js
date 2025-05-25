class ProductSort
{

    selectFilter(value){
        cy.get('select').select('Name (A to Z)').should('have.value', value);
    }

}

export default new ProductSort();