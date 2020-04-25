import axios from 'axios';
import {log} from '../utils';


let headers = {};
headers['Content-Type'] = 'application/json';
headers['Accept'] ='application/json';

let config = {
    timeout: 10000,
    headers
}


/*
OUTPUT of call API is uniform irrespective of failure or success

{
    status:
    statusText:
    response : <the JSON from server>
}

*/
export const callAPI = (endPoint,method ,data) => {

    log('Input data in call API :' , data);

    return axios[method](endPoint,data,config).then(
        response => {
            log('Success API: ',response);
            return {
                status : response.status,
                statusText : response.statusText,
                serverResponse : response.data
            };
        },
        error => {
            log('Error API :',error);

            if(error.isAxiosError == null) {
                //server error
                return {
                    status : error.response.status,
                    statusText : error.response.statusText,
                    serverResponse : error.response.data
                };
            } else {
                return {
                    status : 'AXIOS_ERROR',
                    statusText :'AXIOS_ERROR',
                    serverResponse : 'AXIOS_ERROR'
                };
            }         

        }
    )
};

