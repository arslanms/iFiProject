import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  movies: FirebaseListObservable<any>;


  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public alertController: AlertController) {
  	this.movies = db.list('/Movies');
  }

  addMovie()	{
  	let prompt = this.alertController.create({
  		title: 'Add a New Movie',
  		message: 'Enter the respective fields',
  		inputs: [
  		{
  			name: 'title',
  			placeholder: 'Movie Title'
  		},
  		{
  			name: 'date',
  			placeholder: 'Movie Release Date'
  		},
  		{
  			name: 'description',
  			placeholder: 'Enter a Movie Quote'
  		}
  		],
  		buttons: [
  		{
  			text: 'Cancel',
  			handler: data =>	{
  				console.log("Cancel clicked.");
  			}
  		},
  		{
  			text: 'Save Movie',
  			handler: data =>	{
  				this.movies.push({
  					title: data.title,
  					likes: 0,
  					dislikes: 0,
  					description: data.description,
  					date: data.date,
  					image: "https://firebasestorage.googleapis.com/v0/b/ifi-project-d10cd.appspot.com/o/noimage.png?alt=media&token=bf83230c-307b-4c89-ab22-6db0eda4c69a"
  				});
  			}
  		}
  		]
  	});
  	prompt.present();
  }

  upvoteMovie(movie)	{
  	let movieUpvotes = movie.likes;
  	this.movies.update(movie.$key,	{
  		likes: movieUpvotes + 1
  	});
  }

   downvoteMovie(movie)	{
  	let movieDownvotes = movie.dislikes;
  	this.movies.update(movie.$key,	{
  		dislikes: movieDownvotes + 1
  	});
  }

  openLink()  {
    window.open("http://www.fandango.com/", "_system");
  }



}
