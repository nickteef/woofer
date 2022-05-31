import React from "react";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import WoofFunctionBar from "./WoofFunctionBar";
import { Typography } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";


export default class Woof extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			user: {},
			edit: false,
			title: this.props.woof.title,
			text: this.props.woof.text,
		}
		this.delete = this.delete.bind(this);
		this.edit = this.edit.bind(this);
	}

	async componentDidMount(){
		const response = await fetch("api/user/"+this.props.woof.user_id);
		const user = await response.json();
		this.setState({ user });
	}

	getDate(created_at){
		const date = new Date(created_at);
		return date.toLocaleDateString();
	}

	async delete(){
		const response = await fetch("woof/"+this.props.woof.id+"/delete",{
			headers: {
				"Content-Type": "application/json",
				"X-Requested-With": "XMLHttpRequest",
				"Accept": "application/json",
				"X-CSRF-Token": document.head.querySelector("[name~=csrf-token][content]").content
			},
		});
		if(response.status!==200){
			console.log("Error deleting woof");
		}
		else{
			this.props.deleteWoof(this.props.woof);
		}
	}

	async edit(){
		this.setState({edit: !this.state.edit});
		if(!this.state.edit){
			const response = await fetch("woof/"+this.props.woof.id+"/edit",{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-Requested-With": "XMLHttpRequest",
					"Accept": "application/json",
					"X-CSRF-Token": document.head.querySelector("[name~=csrf-token][content]").content
				},
				body: JSON.stringify({
					title: this.state.title,
					text: this.state.text
				})
			});

			if(response.status > 300){
				alert("You must be signed in to perform this operation");
			}
		}
	}

    render(){
        return (
            <Paper elevation={3} sx={{ p: 3, mb: 1, borderRadius: "15px"}}>
                <Stack direction="row">
                    <Avatar alt={this.state.user.name} src={"/storage/"+this.state.user.id+".jpg"} />
                    <Box sx={{pl: 3}}>
						
                        {this.state.edit ? <input value={this.state.title} onChange={e=>this.setState({ title: e.target.value})}/> : <h4>{this.state.title}</h4>}
                        {this.state.edit ? <input value={this.state.text} onChange={e=>this.setState({text:e.target.value})} /> : <p>{this.state.text}</p>}
                    </Box>
					<Box sx={{flexGrow: 1, display: this.props.userId == this.state.user.id ? "block" : "none"}}>
						<Stack direction="row" sx={{justifyContent:"flex-end"}}>
							<Button sx={{alignSelf: "flex-end", color: this.state.upWoofed ? "blue" :"gray"}} startIcon={<Delete/>} onClick={this.delete}>Delete</Button>
						</Stack>
						<Stack direction="row" sx={{justifyContent:"flex-end"}}>
							<Button sx={{alignSelf: "flex-end", color: this.state.upWoofed ? "blue" :"gray"}} startIcon={<Edit/>} onClick={this.edit}>Edit</Button>
						</Stack>
						
						<Typography sx={{textAlign: "end"}}>{this.getDate(this.props.woof.created_at)}</Typography>
					</Box>
					
                </Stack>
                <WoofFunctionBar user={this.state.user} woof={this.props.woof} userId={this.props.userId}/>
            </Paper>
        );
    }
}