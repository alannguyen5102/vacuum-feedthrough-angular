import { Component, OnInit } from '@angular/core';
import { FeedThroughService } from 'src/app/services/feedthrough.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})

export class ProductPreviewComponent implements OnInit {
  private extraPathName: string = "/assets";
  public imagePathFeedThrough: string = this.extraPathName + "/images/visuals/kf/qf10-050-lf.PNG";
  public objectValues$: Observable<any>;
  constructor(private feedThroughService: FeedThroughService) { }

  ngOnInit(): void {
    this.objectValues$ = this.feedThroughService.formValues$;
    this.objectValues$.subscribe( value => this.changeImage());
  }

  changeImage() {
    this.imagePathFeedThrough = this.extraPathName + this.feedThroughService.customerVacuumFeedThrough.getFeedThroughImage();
  }

}
