import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import * as ProductController from './controllers/ProductController.js';
import * as PromotionController from './controllers/PromotionController.js';
import * as AuthController from './controllers/AuthController.js';
import * as CartController from './controllers/CartController.js';
import { registerValidation, loginValidation } from "./validations.js";
import checkAuth from './utils/checkAuth.js';


dotenv.config();

const url = "mongodb://localhost:27017/chinesefood";
const router = express.Router();

mongoose.connect(url)
	.then(() => console.log("DB OK"))
	.catch((err) => console.log("DB error", err));

const app = express();
const port = process.env.PORT || 4444;

app.use(express.json());
app.use(cors());
app.use(express.static('./build'));

//Запросы
app.get('/', router);

//Products
app.get('/products', ProductController.getAllProducts);
app.get('/products/additives', ProductController.getAdditives);

//Promotions
app.get('/promotions', PromotionController.getAllPromotions);

//Register
app.post('/register', registerValidation, AuthController.register);

//Login
app.post('/login', loginValidation, AuthController.login);

//GetInfoMe
app.get('/me', checkAuth, AuthController.authMe);


//CART
app.get('/cart', checkAuth, CartController.getCart);
app.post('/cart/addProduct', CartController.addProduct);
app.post('/cart/minusProduct', CartController.minusProduct);
app.post('/cart/removeProduct', CartController.removeProduct);
app.post('/cart/createOrder', CartController.createOrder);
app.post('/cart/clearCart', CartController.clearCart);


app.listen(4444, (err) => {
	if (err) console.log(err);
	console.log("Server OK");
});