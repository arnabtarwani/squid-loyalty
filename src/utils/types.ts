export interface IDistanceQuery {
    lat1: number;
    long1: number;
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