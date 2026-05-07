import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonItem, IonInput, IonButton, IonThumbnail, IonIcon, IonButtons} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Movie } from '../services/movie';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { addIcons } from 'ionicons';
import { heart, home } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [IonHeader, NgFor, FormsModule, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonItem, IonInput, IonButton, IonThumbnail, IonIcon, IonButtons],
})
export class HomePage implements OnInit{
//store the current search input
searchQuery = '';
//list of movies to display
movies: any[] = [];

listTitle = "Today's Trending Movies";


constructor(private movie: Movie, private router: Router) {
  addIcons ({ heart, home});
}
//load trending movies
  ngOnInit() {
    this.loadTrending();
  }
// fetching data from the api
  loadTrending() {
    this.movie.getTrending().subscribe((data: any) => {
      this.movies = data.results;
      this.listTitle = "Today's Trending Movies";
    });
  }
// called when clicked on search button, otherwise show trending movies
  search() {
    if (!this.searchQuery.trim()) {
      this.loadTrending();
      return;
    }
    //search the movies from the query string
    this.movie.searchMovies(this.searchQuery).subscribe((data: any) => {
      this.movies = data.results;
      this.listTitle = `${this.searchQuery} Movies`;
    });
  }
// url builder
   getPoster(path: string): string {
    return this.movie.getPosterLink(path);
  };
  // nav to movie details, store the selected movie in the service
  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details'], { state: { movie } });
  }
// nav to favourites page
  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

}
