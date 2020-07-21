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
  public outerDiameter: number;
  public outerDiameterOutput: string;
  public atmosphereDiameter: number;

  public leadLengthVacuum: number;
  public leadLengthAtmosphere: number;

  //Observable
  public objectValues$: Observable<any>;

  //Injecting FeedThroughService
  constructor(private feedThroughService: FeedThroughService) {
    this.updatePreview();
   }

  ngOnInit(): void {

    //Sets product-preview's Observable to FeedThroughService's Observable
    //When value changes, call changeImage()
    this.objectValues$ = this.feedThroughService.formValues$;
    this.objectValues$.subscribe( value => this.updatePreview());

  }
  updatePreview(): void {
    this.changeImage();
    this.updateMeasurements();
  }

  //Calls VacuumFeedThrough class to change the wire and feedthrough images
  changeImage(): void {
    this.imagePathFeedThrough = this.extraPathName + this.feedThroughService.customerVacuumFeedThrough.getFeedThroughImage();
    this.imagePathWire = this.extraPathName + this.feedThroughService.customerVacuumFeedThrough.getLeadImage();
  }

  updateMeasurements(): void {
    this.totalLength = this.feedThroughService.customerVacuumFeedThrough.feedThrough.totalLength;
    this.outerDiameter = this.feedThroughService.customerVacuumFeedThrough.feedThrough.outerDiameter;
    this.outerDiameterOutput = this.getLengthVacuumString(this.feedThroughService.customerVacuumFeedThrough.feedThrough.type);
    this.atmosphereDiameter = this.feedThroughService.customerVacuumFeedThrough.feedThrough.atmosphereOuterDiameter;
    
    this.leadLengthVacuum = this.feedThroughService.customerVacuumFeedThrough.wire.lengthVacuum;
    this.leadLengthAtmosphere = this.feedThroughService.customerVacuumFeedThrough.wire.lengthAtmosphere;
  }

  getLengthVacuumString(type: string): string {
    if (type === "npt") {
      return this.feedThroughService.customerVacuumFeedThrough.feedThrough.partName;
    }
    else {
      return "OD: ⌀" + this.feedThroughService.customerVacuumFeedThrough.feedThrough.outerDiameter + "\"";
    }
  }

}
