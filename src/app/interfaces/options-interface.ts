export interface Options {
    FeedThrough: FeedThrough[];
    WireGauge:   WireGauge[];
}

export interface FeedThrough {
    typeName: string;
    typeID:   string;
    partList: PartList[];
}

export interface PartList {
    partName:                 string;
    partID:                   string;
    partNumber:               string;
    totalLength:              number;
    innerDiameter:            number;
    outerDiameter:            number;
    atmosphereOuterDiameter:  number;
    leadImageSize:            LeadImageSize;
    compatibleGaugesCapacity: { [key: string]: number };
}

export enum LeadImageSize {
    A = "A",
    B = "B",
}

export interface WireGauge {
    wireName:      string;
    wireID:        number;
    outerDiameter: number;
}
