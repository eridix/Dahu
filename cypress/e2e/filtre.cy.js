describe('Test de la page d\'accueil', () => {
    it('Devrait charger la page d\'accueil', () => {
        // Visiter l'URL de la page d'accueil
        cy.visit('localhost:4200/dahu/accueil');

        // Trouver le bouton avec le nom du thème et cliquer dessus
        cy.get('.nav-item').eq(2).trigger('mouseover', {force: true});

        // Attendre que le sous-menu soit visible après le survol
        cy.get('.dropdown-item').should('be.visible');

        // Trouver le sous-thème spécifique et cliquer dessus
        cy.contains('.dropdown-item', 'Cavistes').click();
        cy.wait(1000);
    });
});