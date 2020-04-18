import axios from 'axios';
import assign from 'lodash/assign'

let baseURL = 'http://localhost:3100';

const axiosInstance = axios.create({timeout: 10000})
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.common['Accept'] = 'application/json';

axiosInstance.interceptors.request.use(
  config => {
    //ADD JWT token to the header if available
    return config;
  },
  error => Promise.reject(error)
);

export const callAPI = (  endpoint
                        , options = {} 
                       ) => {

    let request_info = assign({},{url: baseURL + endpoint}, options)
    return axiosInstance(request_info).
            then( response => {
                if (response.status === 204) {
                    return {}
                }
                    return response
            })
            .then( response => {
                let data =  response.data
                let json_with_status = assign({}, data, { response_status: response.statusText });
                if(!response.statusText === 'OK'){
                    let message = 'Something went wrong. Please try again!'
                    if ( data.errors ){
                        message = Object.entries(data.errors).reduce((msg, error) => {
                        const [field, error_msgs] = error
                        error_msgs.forEach((error_msg)=>{
                            msg += `${field} ${error_msg}.`
                        })
                        return msg
                        },'')
                    }
                    let json_with_message = assign({}, json_with_status, { message: message });
                    return(json_with_message)
                }
                return Object.assign({},json_with_status)
            })
            .catch( error => {
                const {message, response} = error
                const {data} = response || {}
                const {status, statusText} = response || {}
                throw {message, status, statusText,...data}
            })
}
