import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { mount } from 'enzyme';

describe('App', () => {
	let component: any;
	beforeEach(() => {
		component = mount(<App />);
	});

	afterEach(() => {});

	describe('initial render', () => {
		it('title loads', () => {
			expect(component.find('h2').length).toEqual(1);
		});
		it('label of search box loads', () => {
			expect(component.find('label').length).toEqual(1);
		});
		it('input loads', () => {
			expect(component.find('[data-test-id="searchInput"]').length).toEqual(1);
		});
	});
	describe('search results', () => {
		it('user enters single alphanumeric character into pickup location the placeholder disappears', () => {});
	});
});
