const fs = require('fs');
const _ = require('lodash');
const Promise = require('bluebird');
const getTable = require('./parse_pdf');
const fetch = require('./fetch');
const querystring = require('querystring');
const constants = require('./constants');

function getGeolocation(street, number) {
	const text = number === '' ? street : `${street} ${number}`;
	const serviceURI = 'https://ws.usig.buenosaires.gob.ar/rest/normalizar_y_geocodificar_direcciones';
	const qs = number === '' ? { calle: text } : { calle: street, altura: number, desambiguar: 1 };

	return fetch(`${serviceURI}?${querystring.stringify(qs)}`)
		.then(res => res.json())
		.then(res => {
			if (!res.GeoCodificacion) {
				throw new Error(`No pudo geolocalizarse ${text}`);
			}
			return res.GeoCodificacion;
		});
}

//  http://ws.usig.buenosaires.gob.ar/rest/convertir_coordenadas?x=100000&y=100000&output=lonlat
function convertToLatLong(coordInfo) {
	const serviceURI = 'http://ws.usig.buenosaires.gob.ar/rest/convertir_coordenadas';

	return fetch(`${serviceURI}?${querystring.stringify({ ...coordInfo, output: 'lonlat' })}`)
		.then(res => res.json())
		.then(res => res.resultado);
}

getTable()
	.then(table => {
		const filteredTable = table.filter(e => e[4] === 'CAP.FEDERAL');

		return Promise.map(filteredTable, ([name, category, street, number, province, city]) => {
			return getGeolocation(street, number)
				.then((coordInfo) => convertToLatLong(coordInfo, street, number))
				.then(e => ({
					name,
					category,
					street,
					number,
					province,
					city,
					lng:_.get(e, 'x'),
					lat: _.get(e, 'y')
				}))
				.catch((e) => {
					return ({
						name,
						category,
						street,
						number,
						province,
						city,
					});
				});
		}, { concurrency: 5 });
	})
	.then((coll) => {
		const validPlaces = [];
		const invalidPlaces = [];
		coll.forEach(e => {
			if (!e.lat || !e.lng) {
				invalidPlaces.push(e);
			} else {
				validPlaces.push(e);
			}
		});

		fs.writeFileSync(constants.PLACES_FILE, JSON.stringify({ places: validPlaces }));
		fs.writeFileSync(constants.INVALID_PLACES_FILE, JSON.stringify({ places: invalidPlaces }));
	})
	.catch(console.error);





