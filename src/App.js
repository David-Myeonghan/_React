import React, { Component } from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";
import "./App.css";

class App extends Component {
	constructor() {
		super();

		this.state = {
			monsters: [],
			searchField: "",
		};

		// this.handleChange = this.handleChange.bind(this); // when you define and use methods in class
	}
	componentDidMount() {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((users) => this.setState({ monsters: users }));
	}

	// handleChange(e) { // need '.bind'
	// 	this.setState({ searchField: e.target.value }, () => console.log(this.state));
	// 	// 2nd argument of setState is callback
	// }

	handleChange = (e) => {
		// arrow function bind this context to the plave where they were defined in the first place // lexical scoping / automatically bind this.
		this.setState({ searchField: e.target.value });
	};

	render() {
		const { monsters, searchField } = this.state; // get copied value of state
		const filteredMonsters = monsters.filter((monster) =>
			monster.name.toLowerCase().includes(searchField.toLowerCase())
		);
		return (
			<div className="App">
				<h1>Monsters Rolodex</h1>
				<SearchBox placeholder="search monsters" handleChange={this.handleChange} />
				<CardList monsters={filteredMonsters} />
			</div>
		);
	}
}

export default App;
