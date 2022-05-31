import React from 'react';
import ReactDOM from 'react-dom';
import WoofFeed from "./WoofFeed";
import Container from "@mui/material/Container";
class MainApp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userId: -1,
		}
	}

	async componentDidMount(){
		const response = await fetch('user/id',{
			 method: 'POST',
			 headers: {
				 'Content-Type': 'application/json',
				 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
			 },
		});
		const user = parseInt(await response.text());
		this.setState({ userId: user });
	}

    render(){
        return (
            <Container maxWidth="md">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <WoofFeed userId={this.state.userId}/>
                    </div>
                </div>
            </Container>
        );
    }
}

if (document.getElementById('main-app')) {
    ReactDOM.render(<MainApp />, document.getElementById('main-app'));
}
