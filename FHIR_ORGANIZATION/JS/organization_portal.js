function HTTPPutData(urlStr, dataStr) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("PUT", urlStr, true);
    rawFile.setRequestHeader("Content-type", "application/json+fhir");
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            ret = rawFile.responseText;
            alert(ret);
        }
    }
    rawFile.send(dataStr);
}

function post_organization() {
    var organization = {
        "resourceType": "Organization",
        "id": "",
        "active": "",
        "type": [{
            "coding": [{
                "system": "http://terminology.hl7.org/CodeSystem/organization-type",
                "code": "",
                "display": ""
            }]
        }],
        "name": "",
        "alias": [],
        "telecom": [{
                "system": "phone",
                "value": "",
                "use": "work"
            },
            {
                "system": "fax",
                "value": "",
                "use": "work"
            },
            {
                "system": "email",
                "value": "",
                "use": "work"
            }
        ],
        "address": [{
                "use": "work",
                "text": "",
                "line": [],
                "city": "",
                "postalCode": ""
            }]
            /*,
            "contact": [{
                "purpose": {
                    "coding": [{
                        "system": "http://terminology.hl7.org/CodeSystem/contactentity-type",
                        "code": "",
                        "display": ""
                    }]
                },
                "name": {},
                "telecom": [{
                    "system": "phone",
                    "value": "",
                    "use": "mobile"
                }],
                "address": {
                    "use": "work",
                    "text": "",
                    "line": [],
                    "city": "",
                    "postalCode": ""
                }
            }]
            */
    };
    // loading user's input
    organization.id = get_text_value("org_acc");
    organization.active = true;
    organization.name = get_text_value("org_name");
    organization.type[0].coding[0].code = get_dropdown_value("type_list");
    var alias_names = get_text_value("alias").split(",");
    for (i = 0; i < alias_names.length; i++) {
        organization.alias.push(alias_names[i].trim());
    }
    organization.telecom[0].value = get_text_value("telecom_phone");
    organization.telecom[1].value = get_text_value("telecom_fax");
    organization.telecom[2].value = get_text_value("telecom_email");
    organization.address[0].line = get_text_value("org_address_line");
    organization.address[0].city = get_text_value("org_address_city");
    organization.address[0].postalCode = get_text_value("org_address_postal");

    var url = "http://hapi.fhir.org/baseR4/Organization/" + organization.id;
    const data_string = JSON.stringify(organization);
    console.log(data_string);
    HTTPPutData(url, data_string);
}