function HTTPGetData(urlStr, callback_fn) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", urlStr, true);
    rawFile.setRequestHeader("Content-type", "application/json+fhir");
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            let ret = rawFile.responseText;
            // console.log(ret);
            callback_fn(ret);
        }
    }
    rawFile.send();
}

function HTTPPutData(urlStr, dataStr) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("PUT", urlStr, true);
    rawFile.setRequestHeader("Content-type", "application/json+fhir");
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            ret = rawFile.responseText;
            alert(ret);
            alert("導向至登入頁面");
            window.open("portal.html");
        }
    }
    rawFile.send(dataStr);
}

function post_practitioner_role() {
    var practitioner_role = {
        "resourceType": "PractitionerRole",
        "id": "",
        "period": {
            "start": ""
        },
        "practitioner": {
            "reference": "Practitioner/"
        },
        "organization": {
            "reference": "Organization/jonah"
        },
        "code": [{
            "coding": [{
                "system": "http://hl7.org/fhir/practitioner-role",
                "code": ""
            }]
        }],
        "specialty": [{
            "coding": [{
                "system": "https://www.hl7.org/fhir/valueset-c80-practice-codes.html",
                "code": ""
            }]
        }],
        "location": {
            "reference": "Location/"
        }
    }
    practitioner_role.id = "pr." + get_text_value("practitioner_ref");
    practitioner_role.practitioner.reference += get_text_value("practitioner_ref");
    practitioner_role.location.reference += get_dropdown_value("location_list");
    practitioner_role.code[0].coding[0].code = get_dropdown_value("role_list");
    practitioner_role.specialty[0].coding[0].code = get_dropdown_value("specialty_list");
    practitioner_role.period.start = get_text_value("year_since") + "-" + date_padding(get_text_value("month_since")) + "-" + date_padding(get_text_value("date_since"));
    var url = "http://hapi.fhir.org/baseR4/PractitionerRole/" + practitioner_role.id;
    const data_string = JSON.stringify(practitioner_role);
    console.log(data_string);
    HTTPPutData(url, data_string);
}