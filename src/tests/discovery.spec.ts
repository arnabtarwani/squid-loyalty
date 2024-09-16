describe('test route /discovery', () => {
    jest.mock('../db/database');
    jest.mock('../utils/distance');

    describe('test API route Discovery', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return a list of businesses sorted by distance', async () => {
            await expect((await fetch(`http://localhost:4000/discovery?lat=50&long=74.0060&limit=1`)).json()).resolves.toEqual([{ "distance": 4977.662247225757, "id": 4, "latitude": "48.856600", "longitude": "2.352200", "name": "Business 4", "type": "Restaurant" }]);
        });

        it('should return a list of businesses sorted by distance', async () => {
            await expect((await fetch(`http://localhost:4000/discovery?lat=50&long=74.0060&limit=3`)).json()).resolves.toEqual([{ "distance": 4977.662247225757, "id": 4, "latitude": "48.856600", "longitude": "2.352200", "name": "Business 4", "type": "Restaurant" }, { "distance": 4987.117928416699, "id": 3, "latitude": "51.507400", "longitude": "-0.127800", "name": "Business 3", "type": "Cafe" }, { "distance": 4987.117928416699, "id": 6, "latitude": "51.507400", "longitude": "-0.127800", "name": "Business 6", "type": "Restaurant" }]);
        });
    });
});