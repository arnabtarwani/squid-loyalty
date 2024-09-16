import { calculateDistance } from '../utils/distance';

describe('calculateDistance', () => {
    it('should calculate the distance between two points correctly', () => {
        const lat1 = 52.5200; // Berlin
        const long1 = 13.4050;
        const lat2 = 48.8566; // Paris
        const long2 = 2.3522;
        const distance = calculateDistance(lat1, long1, lat2, long2);
        expect(distance).toBeCloseTo(877.46, 0); // Distance between Berlin and Paris is approximately 878 km
    });

    it('should return 0 when the two points are the same', () => {
        const lat = 52.5200; // Berlin
        const long = 13.4050;
        const distance = calculateDistance(lat, long, lat, long);
        expect(distance).toBe(0);
    });

    it('should handle negative coordinates correctly', () => {
        const lat1 = -33.8688; // Sydney
        const long1 = 151.2093;
        const lat2 = -37.8136; // Melbourne
        const long2 = 144.9631;
        const distance = calculateDistance(lat1, long1, lat2, long2);
        expect(distance).toBeCloseTo(713.42, 0); // Distance between Sydney and Melbourne is approximately 714 km
    });

    it('should handle coordinates across the prime meridian correctly', () => {
        const lat1 = 51.5074; // London
        const long1 = -0.1278;
        const lat2 = 40.7128; // New York
        const long2 = -74.0060;
        const distance = calculateDistance(lat1, long1, lat2, long2);
        expect(distance).toBeCloseTo(5570.222, 0); // Distance between London and New York is approximately 5585 km
    });
});