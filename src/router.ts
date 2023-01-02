import { Router } from "express";

import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategories } from "./app/useCases/categories/createCategories";

export const router = Router();

// 👉 listar categoria
router.get("/categories", listCategories);

// 👉 create categoria
router.post("/categories", createCategories);

// 👉 listar produtos
router.get("/products", (req, res) => {
    res.send("ok");
});

// 👉 create produtos
router.post("/products", (req, res) => {
    res.send("ok");
});

// 👉 get products by category
router.get("/categories/:categoriesId/products", (req, res) => {
    res.send("ok");
});

// 👉 listar order
router.get("/orders", (req, res) => {
    res.send("ok");
});

// 👉 create order
router.post("/orders", (req, res) => {
    res.send("ok");
});

// 👉 change order status
router.patch("/orders/:orderId", (req, res) => {
    // patch - alteracao parcial de elemento(s)
    // put - alteracao completa nos elementos.
    res.send("ok");
});

// 👉 delete / cancel order
router.delete("/orders/:orderId", (req, res) => {
    res.send("ok");
});
