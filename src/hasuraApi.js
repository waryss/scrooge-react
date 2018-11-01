import {storeSession} from './action';

var authUrl = "http://52.212.148.235:8089/public/";
var dataUrl = "http://52.212.148.235:8089/me/expenses";


const networkErrorObj = {
    status: 503
}

export async function tryAuth(email, password, task, dispatch) {

    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
    };
    var url = authUrl + task;
    console.log(url)
    var body = {
        "email": email,
        "password": password
    };

    requestOptions["body"] = JSON.stringify(body);

    try {
        var resp = await fetch(url, requestOptions);
        return resp;
    }
    catch (err) {
        console.log("Request Failed: " + err);
        return networkErrorObj;
    }
}

export async function insertExpense(expense, token) {

    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
    };
    var body = {
        "amount": expense.amount,
        "detail": expense.detail,
        "title": expense.title
    };
    requestOptions.headers["Authorization"] = "Bearer " + token
    requestOptions["body"] = JSON.stringify(body);

    try {
        var resp = await fetch(dataUrl, requestOptions);
        return resp;
    }
    catch (err) {
        console.log("Request Failed: " + err);
        return networkErrorObj;
    }
}

export async function fetchExpenses(token) {

    var requestOptions = {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        }
    };
    requestOptions.headers["Authorization"] = "Bearer " + token

    try {
        var resp = await fetch(dataUrl, requestOptions);
        return resp;
    }
    catch (err) {
        console.log("Request Failed: " + err);
        return networkErrorObj;
    }
}

export async function updateExpense(id, complete, token) {

    var requestOptions = {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        }
    };
    var body = {
        "type": "update",
        "args": {
            "table": "expenses",
            "where": {
                "id": id
            },
            "$set": {
                "completed": complete
            }
        }
    }
    requestOptions.headers["Authorization"] = "Bearer " + token
    requestOptions["body"] = JSON.stringify(body);

    try {
        var resp = await fetch(dataUrl, requestOptions);
        return resp;
    }
    catch (err) {
        console.log("Request Failed: " + err);
        return networkErrorObj;
    }
}

export async function deleteExpense(id, token) {

    var requestOptions = {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json"
        }
    };
    requestOptions.headers["Authorization"] = "Bearer " + token;

    try {
        var resp = await fetch(dataUrl, requestOptions);
        return resp;
    }
    catch (err) {
        console.log("Request Failed: " + err);
        return networkErrorObj;
    }
}
