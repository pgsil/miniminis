import React, { Component } from 'react';
import marked from 'marked';
import autosize from 'autosize';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {inputText: ""};

		this.renderMarkdown = this.renderMarkdown.bind(this);
		this.handleChange = this.handleChange.bind(this);

		marked.setOptions({
		  renderer: new marked.Renderer(),
		  gfm: true,
		  tables: true,
		  breaks: false,
		  pedantic: false,
		  sanitize: false,
		  smartLists: true,
		  smartypants: false
		});
	}

	handleChange(e){
		autosize(document.querySelector('textarea'));
		this.setState({inputText: e.target.value});
	}

	renderMarkdown(){
		let result = marked(this.state.inputText)
		let formatted = {__html: result};
		let final = <div dangerouslySetInnerHTML={formatted} />
		this.setState({mkdwn: final});
	}

	render() {
	return (
	<div className="App container">
		<section className="hero">
			<div className="hero-body">
				<div className="container">
				  <h1 className="title">
					zero effort markdown converter
				  </h1>
				  <h2 className="subtitle">
					congratulations my man
				  </h2>
				</div>
			</div>
		</section>

		<div className="columns">
			{/*Left column*/}
			<div className="column">
				<div className="box" >
					<div className="textinput">
						<textarea className='textarea' rows='3' data-min-rows='3' onChange={this.handleChange.bind(this)}></textarea>
					</div>				
					<br/>
					<button className="button is-primary" onClick={this.renderMarkdown}>Render</button>	
					
				</div>
			</div>

			{/*Right column*/}
			<div className="column">
				<div className="box" >
					
					<div className="content">
						{this.state.mkdwn ? this.state.mkdwn : "Nothing to show! :("}
					</div>
				</div>
			</div>
		</div>
	</div>
	);
  }
}

export default App;
