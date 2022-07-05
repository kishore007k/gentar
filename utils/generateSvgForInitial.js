const seedrandom = require("seedrandom");
const { SVG_SIZE } = require("../constants");

const integer = (seededRng, min, max) =>
	Math.floor(seededRng() * (max - min + 1) + min);

const pickOne = (seededRng, arr) => arr[integer(seededRng, 0, arr.length - 1)];

const generateSvgForInitial = (
	name,
	colors,
	backgroundColor,
	foregroundColor,
	offset
) => {
	const rng = seedrandom(name);
	const hexColor = backgroundColor ? `#${backgroundColor}` : backgroundColor;
	const color = hexColor || pickOne(rng, colors);
	const textColor = foregroundColor || "fff";

	const escapedName = unescape(name);
	const parts = escapedName.split(" ") || [];
	const firstName = parts.shift() || "";
	const lastName = parts.pop() || "";
	const firstInitial = firstName.length > 0 ? firstName[0] : "";
	const lastInitial = lastName.length > 0 ? lastName[0] : "";
	const initials = `${firstInitial}${lastInitial}`.toUpperCase();

	const letters = `<text font-family="Helvetica" font-size="14px" x="50%" y="50%" dy="${offset}em" fill="#${textColor}" alignment-baseline="central" text-anchor="middle">${initials}</text>`;

	return [
		'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"',
		` style="isolation:isolate" viewBox="0 0 ${SVG_SIZE} ${SVG_SIZE}">`,
		`<path d="M0 0h${SVG_SIZE}v${SVG_SIZE}H0V0z" fill="${color}" />`,
		letters,
		"</svg>",
	].join("");
};

module.exports = generateSvgForInitial;
