import { Request, Response } from "express";
import { calculateDistance } from "../utils/distance";
import { IDistanceQuery, IDistanceDbRecord } from "../utils/types";
import { pool } from "../db/database";

export const discoveryHandler = async (req: Request, res: Response) => {
    try {
        const { url } = req
        const query = url.split("?")[1];

        console.log(query);

        const queryObject = query?.split("&").reduce((acc, cur) => {
            const [key, value] = cur.split("=");

            if (!key || !value) {
                return acc;
            }
            // @ts-ignore
            acc[key] = value;
            return acc;
        }, {} as {
            [key: string]: string;
        });

        console.log("QUERY", queryObject);

        let dbQuery = `SELECT * FROM businesses`;
        let values: Array<string> = [];

        if (queryObject?.type) {
            dbQuery += ` WHERE type = $1`;
            values.push(queryObject?.type);
        }

        const { rows } = await pool.query(dbQuery, values)

        const businesses = rows.map((business: IDistanceDbRecord) => {
            return {
                ...business,
                distance: calculateDistance(parseFloat(queryObject?.lat as string), parseFloat(queryObject?.long as string), business.latitude, business.longitude)
            };
        }).sort((a, b) => a.distance - b.distance);

        if (queryObject?.limit) {
            return res.json(businesses.slice(0, parseInt(queryObject.limit)));
        }

        res.json(businesses);

    } catch (error) {
        res.status(400).json({ error: error });
    }
}