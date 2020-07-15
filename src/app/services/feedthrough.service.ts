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

  constructor() { 

    this.formValues$;

    //Cast FeedThroughOptions from JSON as a FeedThroughInterface
    let options: FeedThroughInterface[] = <FeedThroughInterface[]> FeedThroughOptions;

    //Create Wire and FeedThrough objects to send into VacuumFeedThrough object
    let customerWire: Wire = new Wire(26, 1, 30, 30);
    let customerFeedThrough: FeedThrough = new FeedThrough(options, "kf", "kf16");
    let customerVacuumFeedThrough: VacuumFeedThrough = new VacuumFeedThrough(customerWire, customerFeedThrough);

    console.table(customerVacuumFeedThrough.wire);
    console.table(customerVacuumFeedThrough.feedThrough);
  }

  //Subscribes to formValues$
  subbing(): void {
    this.formValues$.subscribe( value => console.log(value));
  }
}
