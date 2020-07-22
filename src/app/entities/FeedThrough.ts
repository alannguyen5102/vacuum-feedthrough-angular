import { FeedThrough as FeedThroughInterface } from '../interfaces/options-interface';
/**
 * Defines a FeedThrough Class
 * FeedThroughs have:
 *  A type: kf, cf, npt
 *  A size
 * 
 *  A part number
 *  A human readable name
 * 
 *  The feedthrough's total length
 *  The feedthrough's inner diameter
 * 
 *  A special em number used in email formatting the width of the image
 *  A image size letter which can be A or B
 * 
 *  The constructor takes in a type and size to generate the rest of the attributes
 *  Based on the options.json
 *      
 *
 * @export
 * @class FeedThrough
 */
export class FeedThrough {

    /*
    Attributes of FeedThrough
    */
    private _type: string;
    private _size: string;

    private _partNumber: string;
    private _partName: string;

    private _totalLength: number;
    private _innerDiameter: number;
    private _outerDiameter: number;
    private _atmosphereOuterDiameter: number;

    private _emNumber: number;
    private _imageSizeLetter: string;

    private _maxLeads: { [key: string]: number; };
    
    private _options: FeedThroughInterface[];

    /**
     *Creates an instance of FeedThrough.
     *Takes in a type and size to generate the rest of the attributes
     * @param {*} options
     * @param {string} feedThroughType
     * @param {string} feedThroughSize
     * @memberof FeedThrough
     */
    constructor(options: FeedThroughInterface[], feedThroughType: string, feedThroughSize: string) {
        this._type = feedThroughType;
        this._size = feedThroughSize;
        this._options = options;

        //Generates the rest of the attributes
        this.updateDependantAttributes();
    }

    public updateDependantAttributes(): void {
        //Generates the rest of the attributes
        this._partNumber = this.getInfo(this._options, "partNumber");
        this._partName = this.getInfo(this._options, "partName");

        this._totalLength = this.getInfo(this._options, "totalLength");
        this._innerDiameter = this.getInfo(this._options, "innerDiameter");
        this._outerDiameter = this.getInfo(this._options, "outerDiameter");
        this._atmosphereOuterDiameter = this.getInfo(this._options, "atmosphereOuterDiameter");

        this._emNumber = this.getFeedThroughNumber();
        this._imageSizeLetter = this.getInfo(this._options, "leadImageSize");
        this._maxLeads = this.getInfo(this._options, "compatibleGaugesCapacity");
    }

    /*
    Getter and Setters for FeedThrough
    */
    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }

    public get size(): string {
        return this._size;
    }
    public set size(value: string) {
        this._size = value;
    }

    public get partNumber(): string {
        return this._partNumber;
    }
    public set partNumber(value: string) {
        this._partNumber = value;
    }

    public get partName(): string {
        return this._partName;
    }
    public set partName(value: string) {
        this._partName = value;
    }

    public get totalLength(): number {
        return this._totalLength;
    }
    public set totalLength(value: number) {
        this._totalLength = value;
    }
    
    public get innerDiameter(): number {
        return this._innerDiameter;
    }
    public set innerDiameter(value: number) {
        this._innerDiameter = value;
    }

    public get outerDiameter(): number {
        return this._outerDiameter;
    }
    public set outerDiameter(value: number) {
        this._outerDiameter = value;
    }

    public get atmosphereOuterDiameter(): number {
        return this._atmosphereOuterDiameter;
    }
    public set atmosphereOuterDiameter(value: number) {
        this._atmosphereOuterDiameter = value;
    }
    
    public get emNumber(): number {
        return this._emNumber;
    }
    public set emNumber(value: number) {
        this._emNumber = value;
    }

    public get imageSizeLetter(): string {
        return this._imageSizeLetter;
    }
    public set imageSizeLetter(value: string) {
        this._imageSizeLetter = value;
    }

    public get maxLeads(): { [key: string]: number; } {
        return this._maxLeads;
    }
    public set maxLeads(value: { [key: string]: number; }) {
        this._maxLeads = value;
    }

    /**
     * Returns the Part Info for the Feed Through
     * listFeedThrough is a JSON from options.json
     * partData is a string that is a key from options.json
     *
     * @param {*} listFeedThrough
     * @param {string} partData
     * @returns {*}
     * @memberof FeedThrough
     */
    getInfo(listFeedThrough: FeedThroughInterface[], partData: string): any {
        //Search for the part number given a list of Feed Throughs and a selected type/size

        //Loop through the feed throughs
        for (let i in listFeedThrough) {

            //Found a matching type
            if (listFeedThrough[i].typeID === this._type) {

                //Loop through the part sizes
                for (let j in listFeedThrough[i].partList) {

                    //Found a matching size
                    if (listFeedThrough[i].partList[j].partID === this._size) {

                        //Returns the part data
                        return listFeedThrough[i].partList[j][partData];
                    }
                }
            }
        }

        //Returns a error string if it cannot find the matching type and size
        return "Error: Cannot find Feed Through Data";
    }

    /**
     * Returns the number of ems for the email image preview feature
     * Uses the FeedThrough's type to return a number for the width attribute of the feedthrough image in the email as an em
     *
     * @returns {number}
     * @memberof FeedThrough
     */
    getFeedThroughNumber(): number {

        //Switch case between the three types of feed throughs
        switch (this._type) {
            case "kf":
                return 7;
            case "cf":
                return 13;
            case "npt":
                return 6;
            default:
                return 6;
        }
    }
}