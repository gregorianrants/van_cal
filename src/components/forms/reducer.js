function customerReducer(state,action){
    const {type,payload} = action
    switch(type){
        case "HANDLE CUSTOMER INPUT":
            return {
                ...state,
                [payload.field]: payload.value
            }
        default:
            return state;
    }
}

function chargesReducer(state,action){
    const {type,payload} = action
    switch(type){
        case "HANDLE INPUT":
            return {
                ...state,
                [payload.field]: payload.value
            }
        default:
            return state;
    }
}




function rootReducer(state,action){
   return {
       customer: customerReducer(state.customer,action),
       charges: chargesReducer(state.charges,action)
   }
}

