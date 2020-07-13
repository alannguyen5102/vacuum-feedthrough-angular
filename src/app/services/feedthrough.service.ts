import { Injectable } from '@angular/core';
import { VacuumFeedThrough } from "../entities/VacuumFeedThrough";
import { Wire } from "../entities/Wire";
import { FeedThrough } from "../entities/FeedThrough";
import { OrderDetails } from "../entities/OrderDetails";
import { VacuumFeedThroughOrderDetails } from "../entities/VacuumFeedThroughOrderDetails";
import { FeedThrough as FeedThroughOptions}  from "../json/options.json"
import { FeedThrough as FeedThroughInterface } from '../interfaces/options-interface';

@Injectable({
  providedIn: 'root'
})
export class FeedThroughService {
  constructor() { 
    let options: FeedThroughInterface[] = <FeedThroughInterface[]> FeedThroughOptions;
    //Create Wire and FeedThrough objects to send into VacuumFeedThroughOrderDetails object
    let customerWire: Wire = new Wire(26, 1, 30, 30);
    let customerFeedThrough: FeedThrough = new FeedThrough(options, "kf", "kf16");
    let customerVacuumFeedThrough: VacuumFeedThrough = new VacuumFeedThrough(customerWire, customerFeedThrough);


    let customerOrderDetails: OrderDetails = new OrderDetails(1, "", "", "");
    let customerVacuumFeedThroughOrderDetails: VacuumFeedThroughOrderDetails = new VacuumFeedThroughOrderDetails(customerOrderDetails, customerVacuumFeedThrough, "", "", "", "", "");
    console.table(customerVacuumFeedThroughOrderDetails.vacuumFeedThrough.wire);
    console.table(customerVacuumFeedThroughOrderDetails.vacuumFeedThrough.feedThrough);
  }

  getTest(): void {
    console.log("getTest");
  }
}
