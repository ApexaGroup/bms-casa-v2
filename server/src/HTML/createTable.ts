/**
 *  3rd party ibrary import
 */
// File system library import
import fs from "fs"
import path from "path"
import * as Bluebird from "bluebird"

//PDF creation library
import PDFMerger from "pdf-merger-js"

// Time management library
import moment from "moment"

/**
 * Custom Imports
 */
// Custom file specially design for css
import { style } from "./htmlStyle"

// Static data import
import { Company } from "../helpers"
import { Project } from "../helpers"


// Build paths for html and pdf files
import { BuildPath } from './buildPaths';
// import { CasaDB } from "../sequelize";
import { PrismaClient } from "@prisma/client";

// prisma client
const prisma = new PrismaClient();

// Quotation header creation method.
const quoteHeader = (imgPath: any, address: any) => {
    try {
        return `
    <div class="logoheader">
    ${imgPath ? `<img src="${imgPath}" alt="Alternate" class="casalogo">` : ""}
    ${address ? address : ""}
    </div>
    `
    } catch (error) {
        console.error(error)
    }
}

// Project summary Quotation header creation method.
const quoteProjectHeader = (logoPath: any, addressProject: any) => {
    try {
        return `
    <div>
    ${logoPath
                ? `<div><img src="${logoPath}" alt="Alternate" class="casalogo"></div>`
                : ""
            }
    ${addressProject ? addressProject : ""}
    </div>
    `
    } catch (error) {
        console.error(error)
    }
}

// Quotation product data creation method.
const productRow = (item: any) => `
    <tr>
    <td class="TableRowData">${item.mixDesignName}</td>
    <td class="TableRowData">${1}</td>
    <td class="TableRowData">${item.estimatedYards}</td>
    <td colspan="3" class="TableRowData">$  ${item.price}</td>
    </tr>
`

// Terms and condition's section table creation method.
const createTermsTable = async (item: any) => {
    let stringvariableTable = ""
    stringvariableTable += item
        ? item.map(
            (items: any) =>
                ` <td class="fontcss"><b> ${items.shortName}</b>-${items.fullName}</td> `
        )
        : []
    stringvariableTable = stringvariableTable.replace(/,/g, "")
    const modifiedTable = `<table>
    <tbody>
        <tr>
        ${stringvariableTable}
        </tr>
    </tbody>
    </table>`
    return modifiedTable
}

// Terms ad condition;'s section data creation method.
const createTermsDetailsTable = async (item: any) => {
    let stringvariable = ""
    stringvariable += item
        ? item.map(
            (items: any) =>
                `<p class="termsDetails">
    ${items.srNo}
    <b>${items.title}</b>: 
    ${items.description}   
 </p>`
        )
        : []
    stringvariable = stringvariable.replace(/,/g, "")
    return stringvariable
}

// Quotation details table creation method.
const createQuoteTable = async (quoteData: any) => `
 <table class="headerTable">
 <thead>
    <tr>
      <th class="TableRowHeader"> Quote Date </th>
      <td class="TableRowData">${moment(quoteData.quoteDate).format(
    "MM/DD/YYYY"
)}</td>
      <th class="TableRowHeader"> Quote Code </th>
      <td class="TableRowData">${quoteData.quoteCodeId}</td>
    </tr>
    <tr>
      <th class="TableRowHeader"> Company </th>
      <td class="TableRowData">${quoteData.companyName}</td>
      <th class="TableRowHeader"> Phone# </th>
      <td class="TableRowData">${quoteData.phone}</td>
    </tr>
</thead>
<tbody>
    <tr>
      <th rowspan="2" class="TableRowHeader"> PROJECT</th>
      <td class="TableRowData">${quoteData.project}</td>
      <th class="TableRowHeader">Email</th>
      <td class="TableRowData">${quoteData.email}</td>
      <tr>
        <td class="TableRowData">${quoteData.projectAddress}</td>
        <th class="TableRowHeader">ATTN</th>
        <td class="TableRowData">${quoteData.attn}</td>
      </tr>
    </tr>
    <tr>
      <th class="TableRowHeader">CUSTOMER FULL ACCT CREDIT LIMIT</th>
      <td class="TableRowData">${quoteData.credit}</td>
      <th class="TableRowHeader">PAYMENT TERMS FROM INVOICE DATE</th>
      <td class="TableRowData">${quoteData.paymentterms}</td>
    </tr>
</tbody>
 </table>
`
//Quotation product table creation method.
const createProductTable = async (
    productRowData: any,
    id: any,
    quoteData: any
) => {
    const { allCompany } = Company
    let MixDesingTableRow
    let MixDesingTableDate

    if (id === 1) {
        MixDesingTableRow = allCompany.Casa.CasaCssMixDesignTableRow
        MixDesingTableDate = allCompany.Casa.CasaMixDesingTableData
    } else if (id === 2) {
        MixDesingTableRow = allCompany.City.CityCssMixDesignTableRow
        MixDesingTableDate = allCompany.City.CityMixDesingTableData
    } else if (id === 3) {
        MixDesingTableRow = allCompany.Brooklyn.BrooklynCssMixDesignTableRow
        MixDesingTableDate = allCompany.Brooklyn.BrooklynMixDesingTableData
    } else if (id === 4) {
        MixDesingTableRow = allCompany.CasaCity.CasaCityCssMixDesignTableRow
        MixDesingTableDate = allCompany.CasaCity.CasaCityMixDesingTableData
    } else {
        MixDesingTableRow = allCompany.Casa.CasaCssMixDesignTableRow
        MixDesingTableDate = allCompany.Casa.CasaMixDesingTableData
    }

    return `
  <table class="MixDesingTable">
  <thead>
  <tr>
  <th colspan="3" class="${MixDesingTableRow}">
      Mix Design
  </th>
  <th colspan="3" class="${MixDesingTableRow}">
      Pricing *
  </th>
 </tr>
    <tr>
        <th class="${MixDesingTableRow}">Mix Design Strength</td>
        <th class="${MixDesingTableRow}">Unit</td>
        <th class="${MixDesingTableRow}">Est. Yards</td>
        <th colspan="3" class="${MixDesingTableRow}">Price</td>
    </tr>
    </thead>
    ${productRowData}
    <tr class="MixDesingTableBody">
    <td colspan="6" class="Table">
    *This quotation is specifically for
    <b style="text-decoration: underline">
    all
    </b>
    of the concrete required for this project to be placed by customer*
    </td>
    </tr>
    <tr class="${MixDesingTableDate}">
        <td colspan="5" class="Table">
        *8%-10% Annual Increase Effective Date
        </td>
        <td class="Table">
        ${quoteData.increaseDate}
        </td>
    </tr>
  </table>
`
}

