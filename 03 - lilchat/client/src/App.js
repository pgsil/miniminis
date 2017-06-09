import React, { Component } from 'react';
import './App.css';

class App extends Component {

	constructor(props) {

		super(props);

		this.state = {json: "", message: "", username: ""};

		this.getJson();

		this.getJson = this.getJson.bind(this);    
		this.handleMessageChange = this.handleMessageChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.postJson = this.postJson.bind(this);
		this.emptyInput = this.emptyInput.bind(this);
	}

	componentDidMount() {
		 setInterval(() => {
		this.getJson();
}, 1000);
	}

	getJson(){
		fetch("/jason")
				.then((response) => {
					if(response.status === 200 && response.ok === true) {
						return response.json();
					}
				})
				.then(json => {
					json = JSON.parse(json);

					if(!(JSON.stringify(this.state.json) === JSON.stringify(json))){
						this.setState({json: json});				
					}
					else{
						console.log("No new messages detected. Not rerendering.")
					}
					
				 })
				 .catch(err => {
					console.log(err)
				 })
	}
	getFetched(data){
		return data
	}

	emptyInput(){
		this.setState({message: ""});
		this.refs.messageinput.value = "";
	}

	postJson(e){
		e.preventDefault();

		let date = new Date();
		let time = date.getTime();

		fetch('/jason/msg', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message: this.state.message, username: this.state.username, time: time
			})
		});

		this.emptyInput();
	}

	renderMessages(){
		if(this.state.json){
			let array = this.state.json.messages
			return array.map(function(elem, index){
				return <div key={elem.username + elem.time + "-" + index}>{elem.username + ": " + elem.message}</div>
			})
		}
		else{
			return "ha"
		}
	}

	handleMessageChange(e){
		this.setState({message: e.target.value});
	}
	handleNameChange(e){
		this.setState({username: e.target.value});
	}

	render() {
		return (
			<div className="App">
				<div className="content-messages">
					{this.renderMessages()}
				</div>

				<div className="content-form">
					<form onSubmit={this.postJson}>
					<input placeholder="Name" onChange={this.handleNameChange} className="input-name"></input>
					<input placeholder="message" ref="messageinput" onChange={this.handleMessageChange} className="input-message"></input>
					<button type="submit" className="input-button">Submit</button>
					</form>
				</div>
			</div>
		);
	}
}

export default App;
