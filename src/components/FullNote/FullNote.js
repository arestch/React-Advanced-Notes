import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FullNote.scss';

class FullNote extends Component {
	constructor(props) {
	    super();
	    console.log(props.text);
	    this.state = {
	      text: props.text
	    }
	  }

	componentWillReceiveProps(props) {
		this.setState({
			text: props.text
		});
	}
	static propTypes = {
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		text: PropTypes.string
}	

	handleTextChange = (event) => {
	    this.setState({
	    	text: event.target.value
	    });
	  }

	render() {
		const { notes, text } = this.props;
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
