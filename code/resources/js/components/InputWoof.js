import React from 'react';
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default class InputWoof extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			title: "",
			text: ""
		}
		this.onButtonClick = this.onButtonClick.bind(this);
		this.setTitle = this.setTitle.bind(this);
		this.setText = this.setText.bind(this);
	}

	setTitle(value){
		this.setState({
			title: value
		});
	}

	setText(value){
		this.setState({
			text: value
		});
	}

    async onButtonClick(){
		const woof = {
			title: this.state.title,
			text: this.state.text
		}
		if(woof.title == ""){
			alert("Title must not be empty");
			return;
		}
		else if(woof.text == ""){
			alert("Text must not be empty");
			return;
		}

		const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;
		const response = await fetch("woof", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Requested-With": "XMLHttpRequest",
				"Accept": "application/json",
				"X-CSRF-Token": csrfToken
			},
			body: JSON.stringify(woof),
		})
		if(response.status > 300){
			alert("You must be signed in to perform this operation");
		}
		else{
			const json = await response.json();
			this.props.updateWoofs(json);
		}
    }

    render(){
        return (
            <Paper elevation={3} sx={{ p: 3, my: 1, borderRadius: "15px"}}>
                <Stack direction="row">
                    <Avatar alt={"?"} src="/static/images/avatar/1.jpg" />
                    <Box sx={{pl: 3, width: 1}}>
                        <TextField fullWidth label="Title" outlined="true" sx={{display:"block", pb: 2}} value={this.state.title} onChange={event => this.setTitle(event.target.value)}></TextField>
                        <TextField fullWidth label="Text" outlined="true" multiline rows="5" sx={{display:"block"}} value={this.state.text} onChange={event => this.setText(event.target.value)}></TextField>
                    </Box>
                </Stack>
                <Stack direction="row" justifyContent="flex-end">
                    <Button onClick={this.onButtonClick} sx={{my: 1}} variant="contained">Submit</Button>
                </Stack>
            </Paper>
        );
    }
}
