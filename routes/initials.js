const router = require("express").Router();
const { DEFAULT_SIZE } = require("../constants");
const { COLORS, generatePng, generateSvgForInitial } = require("../utils");

const getSvgName = (req, res) => {
	const { name } = req.params;
	const { bg, fg } = req.query;
	const svg = generateSvgForInitial(name, COLORS, bg, fg, 0);
	res.status(200);
	res.setHeader("Content-Type", "image/svg+xml");
	return res.end(svg);
};

router.get("/:name.svg", (req, res) => getSvgName(req, res));

router.get("/:name.png", async (req, res) => {
	const { name } = req.params;
	const { bg, fg } = req.query;
	const size = req.query.s || req.query.size || DEFAULT_SIZE;
	const svg = generateSvgForInitial(name, COLORS, bg, fg, 0.35);
	const png = await generatePng(svg, size);
	res.status(200);
	res.setHeader("Content-Type", "image/png");
	return res.end(png);
});

router.get("/:name", (req, res) => getSvgName(req, res));

module.exports = router;
