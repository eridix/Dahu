import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private activitiesSource = new BehaviorSubject<any[]>([]);
  currentActivities = this.activitiesSource.asObservable();

  constructor() { }

  changeActivities(activities: any[]) {
    this.activitiesSource.next(activities);
  }
}