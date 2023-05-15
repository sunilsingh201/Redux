// using redux library
const redux = require('redux')

//redux helper - bindActioncreator (takes all action creator)
const bindActioncreator = redux.bindActionCreators

//To apply middleware we have a redux provide function applymiddleware
const applymiddleware = redux.applyMiddleware



//Create store method from redux
const createStore = redux.legacy_createStore

//Combine reducer
const combineReducers = redux.combineReducers

//redux - Logger Middleware
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()



//Action Type property value
const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"


//1. Action creator is a normal function that returs an action
function orderCake(){
    return{
        //Action -> Plain js object with type property defined as string constant
        type:CAKE_ORDERED,
        quantity:1
    }
}
function restockCake(qty=1){
    return{
        type:CAKE_RESTOCKED,
        payload:qty
    }
}


//State of an appliaction is an object
const initialState = {
    numOfCakes:10,

    // anotherProperty:0
}

//2. Reducer - It is why state chnages in response of action
//(state,action) => newState of application When can add mutiple in one reducer or create a separate reducer
const reducer = (state=initialState,action)=>{//Holding app state passed to createStore
    switch(action.type){
        case CAKE_ORDERED:
            return{
                //...state, Copy of the object and changing only the required property value & other remain unchanged
                numOfCakes:state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return{
                ...state,
                numOfCakes:state.numOfCakes + action.payload
            }
        default:
            return state
    }
}

//Another reducer when we make should have a separate state they are independent of one another

//3. Redux Store
//There is only one store for entire application
//Holds state
//Access state using - getState()
//update state using - dispatch(action)
//Register listener - subscribe(listener)
//unscribe listener - unsubscribe(listener)

//Passing multiple reducer to a root reducer to pass as a single to createStore()
//combine accepts an object
// const rootReducer = combineReducers({
//     cake:cakeReducer,
//     icecream:icecreamReducer
// })



//1. Holds the state /Can take only one reducer
const store = createStore(reducer)


//Passing root reducer to createStore and middleware logger
// const store = createStore(rootReducer,applyMiddleware(logger))


//2. current state getState()
console.log("Initial State",store.getState())


//4. subscribe retuns a listener function that run every time when action is dispatch or state is chnaged
const unsubscribe = store.subscribe(()=>console.log("Updated state",store.getState()))


//Using logger
//const unsubscribe = store.subscribe(()=>{})
//Will get the things in details not just like just a console.log("update state")

//3. dispatch(action) -> we can pass directly the action but use action creator for more simplicity
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())

store.dispatch(restockCake(3))


//Using action creator takes a object of action not necessary
// const actions = bindActioncreator({orderCake,restockCake},store.dispatch)
// actions.orderCake()
// actions.orderCake()
// actions.orderCake()
// actions.restockCake(3)



//The listener function is removed
unsubscribe()


//Middleware ->
//Third party extension to extend the feature of redux using custom functionality
// between dispathcing an action and the momentn it reaches a reducer
//Middlerware use - logger,crash reporting,perform sync task
