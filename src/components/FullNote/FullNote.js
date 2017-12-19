import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FullNote.scss';

class FullNote extends Component {
	constructor(props) {
	    super();
	    this.state = {
	      text: ""
	    }
	  }
	static propTypes = {
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			text: PropTypes.string,
			onTextChange: PropTypes.func
	}	

	componentWillReceiveProps(props) {
		this.setState({
			text: props.note.title + "\n" + props.note.text
		});
	}
	

	handleTextChange = (event) => {
			let title = "";
			if ((event.target.value.length > 30) && !(event.target.value.slice(0, 31).includes('\n'))) {
					let newValue = event.target.value.slice(0, 30);
					newValue = newValue + '\n' + event.target.value.slice(30);
					event.target.value = newValue;
			}
	    this.setState({
	    	text: event.target.value
	    });
	    this.props.onTextChange(event.target.value, this.props.note);
	  }

	render() {
		const { note, text } = this.props;
		return (
				<form>
          <textarea className="note-editor__textarea"
           value={this.state.text}
           onChange={this.handleTextChange}
            rows="25" />
      	</form>
			);
	}

}

export default FullNote;
