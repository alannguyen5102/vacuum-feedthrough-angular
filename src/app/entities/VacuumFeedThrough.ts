import { Wire } from "./Wire";
import { FeedThrough } from "./FeedThrough";

export class VacuumFeedThrough {
    private _wire: Wire;
    private _feedThrough: FeedThrough;

    constructor(wire: Wire, feedThrough: FeedThrough){
        this._wire = wire;
        this._feedThrough = feedThrough;
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
}