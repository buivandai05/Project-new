import express = require("express");
import 'dotenv/config';
import webRoutes from "./routes/web";
import path = require("path");

const app = express();

const PORT = process.env.PORT || 8080; 

// 1. Cấu hình View Engine (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// nghĩa là lấy những ảnh thuộc trong thư viên public bạn hiểu chứ 
app.use(express.static('public'));
// app.get("/", (req, res) => {
//     res.render("Home"); 
// });
webRoutes(app); 
// 3. Khởi động Server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại 123 http://localhost:${PORT}`);
    console.log("Cổng từ biến môi trường (env) là:", process.env.PORT);
});