// Signature and title section creation method.
const BottomStaticText = (plantId: any) => {
    let template
    if (plantId === 1) {
        template = `
        <div>
            <p class="footerBody1">
            I hereby acknowledge that the project stated above is taxable/tax-exempt: __________________
            </p>
        <p class="footerBody2">
            Accepted
            <hr class="footerHr1" />
            <hr class="footerHr2" />
        <p class="signatureContainer">
            <span class="footersignature">
                (Signature)
            </span>
            <span class="footerPrintName">
                (Print Name)
            </span>
            <span class="footerDate">
                (Date)
            </span>
            <span class="footerTitle">
                (Title)
            </span>
        </p>
        </p>
      
        <p class="footerBody2">
            Authorized
            <hr class="footerHr1" />
            <hr class="footerHr2" />
        <p class="signatureContainer">
            <span class="footerSignature2">
                (Date)
            </span>
            <span class="footerDate2">
                (Title)
            </span>
            
        </p>
        </p>
      
        <p class="footerEndContent">
            <span class="footerEndSpan">
            This quotation  becomes a valid contract upon signing and/or acceptance of delivery of materials ordered by purchaser.  Please note that signature on this page accepts all terms and conditions for Casa Redimix on reverse/following page.  
            </span>
            If the project is tax-exempt, I understand that it is my responsibility to submit a properly-completed exempt certificate (i.e. ST 120.1) to Casa Redimix Concrete Corp.  If I fail to do so in a timely manner (90 days of initial service), I am aware that any tax incurred shall be paid in full to Casa Redimix Concrete Corp., and I will apply for a tax-credit on my own return. 
        </p>
            </div>
        `
    }
    if (plantId == 2) {
        template = `
        <div>
            <p class="footerBody1">
            I hereby acknowledge that the project stated
            above is taxable/tax-exempt:
            __________________
        </p>
        <p class="footerBody2">
            Accepted
            <hr class="footerHr1" />
            <hr class="footerHr2" />
        <p class="signatureContainer">
            <span class="footersignature">
                (Signature)
            </span>
            <span class="footerPrintName">
                (Print Name)
            </span>
            <span class="footerDate">
                (Date)
            </span>
            <span class="footerTitle">
                (Title)
            </span>
        </p>
        </p>
      
        <p class="footerBody2">
            Authorized
            <hr class="footerHr1" />
            <hr class="footerHr2" />
        <p class="signatureContainer">
            <span class="footerSignature2">
                Michelle Fernandes
            </span>
            <span class="footerDate2">
                (Date)
            </span>
            <span class="footerDate2">
                (Title)QC/SALES
            </span>
        </p>
        </p>
      
        <p class="footerEndContent">
            <span class="footerEndSpan">
            This quotation  becomes a valid contract upon signing and/or acceptance of delivery of materials ordered by purchaser.  Please note that signature on this page accepts all terms and conditions for City Transit Mix on reverse/following page. 
            </span>
            If the project is tax-exempt, I understand that it is my responsibility to submit a properly-completed exempt certificate (i.e. ST 120.1) to City Transit Mix.  If I fail to do so in a timely manner (90 days of initial service), I am aware that any tax incurred shall be paid in full to City Transit Mix., and I will apply for a tax-credit on my own return. 
        </p>
            </div>
        `
    }
    if (plantId == 3) {
        template = `
            <div>
            <p class="brooklynFooterBody1">
                I hereby acknowledge that the project stated
                above is taxable/tax-exempt:
            </p>
            <hr class="footerHr1" />
            <p class= "brooklynFooterBody2">
                I hereby verify that this signature is valid
                and that I have full authority to sign on
                behalf of the company.
            </p>
            <p class = "brooklynFooterBody3">
                X
            </p>
            <hr class="brooklynFooterHr2"/>
            <p class="brooklynSignature">
                Signature
            </p>
            <p class="brooklynPrintName">
                Print Name: ____________________________________________
            </p>
            <p class="brooklynPrintName">
                Title: ________________________________________________
            </p>
            <p class="brooklynDate">
                Date Accepted: ______________________________________
            </p>
            <hr class="brooklynFooterHr2"/>
            <p class="footerEndContent">
                <span class="footerEndSpan">
                This quotation becomes a valid contract
                upon signing and/or acceptance of
                delivery of materials ordered by
                purchaser. Please note that signature on
                this page accepts all terms and
                conditions for Prime Mix Corp D.B.A
                Brooklyn Ready Mix on reverse/following
                page.
                </span>
                If the project is tax-exempt, I understand
                that it is my responsibility to submit a
                properly-completed exempt certificate (i.e.
                ST 120.1) to Prime Mix Corp D.B.A Brooklyn
                Ready Mix If I fail to do so in a timely
                manner (90 days of initial service), I am
                aware that any tax incurred shall be paid in
                full to Prime Mix Corp D.B.A Brooklyn Ready
                Mix , and I will apply for a tax-credit on
                my own return.
            </p>
            </div>
        `
    }
    if (plantId == 4) {
        template = `
        <div>
            <p class="footerBody1">
            I hereby acknowledge that the project stated above is taxable/tax-exempt: __________________
            </p>
        <p class="footerBody2">
            Accepted
            <hr class="footerHr1" />
            <hr class="footerHr2" />
        <p class="signatureContainer">
            <span class="footersignature">
                (Signature)
            </span>
            <span class="footerPrintName">
                (Print Name)
            </span>
            <span class="footerDate">
                (Date)
            </span>
            <span class="footerTitle">
                (Title)
            </span>
        </p>
        </p>
      
        <p class="footerBody2">
            Authorized
            <hr class="footerHr1" />
            <hr class="footerHr2" />
        <p class="signatureContainer">
            <span class="footerSignature2">
                (Date)
            </span>
            <span class="footerDate2">
                (Title)
            </span>
        </p>
        </p>
      
        <p class="footerEndContent">
            <span class="footerEndSpan">
            This quotation  becomes a valid contract upon signing and/or acceptance of delivery of materials ordered by purchaser.  Please note that signature on this page accepts all terms and conditions for Casa Redimix and City Transit hereby known as The Seller(s)s) on reverse/following page.  
            </span>
            If the project is tax-exempt, I understand that it is my responsibility to submit a properly-completed exempt certificate (i.e. ST 120.1) to all Seller(s)s.  If I fail to do so in a timely manner (90 days of initial service), I am aware that any tax incurred shall be paid in full to all Seller(s)s, and I will apply for a tax-credit on my own return. 
        </p>
            </div>
        `
    }
    return template
}

