const _ = require('lodash');
const PDFParser = require("pdf2json");
const constants = require('./constants');

module.exports = function getTable() {
	let pdfParser = new PDFParser();

	return new Promise(function(resolve, reject) {
		pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError) );
		pdfParser.on("pdfParser_dataReady", pdfData => {
			const table = _.chain(pdfData)
				.get('formImage.Pages')
				.map(p => _.chain(p.Texts)
					.groupBy(t => t.y)
					.map((gt, k) => _.chain(gt)
						.sortBy(['x'])
						.map(e => decodeURIComponent(e.R[0].T))
						.value())
					.value())
				.tail()
				.flatten()
				.map(([name, category, street, number, province, city]) => {
					return [
						name,
						category,
						street
							.replace(/-.*/, '')
							.replace(/\(.*/, '')
							.replace(/E\/.*/, '')
							.replace(/\ ESQ.*/, '')
							.replace(/S\/N/, '')
							.trim(),
						number.replace(/^0+/, ''),
						province,
						city,
					];
				})
				.value();

			resolve(table);
		});

		pdfParser.loadPDF(constants.PDF_FILE);
	});
};
