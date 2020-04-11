
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    gc: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gridTemplateRows: 'auto auto',    
        // gridTemplateAreas : "'gi-1 gi-2' 'gi-3 gi-4'";
        gridColumnGap : '5px',
        gridRowGap : '5px',
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
    }    
  }
  );  

//components is a 2D array
export default function Build2ColumnForm (components) {
    let rowElement = null;
    let formStruc = [];
    let i = 0;

    let classes = useStyles();    

    for (rowElement of components ) {
        formStruc.push(<div key={i+1} className = {classes.wrl}> {rowElement[0]}</div>);
        formStruc.push(<div key={i+2} className = {classes.wrr}>{rowElement[1]}</div>);
        i = i + 2;
    }; 

    let tot = <div className = {classes.gc}>
        {formStruc}
    </div>;
    return tot;
}