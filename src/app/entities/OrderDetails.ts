/**
 * OrderDetails is a class that serves as the basis of customer orders
 * Orders have:
 *  Quantity of product requested
 *  Notes about the product
 *  The customer's email if present
 *  The customer's telephone if present
 * 
 *
 * @export
 * @class OrderDetails
 */
export class OrderDetails {
    
    /*
    Attributes of OrderDetails
    */
    private _quantity: number;
    private _customerNotes: string;
    private _email: string;
    private _telephone: string;
    
    /**
    * Creates an instance of OrderDetails.
    * @param {number} quantity
    * @param {string} customerNotes
    * @param {string} email
    * @param {string} telephone
    * @memberof OrderDetails
    */
    constructor(quantity: number, customerNotes: string, email: string, telephone: string) {
        this._quantity = quantity;
        this._customerNotes = customerNotes;
        this._email = email;
        this._telephone = telephone;
    }

    /*
    Getter and Setters for OrderDetails
    */
    public get quantity(): number {
        return this._quantity;
    }
    public set quantity(value: number) {
        this._quantity = value;
    }

    public get customerNotes(): string {
        return this._customerNotes;
    }
    public set customerNotes(value: string) {
        this._customerNotes = value;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get telephone(): string {
        return this._telephone;
    }
    public set telephone(value: string) {
        this._telephone = value;
    }
    
}