// Extra charge section table creation method.
const createExtraChargeTable = async (
    extraChargeRow: any,
    overTimeDataRow: any,
    primumRateRow: any,
    shortChargeRow: any,
    id: any
) => {
    const { allCompany } = Company
    let ExtraChargeTableHader
    let OverLoadChargeHader
    let ExtraChargeTableBody
    if (id === 1) {
        ExtraChargeTableHader = allCompany.Casa.ExtraChargeTableHader
        OverLoadChargeHader = allCompany.Casa.OverLoadChargeHader
    } else if (id === 2) {
        ExtraChargeTableHader = allCompany.City.ExtraChargeTableHader
        OverLoadChargeHader = allCompany.City.OverLoadChargeHader
    } else if (id === 3) {
        ExtraChargeTableHader = allCompany.Brooklyn.ExtraChargeTableHader
        OverLoadChargeHader = allCompany.Brooklyn.OverLoadChargeHader
    } else if (id === 4) {
        ExtraChargeTableHader = allCompany.CasaCity.ExtraChargeTableHader
        OverLoadChargeHader = allCompany.CasaCity.OverLoadChargeHader
    } else {
        ExtraChargeTableHader = allCompany.Casa.ExtraChargeTableHader
        OverLoadChargeHader = allCompany.Casa.OverLoadChargeHader
    }

    const extraChargeDataArray = await prisma.extra_charge.findMany()

    /**
     * Extra Charge Data Table
     */
    let extraChargeTableData = ""
    extraChargeTableData += extraChargeRow
        ? extraChargeRow.map((items: any) => {
            let isExitingData = extraChargeDataArray.some(
                (value: any, index: any) => value.title == items.title
            )
            if (isExitingData) {
                return `<tr>
    <td class="Table"><label>${items.title}</label></td>
    <td class="Table">$<label> ${items.price}</label></td>
    <td class="Table"><label> ${items.unit}</label></td>
    </tr>
    `
            } else {
                return `<tr>
    <td class="Table"><label><b>${items.title}</b></label></td>
    <td class="Table">$<label><b> ${items.price}</b></label></td>
    <td class="Table"><label><b>${items.unit}</b></label></td>
    </tr>
    `
            }
        })
        : []
    extraChargeTableData = extraChargeTableData.replace(/,/g, "")
    /**
     * Over Load Charge table
     */
    let overLoadTableData = ""
    overLoadTableData += overTimeDataRow
        ? overTimeDataRow.map(
            (items: any) =>
                `<tr>
     <td class="Table">${items.title}</td>
     <td class="Table">$ ${items.price}</td>
     <td class="Table">${items.unit}</td>
     </tr>
     `
        )
        : []
    overLoadTableData = overLoadTableData.replace(/,/g, "")

    /**
     * primumRate Table
     */

    let primumRateRowData = ""
    primumRateRowData += primumRateRow
        ? primumRateRow.map(
            (item: any) =>
                `<tr>
            <td rowspan="2" class="PremiumRateColor">
                <label>${item.title}</label>
            </td>    
            <td class="PremiumRateColor"><label>Truck Hire Fee</label></td>
            <td class="PremiumRateColor">$<label> ${item.plantOpeningFee}</label></td>
        </tr>
        <tr>
            <td class="PremiumRateColor"> <label>Plant Opening </label> </td>
            <td class="PremiumRateColor">$<label>${item.truckHire}</label></td>
        </tr>`
        )
        : []

    primumRateRowData = primumRateRowData.replace(/,/g, "")

    return `
    <table class="ExtraChargeTable">
    <thead>
      <tr>
        <th colspan="12" class="${ExtraChargeTableHader}"> Extra Products – Additional Charges </th>
      </tr>
      <tr class="ExtraChargeTableRow">
        <th class="${ExtraChargeTableHader}">Description</th>
        <th class="${ExtraChargeTableHader}">Price</th>
        <th class="${ExtraChargeTableHader}">Unit Price</th>
      </tr>
    </thead>
    <tbody class="ExtraChargeTableBody">       
        ${extraChargeTableData}
        <tr>
            <th colspan="3" class="${OverLoadChargeHader}"> Waiting Time/Overtime Fees </th>
        </tr>
        ${overLoadTableData} 
        <tr>
            <th colspan="3" class="${OverLoadChargeHader}"> Premium Rates</th>
        </tr>
            ${primumRateRowData}
        <tr>
            <td colspan="3" class="${OverLoadChargeHader}">
                <label>Short Load Charges</label>
            </td>
            
            <tr>
                <td class="Table"><label>${shortChargeRow.length > 0 ? shortChargeRow[0].title : " "
        }</label></td>
                <td class="Table"><label>${shortChargeRow.length > 0 ? shortChargeRow[1].title : " "
        }</label></td>
                <td class="Table"><label>${shortChargeRow.length > 0 ? shortChargeRow[2].title : " "
        }</label></td>
            </tr>
            <tr>
                <td class="Table"><label> ${shortChargeRow.length > 0 ? shortChargeRow[3].title : " "
        }</label></td>
                <td class="Table"><label> ${shortChargeRow.length > 0 ? shortChargeRow[4].title : " "
        }</label></td>
                <td class="Table"><label>${shortChargeRow.length > 0 ? shortChargeRow[5].title : " "
        }</label></td>
            </tr>
        </tr>
        <tr>
            <th colSpan="12" class="${ExtraChargeTableHader}">
                *Standard hours of operation for
                weekday deliveries are loading
                times of 6:30 AM to 3:00 PM
            </th>
        </tr>
    </tbody>

 </table>
`
}
// Main html generation method
const createHtml = (
    table: any,
    productTable: any,
    extraChargeTable: any,
    quoteHeader: any,
    plantId: any
) => `
  <html>
    <head>
    ${style.customStyle}
 </head>
    <body>
    
    <div class="container" >
    ${quoteHeader}
    </br>
    ${table}  
    </br>
    ${productTable}
    </br>
    ${extraChargeTable}
    <div>
    ${BottomStaticText(plantId)}
    </div>
    </div>
    </body>
  </html>
`

