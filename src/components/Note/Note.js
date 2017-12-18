import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Note.scss';

class Note extends Component {
	constructor() {
				super();
				this.state = {
					active: false
				};
		}

	static propTypes = {
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		text: PropTypes.string

	}
  click = () => {
    this.setState({
    	active: true
    });
    this.props.showNote(this.props.id);
  }

	render() {
		const { title, text, showNote, id, active} = this.props;
		let classes = classnames('notes-list__note-wrap', {active: active});

		return (
			<div className={classes}>
				<div className={"notes-list__note"} onClick={this.click} >
				<h4 className="notes-list__title">{title}</h4>
					{{text} &&
					<p className="notes-list__text">{text}</p>}
				</div>
			</div>
			);
	}

}

export default Note;
