
let prouctData1

const allQuoteData = async(data:any) => {
try {
    prouctData1 = data.quoteData.prouctData 
    
} catch (error) {
    console.error(error);
}
}

const prouctData =[
    {
        "productName":"Mix-Demo-Data-1",
        "unit":"CY",
        "estYards":"2",
        "price":"4000"
    },
    {
        "productName":"Mix-Demo-Data-2",
        "unit":"CY",
        "estYards":"2",
        "price":"4000"
    },
    {
        "productName":"Mix-Demo-Data-3",
        "unit":"CY",
        "estYards":"2",
        "price":"4000"
    },
    {
        "productName":"Mix-Demo-Data-3",
        "unit":"CY",
        "estYards":"2",
        "price":"4000"
    },
]

const quoteData = {
    "quoteDate":"07/29/2021",
    "quoteCode":"Apexa-HR-5-Next",
    "companyName":"Apexa-HR",
    "phone":"999-999-9999",
    "project":"NEXT INFO",
    "projectAddress":"2525 DEERCOVE DRIVE",
    "email":"amitslica@gmail.com",
    "attn":"Jhone",
    "credit":"NO-LIMIT",
    "paymentterms":"N/A"
}

const extracharge = [
    [{
        "createdOn": "2021-07-24T10:30:13.000Z",
        "fieldDescription": "",
        "id": 768,
        "isActive": true,
        "modifiedOn": "2021-07-24T10:30:13.000Z",
        "plantId": 4,
        "price": "$0.66",
        "quoteNote": "",
        "quoteTransactionId": 47,
        "title": "Hot Weather - Ice",
        "unit": "LB"
    }],
    [{
        "createdOn": "2021-07-24T10:30:13.000Z",
        "fieldDescription": "",
        "id": 768,
        "isActive": true,
        "modifiedOn": "2021-07-24T10:30:13.000Z",
        "plantId": 4,
        "price": "$20.00",
        "quoteNote": "",
        "quoteTransactionId": 47,
        "title": "Environmental Surcharge",
        "unit": "LOAD"
    }],
    [{
        "createdOn": "2021-07-24T10:30:13.000Z",
        "fieldDescription": "",
        "id": 768,
        "isActive": true,
        "modifiedOn": "2021-07-24T10:30:13.000Z",
        "plantId": 4,
        "price": "$75.00",
        "quoteNote": "",
        "quoteTransactionId": 47,
        "title": "Returned Concrete",
        "unit": "CY"
    }],
    [{
        "createdOn": "2021-07-24T10:30:13.000Z",
        "fieldDescription": "",
        "id": 768,
        "isActive": true,
        "modifiedOn": "2021-07-24T10:30:13.000Z",
        "plantId": 4,
        "price": "$0.15",
        "quoteNote": "",
        "quoteTransactionId": 47,
        "title": "SikasetNon Chloride",
        "unit": "OZ"
    }],
    [{
        "createdOn": "2021-07-24T10:30:13.000Z",
        "fieldDescription": "",
        "id": 768,
        "isActive": true,
        "modifiedOn": "2021-07-24T10:30:13.000Z",
        "plantId": 4,
        "price": "$0.15",
        "quoteNote": "",
        "quoteTransactionId": 47,
        "title": "Viscocrete 2100",
        "unit": "OZ"
    }],
    [{
        "createdOn": "2021-07-24T10:30:13.000Z",
        "fieldDescription": "",
        "id": 768,
        "isActive": true,
        "modifiedOn": "2021-07-24T10:30:13.000Z",
        "plantId": 4,
        "price": "$0.15",
        "quoteNote": "",
        "quoteTransactionId": 47,
        "title": "Sika Plastiment",
        "unit": "OZ"
    }]

]


const mixProductData = {
    prouctData,
    quoteData,
    extracharge,
    allQuoteData,
    prouctData1
}
export { mixProductData }
