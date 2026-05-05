import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Favourites {
  private key = 'favourites';

  getFavourites(): any[] {
    const data = localStorage.getItem(this.key);
  if (data) {
    var parsed = JSON.parse(data);
    var clean = [];
    for (var i = 0; i < parsed.length; i++) {
      if (parsed[i] != null) {
        clean.push(parsed[i]);
  }
  }
  return clean;
} else {
  return [];
  }
}

isFavourite(movieId: any): boolean {
  const favs = this.getFavourites();
  return favs.some(fav => fav.id === movieId);
}
  

addFavourite(movie:any) {
if (!movie || !movie.id) {
  return;
}
if (!this.isFavourite(movie.id)) {
  var favs = this.getFavourites();
  favs.push(movie);
  localStorage.setItem(this.key, JSON.stringify(favs));
}
}

removeFavourite(movieId:any) {
  var favs = this.getFavourites();
  var newFavs = [];
  for (var i = 0; i < favs.length; i++) {
    if (favs[i].id !== movieId) {
      newFavs.push(favs[i]);
    }
  }
  localStorage.setItem(this.key, JSON.stringify(newFavs));
}
}