class ProductSort
{

    selectFilter(order, value){
        cy.get('select').select(order);
        cy.get('select').should('have.value', value);

    }

}

export default new ProductSort();