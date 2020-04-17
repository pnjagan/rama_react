
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
    gc2: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        // gridTemplateRows: 'auto auto',    
        // gridTemplateAreas : "'gi-1 gi-2' 'gi-3 gi-4'";
        gridColumnGap : '1rem',
        gridRowGap : '1rem',
        alignItems: 'center'
    },
    gc4: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto',
        // gridTemplateRows: 'auto auto',    
        // gridTemplateAreas : "'gi-1 gi-2' 'gi-3 gi-4'";
        gridColumnGap : '1rem',
        gridRowGap : '1rem',
        alignItems: 'center'
    },    
    wrl : {
        // border-style: solid;
        // border-color: green;
        // border-width: 1px;
        width : '100%',
        height : '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    wrr : {
        // border-style: solid;
        // border-color: green;
        // border-width: 1px;
        width : '100%',
        height : '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    wrc2 : {
        // border-style: solid;
        // border-color: green;
        // border-width: 1px;
        width : '100%',
        height : '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gridColumn: '1/3'
        // justifySelf : 'stretch'
    }     
  }
  );  

//components is a 2D array
//Array of Array[2] is the input
function SingleColumnOfFieldLabel (components) {
    let rowElement = null;
    let formStruc = [];
    let i = 0;

    let classes = useStyles();    

    for (rowElement of components ) {
        if(rowElement.length===2) {
            formStruc.push(<div key={i+1} className = {classes.wrl}> {rowElement[0]}</div>);
            formStruc.push(<div key={i+2} className = {classes.wrr}> {rowElement[1]}</div>);
            i = i + 2;
        }else if ((rowElement.length===1)){
            formStruc.push(<div key={i+1} className = {classes.wrc2}> {rowElement[0]}</div>);
            i = i + 1;
        }
    }; 

    let tot = <div className = {classes.gc2}>
        {formStruc}
    </div>;
    return tot;
}



//components is a 2D array
//Array of Array[2] of Array[2] is the input
function DoubleColumnOfFieldLabel (components) {
    let rowElement = null;
    let formStruc = [];
    let i = 0;

    let classes = useStyles();    

    for (rowElement of components ) {
        if(rowElement.length===4) {
            formStruc.push(<div key={i+1} className = {classes.wrl}> {rowElement[0]}</div>);
            formStruc.push(<div key={i+2} className = {classes.wrr}> {rowElement[1]}</div>);
            formStruc.push(<div key={i+3} className = {classes.wrl}> {rowElement[2]}</div>);
            formStruc.push(<div key={i+4} className = {classes.wrr}> {rowElement[3]}</div>);            
            i = i + 4;
        }else if ((rowElement.length===1)){
            //to handle stretch
            formStruc.push(<div key={i+1} className = {classes.wrl}> {rowElement[0]}</div>);
            i = i + 1;
        }
    }; 

    let tot = <div className = {classes.gc4}>
        {formStruc}
    </div>;
    return tot;
}

//Single Column of mobile first elements
function SingleColumnOfMFF(components){
    let formStruct = <Grid container direction='column' spacing={2} alignItems='center'>
        {components.map((c,i)=>{
        return <Grid item key={'grid-'+i}> {c}</Grid>
        })
         }
    </Grid>

    return formStruct;
}


//Single ROw of mobile first elements
function SingleRowOfMFF(components){
    let formStruct = <Grid container direction='row' spacing={2} alignItems='center' justifyContent='space-around'>
        {components.map((c,i)=>{
        return <Grid item key={'grid-'+i}> {c}</Grid>
        })
         }
    </Grid>

    return formStruct;
}

// export default {SingleColumnForm,DoubleColumnForm}

export  {SingleColumnOfFieldLabel,DoubleColumnOfFieldLabel,SingleColumnOfMFF,SingleRowOfMFF};