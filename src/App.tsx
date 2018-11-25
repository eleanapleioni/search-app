import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchWidget from './components/searchWidget';

class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>Rental Cars</h1>
				<SearchWidget />
			</div>
		);
	}
}

export default App;
