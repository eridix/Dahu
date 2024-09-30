import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activite } from 'src/app/data/activite/activite';
import { Actualite } from 'src/app/data/actualite/actualite';
import { Theme } from 'src/app/data/theme/theme';
import { ActiviteService } from 'src/app/service/activite/activite.service';
import { ActualiteService } from 'src/app/service/actualite/actualite.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { PasswordService } from 'src/app/service/password/password.service';
import { SectionService } from 'src/app/service/section/section.service';
import { ThemeService } from 'src/app/service/theme/theme.service';
import { UtilisateurService } from 'src/app/service/utilisateur/utilisateur.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit{
  activites:Activite[]
  actualites:Actualite[]
  color:[string,string,string, string]
  imageAccueil: string
  showGoUp = false
  dahuComming: string
  private intervalId: any // pour l'intervalle de l'animation du dahu



  constructor(private router: Router,private authService:AuthService,private activiteService:ActiviteService,private actualiteService:ActualiteService,private sectionService:SectionService, private passwordService:PasswordService,private utilisateurService:UtilisateurService){}

  ngOnInit(): void {
    this.authService.removeToken()
    this.color=this.sectionService.getColor()
    // this.activiteService.getActivites().subscribe(activites => {console.log(activites)})
    // this.activiteService.getActiviteById(1).subscribe(activites => {console.log(activites)})
    // console.log("password hash : "+this.passwordService.hashPassword('test'));
    // this.utilisateurService.getUtilisateurs().subscribe(utilisateur => {console.log(utilisateur)})
    this.imageAccueil = this.sectionService.getImageAccueil()
    // this.authService.getToken()
    this.dahuComming = this.sectionService.getLogo2()
    this.setupPeriodicFunction()
    this.detectAndAnimate()
    this.actualiteService.getActualites().subscribe(actualites =>this.actualites=actualites)
    this.authService.removeToken()
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


  // Fonction permettant le scroll vers le contenu de la page
  scrollToInfos() {;
    let bannerHeight = 0;
    let navbarHeight = 0;

    // Récupérez la hauteur de la barre de navigation
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbarHeight = navbar.offsetHeight;
    }
    // Récupérez la hauteur de la bannière
    const banner = document.getElementById('banner');
    if (banner) {
      bannerHeight = banner.offsetHeight;
    }

    window.scrollTo(0, bannerHeight - navbarHeight);
    this.showGoUp = true;
  }


  // fonction pour basculer la classe des éléments
  detectAndAnimate(){
    // Sélectionner tous les éléments avec la classe 'animate-on-scroll'
    const elements = document.querySelectorAll('.animate');
    // Boucle sur tous les éléments sélectionnés
    elements.forEach(element => {
      // Vérifier si l'élément est visible dans la fenêtre du navigateur
      const isVisible = this.isElementInViewport(element);
      // Ajouter ou supprimer la classe 'is-visible' en fonction de la visibilité de l'élément
      element.classList.toggle('is-visible', isVisible);
    });
  };

  // fonction pour vérifier la visibilité de l'élément dans la fenêtre du navigateur
  isElementInViewport(el: any){
    // Récupérer les dimensions de l'élément
    const rect = el.getBoundingClientRect();
    // Récupérer la hauteur de la fenêtre du navigateur
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    // Récupérer la largeur de la fenêtre du navigateur
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    // Retourner vrai si l'élément est entièrement visible dans la fenêtre du navigateur, sinon retourner faux
    return (
        rect.top >= -50 &&
        rect.bottom <= viewportHeight + 50
    );
  };

  getNavbarHeight(): number{
    let navbarHeight = 0;
    // Récupérez la hauteur de la barre de navigation
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbarHeight = navbar.offsetHeight;
    }

    return navbarHeight
  }

  // Fonction permettant le scroll vers le haut de page
  scrollToBanner(){
    window.scrollTo(0, 0)
  }


  // Écoutez l'événement de défilement
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const banner = document.getElementById('banner');
    let bannerHeight = 0;
    if (banner) {
      bannerHeight = banner.offsetHeight;
    }


    // Obtenez la distance actuelle du défilement par rapport au haut de la page
    const scrollDistance = window.scrollY;

    // Mettez à jour la propriété showGoUp en fonction de la distance de défilement
    this.showGoUp = scrollDistance >= bannerHeight - this.getNavbarHeight();

    // Écouter l'événement de défilement de la fenêtre du navigateur et appeler la fonction detectAndAnimate
    window.addEventListener('scroll', () => this.detectAndAnimate());

  }




  goToArticle(id:number) {
    this.router.navigate([this.sectionService.getAdresseDahu()+'/article/'+id]);
  }

  // Fonction permettant d'activer l'animation
  setupPeriodicFunction(): void {
    this.intervalId = setInterval(() => {
      this.dahuAnimation()
    }, 6000);
  }

  // Animations du dahu
  dahuAnimation(): void {
    // direction du dahu (haut/bas)
    let dirVer = Math.random() < 0.5 ? 1 : -1; // Générer aléatoirement 1 ou -1
    // nombre aléatoire entre 250 et 400 (250+150)
    const tailleAleatoire = Math.floor(Math.random() * 150) + 250;
    // Récupération de la largeur de l'écran
    const largeurEcran: number = window.innerWidth - tailleAleatoire;
    // position horizontale du dahu
    let posHor = Math.floor(largeurEcran * Math.random() * 0.9); // en ayant une marge de 5% de chaque côté de l'écran
    // direction du dahu (gauche/droite)
    const dirHor = Math.random() < 0.5 ? 1 : -1; // Générer aléatoirement 1 ou -1

    let div = 'funnyDivBas'
    let dah = 'funnyDahuBas'
    if(dirVer == -1){
      div = 'funnyDivHaut'
      dah = 'funnyDahuHaut'
    };

    const dahuDiv = document.getElementById(div)
    const dahu = document.getElementById(dah)

    if (dahu && dahuDiv) {
      dahuDiv.style.display = 'block'

      // mise à jour de la taille et la position du dahu
      dahuDiv.style.left = posHor.toString() + 'px';
      dahu.style.height = tailleAleatoire.toString() + 'px';

      // animation
      if(dirVer == 1){
        dahuDiv.style.bottom = '-'+ tailleAleatoire.toString() +'px';
      }else{
        let top = tailleAleatoire - this.getNavbarHeight()

        dahuDiv.style.top = '-'+ top.toString() +'px';
      }

      setTimeout(() => { // sortie du dahu
        let cinquante = -dirVer * tailleAleatoire/2
        dahuDiv.style.transform = 'translateY('+ cinquante.toString() +'px)';
        dahu.style.transform = 'scale('+ dirHor.toString()+', '+ dirVer.toString() +')';

        setTimeout(() => { // rentrée du dahu
          dahuDiv.style.transform = 'translateY(0)';
        }, 600);
      }, 400);
    }
  }

  switchDahu(){
    console.log("attrapé!")
    this.router.navigate([this.sectionService.switchDahu()])
  }

  goActualite(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/actualites']);
  }
}
