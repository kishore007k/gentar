const { DEFAULT_SIZE } = require("../constants");
const { generateSvg, generatePng, COLORS, ICONS } = require("../utils");

const router = require("express").Router();

const getSvgHash = (req, res) => {
	const { hash } = req.params;
	const svg = generateSvg(hash, COLORS, ICONS);
	res.status(200);
	res.setHeader("Content-Type", "image/svg+xml");
	return res.end(svg);
};

router.get("/:hash.svg", (req, res) => getSvgHash(req, res));

router.get("/:hash.png", async (req, res) => {
	const { hash } = req.params;
	const size = req.query.s || req.query.size || DEFAULT_SIZE;
	const svg = generateSvg(hash, COLORS, ICONS);
	const png = await generatePng(svg, size);
	res.status(200);
	res.setHeader("Content-Type", "image/png");
	return res.end(png);
});

router.get("/:hash", (req, res) => getSvgHash(req, res));

module.exports = router;
