import * as actionTypes from '../Actions/actionTypes';
const initialState = {
    tradeList: [],

}
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.TRADE_FETCH_START:
            return {
                ...state,
                tradeList: [],
            }
        case actionTypes.TRADE_FETCH_SUCCESS:
            return {
                ...state,
                tradeList: action.tradeData[0].trade_list,
            }
        default:
            return state;


    }

}
export default reducer;