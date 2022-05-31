import React from "react";
import Woof from "./Woof";
import {on} from "./../events";
import InputWoof from "./InputWoof";

export default class WoofFeed extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            woofs: []
        }
		this.updateWoofs = this.updateWoofs.bind(this);
		this.deleteWoof = this.deleteWoof.bind(this);
    }

	updateWoofs(woof){
		this.setState({
			woofs: [woof, ...this.state.woofs]
		});
	}

	deleteWoof(woof){
		const woofs = this.state.woofs.filter(w => w.id !== woof.id);
		this.setState({
			woofs
		});
	}

	async fetchAllWoofs(){
		const response = await fetch('api/woofs')
        const woofs = await response.json();
        this.setState({ woofs });
	}

	async fetchSearchWoofs(search){
		const response = await fetch("api/woof/search/"+search);
		const woofs = await response.json();
		this.setState({ woofs });
	}

    async componentDidMount(){
        await this.fetchAllWoofs();

		on("search",async (data)=>{
			if(data == ""){
				await this.fetchAllWoofs();
			}
			else{
				await this.fetchSearchWoofs(data);
			}

		});
    }

    render(){
        return ( 
        <div>
			<InputWoof updateWoofs={this.updateWoofs}/>
            {this.state.woofs.map(woof => <Woof key={woof.id} woof={woof} userId={this.props.userId} deleteWoof={this.deleteWoof}></Woof>)}
        </div>
        );
    }
}