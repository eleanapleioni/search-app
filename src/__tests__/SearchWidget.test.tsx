import React from 'react';
import { JSDOM } from 'jsdom';
import { mount } from 'enzyme';
import sinon, { SinonStub } from 'sinon';
// import * as services from '../services/services';
import SearchWidget from '../components/searchWidget';
//import mockFetch from 'jest-fetch-mock';
import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';

///jest.mock('../services/services');
jest.mock('axios');
describe('Search widget', () => {
	let component: any;
	let axiosStub: any;
	beforeEach(() => {
		//mockFetch.resetMocks();
		//getResults = jest.isMockFunction(services.getSearchResults);
		component = mount(<SearchWidget />);
		axiosStub = sinon.stub(axios, 'get');
	});

	afterEach(() => {
		axiosStub.restore();
	});

	describe('titles', () => {
		it('h2 title loads', () => {
			expect(component.find('h2').text()).toEqual('Where are you going?');
		});
		it('label of search box loads', () => {
			expect(component.find('label').text()).toEqual('Pick-up Location');
		});
	});
	describe('pickup input', () => {
		it('has placeholder', () => {
			expect(component.find('[data-test-id="searchInput"]').props().placeholder).toEqual(
				'city, airport, station, region and district...'
			);
			expect(component.find('[data-test-id="searchInput"]').props().value).toEqual('');
		});
		// AC1
		it('user enters single alphanumeric character then the placeholder disappears', () => {
			component.find('[data-test-id="searchInput"]').simulate('change', { target: { value: 'M' } });
			component.update();
			expect(component.find('[data-test-id="searchInput"]').props().value).toEqual('M');
		});
		it('user enters single alphanumeric character then no search list is displayed', () => {
			component.find('[data-test-id="searchInput"]').simulate('change', { target: { value: 'M' } });
			component.update();
			expect(component.find('[data-test-id="resultsList"]').length).toEqual(0);
		});
		//AC2
		it('user enters 2 or more alphanumeric characters then the search list is displayed', () => {
			component.setState({ results: [{ name: 'No results', id: 'test' }], searchString: 'XXXX' });
			component.update();

			expect(component.find('[data-test-id="resultsList"]').length).toEqual(1);
		});

		it('When the search results list is displayed and the user leaves only 1 character then the results should no longer display', () => {
			component.setState({ results: [{ name: 'No results', id: 'test' }], searchString: 'XXXX' });
			component.update();

			expect(component.find('[data-test-id="resultsList"]').length).toEqual(1);
			component.find('[data-test-id="searchInput"]').simulate('change', { target: { value: 'X' } });
			component.update();
			expect(component.find('[data-test-id="resultsList"]').length).toEqual(0);
		});
		// it('user enters 2 or more alphanumeric characters then the search list is displayed', async done => {
		// 	console.log('aaaaaaaaa');
		// 	axiosStub
		// 		.withArgs(
		// 			'https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows={6}&solrTerm={Man}'
		// 		)
		// 		.returns({
		// 			data: {
		// 				results: { name: 'aaaaa' },
		// 			},
		// 		})
		// 		.returns({
		// 			results: { name: 'aaaaa' },
		// 		});
		// 	//component.instance().changeHandler('Manc', 6);
		// 	component.find('[data-test-id="searchInput"]').simulate('change', { target: { value: 'Manc' } });
		// 	console.log('bbbbbb');
		// 	setInterval(() => {
		// 		console.log(component.state());
		// 		component.update();

		// 		expect(component.find('[data-test-id="resultsList"]').length).toEqual(1);
		// 		done();
		// 	});
		// });
		// it('user enters 2 or more alphanumeric characters then the search list is displayed', async done => {
		// 	(mockAxios.get as any).mockImplementationOnce(() =>
		// 		Promise.resolve({
		// 			data: { results: { name: 'aaaaa' } },
		// 		})
		// 	);
		// 	//component.instance().changeHandler('Manc', 6);
		// 	component.find('[data-test-id="searchInput"]').simulate('change', { target: { value: 'Manc' } });
		// 	console.log(component.state());
		// 	setImmediate(() => {
		// 		component.update();

		// 		expect(component.find('[data-test-id="resultsList"]').length).toEqual(1);
		// 		done();
		// 	});
		// });
		// xit('onClick is focused', () => {
		// 	const dom = new JSDOM(`<!DOCTYPE html><div id="test">fff</div>`);
		// 	const wrapperComponent = mount(<SearchWidget />, {
		// 		attachTo: dom.window.document.getElementById('test'),
		// 	});
		// 	console.log(dom.window.document);
		// 	wrapperComponent.find('[data-test-id="searchInput"]').simulate('change', { target: { value: 'test' } });

		// 	const focusedElemet = dom.window.document.activeElement;
		// 	console.log(focusedElemet);
		// 	expect(wrapperComponent.find('[data-test-id="searchInput"]').props().id).toEqual(focusedElemet.id);
		// 	console.log(focusedElemet);
		// });
	});
});
