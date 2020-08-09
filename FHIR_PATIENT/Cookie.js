function setCookie(cname, cvalue, exdays) {//cookie name, cookie value, cookie expire days
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));//setting d value to d + exdays in seconds
    var expires = "expires=" + d.toGMTString();//changing d to a string stated in GMT format
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";//sets a cookie by adding together the cookiename, the cookie value, and the expires string.
}

function getCookie(cname) {//cookie name as arguement
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);//Decode the cookie string, to handle cookies with special characters, e.g. '$'
    var ca = decodedCookie.split(';');//Split document.cookie on semicolons into an array called ca 
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {//if the cookie is found
            return c.substring(name.length, c.length);//return the value of the cookie
        }
    }
    return "";//if not found , return " "
}