import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


const useMuiFormStyles = makeStyles((theme) => ({
    formWrapper: {
        '& .MuiInputBase-root': {
            '&:hover fieldset': {
                borderColor: '#c5c5c5',
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main
            },
        },
        '& .MuiSelect-root': {
            textTransform: 'capitalize'
        }
    },
    margin: {
        marginLeft: '0px'
    },
    inputHide: {
        display: 'none'
    },
    paddingBottom: {
        paddingBottom: theme.spacing(3)
    },
    upload: {
        display: 'flex',
        alignItems: 'center'
    },
    uploadText: {
        paddingRight: theme.spacing(2),
        textTransform: "capitalize"
    },
    uploadPath: {
        paddingTop: theme.spacing(1)
    },
    submitBtn: {
        // position: "absolute",
        // bottom: theme.spacing(2),
        // right: "20px"
    },

}))
const CreateButton = (props) => {
    const col = props.col;
    const [val, setVal] = React.useState({});
    const handleChange = (e) => {
        val[e.target.name] = e.target.value
        setVal(val);
        props.onChange(col.name, col.field_type, val)

    };
    return (
        <>
            <TextField
                fullWidth={true}
                name="button_name"
                variant="outlined"
                onChange={handleChange}
                placeholder="button_name"
            >
            </TextField>

            <TextField
                fullWidth={true}
                name="button_url"
                variant="outlined"
                onChange={handleChange}
                placeholder="button_url"
            >
            </TextField>
        </>
    );

}
const CreateList = (props) => {
    const col = props.col;
    let refDef = props.defs[col.reference];
    const [open, setOpen] = React.useState(false);

    let data = props.formData[col.name] ? [...props.formData[col.name]] : [];

    const onCancel = () => {
        setOpen(false)
    };
    const onOpen = () => {
        setOpen(true)
    }

    const onSubmit = (e) => {
        data.push(e)
        console.log(e, props);
        props.onChange(col.name, col.field_type, data);
        setTimeout(() => {
            setOpen(false);
        }, 10)
    }

    return (
        <div>
            <Dialog open={open} fullWidth={true} aria-labelledby="form-dialog-title" onEscapeKeyDown={onCancel}>
                <DialogTitle id="form-dialog-title">{props.actionName === "create" ? "Add" : "Update"}</DialogTitle>
                <DialogContent>
                    <MuiForm errorMsg={null} onSubmit={onSubmit} def={refDef} btnTxt="list Submit" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>

            <Button onClick={onOpen}>Add {col.name}</Button>
        </div>
    );
}


export default function MuiForm(props) {
    const classes = useMuiFormStyles();
    let def = JSON.parse(JSON.stringify(props.def));
    const [formData] = React.useState({});


    const onSubmit = () => {
        console.log(formData)
        props.onSubmit(formData);
    }

    const onChange = (name, type, value) => {
        formData[name] = value;
    }

    const generalOnChange = (e) => {
        onChange(e.target.name, e.target.type, e.target.value);
    }

    const createText = (col) => {
        return <TextField fullWidth={true} variant="outlined" placeholder={col.name} type="text" onChange={generalOnChange} name={col.name}></TextField>;
    }

    const generateForm = () => {
        let form = [];
        for (let col in def.columns) {

            let c = def.columns[col], jsx;
            // if (c.opt.hidden) continue;
            if (c.field_type === 'text') jsx = createText(c);
            else if (c.field_type === 'button') jsx = <CreateButton col={c} onChange={onChange} formData={formData} />;
            else if (c.field_type === 'list') jsx = <CreateList col={c} onChange={onChange} formData={formData} defs={props.defs} onSubmit={onSubmit} />;
            if (!jsx) continue;
            form.push(<div key={c.name}>{jsx}</div>);
        }
        return form;
    }


    return (
        <React.Fragment>
            {generateForm()}
            <Button type="submit" className={classes.submitBtn} variant="contained" color="primary" onClick={onSubmit}>{"Submit"}</Button>
        </React.Fragment>
    );
}

