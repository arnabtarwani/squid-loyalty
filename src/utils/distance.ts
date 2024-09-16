/** 
 * @function calculateDistance function calculates the distance between two points on the earth's surface.
 * The function takes four arguments, the latitude and longitude of the first point and the latitude and longitude of the second point.
 * It returns the distance between the two points in kilometers. The function uses the Haversine formula to calculate the distance.
*/

// Reference: https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
export const calculateDistance = (lat1: number, long1: number, lat2: number, long2: number) => {
    const R = 6371; // KM radius of the earth
    const deg2RadLat = lat1 * Math.PI / 180;
    const deg2RadLong = lat2 * Math.PI / 180;
    const deltaLat = (lat2 - lat1) * Math.PI / 180;
    const deltaLong = (long2 - long1) * Math.PI / 180;
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(deg2RadLat) * Math.cos(deg2RadLong) *
        Math.sin(deltaLong / 2) * Math.sin(deltaLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}