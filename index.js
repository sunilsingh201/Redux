
//Use REdux
const redux = require('redux')


//redux-logger by middleware
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

//bindActionCreators
const bindActionCreators = redux.bindActionCreators

//Combine reducer
const combineReducers = redux.combineReducers

//create a store
const createStore = redux.legacy_createStore

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICE = 'BUY_ICE'

//Action Creator is a function that return an action
function buyCake(){
    return {
        //Action
        type:BUY_CAKE,
        info:'First redux action'
    }
}

function buyIce(){
    return {
        type:BUY_ICE
    }
}
//Reducers 
//(previosState,action) = > newState

//The state is an object
//This is the state whhich redux store holds

const initialState = {
    numberofCakes:10
    // numberofIce:20
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case BUY_CAKE:
            return{
                ...state,
                numberofCakes: state.numberofCakes - 1
            }
        // case BUY_ICE:
        //     return{
        //         ...state,
        //         numberofIce :state.numberofIce - 1
        //     }
        default:
            return{
                state
            }
    }
}

//Create a store | Responsibilit 01 -> Holds application state
const store = createStore(reducer)

//getState() | 2
console.log("Initial state", store.getState())


const unsubscribe = store.subscribe(()=>
    console.log('updated state', store.getState())
)


//3 dispatch action
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

// store.dispatch(buyIce())
// store.dispatch(buyIce())
// store.dispatch(buyIce())

//4 subscribe
// store.subscribe(()=>
//     console.log('updated state',store.getState())
//     )
//5 unscribe
unsubscribe()
//We can have multiple reducer