const dotenv = require("dotenv");
const path = require("path");

if (process.env.NODE_ENV === "development") {
	dotenv.config({ path: path.join(__dirname, "/.env") });
}

const express = require("express");
const morgan = require("morgan");

const router = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use("/static", express.static(path.join(__dirname, "public")));

// Log who is accessing gentar
app.use((req, res, next) => {
	const { url, ip, hostname } = req;
	const reqPath = req.path;
	const referrer = req.get("Referrer");
	const userAgent = req.get("User-Agent");
	console.log(
		`url=${url} path=${reqPath} ip=${ip} hostname=${hostname} referrer=${referrer} userAgent=${userAgent}`
	);
	next();
});

app.use("/", router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App is listening on port ${port}`));
