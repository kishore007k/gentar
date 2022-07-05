const fs = require("fs");
const path = require("path");
const seedrandom = require("seedrandom");
const X2JS = require("x2js");
const { ICON_SIZE, SVG_SIZE } = require("../constants");

const integer = (seededRng, min, max) =>
	Math.floor(seededRng() * (max - min + 1) + min);

const pickOne = (seededRng, arr) => arr[integer(seededRng, 0, arr.length - 1)];

const generateSvg = (hash, colors, icons) => {
	const rng = seedrandom(hash);
	const color = pickOne(rng, colors);
	const icon = pickOne(rng, icons);

	let whiteIcon;

	if (icon) {
		const iconPath = `../icons/baseline-${icon}-${ICON_SIZE}px.svg`;
		const iconFile = path.resolve(__dirname, iconPath);
		const iconContent = fs.readFileSync(iconFile, "utf8");
		const x2js = new X2JS();
		const jsonObj = x2js.xml2js(iconContent);
		const offset = (SVG_SIZE - ICON_SIZE) / 2;
		jsonObj.svg._fill = "#fefefe";
		jsonObj.svg._x = offset;
		jsonObj.svg._y = offset;
		whiteIcon = x2js.js2xml(jsonObj);
	} else {
		whiteIcon = "";
	}

	return [
		'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"',
		` style="isolation:isolate" viewBox="0 0 ${SVG_SIZE} ${SVG_SIZE}">`,
		`<path d="M0 0h${SVG_SIZE}v${SVG_SIZE}H0V0z" fill="${color}" />`,
		whiteIcon,
		"</svg>",
	].join("");
};

module.exports = generateSvg;
