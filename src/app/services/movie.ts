import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Movie {
  private api = '9e8962500d1cfb4ac6d47ec70f4dceba';

  
  constructor(private http: HttpClient) {}

  getTrending(): Observable<any> {
    return this.http.get('https://api.themoviedb.org/3/trending/movie/day?api_key=' + this.api);
  }
}