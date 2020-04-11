
import React from 'react';

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStylesLabel = makeStyles({
    root: {
        textAlign : 'right'
    },
  });

  const useStylesTextField = makeStyles({
    root: {
        width: '300px'
    },
  });  

export default function RRTextfield (props) {
    let fieldProps = {};
    let classesLabel = useStylesLabel();
    let classesInput = useStylesTextField();

    if(props.size && (props.size==='small' || props.size === 'medium')){
        fieldProps.size = props.size;
    }
    //fieldProps.label = props.label;
    fieldProps.id = props.id;
    fieldProps.placeholder = props.placeholder;
    // fieldProps.size = 10;
    //fieldProps.fullWidth = true;
    //let idSeq = Math.round(Math.random()*1000000);

    return (



<Grid container spacing={3}>

<Grid item xs={3} style = {{alignSelf : 'center'}}>
 <InputLabel classes={classesLabel}> {props.label} </InputLabel>

</Grid>
<Grid item xs={9}>



    <TextField 
        variant="outlined" 
        classes = {classesInput}
        {...fieldProps}
    />
</Grid>

</Grid>


    );
}