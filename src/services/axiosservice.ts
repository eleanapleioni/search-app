import React, { Component } from 'react';
import axios from 'axios';

const API_URL = 'https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=';
/**
 * Search Item interface
 */
interface ISearchItem {
	name: string;
	region: string;
	placeType: string;
	id: string;
	city?: string;
	country: string;
}
/**
 * Search Results interface
 */
export interface ISearchResults {
	results: Array<ISearchItem>;
}
export const getSearchResults = async (value: string, resultsNumber: number): Promise<ISearchResults[]> => {
	return axios
		.get(`${API_URL}${resultsNumber}&solrTerm=${value}`)
		.then(({ data }) => {
			return data;
		})
		.then(results => {
			// response sanitization in order to keep only the required data
			return getFormattedResults(results);
		});
};
const getFormattedResults = (data: any): Array<ISearchResults> => {
	const resultsArray = data.results.docs;
	const newArray: ISearchResults[] = resultsArray.map((element: any) => {
		return {
			name: element.name,
			region: element.region,
			placeType: getPlaceType(element.placeType),
			id: element.placeKey || 'noresults',
			city: element.city || null,
			country: element.country,
		};
	});
	return newArray;
};
// change api placetype with the desired display word
const getPlaceType = (value: string): string | null => {
	switch (value) {
		case 'A': {
			return 'Airport';
		}
		case 'S': {
			return 'Station';
		}
		case 'R': {
			return 'Region';
		}
		case 'D': {
			return 'District';
		}
		case 'C': {
			return 'City';
		}
		default: {
			return null;
		}
	}
};
