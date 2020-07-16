/**
 * Defines a Wire class
 * Wires have
 *  Gauge (AWG)
 *  Number of leads
 *  Length of leads
 *
 * @export
 * @class Wire
 */
export class Wire {

    /*
    Attributes of Wire
    */
    private _gauge: number;
    private _count: number;
    private _lengthVacuum: number;
    private _lengthAtmosphere: number;

    /**
    * Creates an instance of Wire.
    * @param {number} wireGauge
    * @param {number} leadCount
    * @param {number} leadLengthVacuum
    * @param {number} leadLengthAtmosphere
    * @memberof Wire
    */
    constructor(wireGauge: number, leadCount: number, leadLengthVacuum: number, leadLengthAtmosphere: number) {
        this._gauge = wireGauge;
        this._count = leadCount;
        this._lengthVacuum = leadLengthVacuum;
        this._lengthAtmosphere = leadLengthAtmosphere
    }

    /*
    Getter and Setters for Wire
    */
    public get gauge(): number {
        return this._gauge;
    }
    public set gauge(value: number) {
        this._gauge = value;
    }
    
    public get count(): number {
        return this._count;
    }
    public set count(value: number) {
        if (value !== null && value > 0){
            this._count = value;
        }
    }
    
    public get lengthVacuum(): number {
        return this._lengthVacuum;
    }
    public set lengthVacuum(value: number) {
        this._lengthVacuum = value;
    }

    public get lengthAtmosphere(): number {
        return this._lengthAtmosphere;
    }
    public set lengthAtmosphere(value: number) {
        this._lengthAtmosphere = value;
    }
}