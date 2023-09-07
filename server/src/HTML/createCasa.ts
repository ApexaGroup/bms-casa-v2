/**
 *  3rd party ibrary import
 */
//File system library import
import fs from "fs"
// import path from "path"

//Import sequelize database path
import { CasaDB } from "../sequelize"

//PDF creation library
import pdf from "html-pdf"

//Moment library import
import moment from "moment";

//PDF merger library
import PDFMerger from 'pdf-merger-js';

//Import handler file
import {
  QuoteTrans,
  QuoteDocumentRelation,
  QuoteTypeRelation,
} from "../handlers"

/**
 * Custom Imports
 */
// Build paths
import { BuildPath } from './buildPaths';

// Custom file specially design for css
import { style } from "./htmlStyle"

// Static data import
import { Company } from "../helpers";

// Quotation header creation method.
const quoteHeader = (imgPath: any, address: any, specialimgPath?: any) => {
  try {
    return `
  <div>
   ${imgPath ? `<img src="${imgPath}" alt="Alternate One" class="casalogo">` : ""}
   ${specialimgPath ? `<img src="${specialimgPath}" alt="Alternate Two" class="casalogo">` : ""}

  ${address ? address : ""}
  </div>
  `
  } catch (error) {
    console.error(error);
  }
}

// ! Product Table Rows Creation Method
const productRow = (item: any) => `
    <tr>
    <td class="TableRowData">${item.productName}</td>
    <td class="TableRowData">${item.unit}</td>
    <td class="TableRowData">${item.estYards}</td>
    <td colspan="3" class="TableRowData">${item.price}</td>
    </tr>
`;

// Quotation details table creation method.
const createQuoteTable = (quoteData: any) => `
 <table class="headerTable">
 <thead>
    <tr>
      <th class="TableRowHeader"> Quote Date </th>
      <td class="TableRowData">${moment(quoteData.quoteDate).format("MM/DD/YYYY")}</td>
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
      <th rowspan="2 class="TableRowHeader"> PROJECT</th>
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
`;

//Quotation product table creation method.
const createProductTable = (productRowData: any, id: any, quoteData: any) => {
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

`};

//Signature and title section creation method.
const BottomStaticText = () => {
  return `<div>
  <p class="footerBody2">
  Accepted
  <hr class="footerHr1" />
  <hr class="footerHr2" />
<p>
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
  </div>`
}

//Main html generation method
const createHtml = (table: any, productTable: any, quoteHeader: any) => `
  <html>
    <head> 
    ${style.customStyle}
</head>
    <body>
    <div class="container">
    ${quoteHeader}
    </br>
    ${table}  
    </br>
    <h3 class="extraHeader"> ADDITIONAL MIXES TO BE ADDED TO EXISTING CONTRACT</h3>
    ${productTable}
    </br>
    <div>
    ${BottomStaticText()}
    </div>
      </div>
    </body>
  </html>
`;

//this method takes in a path as a string & returns true/false as to if the specified file path exists in the system or not
const doesFileExist = (filePath: any) => {
  try {
    fs.statSync(filePath); // get information of the specified file path.
    return true;
  } catch (error) {
    return false;
  }
};

const HTMLExtraGeneration = async (data: any) => {
  try {
    const plantId = data.addendumQuoteData.quoteObject.plantId

    /* Check if the file for `html` build exists in system or not */
    if (doesFileExist(BuildPath.buildExtraPaths.buildPathHtml)) {
      /* If the file exists delete the file from system */
      fs.unlinkSync(BuildPath.buildExtraPaths.buildPathHtml);
    }
    /* generate rows */

    //! Quote Data
    const quoteData = data.addendumQuoteData.quoteObject;
    //! Mix Design Data
    const productRowData = data.addendumQuoteData.prouctData.map(productRow).join('');

    /* generate table */
    const quoteTable = createQuoteTable(quoteData)
    const productTable = createProductTable(productRowData, plantId, quoteData)

    let plantAddress
    let plantLogo
    let plantSecondLogo = null

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
      plantSecondLogo = allCompany.CasaCity.specialimgPath

    } else {
      plantAddress = allCompany.Casa.address
      plantLogo = allCompany.Casa.imgPath
    }
    const quotationHeaderDetails = quoteHeader(plantLogo, plantAddress, plantSecondLogo)

    /* generate html */
    const html = createHtml(quoteTable, productTable, quotationHeaderDetails)
    const quoteFileName = data.addendumQuoteData.quoteFileName
    const quoteId = data.addendumQuoteData.quoteObject.quoteId
    const plantCodeId = data.addendumQuoteData.quoteObject.plantId

    // Folder Created 
    let plantFolder
    if (plantCodeId == 1) {
      plantFolder = "CASA"
    } else if (plantCodeId == 2) {
      plantFolder = "CITY"
    } else if (plantCodeId == 3) {
      plantFolder = "Brooklyn"
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

    const filePath = `public/${plantFolder}/Extraquote/${quoteFileName}`
    const orignalFilePath = `public/${plantFolder}/OrignalExtraPdf/${quoteFileName}`

    const result: any = await QuoteTypeRelation.getQuoteType(quoteId)

    let getCountData: any = await CasaDB.QuoteDocumentRelation.count({
      where: {
        quoteType: result?.quoteType,
        quoteId: quoteId,
      },
    })

    const totalQuote = parseInt(getCountData) + 1

    const documentData: any = {
      quoteType: result?.quoteType,
      total: parseInt(getCountData) + 1,
      filePath: filePath,
      date: moment().toDate(),
      quoteTypeId: result?.id,
      quoteId: quoteId,
    }

    const documentRelation =
      await QuoteDocumentRelation.createQuoteDocumentRelation(
        documentData,
        result?.id
      )
    QuoteTrans.updatAddendumsDocumentPath(
      {
        addendumsDocumentPath: filePath,
        orignalAddendumPath: orignalFilePath
      },
      quoteId
    ).then(() => {
      pdf.create(html, { format: 'Letter', header: { height: "1mm" }, footer: { height: "1mm" } }).toFile('./outePath3.pdf', function (err, res) {
        if (err) return console.error(err);
        (err);
        const merger = new PDFMerger()
        merger.add('./outePath3.pdf')

        const originalPDf = new PDFMerger()
        originalPDf.add('./outePath3.pdf')

        let ss: Array<any> = data.addendumQuoteData.QualityControlSubmitted
        ss = ss.map(item => item.dataValues.documentPath)
        ss.map((item) => merger.add(item))

        const plantCodeId = data.addendumQuoteData.quoteObject.plantId
        let plantFolder
        if (plantCodeId == 1) {
          plantFolder = "CASA"
        } else if (plantCodeId == 2) {
          plantFolder = "CITY"
        } else if (plantCodeId == 3) {
          plantFolder = "Brooklyn"
        }
        originalPDf.save(`./public/${plantFolder}/OrignalExtraPdf/${quoteFileName}`)
        merger.save(`./public/${plantFolder}/Extraquote/${quoteFileName}`)
      })
    })

    /* write the generated html to file */
    fs.writeFileSync(BuildPath.buildExtraPaths.buildPathHtml, html);
    return true
  } catch (error) {
    console.log('Error generating table', error);
  }

}

export { HTMLExtraGeneration }