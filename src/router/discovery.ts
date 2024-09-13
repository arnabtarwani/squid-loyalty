import { Request, Response } from "express";
import { calculateDistance } from "../utils/distance";
import { IDistanceQuery, IDistanceDbRecord } from "../utils/types";
import { pool } from "../server";

export const discoveryHandler = async (req: Request, res: Response) => {
    try {
        if (!pool) {
            throw new Error("Database connection failed");
        }

        const { url } = req
        const query = url.split("?")[1];

        if (!query?.includes("lat1") || !query?.includes("long1") || !query?.includes("limit") || !query?.includes("type")) {
            throw new Error(`${query} is not a valid query`);
        }

        const queryObject = query?.split("&").reduce((acc, cur) => {
            const [key, value] = cur.split("=");

            if (!key || !value) {
                return acc;
            }
            // @ts-ignore
            acc[key] = value;
            return acc;
        }, {} as IDistanceQuery);

        let dbQuery = `SELECT * FROM businesses`;
        let values: Array<IDistanceDbRecord> = [];

        const rows = await pool.query(dbQuery, values)

        const distance = rows.map((business: IDistanceDbRecord) => {
            const distance = calculateDistance(Number(queryObject.lat1), Number(queryObject.long1), business.latitude, business.longitude);

            return { ...business, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.json({ distance });

    } catch (error) {
        res.status(400).json({ error: error });
    }
}