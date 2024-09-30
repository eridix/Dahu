import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CdTimerComponent } from 'angular-cd-timer';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  @ViewChild('timer', { static: false }) timer: CdTimerComponent;
  game: boolean = false

  ngOnInit(): void {
    // this.cdTimer.stop()
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === ' ') {
      console.log('Barre d\'espace pressée');
      if (this.game) {
        this.saut()
      } else {
        this.startGame()
      }
    }
  }

  startGame() {
    this.game = true;
    this.timer.start()
    const obstacleInterval = () => {
      if (this.game) {
        this.obstacle();
        const randomTime = Math.random() * (1500 - 200) + 200; // Temps aléatoire entre 0,2 et 1,5 seconde en millisecondes
        setTimeout(obstacleInterval, randomTime);
      }
    };
    obstacleInterval();
    setInterval(() => {this.colision(this.game);}, 1000 / 60);
    }

  colision(game:boolean) {
    if (game) {
      // Obtenez les références des éléments HTML
      const dahu = document.getElementById('dahu');
      const obstacle = document.getElementById('obstacle1');
      if (dahu && obstacle) {
        // Obtenez les positions et les dimensions des éléments
        const rect1 = dahu.getBoundingClientRect();
        const rect2 = obstacle.getBoundingClientRect();

        // Vérifiez les chevauchements
        if (
          rect1.top < rect2.bottom &&
          rect1.bottom > rect2.top &&
          rect1.left < rect2.right &&
          rect1.right > rect2.left
        ) {
          // Il y a une collision entre les éléments
          console.log('Collision détectée!');
          this.timer.stop()
          this.game = false
        }
      }

    }
  }

  obstacle() {
    const elementToJump = document.getElementById('obstacle1');
    elementToJump?.classList.add('mouvement-obstacle');
  }


  saut() {
    const elementToJump = document.getElementById('dahu');
    elementToJump?.classList.add('jump');
  }

}
