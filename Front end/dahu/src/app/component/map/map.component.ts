import { Component, OnInit, SimpleChanges, ViewChild, Input } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable } from 'rxjs';

import { Activite } from 'src/app/data/activite/activite';
import { GeocodingService } from 'src/app/service/geocoding/geocoding.service';
import { FilteActiviteService } from 'src/app/service/filtre-activite/filte-activite.service';
import { Router } from '@angular/router';
import { SectionService } from 'src/app/service/section/section.service';



/*
La clé de l'API Google Maps est dans le fichier index.html
*/



declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(private geocodingService: GeocodingService, private router: Router, private sectionService: SectionService) { }

  @Input() filtreService: FilteActiviteService;
  @Input() activite: Activite;
  activites: Activite[] = [];
  map: any;
  markers: any[] = [];
  display: any;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  center: google.maps.LatLngLiteral = {
    lat: 45.191791613222364,
    lng: 5.721130517306319
  };
  infoWindowOptions = {};
  selectedActivite: Activite | null = null;
  isOnFiltrePage: boolean = false;
  zoom = 14;
  width = "100%";
  height = "1000";


  ngOnInit(): void {
    this.isOnFiltrePage = this.filtreService ? true : false;
    if (this.isOnFiltrePage) {//Si on est sur la page de choix de l'activité
      this.filtreService.activites$.subscribe(activites => {
        this.activites = activites;
        this.markerPositions = []
        console.log("ici");
        console.log(this.activites);
        this.fetchMarkers(this.activites);
      })
    } else { // Si on est sur la page d'une activité
      this.zoom = 13;
      this.width = "400";
      this.height = "220";
      this.activites.push(this.activite);
      this.markerPositions = []
      this.fetchMarkers(this.activites);
    }


  }

  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };

  /*ngOnChanges(changes: SimpleChanges) {
    if (changes['activities']) {
      //console.log("Heyyyyyyyyy");
      this.fetchMarkers(this.activities);
    }
  }*/


  /* Attribue un marker à chaque activité.
  S'il le servcice geocode rate, mets un marker dans l'océan à la place.
  L'appel à geocodeAddress est asynchrone, donc on utilise Promise.all pour attendre que tous les appels soient terminés.
  L'api map en elle même ne coute pas grand chose, mais les appels à l'api geocode coûtent beaucoup plus cher.
  Idéalement, on devrait l'appeler une seule fois pour stocker les coordonnées des adresses dans la base de données, mais pour l'instant, on fait comme ça.
  */
  fetchMarkers(this: any, activities: Activite[]) {
    Promise.all(activities.map(activite => this.geocodingService.geocodeAddress(activite.adresse).toPromise()))
      .then(responses => {
        const markers: { lat: any; lng: any; }[] = [];
        responses.forEach(response => {
          if (response.status !== 'OK') {
            markers.push({
              lat: 0,
              lng: 0,
            });
            console.log('Geocode was not successful for the following reason: ' + response.status);
          } else {
            const location = response.results[0].geometry.location;
            markers.push({
              lat: location.lat,
              lng: location.lng,
            });
          }
        });
        this.markerPositions = markers;
      })
      .catch(error => {
        console.error('Error fetching markers:', error);
      });
  }


  // Affiche les info du marker cliqué
  openInfoWindow(index: number) {
    if (this.isOnFiltrePage) {
      this.selectedActivite = this.activites[index];
      //console.log(this.selectedActivite);
    }
  }

  // Formate le contenu des infos du resto
  formatInfoWindowContent(activite: Activite): string {
    return `
      <div style="font-size: 16px; color: #333;">
        <h2 style="font-size: 24px;">${activite.name}</h2>
        <img src="${activite.img}" alt="${activite.name}" style="width: 200px; height: auto; margin-bottom: 10px;">
        <p style="margin: 0;"><strong>Adresse:</strong> ${activite.adresse}</p>
        <p style="margin: 0;"><strong>Score:</strong> ${activite.moyenne}</p>
      </div>
    `;
  }

  // Accède à la page de l'activité
  goToActivite(id: number) {
    // console.log('gone !');
    this.router.navigate([this.sectionService.getAdresseDahu() + '/activite/' + id]);
  }

  /* initMap() {
     const mapOptions = {
       center: { lat: 45.2, lng: 5.7 },
       zoom: 11,
       
     };
 
     this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
   }*/

  // Récupère une adresse 
  /*geocode(address: string) {
    this.geocodingService.geocodeAddress(address)
      .subscribe(response => {
        console.log(response);
      });
  }*/
}
