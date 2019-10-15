import React from 'react';

const TradeItem = (props) => {
    return (
        <tr>
            <td>{props.eachTradeData.trade_id}</td>
            <td>{props.eachTradeData.trade_title}</td>
            <td>{props.eachTradeData.trade_date}</td>
            <td>{props.eachTradeData.trade_amount}</td>
            <td>{props.eachTradeData.trade_state} </td>
        </tr>
    )
}

export default TradeItem;