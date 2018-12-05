import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'public';
  allCakes;
  newCake;
  newReview;
  currentCakeForNested;
  constructor(private _httpService : HttpService){
  }

  ngOnInit(){
    this.allCakes = []
    this.currentCakeForNested = {id : "", ratings : []}
    this.newCake = {baker : "", url : ""}
    this.newReview = {stars : "", comment : "", id : ""}
    this.getAllCakes()
  }

  getAllCakes(){
    var self = this
    let allCakes = this._httpService.getAllCakes()
    allCakes.subscribe(function(data) {
      self.allCakes = data.data
      for (var i = 0; i < self.allCakes.length; i++){
        var sumStars = 0
        for (var j = 0; j < self.allCakes[i].ratings.length; j++){
          sumStars += self.allCakes[i].ratings[j].stars
        }
        if (sumStars == 0){
          self.allCakes[i].avgStars = 0
        }
        else {
          self.allCakes[i].avgStars = sumStars/self.allCakes[i].ratings.length
        }
      }
      console.log(self.allCakes)
    })
  }

  makeNewCake(){
    var self = this
    let myCake = this._httpService.makeNewCake(this.newCake)
    myCake.subscribe(function(data){
      self.allCakes.push(data.data)
      console.log(self.allCakes)
    })
    this.newCake = {baker : "", url : ""}
  }

  addNewReview(id){
    this.newReview.id = id
    this.computeAverageReviews(id, this.newReview.stars)
    let myReview = this._httpService.makeNewReview(this.newReview)
    myReview.subscribe(function(data){
    })
    this.newReview = {stars : "", comment : ""}
  }

  viewCake(id){
    for (var i = 0; i < this.allCakes.length; i++){
      if (this.allCakes[i]._id == id){
        this.currentCakeForNested = this.allCakes[i]
      }
    }
    console.log(this.currentCakeForNested)
  }

  computeAverageReviews(id, stars){
    for (var i = 0; i < this.allCakes.length; i++){
      if (this.allCakes[i]._id == id){
        var sumStars = 0
        for (var j = 0; j < this.allCakes[i].ratings.length; j++){
          sumStars += this.allCakes[i].ratings[j].stars
        }
        sumStars += parseInt(stars)
        console.log(sumStars)
        this.allCakes[i].avgStars = (sumStars / (this.allCakes[i].ratings.length + 1))
        console.log(this.allCakes[i].avgStars)
      }
    }
  }
}
