const router = require("express").Router();
const avatarRouter = require("./avatar");
const initialsRouter = require("./initials");

router.use("/avatar", avatarRouter);
router.use("/initials", initialsRouter);

router.get("/", (req, res) => {
	res.status(200);
	res.setHeader("Content-Type", "text/plain");
	return res.end("Gentar - Generate Colorful Icon Avatars!");
});

module.exports = router;
