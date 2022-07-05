const sharp = require("sharp");
const { DEFAULT_SIZE, MIN_SIZE, MAX_SIZE, SVG_SIZE } = require("../constants");

const trimSize = (size, defaultSize, minSize, maxSize) => {
	const parsedSize = Number.isNaN(size) ? defaultSize : size;
	const sizeInt = parseInt(parsedSize, 10);
	const trimmedSize = Math.max(sizeInt, minSize);
	return Math.min(trimmedSize, maxSize);
};

const generatePng = (svg, size) => {
	const trimmedSize = trimSize(size, DEFAULT_SIZE, MIN_SIZE, MAX_SIZE);
	const options = { density: (72 * trimmedSize) / SVG_SIZE };
	return sharp(Buffer.from(svg), options)
		.resize(trimmedSize, trimmedSize)
		.png()
		.toBuffer();
};

module.exports = generatePng;
