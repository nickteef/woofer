import React from "react";
import Stack from "@mui/material/Stack";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';

export default class WoofFunctionBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			upWoofed: false,
			downWoofed: false,
			upWoofCount: 0,
			downWoofCount: 0,
		};
		this.upWoofClick = this.upWoofClick.bind(this);
		this.downWoofClick = this.downWoofClick.bind(this);
		this.upWoofCount = this.upWoofCount.bind(this);
	}

	async isUpWoofed(){
		const response = await fetch("isupwoofed",{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Requested-With": "XMLHttpRequest",
				"Accept": "application/json",
				"X-CSRF-Token": document.head.querySelector("[name~=csrf-token][content]").content
			},
			body: JSON.stringify({
				woof_id: this.props.woof.id
			})
		});

		const text = await response.text();
		this.setState({ upWoofed: text == "1" });

	}

	async isDownWoofed(){
		const response = await fetch("isdownwoofed",{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Requested-With": "XMLHttpRequest",
				"Accept": "application/json",
				"X-CSRF-Token": document.head.querySelector("[name~=csrf-token][content]").content
			},
			body: JSON.stringify({
				woof_id: this.props.woof.id
			})
		});
		const text = await response.text();
		this.setState({ downWoofed: text == "1" });

	}

	async upWoofClick(){
		const response = await fetch("upwoof",{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Requested-With": "XMLHttpRequest",
				"Accept": "application/json",
				"X-CSRF-Token": document.head.querySelector("[name~=csrf-token][content]").content
			},
			body: JSON.stringify({
				woof_id: this.props.woof.id
			})
		})
		if(response.status!==200){
			alert("You must be signed in to perform this operation");
		}
		else{
			const json = await response.json();
			const sum = this.state.upWoofed ? -1 : 1;
			this.setState({
				upWoofed: !this.state.upWoofed,
				upWoofCount: this.state.upWoofCount+sum
			})
		}
		
	}

	async downWoofClick(){
		const response = await fetch("downwoof",{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Requested-With": "XMLHttpRequest",
				"Accept": "application/json",
				"X-CSRF-Token": document.head.querySelector("[name~=csrf-token][content]").content
			},
			body: JSON.stringify({
				woof_id: this.props.woof.id
			})
		});
		if(response.status!==200){
			alert("You must be signed in to perform this operation");
		}
		else{
			const json = await response.json();
			const sum = this.state.downWoofed ? -1 : 1;
			this.setState({
				downWoofed: !this.state.downWoofed,
				downWoofCount: this.state.downWoofCount+sum
			})
		}	
	}

	async upWoofCount(){
		const response = await fetch("api/woof/count/up/"+this.props.woof.id,{
			headers: {
				"Content-Type": "application/json",
				"X-Requested-With": "XMLHttpRequest",
				"Accept": "application/json",
				"X-CSRF-Token": document.head.querySelector("[name~=csrf-token][content]").content
			},
		});
		const text = await response.text();
		this.setState({
			upWoofCount: parseInt(text),
		})
	}

	async downWoofCount(){
		const response = await fetch("api/woof/count/down/"+this.props.woof.id,{
			headers: {
				"Content-Type": "application/json",
				"X-Requested-With": "XMLHttpRequest",
				"Accept": "application/json",
				"X-CSRF-Token": document.head.querySelector("[name~=csrf-token][content]").content
			},
		});
		const text = await response.text();
		this.setState({
			downWoofCount: parseInt(text),
		})

	}

	componentDidMount(){
		this.isUpWoofed();
		this.isDownWoofed();
		this.downWoofCount();
		this.upWoofCount();
	}

    render(){
        return (
            <Stack direction="row">
                <Button sx={{color: this.state.upWoofed ? "blue" :"gray"}} startIcon={<ArrowUpwardIcon/>} onClick={this.upWoofClick}>{this.state.upWoofCount} UpWoof</Button>
                <Box sx={{mx: 3}} />
                <Button sx={{color: this.state.downWoofed ? "blue" :"gray"}} startIcon={<ArrowDownwardIcon/>} onClick={this.downWoofClick}>{this.state.downWoofCount} DownWoof</Button>
            </Stack>
        );
    }
}