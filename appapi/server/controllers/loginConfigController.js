/*
 *author: Kapil Gundawar
 * 
 */

var LoginConfigService = require("../services/loginConfigService");
var https = require('https');
var request = require('request');

function LoginConfigController(objCollection) {

    var responseWrapper = objCollection.responseWrapper;
    var app = objCollection.app;
    var nodemailer = objCollection.nodemailer;
    var query_string = objCollection.query_string;
    var http = objCollection.http;
    var util = objCollection.util;
    var s3 = objCollection.s3;

    var loginConfigService = new LoginConfigService(objCollection.db, objCollection.util);

    app.post('/apiData', function (req, res) {
        //        res.render('api', {routes: app._router.stack});
        res.send(responseWrapper.getResponse(false, app._router.stack, 200));
    });


    //Get the list of activitys based on user
    app.post('/trade/list', function (req, res) {
        var string = "/trade/list - " + JSON.stringify(req.body);
        objCollection.util.writeLogs(string);
        var activitys = [
            {
                "trade_list": [
                    {
                        "trade_id": "1",
                        "trade_title": "Vitusa",
                        "trade_date": "15-10-2019",
                        "trade_amount": "1000$",
                        "trade_state": "initiated"
                    },
                    {
                        "trade_id": "2",
                        "trade_title": "Infy",
                        "trade_date": "14-10-2019",
                        "trade_amount": "200$",
                        "trade_state": "Pending"
                    },
                    {
                        "trade_id": "3",
                        "trade_title": "TCS",
                        "trade_date": "12-10-2019",
                        "trade_amount": "500$",
                        "trade_state": "close"
                    },
                    {
                        "trade_id": "4",
                        "trade_title": "Wipro",
                        "trade_date": "10-10-2019",
                        "trade_amount": "600$",
                        "trade_state": "cancelled"
                    }]
            },
        ];
        if (activitys.length > 0) {
            res.send(responseWrapper.getResponse(false, activitys, 200));
        }
        else {
            res.send(responseWrapper.getResponse(false, null, 204));
        }
    });

    

}
module.exports = LoginConfigController;