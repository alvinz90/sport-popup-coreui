import { Component, Inject, TemplateRef } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {DomSanitizer} from '@angular/platform-browser';
import {RedditService} from '../services/reddit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [RedditService, BsModalRef, ModalDirective]
})
export class HomeComponent {
  public modalRef: BsModalRef; // {1}

  sport: any;
  video_url: any;
  items: any;
  isLoading: any;

  constructor(private redditService:RedditService, 
    private modalService: BsModalService,
    private sanitizer: DomSanitizer) { }

  photoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.video_url);
  }

  ngOnInit() {
    console.log('888999 1001 b - ngOnInit');
    this.getPosts('sports', 20);
  }

  public openModal(template: TemplateRef<any>) {
    this.sport = null;
    this.video_url = null;
    this.modalRef = this.modalService.show(template); 
  }  

  getPosts(category, limit) {
    this.isLoading = true;
    this.redditService.getPosts(category, limit).subscribe(response => {
      console.log('Getting sports news... 003');
      console.log(response);
      this.items = response.data.children;
      this.isLoading = false;
    });
  }

  onRowClicked(item) {

    this.sport = item;
    console.log('sport is');
    console.log(this.sport);
    if (null != this.sport && 
      null != this.sport.data &&
      null != this.sport.data.preview &&
      null != this.sport.data.preview.reddit_video_preview &&
      null != this.sport.data.preview.reddit_video_preview.fallback_url 
    ) {
      this.video_url = this.sport.data.preview.reddit_video_preview.fallback_url;
    } else {
      this.video_url = null;
    }
    
    console.log(this.video_url);

    this.modalRef.hide();

  }

}
