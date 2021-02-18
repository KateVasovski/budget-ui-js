const axios = require('axios');

export function get(url) {
    return axios(url, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            mode: 'no-cors',
        }
    }).then((response) => {
        console.log(response.data);
        return response.data
    })
        .catch((error) => {
            console.log(error);
        });

}