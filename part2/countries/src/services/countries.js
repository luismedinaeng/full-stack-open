import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    const promise = axios.get(baseURL)
    
    return promise.then(response => response.data)
}

export default { getAll }