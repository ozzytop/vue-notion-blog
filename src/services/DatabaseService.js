import axios from 'axios'

export async function getAllUsers() {

    const response = await fetch('/api/users');
    return await response.json();
}

export async function createUser(data) {
    const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json();
}

export async function getDatabaseInformation() {

    const url = `api/databases`;
            
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    };
    const response = await axios.get(url, axiosConfig)
    const posts = response.data.results;
    return posts;
    
}


export async function getSingleDatabase(id) {
    
    console.log(id)
    const url = `api/pages/${id}`;
            
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    };
    const response = await axios.get(url, axiosConfig)
    return response.data;
    
}