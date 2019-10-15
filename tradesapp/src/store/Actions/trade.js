import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const tradeListFetchStart = () => {
    return {
        type: actionTypes.TRADE_FETCH_START,
    };
};
export const tradeListFetchSuccess = (tradeData) => {
    return {
        type: actionTypes.TRADE_FETCH_SUCCESS,
        tradeData: tradeData,
    };
};

export const getTradeList = (requestData) => {
    return dispatch => {
        dispatch(tradeListFetchStart());
        Axios.post('trade/list')
            .then(res => {
                const tradeData = res.data.response;
                dispatch(tradeListFetchSuccess(tradeData));
            })
            .catch(err => {
                console.log(err);
                //dispatch(tradeFetchFail(err)); kind of exception u can add
            })

    };
};