// Terms and condition html generation method
const createTermsHtml = (
    plantName: any,
    termsTable: any,
    termDetailsTable: any
) => `
  <html>
    <head>
    ${style.customStyle}
 </head>
    <body>
    <div class="container">
      <h5 class="termsHeader">
            <b>
            ${plantName}
            </b>
        </h5>
        ${termDetailsTable}
      <div>
      ${termsTable}
      </div>
      </div>
    </body>
  </html>
`

const createSummaryHtml = (quoteProjectHeader: any) => `
    <html>
        <head>
        ${style.customStyle}
        </head>
        <body>
            <div class="container">
            <header style="text-align:center;">
            ${quoteProjectHeader}
            </header>
            
            <div class="mainSummary">
            <p class="projectSummary">PROJECT INFORMATIONAL SUMMARY</p>
            <p class="improvement">I hereby certify that the Project stated below is public/private improvement: _______________</p>
            <p class="note"><a style="text-decoration: underline;">PLEASE NOTE:</a> A SEPARATE SHEET MUST BE COMPLETE FOR EACH PROJECT.</p>
            
            <table class="customerTable">
            <tbody>
                <tr>
                    <td>
                        <p>Contractor/Customer: _____________________________________________________________________ </p>
                        <p>Name of Project:__________________________ <span class="ownerSpan">OWNER/AGENCY:</span> ________________________</p>
                        <p>Address:________________________________ <span style="margin-left: 90px;">Address:</span> _________________________________</p>
                        <p> _______________________________________ <span style="margin-left: 15%;"> </span>         ____________________________________</p>
                        <p>Job# : __________________<span class="yard">Total Yards: _________________</span><span class="yard">Contact Person: ________________</span></p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p style="margin-top: 15px;"> <span class="public">FOR PUBLIC IMPROVEMENT:</span><span style="margin-left: 25%;">Telephone:___________________________________</span></p>
                        <p>Agency: _______________________________ <span class="ownerSpan">G.C.C or C.M.:  </span>  ______________________________</p>
                        <p>Contract #  _____________________________ <span style="margin-left: 85px;">Address:</span> ___________________________________</p>
                        <p>Comptroller's Registration Number: <span style="margin-left: 20%;"></span> __________________________________________</p>
                        <p> _______________________________________  <span style="margin-left:80px">Telephone: </span> ________________________________</p>
                        <p> <span style="margin-left: 50%;">Contact Person: </span> ____________________________</p>
                    </td>
                </tr>
                <tr>
                    <td>
                    <p style="text-decoration: underline;font-weight: bold;margin-top: 10px;">FOR PRIVATE IMPROVEMENT: </p>
                    <p>County: _________________  <span style="margin-left: 50px;" >Block: ________________</span> <span style="margin-left: 50px;" >Lot(s): _____________</span></p>
                    <p class="privateNote"><a style="text-decoration: underline;">PLEASE NOTE:</a><span>This informational summary must be fully completed for each project that will require materials.  Credit may not be extended for materials required for this or any other project until we receive this project summary fully and properly completed.  Thank you for your prompt attention to and cooperation in completing and returning this summary sheet. Thank you.</span></p>
                    <p><span>PAYMENT BOND INFORMATION: </span><span style="margin-left: 20%;">Bond Number:  ______________________________</span></p>
                    <p>Name and address of Bonding Company: 	</p>
                    <p> _______________________________________ <span style="margin-left:78px">Bond Amount:  </span> ____________________________</p>
                    <p style="margin-right: 19%;"> _______________________________________ <span style="margin-left:78px">Completed by:  </span></p>
                    <p> _______________________________________ <span style="margin-left:78px"></span> __________________________________________</p>
                    <p style="margin-right: 33%;"> (MUST ATTACH COPY OF PAYMENT BOND)</p>
                    <p style="margin-left: 80%;">_______________________</p>
                    <p style="margin-left: 80%;">(Print Name and Title)</p>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
            </div>
            </body>

    </html>
`

