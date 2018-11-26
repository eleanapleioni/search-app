import React, { Component } from 'react';
import SearchResults from './searchResults';
import { getSearchResults, ISearchResults } from '../services/axiosservice';

interface ISearchState {
	searchString: string;
	results: ISearchResults[];
}
class SearchWidget extends Component<{}, ISearchState> {
	constructor(props: any) {
		super(props);
		this.state = {
			searchString: '',
			results: [],
		};
	}
	render() {
		return (
			<React.Fragment>
				<div className="container container-widget">
					<form data-test-id="searchForm">
						<h2>Where are you going?</h2>
						<fieldset className="form-group">
							<label className="row col-sm-12" htmlFor="searchInput">
								Pick-up Location
							</label>
							<input
								className="form-control row col-sm-12"
								id="searchInput"
								name="searchInput"
								aria-label="searchInput"
								aria-haspopup="true"
								data-test-id="searchInput"
								placeholder="city, airport, station, region and district..."
								value={this.state.searchString}
								onChange={e => {
									this.setState({ searchString: e.target.value });
									this.changeHandler(e.target.value);
								}}
							/>
							{this.state.searchString.length > 0 &&
								this.state.results &&
								this.state.results.length > 0 && <SearchResults results={this.state.results} />}
						</fieldset>
					</form>
				</div>
			</React.Fragment>
		);
	}

	public changeHandler = async (val: string) => {
		const resultsNumber: number = 6;

		this.setState({ searchString: val }, async () => {
			if (val.length > 1) {
				const returnedData = await getSearchResults(val, resultsNumber);
				// checks if the value has changed
				if (this.state.searchString.length > 1) {
					this.setState({ results: returnedData });
				}
			} else {
				//resets the results
				this.setState({ results: [] });
			}
		});
	};
}

export default SearchWidget;
