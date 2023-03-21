import express from "express"
import cors from "cors"
import path from "path"
export const app = express()
import { rateLimit } from "express-rate-limit"
import helmet from "helmet"
import users_routes from "./api/routes/Users/Users_routes"
import section_text_routes from "./api/routes/SectionText/Section_text_Routes"
import biodata_routes from "./api/routes/Biodata/Biodata_routes"
import address_routes from "./api/routes/Address/Address_routes"
import avatar_routes from "./api/routes/Avatar/avatar_routes"
import author_routes from "./api/routes/Author/Author_routes"
import banner_routes from "./api/routes/Banner/Banner_routes"
import blog_routes from "./api/routes/Blog/Blog_routes"
import category_routes from "./api/routes/Category/category_routes"

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
app.use("/api", users_routes)
app.use("/api", biodata_routes)
app.use("/api", address_routes)
app.use("/api", avatar_routes)
app.use("/api", author_routes)
app.use("/api", section_text_routes)
app.use("/api", banner_routes)
app.use("/api", blog_routes)
app.use("/api", category_routes)