//Brooklyn summary page
const createBrooklynSummary = (quoteProjectHeader: any) => `
        <html>
        <head>
        ${style.customStyle}
        </head>
        <body>
        <div class="container">
            <header style="text-align:center;">
            ${quoteProjectHeader}
            </header>

            <div class="mainSummary">
            <div class="projectSummary">PROJECT INFORMATIONAL SUMMARY</div>
            <div class="note"><a style="text-decoration: underline;">PLEASE NOTE:</a> A SEPARATE SHEET MUST BE COMPLETE FOR EACH PROJECT.</div>
            
            <table bordered class="brooklynTable">
            <tbody>
                <tr>
                    <td>
                        <p style= "font-weight: bold;"> Name of Project: ____________________________</p>
                        <p>Address:_________________________________________</p>
                        <p>Job#:_____________________________________________</p>
                        <p>Total Yards:___________________________________________________</p>
                        <p><span style="text-decoration: underline; font-weight: bold;">OWNER/AGENCY:</span>_________________________________________________</p>
                        <p>Address: _______________________________________________</p>
                        <p>Contact Person:____________________________________________</p>
                        <p>Telephone:________________________________________________________  </p>
                    </td>
                </tr>
            </tbody>
            </table>

            <div class="brooklynHereby">I hereby certify that the Project stated below is public/private improvement:</div>
            <table  bordered class="brooklynTable">
                <tbody>
                    <tr>
                        <td>
                        <p style="text-decoration: underline; font-weight: bold; font-family: Calibri;">FOR PUBLIC IMPROVEMENT:</p>
                        <p>Agency: ___________________________________________________</p>
                        <p>Contract #: _________________________________________________</p>
                        <p>Comptroller’s Registration Number: ________________________________________________</p>
                        <p><span style="text-decoration: underline; font-weight: bold;">G.C.C or C.M.:</span><span> ______________________________________________________</span> </p>
                        <p>Address: ______________________________________________</p>
                        <p>Contact Person: _____________________________________</p>
                        <p>Telephone: __________________________________________</p>
                        </td>
                    </tr>

                    <tr>
                        <td rowspan="2" style="border: 1px solid black;">
                        <p>FOR PRIVATE IMPROVEMENT: </p>
                        <p>County: ______  <span style="margin-left: 100px;">Block: _______</span> <span style="margin-left: 100px;">Lot(s): _______</span></p>
                        </td>
                    </tr>

                </tbody>
            </table>

            <div class="privateNote"><span style="text-decoration: underline; font-family: Calibri;">PLEASE NOTE:</span><span style="font-size: 10px;">This informational summary must be fully completed for each project that will require materials.  Credit may not be extended for materials required for this or any other project until we receive this project summary fully and properly completed. Thank you for your prompt attention to and cooperation in completing and returning this summary sheet. Thank you.</span></div>
            
            <table class="brooklynTable">
                <tbody>
                    <tr>
                        <td>
                        <p style="text-decoration: underline; font-weight: bold;">PAYMENT BOND INFORMATION: 	</p>
                        <p><span>Name and address of Bonding Company:</span><p> __________________________________________________</p><p> _______________________________________________________</p></p>
                        <p>Bond Number: ___________________________________________________</p>
                        <p>Bond Amount: ___________________________________________________</p>
                        <p><sapn>Completed by:</sapn><p> ________________________________________________________________</p> </p>
                        <p>(Print Name and Title)<br />
                            (MUST ATTACH COPY OF PAYMENT BOND)</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            </div>
        </div>
        </body>
    </html>
        


`

