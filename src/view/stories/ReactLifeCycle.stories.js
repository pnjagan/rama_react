import React from 'react';
import  { useState } from 'react';
import {log} from '../../state/utils';


export default { title: 'LIFE CYcle DEMO' };

class ReactLifeCycleTest extends React.Component{
    constructor(props){  
        super(props);  
        this.state ={sValue: 1};
   }  

   componentWillMount() {
    log('CC - Component Will Mount');
   }

   componentDidMount() {
    log('CC - Component Did Mount');
   }

   componentWillReceiveProps(nextProps) {
    log('CC - Component Will Receive Props',nextProps);
   }

   shouldComponentUpdate(nextProps,nextState){
    log('CC - Should component update',nextProps,nextState);
    return true;
   }

   componentWillUpdate(nextProps,nextState) {
    log('CC - component WILL update',nextProps,nextState)
   }

   componentDidUpdate(prevProps,prevState) {
    log('CC - component Did update',prevProps,prevState);
   }

   componentWillUnmount() {
    log('CC - component Will Unmount');
   }

   onClickHandler = () => {
        this.setState( (state,props)=> { return {sValue : state.sValue +1 } } );
   }

   render(){
   return <div>Hello Component {this.props.name}
            <button onClick ={this.onClickHandler}> INNER COUNT  {this.state.sValue} </button>
   </div>
   }
}

export const ReactLifeCycleDemo = () => {
    
    const [mountState, setMountState] = useState(true);
    const [rcount, setRCount] = useState(1);
    

    let changeMountState = () => {
        setMountState(!mountState);
        // setRCount(rcount+1);
    }

    let changeCount = () => {
        // setMountState(!mountState);
        setRCount(rcount+1);
    }    
    // let rnum =10;


    return <div >

         {mountState?<ReactLifeCycleTest name={`Rama ${rcount}`} />:''}
<br></br>
    <button onClick = {changeMountState}> 
        (Un)mount component
    </button> <br></br>
    <br></br>
    <button onClick = {changeCount}>
        Update Count
    </button>

</div> ;
}


let ReactFunctionalLifeCycleTest = (props) => {

    const [sValue, setSValue] = React.useState(1);

    const [data, setData] = React.useState('Data');

    let onClickHandler = () => {
        setSValue( sValue +1 );
    }
    const someJunk = React.useRef({v:'JUNK'});
    // someJunk.current = {v:'JUNK'};

    // let someJunk = {v :'JUNK'};

    // Similar to componentDidMount and componentDidUpdate:
    React.useEffect(() => {
        // Update the document title using the browser API
        log(`Use Effect is being called sValue: ${sValue} , props : ${props.name}`);
        log(`someJunk :${someJunk.current.v}`)
        // setData(Math.random()*10);
        someJunk.current.v  = someJunk.current.v + Math.random()*10;

        //return  (()=> {log('Use effect Cleanup is called')});
    });


    // Similar to componentDidMount and componentDidUpdate:
    React.useEffect(() => {
        // Update the document title using the browser API
        log(`ONLY on MOUNT and UNMOUNT`);
        // setData(Math.random()*10);

        return  (()=> {log('Use effect Cleanup is called')});
    },[]);    

    return (
    <div>*{data}* {someJunk.current.v} * {props.name}
        <button onClick ={onClickHandler}> Inner COUNT  {sValue} </button>
        </div>
    );
}
export const ReactFunctionalLifeCycleDemo = () => {
    const [mountState, setMountState] = useState(true);
    const [rcount, setRCount] = useState(1);
    

    let changeMountState = () => {
        setMountState(!mountState);
        // setRCount(rcount+1);
    }

    let changeCount = () => {
        // setMountState(!mountState);
        setRCount(rcount+1);
    }    
    // let rnum =10;


    return <div >
      {mountState?<ReactFunctionalLifeCycleTest name={`Rama ${rcount}`} />:''}
        <br></br>
        <button onClick = {changeMountState}> 
        (Un)mount component
        </button>
        <br></br>
        <br></br>
        <button onClick = {changeCount}>
            Update Count
        </button>

</div> ;
}