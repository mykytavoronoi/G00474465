import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonItem, IonInput, IonButton, IonThumbnail} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Movie } from '../services/movie';
import { JsonPipe } from '@angular/common'; // 1. Add this import

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonItem, IonInput, IonButton, IonThumbnail, JsonPipe],
})
export class HomePage implements OnInit{

searchQuery = '';
movies: any[] = [];

constructor(private movie: Movie, private router: Router) {}

  ngOnInit() {
    this.loadTrending();
  }

  loadTrending() {
    this.movie.getTrending().subscribe((data: any) => {
      this.movies = data.results;
    });
  }}
