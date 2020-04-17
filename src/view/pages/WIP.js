
import React from 'react';
import { useHistory } from "react-router-dom";

export default function WIP(props){

	let history = useHistory();

	return (<h1> URL  {history.location.pathname} is either incorrect or construction is in progress </h1>);
}