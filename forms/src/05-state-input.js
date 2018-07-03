import React from 'react';

const content = document.createElement('div');
document.body.appendChild(content);

String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
	function () {
		"use strict";
		var str = this.toString();
		if (arguments.length) {
			var t = typeof arguments[0];
			var key;
			var args = ("string" === t || "number" === t) ?
				Array.prototype.slice.call(arguments)
				: arguments[0];

			for (key in args) {
				str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
			}
		}

		return str;
	};

module.exports = class extends React.Component {
	static displayName = "05-state-input";

	state = {
		fields:{
			name: '',
			email: '',
		},
		people: [],
	};

	onFormSubmit = (evt) => {
		const people = [ ...this.state.people, this.state.fields ];
		this.setState({ people: people, fields: {name:'',email:''} });
		evt.preventDefault();
	};
	/**
	 * TODO: merge onNameChangeName and onNameChangeEmail into one
	 */
	onNameChangeName = (evt) => {
		this.setState({ fields: {
			name: evt.target.value,
			email: this.state.fields.email,
		}});
	};
	onNameChangeEmail = (evt) => {
		this.setState({ fields: {
			name: this.state.fields.name,
			email: evt.target.value,
		}});
	};

	render() {
		return (
			<div>
			<h1>Sign Up Sheet</h1>

			<form onSubmit={this.onFormSubmit}>
			<input
				placeholder='Name'
				value={this.state.fields.name}
				onChange={this.onNameChangeName}
			/>
			<input
				placeholder='Email'
				value={this.state.fields.email}
				onChange={this.onNameChangeEmail}
			/>
			<input type='submit' />
			</form>

			<div>
			<h3>Names</h3>
			<ul>
			{ this.state.people.map((item, i) => <li key={i}>{"{name} ({email})".formatUnicorn(item)}
			</li>) }
			</ul>
			</div>
			</div>
		);
	}
};
