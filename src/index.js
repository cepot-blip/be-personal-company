import express from "express"
import cors from "cors"
import path from "path"
import env from "dotenv"
env.config()
const app = express()
const PORT = process.env.PORT
import { rateLimit } from "express-rate-limit"
import helmet from "helmet"
import users_controllers from "./routes/Users_routes"
import biodata_controllers from "./routes/Biodata_routes"
import address_controllers from "./routes/Address_routes"

//	RATE LIMIT, THE PROCESS OF LIMITING THE NUMBER OF USER/CLIENT REQUSET ON CERTAIN RESOURCES
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, //15 minutes
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
	message: "Too much pressing the screen please wait a while longer !!",
})

//		MIDDLEWARE
app.use((req, res, next) => {
	// WEBSITE YOU WISH TO ALLOW TO CONNECT
	req.headers["Access-control-allow-origin"] = "*"

	// REQUEST METHOD YOU WISH TO ALLOW
	req.headers["Access-control-allow-methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"

	// REQUEST HEADERS YOU WISH TO ALLOW
	req.headers["Access-control-allow-headers"] = "Content-Type, Authorization"

	// PASS TO NEXT LAYER OF MIDDLEWARE
	next()
})

app.use(
	cors({
		origin: "*",
	})
)

app.use(
	helmet({
		crossOriginResourcePolicy: false,
	})
)

app.use(limiter)
app.use(express.json({ limit: "100mb" }))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "../static/")))


//        ROUTES
app.use("/api", users_controllers)
app.use("/api", biodata_controllers)
app.use("/api", address_controllers)


//		LISTENER
app.listen(PORT, () => {
	console.log(`
  
  ==================================

   L I S T E N  T O  P O R T ${PORT} :)

  ==================================
  
  `)
})