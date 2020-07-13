import { OrderDetails } from "./OrderDetails";
import { VacuumFeedThrough } from "./VacuumFeedThrough";

/**
 * Defines a VacuumFeedThroughOrderDetails class
 * Vacuum FeedThroughs contain a Feedthrough and a Wire that goes through it in a vacuum
 * This class contains functions to generate image paths for the vacuum feedthrough
 * It extends the OrderDetail class
 *
 * @export
 * @class VacuumFeedThroughOrderDetails
 * @extends {OrderDetails}
 */
export class VacuumFeedThroughOrderDetails extends OrderDetails {

    /*
    Attributes of VacuumFeedThroughOrderDetails
    */
    private _vacuumFeedThrough: VacuumFeedThrough;

    private _applicationNotes: string;

    private _minOperatingTemperature: string;
    private _maxOperatingTemperature: string;

    private _maxFeedThroughExposureTemperature: string;
    private _durationFeedThroughExposureTemperature: string;

    /**
    * Creates an instance of VacuumFeedThroughOrderDetails.
    * @param {OrderDetails} orderDetails
    * @param {VacuumFeedThrough} vacuumFeedThrough
    * @param {string} applicationNotes
    * @param {string} minOperatingTemperature
    * @param {string} maxOperatingTemperature
    * @param {string} maxFeedThroughExposureTemperature
    * @param {string} durationFeedThroughExposureTemperature
    * @memberof VacuumFeedThroughOrderDetails
    */
    constructor(orderDetails: OrderDetails,
                vacuumFeedThrough: VacuumFeedThrough, 
                applicationNotes: string, 
                minOperatingTemperature: string, 
                maxOperatingTemperature: string,
                maxFeedThroughExposureTemperature: string,
                durationFeedThroughExposureTemperature: string) {
        super(orderDetails.quantity, orderDetails.customerNotes, orderDetails.email, orderDetails.telephone);

        this._vacuumFeedThrough = vacuumFeedThrough;

        this._applicationNotes = applicationNotes;

        this._minOperatingTemperature = minOperatingTemperature;
        this._maxOperatingTemperature = maxOperatingTemperature;

        this._maxFeedThroughExposureTemperature = maxFeedThroughExposureTemperature;
        this._durationFeedThroughExposureTemperature = durationFeedThroughExposureTemperature;
    
    }
    
    /*
    Getter and Setters for VacuumFeedThroughOrderDetails
    */

    public get vacuumFeedThrough(): VacuumFeedThrough {
        return this._vacuumFeedThrough;
    }
    public set vacuumFeedThrough(value: VacuumFeedThrough) {
        this._vacuumFeedThrough = value;
    }

    public get applicationNotes(): string {
        return this._applicationNotes;
    }
    public set applicationNotes(value: string) {
        this._applicationNotes = value;
    }

    public get minOperatingTemperature(): string {
        return this._minOperatingTemperature;
    }
    public set minOperatingTemperature(value: string) {
        this._minOperatingTemperature = value;
    }

    public get maxOperatingTemperature(): string {
        return this._maxOperatingTemperature;
    }
    public set maxOperatingTemperature(value: string) {
        this._maxOperatingTemperature = value;
    }

    public get maxFeedThroughExposureTemperature(): string {
        return this._maxFeedThroughExposureTemperature;
    }
    public set maxFeedThroughExposureTemperature(value: string) {
        this._maxFeedThroughExposureTemperature = value;
    }

    public get durationFeedThroughExposureTemperature(): string {
        return this._durationFeedThroughExposureTemperature;
    }
    public set durationFeedThroughExposureTemperature(value: string) {
        this._durationFeedThroughExposureTemperature = value;
    }
}