/*
 * author: Kapil Gundawar // Added Few Sample which we can put in uitis
 */

var moment = require('moment');
var request = require('request');
var os = require('os'); // to define end of line
var fs = require('fs'); // File commands
var PubNub = require('pubnub');
var NodeGeocoder = require('node-geocoder');
var twilio = require('twilio');

function Util() {

    this.isAValidPhoneNumber = function (number) {
        return /^[\d\+\-\(\) ]+$/.test(number);
    };

    // encode string with base64
    this.encodeBase64 = function (string) {
        var b = new Buffer(string);
        return b.toString('base64');
    };

    // decode string with base64
    this.decodeBase64 = function (string) {
        var c = new Buffer(string, 'base64');
        return c.toString();
    };

    this.textWithOutSpaces = function (text) {
        return text.replace(/ +/g, "");
    };

    this.getSMSString = function (verificationCode) {
        var msg_body = "Trade";
        return (msg_body);
    };

    this.generatePasscode = function () {
        return Math.floor(100000 + Math.random() * 900000);
    };

    this.randomInt = function (low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    };

    this.expiryDate = function () {
        return "2100-12-31 00:00:00";
    };
    this.getCurrentUTCTime = function (datetime) {
        if (typeof datetime == 'undefined')
            return moment().utc().format("YYYY-MM-DD HH:mm:ss");
        else
            return moment(datetime).utc().format("YYYY-MM-DD HH:mm:ss");
    };

    this.getcurrentTimeOnly = function () {
        var date = new Date();
        var hours = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var dateTimeString = hours + ":" + min + ":" + sec;
        return dateTimeString;
    };

    this.getCurrentDateTime = function (time) {
        var date = new Date(time + ' UTC');
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    };
    this.getCurrentDate = function () {
        var now = moment().utc().format("YYYY-MM-DD");
        return now;
    };
    this.writeLogs = function (data) {
        var date = this.getCurrentDate() + ' ' + this.getcurrentTimeOnly();
        var logFilePath = 'logs/' + this.getCurrentDate() + '.txt';
        var data_to_add = date + ': ' + data;
        if (fs.existsSync(logFilePath)) {
            fs.appendFile(logFilePath, os.EOL + data_to_add, function (err) {
                if (err)
                    console.log('Error while writing data to file', err);
            });
        } else {
            fs.writeFile(logFilePath, data_to_add, function (err) {
                if (err)
                    console.log('Error while writing data to file', err);
            });
        }
    };


}

module.exports = Util;