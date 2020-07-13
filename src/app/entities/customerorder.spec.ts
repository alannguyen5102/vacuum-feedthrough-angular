import { VacuumFeedThrough } from "./VacuumFeedThrough";
import { Wire } from "./Wire";
import { FeedThrough } from "./FeedThrough";
import { OrderDetails } from "./OrderDetails";
import { VacuumFeedThroughOrderDetails } from "./VacuumFeedThroughOrderDetails";

const optionsFT = require('../json/options.json');

var newWire: Wire = new Wire(12, 3, 4, 5);
var newFeedThrough: FeedThrough = new FeedThrough(optionsFT, "cf", "cf0337");
var newVacuumFeedThrough: VacuumFeedThrough = new VacuumFeedThrough(newWire, newFeedThrough);
var newOrderDetails: OrderDetails = new OrderDetails(3, "Hey", "alan@gmail.com", "");
var newVacuum: VacuumFeedThroughOrderDetails = new VacuumFeedThroughOrderDetails(newOrderDetails, newVacuumFeedThrough, "app", "12", "23", "300", "12");



console.log(newVacuum.vacuumFeedThrough.getFeedThroughImage() + " " + ("/images/visuals/cf/hn-0337.PNG" === newVacuum.vacuumFeedThrough.getFeedThroughImage()));
console.log(newVacuum.vacuumFeedThrough.getLeadImage() + " " + ("/images/visuals/leads/B/12G-B-3.PNG" === newVacuum.vacuumFeedThrough.getLeadImage()));

var newWire: Wire = new Wire(12, 3, 4, 5);
var newFeedThrough: FeedThrough = new FeedThrough(optionsFT, "npt", "2-1/2MNPT");
var newVacuumFeedThrough: VacuumFeedThrough = new VacuumFeedThrough(newWire, newFeedThrough);
var newVacuum: VacuumFeedThroughOrderDetails = new VacuumFeedThroughOrderDetails(newOrderDetails, newVacuumFeedThrough, "app", "12", "23", "300", "12");

console.log(newVacuum.vacuumFeedThrough.getFeedThroughImage() + " " + ("/images/visuals/npt/4464K176.PNG" === newVacuum.vacuumFeedThrough.getFeedThroughImage()));
console.log(newVacuum.vacuumFeedThrough.getLeadImage() + " " + ("/images/visuals/leads/B/12G-B-3.PNG" === newVacuum.vacuumFeedThrough.getLeadImage()));

var newWire: Wire = new Wire(12, 6, 40, 6);
var newFeedThrough: FeedThrough = new FeedThrough(optionsFT, "kf", "kf40");
var newVacuumFeedThrough: VacuumFeedThrough = new VacuumFeedThrough(newWire, newFeedThrough);
var newVacuum: VacuumFeedThroughOrderDetails = new VacuumFeedThroughOrderDetails(newOrderDetails, newVacuumFeedThrough, "app", "12", "23", "300", "12");

console.log(newVacuum.vacuumFeedThrough.getFeedThroughImage() + " " + ("/images/visuals/kf/qf40-150-lft.PNG" === newVacuum.vacuumFeedThrough.getFeedThroughImage()));
console.log(newVacuum.vacuumFeedThrough.getLeadImage() + " " + ("/images/visuals/leads/B/12G-B-MAX.PNG" === newVacuum.vacuumFeedThrough.getLeadImage()));

console.log(newVacuum);
console.log(newVacuum.email);
console.log(newVacuum.vacuumFeedThrough.wire.gauge);