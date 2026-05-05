import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonItem, IonInput, IonButton, IonThumbnail, IonIcon, IonButtons} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Movie } from '../services/movie';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import { heart, home } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [IonHeader, NgFor, NgIf, FormsModule, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonItem, IonInput, IonButton, IonThumbnail, JsonPipe, IonIcon, IonButtons],
})
export class HomePage implements OnInit{

searchQuery = '';
movies: any[] = [];
listTitle = "Today's Trending Movies";


constructor(private movie: Movie, private router: Router) {
  addIcons ({ heart, home});
}

  ngOnInit() {
    this.loadTrending();
  }

  loadTrending() {
    this.movie.getTrending().subscribe((data: any) => {
      this.movies = data.results;
      this.listTitle = "Today's Trending Movies";
    });
  }

  search() {
    if (!this.searchQuery.trim()) {
      this.loadTrending();
      return;
    }
    this.movie.searchMovies(this.searchQuery).subscribe((data: any) => {
      this.movies = data.results;
      this.listTitle = `${this.searchQuery} Movies`;
    });
  }

   getPoster(path: string): string {
    return this.movie.getPosterLink(path);
  };
  
  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details'], { state: { movie } });
  }

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

}