//this method takes in a path as a string & returns true/false as to if the specified file path exists in the system or not
const doesFileExist = (filePath: any) => {
    try {
        fs.statSync(filePath) // get information of the specified file path.
        return true
    } catch (error) {
        return false
    }
}

// *  create New Genration PDF
const newPdfGenration = async (
    html: any,
    termsHtml: any,
    summaryHtml: any,
    data: any,
    quoteFileName: any,
    quoteId: any
) => {
    try {
        let Promise = Bluebird as any
        const htmlpdf = Promise.promisifyAll(require("html-pdf"))
        const termspdf = Promise.promisifyAll(require("html-pdf"))
        const summarypdf = Promise.promisifyAll(require("html-pdf"))

        const result = await htmlpdf.createAsync(html, {
            format: "Letter",
            filename: "./outePath1.pdf",
            header: { height: "1mm" },
            footer: { height: "1mm" },
            phantomPath: require("requireg")("phantomjs").path,
        })

        const result1 = await termspdf.createAsync(termsHtml, {
            format: "Letter",
            filename: "./outePath2.pdf",
            header: { height: "1mm" },
            footer: { height: "1mm" },
            phantomPath: require("requireg")("phantomjs").path,
        })
        const result2 = await summarypdf.createAsync(summaryHtml, {
            format: "Letter",
            filename: "./outePath3.pdf",
            header: { height: "1mm" },
            footer: { height: "1mm" },
            phantomPath: require("requireg")("phantomjs").path,
        })

        if (
            Object.keys(result).length &&
            Object.keys(result1).length &&
            Object.keys(result2).length
        ) {
            const plantCodeId = data.quoteData.quoteObject.userPlantId
            let plantFolder

            if (plantCodeId == 1) {
                plantFolder = "CASA"
            } else if (plantCodeId == 2) {
                plantFolder = "CITY"
            } else if (plantCodeId == 3) {
                plantFolder = "Brooklyn"
            } else if (plantCodeId == 4) {
                plantFolder = "Casa&City"
            }

            // With out Design Documet
            let originalPDf = new PDFMerger()

            originalPDf.add("./outePath1.pdf")
            originalPDf.add("./outePath2.pdf")
            originalPDf.add("./outePath3.pdf")

            // With Design Documet
            let merger = new PDFMerger()
            merger.add("./outePath1.pdf")
            merger.add("./outePath2.pdf")
            merger.add("./outePath3.pdf")

            let ss: Array<any> = data.quoteData.QualityControlSubmitted
                ? data.quoteData.QualityControlSubmitted
                : []

            if (ss !== null) {
                const fileExist = ss.map((item) =>
                    fs.existsSync(item.dataValues.documentPath)
                )
                const checkStatusFile = fileExist.includes(false)
                if (checkStatusFile) {
                    console.error("Mix Desing File is Not Found !!!")
                    // return false
                    return {
                        status: false,
                        error: "Mix Design File is Not Found!!!",
                    }
                } else {
                    ss = ss.map((item) => item.dataValues.documentPath)
                    await Promise.all(ss.map(async (item) => await merger.add(item)));
                }
            }

            const checkFolderResult = fs.existsSync(`./public/CASA/OrignalPdf`)


            await originalPDf.save(
                `./public/${plantFolder}/OrignalPdf/${quoteFileName}`
            )
            await merger.save(`./public/${plantFolder}/quote/${quoteFileName}`)
            return {
                status: true,
            }
        } else {
            console.error("File Genrateing error")
            return {
                status: false,
                error: "while error Genrating PDF",
            }
        }
    } catch (error) {
        console.error(error)
        return {
            status: false,
            error: error,
        }
    }
}

