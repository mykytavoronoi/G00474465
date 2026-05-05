import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonIcon, IonButton, IonList, IonLabel, IonButtons, IonThumbnail} from '@ionic/angular/standalone';
import { Movie } from '../services/movie';
import { Router } from '@angular/router';
import { Favourites } from '../services/favourites';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonThumbnail, IonIcon, IonItem, IonList, IonLabel]
})
export class MovieDetailsPage implements OnInit {
  movie: any;
  cast: any[] = [];
  crew: any[] = [];
  isFavourite = false;


  constructor(
    private router: Router,
    private movieService: Movie,
    private fav: Favourites
  ) {
    {
  const nav = this.router.getCurrentNavigation();
  if (nav && nav.extras && nav.extras.state) {
  this.movie = nav.extras.state['movie'];
}
}
  }

  ngOnInit() {
    if (this.movie) {
      this.isFavourite = this.fav.isFavourite(this.movie.id);
      this.movieService.getCredits(this.movie.id).subscribe((data: any) => {
        this.cast = data.cast;
        this.crew = data.crew;
      });
    }
  }
toggleFavourite() {
    if (this.isFavourite) {
      this.fav.removeFavourite(this.movie.id);
    } else {
      this.fav.addFavourite(this.movie);
    }
    this.isFavourite = !this.isFavourite;
  }

  getProfile(path: string): string {
    return this.movieService.getPosterLink(path);
  }

  goToPerson(person: any, role: string) {
    this.router.navigate(['/details'], { state: { person, role } });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }
}