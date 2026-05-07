import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Movie {
  //my api
  private api = '9e8962500d1cfb4ac6d47ec70f4dceba';
  //stores the currently selected movies and people to navigate between pages
  selectedPerson:any;
  selectedMovie:any;


  constructor(private http: HttpClient) {
  }

//URL builders

getTrending(): Observable<any> {
    return this.http.get('https://api.themoviedb.org/3/trending/movie/day?api_key=' + this.api);
  }
searchMovies(query: string): Observable<any> {
  return this.http.get('https://api.themoviedb.org/3/search/movie?query=' + query + '&api_key=' + this.api);
}

getCredits(movieId: number): Observable<any> {
    return this.http.get('https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=' + this.api);
  }

getPersonDetails(personId: number): Observable<any> {
    return this.http.get('https://api.themoviedb.org/3/person/' + personId + '?api_key=' + this.api);
  }

getPersonMovieCredits(personId: number): Observable<any> {
    return this.http.get('https://api.themoviedb.org/3/person/' + personId + '/movie_credits?api_key=' + this.api);
  } 

  getPosterLink(path: any) {
  if (path) {
    return 'https://image.tmdb.org/t/p/w500' + path;
  } else {
    return '';
  }

}
}