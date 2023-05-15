//import redux
const redux = require('redux')

//createStore fn from redux
const createStore = redux.legacy_createStore

//applyMiddelware from redux
const applyMiddelware = redux.applyMiddleware

//use middleware third party library
const thunkMiddlerware = require('redux-thunk').default

//import axios
const axios = require('axios')



//Initial state
const initialState = {
    loading:false,
    data:[],
    error:''
}

//Action Type 

const DATA_FETCH_REQUEST = 'DATA_FETCH_REQUEST'
const DATA_FETCH_SUCCESS = 'DATA_FETCH_SUCCESS'
const DATA_FETCH_FAIL = 'DATA_FETCH_FAIL'



//Action creator
const fetchUsersRequest = () =>{
    return {
        type:DATA_FETCH_REQUEST,
    }
}
const fetchUsersSuccess = (users) =>{
    return {
        type:DATA_FETCH_SUCCESS,
        payload:users,
    }
}
const fetchUsersFail = (error) =>{
    return {
        type:DATA_FETCH_FAIL,
        payload:error,
    }
}

//Reducer
const reducer = (state=initialState,action) =>{
    switch(action.type){
        case DATA_FETCH_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case DATA_FETCH_SUCCESS:
            return{
                loading:false,
                users:action.payload,
                error:''
            }
        case DATA_FETCH_FAIL:
            return{
                loading:false,
                users:[],
                error:action.payload
            }
    }
}

//Aync action creator
//Like other action creator it doesnt return object but returns an function
const fetchUsers = () =>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        //Axios request
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            const users = response.data.map((user)=>user.id)
            dispatch(fetchUsersSuccess(users))
        }).catch((error)=>{
            //console.log(error.message)
            dispatch(fetchUsersFail(error.message))
        })
    }
}


//The Redux store
const store = createStore(reducer, applyMiddelware(thunkMiddlerware))

//TO make a API call in redux We use
//1. Axios api
//2. redux-thunk -> This creates a async action creator is a middleware


//getState()
// console.log("Initial State",store.getState())

store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers())

