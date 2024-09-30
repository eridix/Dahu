describe('Test de la page d\'accueil', () => {
    it('Devrait charger la page d\'accueil', () => {
      // Visiter l'URL de la page d'accueil
      cy.visit('localhost:4200/dahu/accueil');
  
      // On clique sur le bouton Actualités de la navbar  
      cy.contains('a', 'Actualités').click();


      // On clique sur le lien de l'actualité sur la page d'accueil
      cy.contains('a', 'Voir plus').click();

    });
  });