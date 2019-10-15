import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import Axios from 'axios';
import * as Actions from '../../store/Actions/index';
import SingleTrade from './TradeItem';


class TradeList extends Component {
    state = {
        randomValue: null
    }


    componentDidMount() {
        // code using redux
        this.props.onTradeList();

        // With out using redux 
        /* Axios.post('/trade/list')
         .then(res => {
             console.log('Trade Details: ', res.data.response);
         }); */
    }
    render() {
        let tradeListArray = [];
        if (this.props.tradeList.length > 0) {
            this.props.tradeList.map((trade, index) => {
                tradeListArray.push(
                    <SingleTrade key={index} eachTradeData={trade} />
                )
            })
        }
        return (
            <div>
                <h1 style={{color:'#ea2020',marginTop:'10%'}}>Welcome to Trade Application</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Trade Id</th>
                            <th>Trade Title</th>
                            <th>Trade Date</th>
                            <th>Trade Amount</th>
                            <th>Trade State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tradeListArray}
                    </tbody>
                </Table>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        tradeList: state.trade.tradeList
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onTradeList: () => dispatch(Actions.getTradeList(0))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TradeList);

