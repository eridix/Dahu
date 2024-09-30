import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private readonly API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) {}

  geocodeAddress(address: string): Observable<any> {
    const params = {
      address: address,
      key: 'AIzaSyBfhdDJIzKcVgREkEfG5oG7NZ3H7PdR2yU' // Replace with your Google Maps API key
    };
    return this.http.get<any>(this.API_URL, { params });
  }
  
  geocodeAddresses(addresses: string[]): Observable<any[]> {
    const geocodeRequests: Observable<any>[] = addresses.map(address =>
      this.http.get<any>(this.API_URL, { params: { address: address, key: 'AIzaSyBfhdDJIzKcVgREkEfG5oG7NZ3H7PdR2yU' } })
    );
    return forkJoin(geocodeRequests);
  }
}