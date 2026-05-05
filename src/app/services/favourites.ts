import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Favourites {
  private key = 'favourites';

  getFavourites(): any[] {
    const data = localStorage.getItem(this.key);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
  }

 isFavourite(movieId:any) {
  var favs = this.getFavourites();
  for (var i = 0; i < favs.length; i++) {
    if (favs[i].id === movieId) {
      return true;
    }
  }
  return false;
}

addFavourite(movie:any) {
  var favs = this.getFavourites();
  var alreadyExists = false;
  for (var i = 0; i < favs.length; i++) {
    if (favs[i].id === movie.id) {
      alreadyExists = true;
      break;
    }
  }
  if (!alreadyExists) {
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