console.log('Running assignment...');

const transactions = require('./simple-transaction-data').data;

//console.log(transactions);

// Assignment 1:
const filterFunction = (data) => {
    return data.filter((transaction) => {
        // TODO
        return (transaction.credit_card_company === "VISA") &&
        (transaction.transaction_date > "2015-01-01") &&
        (transaction.price >= 50)
    });
}


// Assignment 2:
// helper function to calc average price
const average = (myCollection) => myCollection.reduce((prev, curr) => prev + parseFloat(curr.price), 0) / myCollection.length

const aboveAverageFunction = (data) => {
    // calculate average from list
    const avg = average(data)

    // go through list and check if isPriceAboveAverage and add false or true on each of the objects
    //return data.filter((transaction) => transaction.price > avg)
    
    return data.map((transaction) => transaction.price > avg ? 
        {...transaction, "isPriceAboveAverage" : true} : 
        {...transaction, "isPriceAboveAverage" : false})
}

/* Printing out my result
'credit_card_company' is 'VISA'
'transaction_date' is 2015 or later
price is 50 or above*/

//console.log(filterFunction(transactions))

//console.log(average(transactions).toFixed(2))

//console.log("*************ABOVE AVERAGE*************")
//console.log(aboveAverageFunction(transactions))

console.log(aboveAverageFunction(transactions))