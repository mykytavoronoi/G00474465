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
  favourites: any[] = [];

  constructor(
    private fav: Favourites,
    private movie: Movie,
    private router: Router
  ) {}

  ngOnInit() {
    this.favourites = this.fav.getFavourites();
  }

  getPoster(path: string): string {
    return this.movie.getPosterLink(path);
  }

  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details'], { state: { movie } });
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}