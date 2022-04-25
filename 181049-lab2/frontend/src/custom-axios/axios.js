import axios from "./axios";

/*
with this instance, we will create all the requests*/
const instance = axios.create({
    baseURL:'http://localhost:9090',
    headers: {
        'Access-Control-Allow-Origin':'*'
        //to avoid the error
    }
})
export default instance;
/*
Now we can use this instance inside every part of the react app*/
