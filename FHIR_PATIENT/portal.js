//取得網路上的資源
function HTTPGetData(urlStr, account_id, next_page) {
    var rawFile = new XMLHttpRequest();//creates an XML HTTP Request obj
    /*
    Update a web page without reloading the page
    equest data from a server - after the page has loaded
    Receive data from a server  - after the page has loaded
    Send data to a server - in the background
    */
    rawFile.open("GET", urlStr, true);//method,url,async
    rawFile.setRequestHeader("Content-type", "application/json+fhir");
    rawFile.onreadystatechange = function() {//onreadystatechange property specifies a function to be executed every time the status of the XMLHttpRequest object changes
        if (rawFile.readyState === 4) {//The operation is complete.
            let ret = rawFile.responseText;//A DOMString which contains either the textual data received using the XMLHttpRequest or null if the request failed or "" if the request has not yet been sent by calling send().
            console.log(ret);
            json_obj = JSON.parse(ret) // 轉換成JSON物件格式
            if (json_obj.total != 1) // 確定輸入姓名只取得一筆
                alert("姓名錯誤");
            else {
                if (json_obj.entry[0].resource.id != account_id) // 確定輸入帳號與取回來的帳號相符
                    alert("賬號錯誤");
                else { // 成功!
                    console.log("Redirecting...");
                    create_cookies(json_obj.entry[0].resource.name[0].given[0], json_obj.entry[0].resource.id);
                    //calling function name, account
                    window.open(next_page); // 導向新一頁
                }
            }
        }
    }
    rawFile.send();
}