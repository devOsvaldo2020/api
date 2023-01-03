import { Request, Response } from "express";

import { Product } from "./../../models/Product";

export async function createProduct(req: Request, res: Response) {
    try {
        const imagePath = req.file?.fieldname;
        const { name, description, price, category, ingredients } = req.body;

        const product = await Product.create({
            name,
            description,
            imagePath: imagePath ? imagePath : "image.png",
            price: Number(price),
            category,
            ingredients: ingredients ? JSON.parse(ingredients) : [],
        });

        res.json(product);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


