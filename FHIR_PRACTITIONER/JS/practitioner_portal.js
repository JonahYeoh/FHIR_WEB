function HTTPPutData(urlStr, dataStr) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("PUT", urlStr, true);
    rawFile.setRequestHeader("Content-type", "application/json+fhir");
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            ret = rawFile.responseText;
            // alert(ret);
            alert("導向至登入頁面");
            window.open("portal.html");
        }
    }
    rawFile.send(dataStr);
}

function post_practitioner() {
    var practitioner = {
        "resourceType": "Practitioner",
        "id": "ax98234",
        "text": {
            "status": "generated"
        },
        "identifier": [{
                "use": "official",
                "type": {
                    "coding": [{
                        "system": "https://www.ris.gov.tw/app/en/3051",
                        "code": "PPN" // Passport Number
                    }]
                },
                "assigner": {
                    "display": "Department Of Household Registration Taiwan"
                },
                "system": "https://www.ris.gov.tw/app/en/3051",
                "value": "AX9001234"
            },
            {
                "use": "usual",
                "type": {
                    "coding": [{
                        "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                        "code": "MD" // Medical License Number
                    }]
                },
                "assigner": {
                    "display": "Ministry Of Health and Welfare Taiwan"
                },
                "system": "https://www.mohw.gov.tw/mp-1.html",
                "value": "003"
            }
        ],
        "active": "true",
        "name": [{
            "use": "official",
            "family": "",
            "given": [
                ""
            ],
            "prefix": "mr",
            "text": ""
        }],
        "telecom": [{
                "system": "phone",
                "value": "",
                "use": "mobile"
            },
            {
                "system": "phone",
                "value": "",
                "use": "home"
            },
            {
                "system": "email",
                "value": "",
                "use": "mobile"
            }
        ],
        "gender": "male",
        "communication": [{
                "language": {
                    "coding": [{
                        "system": "urn:ietf:bcp:47",
                        "code": "zh-TW",
                        "display": "Chinese (Taiwan)"
                    }]
                },
                "preferred": false
            },
            {
                "language": {
                    "coding": [{
                        "system": "urn:ietf:bcp:47",
                        "code": "",
                        "display": ""
                    }]
                },
                "preferred": false
            }
        ],
        "birthDate": "1974-12-25",
        "deceasedBoolean": "false",
        "address": [{
                "use": "home",
                "text": "demo",
                "line": [
                    "demo"
                ],
                "city": "demo",
                "postalCode": "99999"
            },
            {
                "use": "work",
                "text": "demo",
                "line": [
                    "demo"
                ],
                "city": "demo",
                "postalCode": "demo"
            }
        ],
        "extension": [{
            "url": "http://hl7.org/fhir/registry",
            "extension": [{
                "url": "http://terminology.hl7.org/CodeSystem/v3-Race",
                "valueCodeableConcept": {
                    "coding": [{
                        "system": "http://terminology.hl7.org/CodeSystem/v3-Race",
                        "code": "1002-5"
                    }]
                }
            }]
        }],
        "qualification": [{
            "identifier": {
                "use": "official",
                "assigner": {
                    "display": "Healing University Of Medicine"
                }
            },
            "code": {
                "coding": [{
                    "system": "http://terminology.hl7.org/CodeSystem/v2-0360/2.7",
                    "code": "BS"
                }]
            },
            "period": {
                "start": "1995"
            }
        }]
    };
    // loading user's input
    practitioner.id = get_text_value("passport_number");
    practitioner.identifier[0].value = get_text_value("passport_number");
    practitioner.identifier[1].value = get_text_value("med_license");
    practitioner.name[0].prefix = get_dropdown_value("title");
    practitioner.name[0].given[0] = get_text_value("name");
    practitioner.gender = get_radio_value("gender");
    practitioner.birthDate = date_padding(get_text_value("YOB")) + "-" + date_padding(get_text_value("MOB")) + "-" + date_padding(get_text_value("DOB"));
    tel_id_postfix = ["mobile", "home", "email"];
    for (i = 0; i < practitioner.telecom.length; i++)
        practitioner.telecom[i].value = get_text_value("telecom_" + tel_id_postfix[i]);
    add_id_prefix = ["home", "work"];
    for (i = 0; i < add_id_prefix.length; i++) {
        practitioner.address[i].line = get_text_value(add_id_prefix[i] + "_address_line");
        practitioner.address[i].postalCode = get_text_value(add_id_prefix[i] + "_address_postal");
        practitioner.address[i].city = get_text_value(add_id_prefix[i] + "_address_city");
    }
    var speak_twn_chinese = get_radio_value("userCommunication0");
    if (speak_twn_chinese == "no")
        practitioner.communication.shift(); // remove the top element from array
    else
        practitioner.communication[0].preferred = true;
    // practitioner object was pre-loaded with two language elements
    var other_language = get_dropdown_value("communicationLanguage");
    if (other_language == "----") // remove the last element
        practitioner.communication.pop();
    else { // filled up the last element
        practitioner.communication[practitioner.communication.length - 1].language.coding[0].code = other_language;
        practitioner.communication[practitioner.communication.length - 1].preferred = true;
    }

    practitioner.extension[0].extension[0].valueCodeableConcept.coding[0].code = get_dropdown_value("race");

    practitioner.qualification[0].identifier.assigner.display = get_text_value("institue");
    practitioner.qualification[0].code.coding[0].code = get_dropdown_value("qualification");
    practitioner.qualification[0].period.start = get_text_value("year_of_completion") + "-" + date_padding(get_text_value("month_of_completion")) + "-" + date_padding(get_text_value("date_of_completion"));
    var url = "http://hapi.fhir.org/baseR4/Practitioner/" + practitioner.id;
    const data_string = JSON.stringify(practitioner);
    console.log(data_string);
    HTTPPutData(url, data_string);
}