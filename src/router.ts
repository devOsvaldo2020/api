
import path from "node:path";
import { Router } from "express";
import multer from "multer";

import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategories } from "./app/useCases/categories/createCategories";
import { listProducts } from "./app/useCases/products/listProducts";
import { createProduct } from "./app/useCases/products/createProduct";
import { listProductsByCategory } from "./app/useCases/categories/listProductsByCategory";
import { listOrders } from "./app/useCases/order/listOrders";
import { createOrder } from "./app/useCases/order/createOrder";

export const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, path.resolve(__dirname, "..", "uploads"));
        },
        filename(req, file, callback){
            callback(null, `${Date.now()}-${file.originalname}`);
        },
    }),
});

// 👉 listar categoria
router.get("/categories", listCategories);

// 👉 create categoria
router.post("/categories", createCategories);

// 👉 listar produtos
router.get("/products", listProducts);

// 👉 create produtos
router.post("/products", upload.single("image"), createProduct);

// 👉 get products by category
router.get("/categories/:categoryId/products", listProductsByCategory);

// 👉 listar order
router.get("/orders", listOrders);

// 👉 create order
router.post("/orders", createOrder);

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
