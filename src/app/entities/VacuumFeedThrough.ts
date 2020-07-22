import { Wire } from "./Wire";
import { FeedThrough } from "./FeedThrough";
import { EventEmitter } from '@angular/core';

export class VacuumFeedThrough {
    private _wire: Wire;
    private _feedThrough: FeedThrough;
    private _maxLead: number;
    maxLeadChanged: EventEmitter<number> = new EventEmitter();

    constructor(wire: Wire, feedThrough: FeedThrough){
        this._wire = wire;
        this._feedThrough = feedThrough;
        this._maxLead = this.gaugeSelector();
    }

    public get wire(): Wire {
        return this._wire;
    }
    public set wire(value: Wire) {
        this._wire = value;
    }

    public get feedThrough(): FeedThrough {
        return this._feedThrough;
    }
    public set feedThrough(value: FeedThrough) {
        this._feedThrough = value;
    }

    public get maxLead(): number {
        return this._maxLead;
    }
    public set maxLead(value: number) {
        this._maxLead = value;
        this.maxLeadChanged.emit(this._maxLead);
    }

    maxLeadChangedEmitter() {
        return this.maxLeadChanged;
    }

    /**
     * Returns the path of the leads
     * 
     * /images/visuals/leads/B/12G-B-3.PNG
     * /images/visuals/leads/[imageSizeLetter]/[gauge]G-[imageSizeLetter]-[count].PNG
     *
     * @returns {string}
     * @memberof VacuumFeedThrough
     */
    getLeadImage(): string {
        //Assigns a image lead count
        let imageLeadCount: string;
        
        //Set selectedLeadCount to a value for leads more than 4
        //Otherwise convert the wire's count to a string
        if (this._wire.count > 4) {
            imageLeadCount = "MAX";
        }
        else {
            imageLeadCount = this._wire.count.toString();
        }

        //Build a path for leads
        const leadImagePath = "/images/visuals/leads/" + this._feedThrough.imageSizeLetter + "/" + this._wire.gauge + "G-" + this._feedThrough.imageSizeLetter + "-" + imageLeadCount + ".PNG";
        return leadImagePath;
    }

    /**
     * Returns the path of the feed through
     * /images/visuals/cf/hn-0337.PNG
     * /images/visuals/[type]/[partNumber].PNG
     *
     * @returns {string}
     * @memberof VacuumFeedThrough
     */
    getFeedThroughImage(): string {
        //Builds a path for feed throughs
        const feedThroughImagePath = "/images/visuals/" + this._feedThrough.type + "/" + this._feedThrough.partNumber + ".PNG";
        return feedThroughImagePath;
    }

    /**
     * This function will guarantee a gauge would be selected.
     * If somehow a number that is not in the gauge list is passed,
     * it will default to 12
     * 
     * Strange Behavior with keys as a number, have to use as an any and parse to int
     *
     * @param {*} partSizes
     * @param {number} key
     * @returns {number}
     */
    gaugeSelector(): number {
        let selectedMaxLeadCapacity: number;
        const key: string = this._wire.gauge.toString();
        switch (parseInt(key)) {
            case 26:
            case 24:
            case 22:
            case 20:
            case 16:
            case 14:
            case 12:
                selectedMaxLeadCapacity = this._feedThrough.maxLeads[key];
                break;
            default:
                selectedMaxLeadCapacity = this._feedThrough.maxLeads[12];
                break;
        }
        return selectedMaxLeadCapacity;
    }
}