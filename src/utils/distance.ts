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

    return R * c;
}