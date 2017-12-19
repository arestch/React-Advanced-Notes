import React, { Component } from 'react';
import './NoteEditor.scss';
import FullNote from '../FullNote/FullNote.js';
class NoteEditor extends Component {
	constructor() {
		super();
		this.state = {
			text: '',
			noteSaved: true,
			tagSaved: false,
			tagError: false,
			tagNoNote: false
		}
	}

	inputChange = (e) => {
		this.setState({
			text: e.target.value
		});
	}

	onTagAdd = (e) => {
		e.preventDefault();
		if (typeof this.props.note === "undefined" || this.props.note.length == 0) {
			this.setState({
			tagError: false,
			noteSaved: false,
			tagSaved: false,
			tagNoNote: true
			});
			return false;
		}
		
		if (this.state.text.trim().length < 3) {
			this.setState({
			tagError: true,
			noteSaved: false,
			tagSaved: false,
			tagNoNote: false
			});
			return false;
		}
		this.setState({
			text: '',
			tagError: false,
			tagSaved: true,
			noteSaved: false,
			tagNoNote: false
		});
		this.props.handleTagAdd();
	}
	getData = () => {
		return this.state.text;
	}
	noteTextChange = (text, note) => {
		this.props.onTextChange(text, note);
	}
	render() {
		const { showId, note, onDelete, onTextChange, openInfo } = this.props;
		return (
			<div className="note-editor">
				<div className="note-editor__header">
					<i className="fa fa-info-circle"
						onClick={openInfo}></i>
					<i className="fa fa-trash-o"
					 onClick={onDelete} ></i>
				</div>
				<div className="notes-editor__tags">
						<form className="notes-editor__form"
									 onSubmit={this.onTagAdd} >
							<input type="text" className="notes-editor__input" 
							value={this.state.text} onChange={this.inputChange} placeholder="Add tag..."/>
						</form>
						{
							this.state.tagNoNote &&
							<span className="notes-editor__saved notes-editor__saved--error" >Create a note for adding Tags</span>
						}
						{
							this.state.noteSaved &&
							<span className="notes-editor__saved" >Autosaving Enabled!</span>
						}
						{	
							this.state.tagSaved &&
							<span className="notes-editor__saved notes-editor__saved--tagsaved" >Tag Added</span>
						}
						{	
							this.state.tagError &&
							<span className="notes-editor__saved notes-editor__saved--error" >Tag must be at least 3 characters long!</span>
						}
				</div>
				<div className="note-editor_full-note">  {
					note && (Object.keys(note).length > 0) &&
					<FullNote note={note} onTextChange={this.noteTextChange}/>
				}
				</div>
			</div>
			);
	}

}

export default NoteEditor;
