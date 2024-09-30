import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImageApi } from 'src/app/data/api/image-api';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly urlApi = "http://127.0.0.1:8000/api";
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  postImage(file: File): Observable<ImageApi> {
    let cookie = this.cookieService.get('jwtToken')
    if (cookie) {
      const httpOptions = {
        headers: new HttpHeaders(
          // {'Content-Type': 'multipart/form-data',}
        )
      };
      const formData = new FormData();
      formData.append('imageFile', file,file.name);
      return this.http.post<ImageApi>(`${this.urlApi}/images`, formData).pipe(
        tap((response) => this.log(response)),
        catchError((error => this.handleError(error, null))));
    } else {
      return of()
    }
  }

  linkToBackend(imageApi: ImageApi): string {
    console.log(imageApi.imageName)
    return ("../assets/images/" + imageApi.imageName)
  }

  private log(response: any) {
    console.table(response)
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