// Html code generation method which take data from the server and arrange that data for html object creation.
const HTMLGeneration = async (data: any) => {
    try {
        const plantId = data.quoteData.quoteObject.userPlantId // Get Plant Id
        /* Check if the file for `html` build exists in system or not */
        if (doesFileExist(BuildPath.buildPaths.buildPathHtml)) {
            /* If the file exists delete the file from system */
            fs.unlinkSync(BuildPath.buildPaths.buildPathHtml)
        }

        //! Quote Details
        const quoteData = data.quoteData.quoteObject
        //! Extra charge Section
        const extraChargeData = data.quoteData.extracharge
        //! Get Over Time Details
        const overTimeData = data.quoteData.overTime
        //! Get primumRate Deatils
        const primumRateData = data.quoteData.primumRateCharge
        //! Short Load Charges Details
        const shortChargeData = data.quoteData.shortCharge
        //! Mix Design Data
        const productRowData = data.quoteData.prouctData
            .map(productRow)
            .join("")
        const extraChargeTable = await createExtraChargeTable(
            extraChargeData,
            overTimeData,
            primumRateData,
            shortChargeData,
            plantId
        )
        //! Terms Condition Table
        const termsRowData = data.quoteData.termsConditionTableData
        //! terms Condition Details
        const termsDetailsRowData = data.quoteData.termsConditionDetailsData

        //! Project Summary
        const quoteTable = await createQuoteTable(quoteData)
        const productTable = await createProductTable(
            productRowData,
            plantId,
            quoteData
        )
        const termsTable = await createTermsTable(termsRowData)
        const termsDetailsTable = await createTermsDetailsTable(
            termsDetailsRowData
        )
        // Company Details logo address logic
        let plantAddress
        let plantLogo
        const { allCompany } = Company
        if (plantId === 1) {
            plantAddress = allCompany.Casa.address
            plantLogo = allCompany.Casa.imgPath
        } else if (plantId === 2) {
            plantAddress = allCompany.City.address
        } else if (plantId === 3) {
            plantAddress = allCompany.Brooklyn.address
            plantLogo = allCompany.Brooklyn.imgPath
        } else if (plantId === 4) {
            plantLogo = allCompany.CasaCity.imgPath
        } else {
            plantAddress = allCompany.Casa.address
            plantLogo = allCompany.Casa.imgPath
        }
        const quotationHeaderDetails = quoteHeader(plantLogo, plantAddress)

        //Project Summary Logo Address logic
        let plantProjectAddress
        let plantProjectLogo
        const { allProjectCompany } = Project
        if (plantId === 1) {
            plantProjectAddress = allProjectCompany.Casa.addressProject
            plantProjectLogo = allProjectCompany.Casa.logoPath
        } else if (plantId === 2) {
            plantProjectAddress = allProjectCompany.City.addressProject
        } else if (plantId === 3) {
            plantProjectAddress = allProjectCompany.Brooklyn.addressProject
            plantProjectLogo = allProjectCompany.Brooklyn.logoPath
        } else if (plantId === 4) {
            plantProjectLogo = allProjectCompany.CasaCity.logoPath
        } else {
            plantProjectAddress = allProjectCompany.Casa.addressProject
            plantProjectLogo = allProjectCompany.Casa.logoPath
        }
        const quotationHeaderProject = quoteProjectHeader(
            plantProjectLogo,
            plantProjectAddress
        )

        /* generate html */
        const html = createHtml(
            quoteTable,
            productTable,
            extraChargeTable,
            quotationHeaderDetails,
            plantId
        )
        let plantName
        if (plantId === 1) {
            plantName = "Casa Redimix Concrete Corp. Terms and Conditions"
        }
        if (plantId === 2) {
            plantName = "City Transit Mix. Terms and Conditions"
        }
        if (plantId === 3) {
            plantName =
                "Prime Mix Corp D.B.A. Brooklyn Ready Mix Terms and Conditions"
        }
        if (plantId === 4) {
            plantName = "Terms and Conditions"
        }
        const termsHtml = createTermsHtml(
            plantName,
            termsDetailsTable,
            termsTable
        )
        let summaryHtml: any
        if (plantId === 3) {
            summaryHtml = createBrooklynSummary(quotationHeaderProject)
        } else {
            summaryHtml = createSummaryHtml(quotationHeaderProject)
        }

        let relativePath = process.cwd()
        relativePath = path.join(relativePath, "public", "img")
        //! Quote File Name
        const quoteFileName = data.quoteData.quoteFileName
        const quoteId = data.quoteData.quoteObject.quoteId

        // Create File Folder if folder is not exists
        let plantFolder
        if (plantId === 1) {
            plantFolder = "CASA"
        } else if (plantId === 2) {
            plantFolder = "CITY"
        } else if (plantId === 3) {
            plantFolder = "Brooklyn"
        } else if (plantId === 4) {
            plantFolder = "Casa&City"
        }
        let ss = fs.existsSync(`./public/${plantFolder}/quote`)
        if (!ss) {
            fs.mkdirSync(`./public/${plantFolder}/quote`)
        }

        ss = fs.existsSync(`./public/${plantFolder}/Extraquote`)
        if (!ss) {
            fs.mkdirSync(`./public/${plantFolder}/Extraquote`)
        }

        ss = fs.existsSync(`./public/${plantFolder}/OrignalPdf`)
        if (!ss) {
            fs.mkdirSync(`./public/${plantFolder}/OrignalPdf`)
        }

        ss = fs.existsSync(`./public/${plantFolder}/OrignalExtraPdf`)
        if (!ss) {
            fs.mkdirSync(`./public/${plantFolder}/OrignalExtraPdf`)
        }

        ss = fs.existsSync(`./public/temp`)
        if (!ss) {
            fs.mkdirSync(`./public/temp`)
        }

        const plantCodeId = data.quoteData.quoteObject.userPlantId
        if (plantCodeId == 1) {
            plantFolder = "CASA"
        } else if (plantCodeId == 2) {
            plantFolder = "CITY"
        } else if (plantCodeId == 3) {
            plantFolder = "Brooklyn"
        } else if (plantCodeId == 4) {
            plantFolder = "Casa&City"
        }

        const filePath = `public/${plantFolder}/quote/${quoteFileName}`
        const orignalFilePath = `public/${plantFolder}/OrignalPdf/${quoteFileName}`

        const result: any = await QuoteTypeRelation.getQuoteType(quoteId)
        let getCountData: any = await CasaDB.QuoteDocumentRelation.count({
            where: {
                quoteType: result?.quoteType,
                quoteId: quoteId
            }
        })

        const totalQuote = parseInt(getCountData) + 1
        const userId = data.quoteData.quoteObject.userId
        const documentData: any = {
            quoteType: result?.quoteType,
            total: totalQuote,
            filePath: filePath,
            date: moment().toDate(),
            quoteTypeId: result?.id,
            quoteId: quoteId,
            userId: userId
        }
        const documentRelation = await QuoteDocumentRelation.createQuoteDocumentRelation(documentData, result?.id)

        if (result?.quoteType === "Original") {
            const updateDetails: any = await QuoteTrans.updateQuoteDocument(
                {
                    quotationDocument: filePath,
                    orignalQuotePath: orignalFilePath,
                },
                quoteId
            )
        } else if (result?.quoteType === "Addendum") {
            const updateDetails: any = await QuoteTrans.updatAddendumsDocumentPath(
                {
                    addendumsDocumentPath: orignalFilePath,
                },
                quoteId
            )
        } else if (result?.quoteType === "Revise") {
            const updateDetails: any = await QuoteTrans.updatReviseDocumentPath(
                {
                    reviseDocumentPath: orignalFilePath,
                },
                quoteId
            )
        }



        const checkpdf = await newPdfGenration(
            html,
            termsHtml,
            summaryHtml,
            data,
            quoteFileName,
            quoteId
        )
        fs.writeFileSync(BuildPath.buildPaths.buildPathHtml, html)

        return checkpdf
    } catch (error) {
        console.log("Error generating table", error)
    }
}

// Export Code
export { HTMLGeneration }
