describe('Test de la page d\'accueil', () => {
  it('Devrait charger la page d\'accueil', () => {
    // Visiter l'URL de la page d'accueil
    cy.visit('localhost:4200/dahu/accueil');

     // Vérifier que la navbar contient le bouton de connexion et cliquer dessus
     cy.get('app-nav-bar').contains('Connexion').click();

    // Remplir le formulaire de connexion avec un email et un mot de passe
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('admin');

    // Cliquer sur le bouton de connexion
    cy.get('button[type="submit"]').contains('Connexion').click();
  });
});