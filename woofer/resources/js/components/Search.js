import React from "react";
import ReactDOM from 'react-dom';
import TextField from "@mui/material/TextField";
import {dispatch} from "./../events";

class Search extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			search: ""
		}
		this.dispatchKey = this.dispatchKey.bind(this);
		this.updateSearch = this.updateSearch.bind(this);
	}

	dispatchKey(event){
		dispatch("search", this.state.search);
	}

	updateSearch(value){
		this.setState({
			search: value
		});
	}

	render(){
		return (
			<TextField value={this.state.search} onKeyUp={this.dispatchKey} sx={{borderRadius: "50%", width:"100%"}} onChange={event => this.updateSearch(event.target.value)} label="Search"/>
		);
	}
}

if (document.getElementById('search')) {
    ReactDOM.render(<Search />, document.getElementById('search'));
}
