import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Favourites } from '../services/favourites';
import { Movie } from '../services/movie';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class FavouritesPage implements OnInit {
  // stores the list of fav movies from localStorage
  favourites: any[] = [];

  constructor(
    private fav: Favourites,
    private movie: Movie,
    private router: Router
  ) {}
// load the favourites list
  ngOnInit() {
    this.favourites = this.fav.getFavourites();
  }
//  url builder from movie.ts
  getPoster(path: string): string {
    return this.movie.getPosterLink(path);
  }
// Nav to movie details page / uses router state to store the selected movies
  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details'], { state: { movie } });
  }
// Nav to homepage
  goHome() {
    this.router.navigate(['/home']);
  }
}