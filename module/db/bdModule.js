const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({ 
    fild:String,
    value:Number
});
var countermodul = mongoose.model('cashwalletcounters', counterSchema);

const userSchema = new mongoose.Schema({ 
    userName:String,
    userID:Number,
    transactionPin:String,
    accountNumber:String,
    multyCurrencyPermition:String,
    password:String,
    email:String,
    mobile:String,
    varyficatinStatus:String,
    country:String,
    countryCode:String,
    currency:String,
    currencySymbol:String,
    accountBalance:String,
    usdtBalance:String,
    lastBalanceUpdate:{ type: Date},
    regdate: { type: Date, default: Date.now },
    lastlogin: { type: Date}
});
var usermodul = mongoose.model('cashwalletusers', userSchema);

module.exports={
    counter:countermodul,
    user:usermodul,
}