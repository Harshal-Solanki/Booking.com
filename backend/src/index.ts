import express, { Response, Request} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import  myHotelsRoutes  from "./routes/myHotels";
import hotelRoutes from "./routes/hotels";
import bookingRoutes  from "./routes/myBookings";
// import path from "path";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: 'https://booking-com-4yv6.onrender.com',
    credentials: true,
}))

// app.use(express.static(path.join(__dirname, "../../frontend/dist")));


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/myhotel", myHotelsRoutes)
app.use("/api/hotels", hotelRoutes)
app.use("/api/mybookings", bookingRoutes);

// app.get("*", (req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
//   });
  

app.listen(3000, ()=>{
    console.log("Server running On port 3000")
})