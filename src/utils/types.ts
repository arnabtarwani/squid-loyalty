export interface IDistanceQuery {
    lat1: string;
    long1: string;
    limit: number;
    type: string;
}

export interface IDistanceDbRecord {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    type: string;
}