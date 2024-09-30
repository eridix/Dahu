describe('Test de la page d\'accueil', () => {
  it('Devrait charger la page d\'accueil', () => {
    // Visiter l'URL de la page d'accueil
    cy.visit('localhost:4200/dahu/accueil');

     // Vérifier que la navbar contient le bouton de connexion et cliquer dessus
     cy.get('app-nav-bar').contains('Connexion').click();


    // Cliquer sur le lien "S'inscrire maintenant"
    cy.contains('S\'inscrire maintenant').click();

      // Remplir les champs du formulaire avec des données de test
      cy.get('input#prenom').type('Robin');
      cy.get('input#nom').type('Bellier');
      cy.get('input#email').type('robin.bellier@example.com');
      cy.get('input#password').type('password4');
      cy.get('input#confirmPassword').type('password4');
  
      // Cocher la case "Accepter les conditions générales d'utilisation"
      cy.get('input#maCase').check();
  
      // Soumettre le formulaire en cliquant sur le bouton d'inscription
      cy.get('button[type="submit"]').click();
  
      // Vérifier que la navbar contient le nom et le prenom du nouveau utilisateur
      cy.get('app-nav-bar').contains('Robin Bellier').click();
  });
});