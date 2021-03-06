import { Injectable } from '@angular/core';
import { VacuumFeedThrough } from "../entities/VacuumFeedThrough";
import { Wire } from "../entities/Wire";
import { FeedThrough } from "../entities/FeedThrough";
import { FeedThrough as FeedThroughOptions}  from "../json/options.json"
import { FeedThrough as FeedThroughInterface } from '../interfaces/options-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedThroughService {

  //Observable from product-field component
  formValues$: Observable<any>;
  //Cast FeedThroughOptions from JSON as a FeedThroughInterface
  private options: FeedThroughInterface[] = <FeedThroughInterface[]> FeedThroughOptions;

  //Create Wire and FeedThrough objects to send into VacuumFeedThrough object
  private customerWire: Wire = new Wire(26, 1, 30, 30);
  private customerFeedThrough: FeedThrough = new FeedThrough(this.options, "kf", "kf16");
  public customerVacuumFeedThrough: VacuumFeedThrough = new VacuumFeedThrough(this.customerWire, this.customerFeedThrough);

  constructor() {  }

  //Subscribes to formValues$
  subbing(): void {
    this.formValues$.subscribe( value => this.updateVacuumFeedThrough(value));
  }

  /**
   * Changes the VacuumFeedThrough object's attributes based on FormGroup's values
   *
   * @param {*} value
   * @memberof FeedThroughService
   */
  updateVacuumFeedThrough(value) {
    // console.log(value);
    // console.log("%c OLD", "background: #222; color: #bada55");
    // console.table(this.customerVacuumFeedThrough.wire);
    // console.table(this.customerVacuumFeedThrough.feedThrough);
    
    
    this.customerVacuumFeedThrough.feedThrough.type = value.feedThroughType;
    this.customerVacuumFeedThrough.feedThrough.size = value.feedThroughSize;

    this.customerVacuumFeedThrough.wire.gauge = value.wireGauge;
    this.customerVacuumFeedThrough.wire.count = value.leadCount;
    this.customerVacuumFeedThrough.wire.lengthVacuum = value.leadLengthVacuum;
    this.customerVacuumFeedThrough.wire.lengthAtmosphere = value.leadLengthAtmosphere;
    this.customerVacuumFeedThrough.feedThrough.updateDependantAttributes();
    this.customerVacuumFeedThrough.maxLead = this.customerVacuumFeedThrough.gaugeSelector();
    
    // console.log("%c NEW", "background: #222; color: #bada55");
    // console.table(this.customerVacuumFeedThrough.wire);
    // console.table(this.customerVacuumFeedThrough.feedThrough);
    // console.table(this.customerVacuumFeedThrough.maxLead);
  }
}
