import React from 'react';
import { JSDOM } from 'jsdom';
import { mount } from 'enzyme';
import sinon, { SinonStub } from 'sinon';
import SearchWidget from '../components/searchWidget';
import axios from 'axios';

///jest.mock('../services/services');
jest.mock('axios');
describe('Search widget', () => {
	let component: any;
	beforeEach(() => {
		component = mount(<SearchWidget />);
	});

	afterEach(() => {
		component.unmount();
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

		it('I click/tap into Pick Up Location box Then a focus state is applied', () => {
			document.body.innerHTML = '<div id="test"></div>';
			const wrapperComponent = mount(<SearchWidget />, {
				attachTo: document.getElementById('test'),
			});
			const input: any = document.getElementById('searchInput');
			input.focus();
			const focusedElemet = document.activeElement;
			expect(wrapperComponent.find('[data-test-id="searchInput"]').props().id).toEqual(focusedElemet.id);
		});
	});
});
