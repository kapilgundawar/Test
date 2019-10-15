/*
 * author: Sri Sai Venkatesh
 */

var mysql = require('mysql');

var masterDbPool = mysql.createPool({
    connectionLimit: global.config.conLimit,
    host: global.config.masterIp,
    user: global.config.dbUser,
    password: global.config.dbPassword,
    database: global.config.database,
    debug: false
});
/*
 var slave1DbPool = mysql.createPool({
 connectionLimit: global.config.conLimit,
 host: global.config.slave1Ip,
 user: global.config.dbUser,
 password: global.config.dbPassword,
 database: global.config.database,
 debug: false
 });
 */
var slave1DbPool = masterDbPool;
/* var slave2DbPool = mysql.createPool({
 connectionLimit: global.config.conLimit,
 host: global.config.slave2Ip,
 user: global.config.dbUser,
 password: global.config.dbPassword,
 database: global.config.database,
 debug: false
 });
 */
var slave2DbPool = masterDbPool;

var executeQuery = function (flag, queryString, callback) {

    /*
     * flag = 0 --> master
     * flag = 1 --> slave 1
     * flag = 2 --> slave 2
     */
//    console.log("inside executeQuery class1");
    var conPool;
//    console.log("inside executeQuery class");
    switch (flag) {
        case 0:
            conPool = masterDbPool;
            console.log('master pool is selected');
            break;
        case 1:
            conPool = slave1DbPool;
//            console.log('slave1 pool is selected');
            break;
        case 2:
            conPool = slave2DbPool;
//            console.log('slave2 pool is selected');
            break;
    }

    try {
        conPool.getConnection(function (err, conn) {
            if (err) {
                console.log('ERROR WHILE GETTING CONNECTON');
                callback(err, false);
                return;
            } else {
                
                conn.query(queryString, function (err, rows, fields) {
                    if (!err) {
                        console.log(queryString);
                        conn.release();                        
                        callback(false, rows[0]);                        
                        return;
                    } else {
                        console.log('SOME ERROR IN QUERY | ', queryString);
                        console.log(err);
                        conn.release();
                        callback(err, false);
                    }
                });
            }
        });
    } catch (exception) {
        console.log(queryString);
        console.log(exception);
    }
};

var getQueryString = function (callName, paramsArr) {

    var queryString = "CALL " + callName + "(";
    paramsArr.forEach(function (item, index) {
        if (index === (paramsArr.length - 1))
            queryString = queryString + "'" + item + "'";
        else
            queryString = queryString + "'" + item + "',";
    }, this);
    queryString = queryString + ");";
    //console.log("query string", queryString);
    return queryString;
};

var executeRecursiveQuery = function (flag, start, limit, callName, paramsArr, callback) {
    var returnData = [];
    var nextLimit = parseInt(limit + start);
    var checkAndFetchRecords = function (start) {
        nextLimit = parseInt(limit + start);
        paramsArr.push(start);
        paramsArr.push(limit);
        var queryString = getQueryString(callName, paramsArr);
        paramsArr.pop();
        paramsArr.pop();

        executeQuery(flag, queryString, function (err, data) {
            if (err) {
                callback(err, returnData);
            } else {
                if (data.length === limit) {
                    returnData.push(data);
                    checkAndFetchRecords(nextLimit);
                } else {
                    if (data.length > 0)
                        returnData.push(data);
                    callback(false, returnData); // this acts as iterator
                }
            }
        });
    };
    checkAndFetchRecords(start);
};

module.exports = {
    executeQuery: executeQuery,
    executeRecursiveQuery: executeRecursiveQuery
};
