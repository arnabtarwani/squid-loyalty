import { Request, Response } from "express";
import { calculateDistance } from "../utils/distance";
import { IDistanceDbRecord } from "../utils/types";
import { pool } from "../server";
import { executeQuery } from "../db/database";

/**
 * @function discoveryHandler for the discovery endpoint that returns a list of businesses sorted by distance
 * 
 * The handler takes in the url query parameters and uses them to filter and sort the businesses. 
 * The handler first extracts the query parameters from the url and constructs a `queryObject` from them.
 * The handler then constructs a SQL query based on the query parameters and executes it against the database.
 * The handler checks for the `type` query if it exists and appends it to the SQL query.
 * Then the handler fetches the businesses from the database and calculates the distance of each business from the given `lat` and `long` parameters.
 * The resulting rows from the DB used to sort the businesses based on the distance and returns the sorted list of businesses.
 * If the `limit` query parameter is provided, the handler returns only the specified number of businesses.
 * 
 * The handler returns a 400 status code if an error occurs during the execution of the handler.
 * 
 * @param req - Request object
 * @param res - Response object
 * @returns - A list of businesses sorted by distance
 * 
 * Example request: GET /discovery?type=restaurant&lat=51.5074&long=0.1278&limit=5
 */
export const discoveryHandler = async (req: Request, res: Response) => {
    try {
        const { url } = req
        const query = url.split("?")[1];

        const queryObject = query?.split("&").reduce((acc, cur) => {
            const [key, value] = cur.split("=");

            if (!key || !value) {
                return acc;
            }
            // @ts-ignore - We know the key is a string
            acc[key] = value;
            return acc;
        }, {} as {
            [key: string]: string;
        });

        let dbQuery = `SELECT * FROM businesses`;
        let values: Array<string> = [];

        if (queryObject?.type) {
            dbQuery += ` WHERE type = $1`;
            values.push(queryObject?.type);
        }

        const rows = await executeQuery(pool, dbQuery, values);

        if (rows.length > 0) {
            pool.emit("release");
        }

        const businesses = rows.map((business: IDistanceDbRecord) => {
            return {
                ...business,
                distance: calculateDistance(parseFloat(queryObject?.lat as string), parseFloat(queryObject?.long as string), business.latitude, business.longitude)
            };
        }).sort((a, b) => a.distance - b.distance);

        if (queryObject?.limit) {
            return res.json(businesses.slice(0, parseInt(queryObject.limit)));
        }

        res.status(200).json(businesses);

    } catch (error) {
        res.status(400).json({ error: error });
    }
}   