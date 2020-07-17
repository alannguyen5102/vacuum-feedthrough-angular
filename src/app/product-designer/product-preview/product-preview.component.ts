import { Component, OnInit } from '@angular/core';
import { FeedThroughService } from 'src/app/services/feedthrough.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})

export class ProductPreviewComponent implements OnInit {

  //String to handle the extra pathing
  private extraPathName: string = "/assets";

  //Two variables to keep the image paths for the feedthrough and wire
  public imagePathFeedThrough: string = this.extraPathName + "/images/visuals/kf/qf16-075-lf.PNG";
  public imagePathWire: string = this.extraPathName + "/images/visuals/leads/A/26G-A-1.PNG";

  public totalLength: number;

  //Observable
  public objectValues$: Observable<any>;

  //Injecting FeedThroughService
  constructor(private feedThroughService: FeedThroughService) { }

  ngOnInit(): void {

    //Sets product-preview's Observable to FeedThroughService's Observable
    //When value changes, call changeImage()
    this.objectValues$ = this.feedThroughService.formValues$;
    this.objectValues$.subscribe( value => this.changeImage());

  }

  //Calls VacuumFeedThrough class to change the wire and feedthrough images
  changeImage() {
    this.imagePathFeedThrough = this.extraPathName + this.feedThroughService.customerVacuumFeedThrough.getFeedThroughImage();
    this.imagePathWire = this.extraPathName + this.feedThroughService.customerVacuumFeedThrough.getLeadImage();
  }

  updateMeasurements() {
    this.totalLength = this.feedThroughService.customerVacuumFeedThrough.feedThrough.totalLength;
  }

}
