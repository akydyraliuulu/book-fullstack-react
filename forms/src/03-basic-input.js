import React from 'react';

//var sprintf = require('sprintf-js').sprintf;
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

const content = document.createElement('div');
document.body.appendChild(content);

module.exports = class extends React.Component {
	static displayName = "03-basic-input";
	state = {
		items:["hello there"],
	};

	onFormSubmit = (evt) => {
		evt.preventDefault();
		//console.log("03: "+this.refs.name.value);
		//console.log(String.format("hi %s","there"));
		console.log("got input: {name}".formatUnicorn({name:this.refs.name.value}));
		this.setState({
			items: [].concat(this.state.items,this.refs.name.value)
		})
	};

	render() {
		const its = this.state.items.map((item)=>(<p>{item}</p>));
		return (
			<div>
				<h1>
					Sign Up Sheet
				</h1>
				<form onSubmit={this.onFormSubmit}>
					<input
						placeholder='Name'
						ref='name'
					/>
					<input type='submit' />
				</form>
				{its}
			</div>
		);
	}
};
