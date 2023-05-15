//It becomes difficult to change state when we have a nested state
//to make it easy redux provide a function

// using redux library
const redux = require('redux')

//immer use
const produce = require('immer').produce

//Create store method from redux
const createStore = redux.legacy_createStore

const initialState = {
    name:"sunil",
    address:{
        street:'sagar vihar',
        city:'Navi Mumbai',
        state:'MH'
    }
}

//Action type
const STREET_UPDATED = "STREET_UPDATED"

//Action creator
const updateStreet= (street) => {
    return {
        type:STREET_UPDATED,
        payload:street
    }
    
}

//Reducer
const reducer = (state=initialState,action)=>{
    switch(action.type){
        case STREET_UPDATED:
            // return{
            //     ...state,
            //     address:{
            //         ...state.address,
            //         street:action.payload,
            //     },
            //     //To Aviod this we use Emmer 

            // }

            //immer produce(state, callbcak fun with draft is a copy)
            return produce(state,(draft)=>{
                draft.address.street = action.payload
            })
        default:
            return state
    }
}

//Store

const store = createStore(reducer)

console.log("Initial State",store.getState())

const unsubscribe = store.subscribe(()=>{console.log("update",store.getState())})

store.dispatch(updateStreet('Vashi sec-04'))



unsubscribe()
