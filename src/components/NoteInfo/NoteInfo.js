import React, { Component} from 'react';
import PropTypes from 'prop-types';
import './NoteInfo.scss';

class NoteInfo extends Component {

	static propTypes = {
		note: PropTypes.object.isRequired,
		closeInfo: PropTypes.func.isRequired
	}

	addZero(i) {
				  if (i < 10) {
	        i = "0" + i;
	    }
	    return i;
	}
	render() {
		
		const { note, closeInfo } = this.props;
		const cd = new Date(note.id);
		// const formattedDate = ('0' + dateCreated.getHours()).slice(-2) + ':' + ('0' + dateCreated.getMinutes()).slice(-2);
		const newdate =  cd.getDate() + "/" + cd.getMonth() + "/" + cd.getFullYear()
										 + " " + this.addZero(cd.getHours()) + ":" + this.addZero(cd.getMinutes()) + ":" + this.addZero(cd.getSeconds());
		return (
				<div className="note-info">
						<div className="note-info__block">
							<h3 className="note-info__title">
									Info</h3>
							<div className="note-info__info-block">
							<p className="note-info__name">Name:  <span className="note-info__span">
							{note.title}</span></p>
							<p className="note-info__date">Created:  <span className="note-info__span">
							{newdate}</span></p>
							<p className="note-info__tags">Tags:  <span className="note-info__span">
							{note.tags.length > 0 ? note.tags.join(', ') : "No tags yet"}</span></p>
							</div>
							<i className="fa fa-times" onClick={closeInfo}></i>
						</div>
				</div>
			);
	}

}

export default NoteInfo;
