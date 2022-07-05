const generatePng = require("./generatePng");
const generateSvg = require("./generateSvg");
const generateSvgForInitial = require("./generateSvgForInitial");
const { COLORS, ICONS } = require("../constants");

module.exports = {
	generateSvg,
	generatePng,
	generateSvgForInitial,
	COLORS,
	ICONS,
};
