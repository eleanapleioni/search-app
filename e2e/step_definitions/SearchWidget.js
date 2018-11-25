const { After, Before, Given, When, Then, setDefaultTimeout } = require('cucumber');
const puppeteer = require('puppeteer');
const { expect } = require('chai');
const isDebugging = () => {
	return {
		headless: false,
	};
};

setDefaultTimeout(60 * 1000);
let page;
let browser;
After(() => {
	browser.close();
});
Given('I am a visitor on the Search Box within the rentalcars.com homepage', async () => {
	browser = await puppeteer.launch(isDebugging());
	page = await browser.newPage();
	setTimeout(async () => {
		await page.goto('http://localhost:3000/');
		const title = await page.evaluate(() => document.querySelector('h1').textContent);
		expect(title).to.eql('Rental Cars');
	});
});

When('I enter a single alphanumeric character {string} into the pick up location', async value => {
	await page.waitFor('input');
	const input = await page.$('input');
	await input.type(value);
});
Then('the placeholder text disappears', async () => {
	const inputSearch = await page.evaluate(() => {
		return document.querySelector('input').value;
	});
	expect(inputSearch).not.to.eql('city, airport, station, region and district...');
});

Then('no search results list is display', async () => {
	const searchResults = await page.evaluate(() => {
		return document.querySelector('[data-test-id="resultsList"]');
	});
	expect(searchResults).to.eql(null);
});

When('I enter two or more alphanumeric characters {string} into the pick up location', async value => {
	await page.waitFor('input');
	const input = await page.$('input');
	await input.type(value);
});

Then('I see a list of search result', async () => {
	await page.waitFor('ul');
	const searchResults = await page.evaluate(() => {
		return document.querySelector('[data-test-id="resultsList"]');
	});
	expect(searchResults).not.to.eql(null);
});

Then('The maximum number of search results displayed is six', async () => {
	const listItems = await page.$$('li');
	expect(listItems.length).to.be.lessThan(7);
});

Then('I should see the message {string}', async value => {
	await page.waitFor('ul');
	const listItems = await page.$$('li');
	expect(listItems.length).to.eql(1);
	const message = await page.evaluate(() => {
		return document.querySelector('li a div').textContent;
	});
	expect(message).to.eql(value);
});

When('I remove the search term leaving only one character {string}', async value => {
	await page.waitFor('input');
	const input = await page.$('input');
	await input.type(value);
});

Then('the search results list no longer displayed', async () => {
	const searchResults = await page.evaluate(() => {
		return document.querySelector('[data-test-id="resultsList"]');
	});
	expect(searchResults).to.eql(null);
});
