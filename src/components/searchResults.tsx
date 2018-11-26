import React, { Component } from 'react';
import { ISearchResults } from '../services/axiosservice';

interface IResultsProps {
	results: ISearchResults[];
}
// returns the list of the search items
class SearchResults extends Component<IResultsProps> {
	constructor(props: any) {
		super(props);
		this.state = {
			searchString: '',
			results: [],
		};
	}
	render() {
		const { results } = this.props;

		return (
			<React.Fragment>
				<div className="container" data-test-id="resultsList">
					<ul className="list-group" role="listbox">
						{results.map((item: any, index: number) => {
							return (
								<li className="list-group-item" key={item.id} role="menuItem">
									<a className="d-inline-block">
										<span className="col">{item.placeType}</span>
										<div className="d-inline-block">
											{item.name}
											<span className="col">{item.country}</span>
										</div>
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			</React.Fragment>
		);
	}
}

export default SearchResults;
