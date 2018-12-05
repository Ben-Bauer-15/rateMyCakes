import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http : HttpClient) {

   }

   getAllCakes(){
     return this._http.get('/allCakes')
   }

   makeNewCake(obj){
     return this._http.post('/newCake', obj)
   }

   makeNewReview(obj){
     return this._http.post('/newRating', obj)
   }
}
