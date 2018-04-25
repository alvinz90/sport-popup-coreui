# SportPopup coreui version

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

The Sport Popup Demo is a mini app (Angular 5 / CoreUI) within a popup (Dialog) implementing the service - consumer data flow; it would call the Reddit service, retrieve sports news data, and render it as a item list for selecting; after the user selecting the sport news item, the page focus would come back to the home page with the selected sport news data, and render the page with the data details. 

## Reference links

* [Angular](https://angular.io/) - Angular Official site

* [CoreUI](https://coreui.io/) - CoreUI Official site

* [Firebase Console](https://console.firebase.google.com/) - Google Firebase Console

* [Live Demo](https://sport-popup-coreui.firebaseapp.com/) - It's been deploy to Google Firebase website: https://sport-popup-coreui.firebaseapp.com/

### Desktop screenshots
<img src='https://raw.githubusercontent.com/alvinz90/sport-popup-coreui/master/screenshots/sport-popup-coreui-screenshot-desktop001.png' width='30%'></img> 
<img src='https://raw.githubusercontent.com/alvinz90/sport-popup-coreui/master/screenshots/sport-popup-coreui-screenshot-desktop002.png' width='30%'></img> 
<img src='https://raw.githubusercontent.com/alvinz90/sport-popup-coreui/master/screenshots/sport-popup-coreui-screenshot-desktop003.png' width='30%'></img> 

### iPhone screenshots
<img src='https://raw.githubusercontent.com/alvinz90/sport-popup-coreui/master/screenshots/sport-popup-coreui-screenshot-iphone001.PNG' width='30%'></img> 
<img src='https://raw.githubusercontent.com/alvinz90/sport-popup-coreui/master/screenshots/sport-popup-coreui-screenshot-iphone002.jpg' width='30%'></img> 
<img src='https://raw.githubusercontent.com/alvinz90/sport-popup-coreui/master/screenshots/sport-popup-coreui-screenshot-iphone003.jpg' width='30%'></img> 

## Development server

Assuming the node.js (nodejs.org)is installed.

Get the source code of this project by `Clone or download`.

Open the Node.js command window, run `npm i` get all the needed packages into the 'node_modules' folder.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Steps of creating an Angular / CoreUI project like this

### 1) Create an Angular project

Open the Node.js command window, and these commands:

```
ng new sport-popup-coreui --style=scss
cd sport-popup-coreui
ng serve
```

So this would create the project and launch it on `http://localhost:4200/`. 

* **Note** - To make it working for IE 11 browser, you need to un-comment the lines in `src/polyfills.ts`, un-comment the section of lines below this line:

```
IE9, IE10 and IE11 requires all of the following polyfills.
```

### 2) Installed the Angular / CoreUI packages

Run these commands:

```
npm i @coreui/angular --save
npm i ngx-bootstrap --save
```
### 3) Import / CoreUI packages

Update `app.module.ts` to import the CoreUI packages:

```
import { ModalModule } from 'ngx-bootstrap/modal';
```

And for the `@NgModule`:

```
@NgModule({
  ...
  imports: [
    ...,
    ModalModule.forRoot()
  ],
  ...
})
```
### 3) Theme

Add coreui theme into `styles.scss`:
```
@import "~@coreui/coreui/scss/coreui";
```

### 4) Creating new components
Run `ng generate component component-name` to generate a new component; for example:

```
ng g component home
```
### 5) Creating service

Please take a look into this file `src/app/services/reddit.service.ts`.

### 6) Popup / Dialog implementation

Basically the app flow is the home page would load the data by calling the reddit service, the popup / modal has been pre-rendered by the list of sport news data binding, the popup would show by a click event. 

Please look into `home.component.ts` (Home page type script) `home.component.html` (home page html file including the modal div within an ng template) for the details of the implementation.

.ts:
```
  public openModal(template: TemplateRef<any>) {
	//...
	this.modalRef = this.modalService.show(template); 
  } 
```

.html:
```
  <button type="button" class="btn btn-info" data-toggle="modal" (click)="openModal(popup_sport)">
	  Get Sport News
  </button>
  .
  .
  .
  <ng-template #popup_sport>
	.
	.
	.
  </ng-template>	
```

### 7) Popup / Modal databinding & row clicking event

After getting the dataset of sport news, it would bind the array of sport items into the `mat-list-item`:

```
<tr *ngFor="let item of items" class="table-row" (click)="onRowClicked(item)" >
```

And the onRowClicked event will pass back the selected item back to the home page:

```
  onRowClicked(item) {
    this.sport = item;
	.
	.
	.
    this.modalRef.hide();
  }
```

### 8) Other notes

Sometimes it might be troublesome to render a video url in the web page, the approach I found is that by putting the video url in the iframe tag with a function:

```
        <iframe [src]='photoURL()' width="80%" class="video-center"  frameborder="0"
          webkitallowfullscreen mozallowfullscreen allowfullscreen>
        </iframe> 
```

And this function `photoURL` would format the video url so it could successfully get the stream feed back correctly:

```
  constructor(private redditService:RedditService, 
    private modalService: BsModalService,
    private sanitizer: DomSanitizer) { }
.
.
.

  photoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.video_url);
  }
  
```

## Firebase deployment

There'are a lot of samples / tutorials out there (including its official site: ) 
* [Firebase](https://firebase.google.com/)

This reference link below is very helpful:

* [Firebase Deployment tutorial] (https://scotch.io/tutorials/deploying-an-angular-cli-app-to-production-with-firebase) follow the steps to make one of your own great website;-).

Basic steps:

* 1) Create a project @ https://console.firebase.google.com/ for example in this case: sport-popup-coreui
* 2) Install the Firebase Tools (only need to install it once for your machine)
```
npm install -g firebase-tools
```
* 3) Login to Firebase
```
firebase login
```
* 4) link our local Angular app to our Firebase app
```
cd sport-popup-coreui
firebase init
```
** 4.1)Select 'Hosting'
** 4.2)Select the firebase project just created above
** 4.3)input 'dist' as your public directory (this is the Angular build directory)
** 4.4)set it as Single page app

* 5) build the Angular app
```
ng build --prod
```

* 6) Deploy to Firebase
```
firebase deploy
```
* 7) Done & enjoy:

https://sport-popup-coreui.firebaseapp.com



