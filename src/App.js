import { TextField } from '@material-ui/core';
import React, { Component } from 'react';
import MuiForm from './MakeForm';
import defs from "./Templates.json";

// import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

export default class componentName extends Component {

	state = {
		fd: {},
		def: null,
		template_name: null,
		open: false
	}

	onSubmit = (data) => {
		let d = { ...this.state.fd }

		data.template_name = this.state.template_name;

		let body = d.body ? d.body : [];

		body.push(data);

		d.body = body;
		this.setState({ open: false, fd: d })

		console.log(d)
	}

	handleChange = (e) => {
		let fd = { ...this.state.fd }
		let def = { ...this.state.def }

		if (e.target.name === "template_name") {
			def = defs[e.target.value];
			let template_name = e.target.value;
			this.setState({ def, template_name });

		} else {
			fd[e.target.name] = e.target.value;
			this.setState({ fd })
		}
	}
	render() {

		return (
			<>
				<h1> Make Page </h1>

				<TextField placeholder="Page Name" fullWidth style={{ margin: 10, padding: 10 }} name="page_name" onChange={this.handleChange}>
				</TextField>

				<TextField placeholder="Page Path" fullWidth style={{ margin: 10, padding: 10 }} name='page_path' onChange={this.handleChange}>
				</TextField>

				<Dialog open={this.state.open} fullWidth={true} aria-labelledby="form-dialog-title" >
					<DialogTitle id="form-dialog-title">{"Add Template"}</DialogTitle>

					<DialogContent>
						<FormControl fullWidth style={{ margin: 10, padding: 10 }}>
							<InputLabel htmlFor="age-native-simple">Select Template</InputLabel>
							<Select
								native
								value={this.state.template_name}
								onChange={this.handleChange}
								inputProps={{ name: 'template_name', id: 'age-native-simple' }}
							>
								<option >{"select"}</option>
								{Object.keys(defs).map((item, i) => {
									return (
										<option value={item} key={i}>{item}</option>
									)
								})}
							</Select>
						</FormControl>
						{this.state.def && (
							<MuiForm errorMsg={null} onSubmit={this.onSubmit} def={this.state.def} defs={defs} />
						)}

					</DialogContent>
					<DialogActions>
						<Button onClick={() => { this.setState({ open: false }) }} color="primary">Cancel</Button>
					</DialogActions>
				</Dialog>


				<Button onClick={() => { this.setState({ open: true }) }}>Add Template</Button>

			</>
		);
	}
}
