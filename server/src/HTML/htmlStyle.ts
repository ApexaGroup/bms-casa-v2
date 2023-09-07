
const customStyle = `
<style>

.MixDesingTableRowCasa {
  text-align: center;
  font-size : 7px;
  background-color:
      rgb(247, 202, 172);
  color: black; 
  padding: 0px;
  border: 1px solid black;  
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
}

.MixDesingTableRowCity {
text-align: center;
background-color:
    rgb(180,198,231);
color: black;
border-bottom-width: 0px;
border-color: black;
border-bottom-color: black;
vertical-align: middle;
padding: 0px;
border: 1px solid black;
border-collapse: collapse;
} 

.MixDesingTableRowBrooklyn {
text-align: center;
background-color: rgb(254, 202, 198);
color: black;
border-bottom-width: 0px;
border-color: black;
border-bottom-color: black;
vertical-align: middle;
padding: 0px;
border: 1px solid black;
border-collapse: collapse;
}

.MixDesingTableRowCasaCity {
  text-align: center;
  font-size : 8px
  background-color:
      rgb(255,242,204);
  color: black;
  border-bottom-width: 0px;
  border-color: black;
  border-bottom-color: black;
  vertical-align: middle;
  padding: 0px;
  border: 1px solid black;
  border-collapse: collapse;
}

.fontcss {
  font-size: 8px;
}

.MixDesingTableDataCity {
  text-align: right;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: bold;
  font-size: 10px;
  background-color:
    rgb(180,198,231);
  border: 1px solid black;
  border-collapse: collapse;
}
.MixDesingTableDataCasa {
  text-align: right;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: bold;
  font-size: 7px;
  background-color: rgb(247, 202, 172);
  border: 1px solid black;
  border-collapse: collapse;
  marginLeft: auto;
  marginRight: auto;
  color: black;
  
}
.MixDesingTableDataBrooklyn {
  text-align: right;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: bold;
  font-size: 10px;
  background-color: rgb(254, 202, 198);
  border: 1px solid black;
  border-collapse: collapse;
}

.MixDesingTableDataCasaCity {
  text-align: right;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: bold;
  font-size: 7px;
  background-color:
      rgb(255,242,204);
  border: 1px solid black;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
}

.ExtraChargeTableHaderCasa {
  text-align: center;
  background-color: rgb(247, 202, 172);
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  border: 1px solid black;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
}
.ExtraChargeTableHaderCity {
  text-align: center;
  background-color: rgb(180,198,231);
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  border-bottom-width: 1px;
  border-color: black;
  border-bottom-color: black;
  vertical-align: middle;
  padding: 0px;
  border: 1px solid black;
  border-collapse: collapse;
}
.ExtraChargeTableHaderbrooklyn {
  text-align: center;
  background-color: rgb(254, 202, 198);
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  border-bottom-width: 1px;
  border-color: black;
  border-bottom-color: black;
  vertical-align: middle;
  padding: 0px;
  border: 1px solid black;
  border-collapse: collapse;
}

.ExtraChargeTableHaderCasaCity {
  text-align: center;
  background-color: rgb(255,242,204);
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  border-bottom-width: 1px;
  border-color: black;
  border-bottom-color: black;
  vertical-align: middle;
  padding: 0px;
  border: 1px solid black;
  border-collapse: collapse;
  font-size: 10px;
}

.OverLoadChargeHaderCasa {
  text-align: center;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 10px;
  background-color:
      rgb(247, 202, 172);
  font-weight: bold;
  padding: 0px;
  border: 1px solid black;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
}
.OverLoadChargeHaderCity {
  text-align: center;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 10px;
  background-color: rgb(180,198,231);
  font-weight: bold;
  border-bottom-width: 1px;
  border-color: black;
  border-bottom-color: black;
  vertical-align: middle;
  padding: 0px;
  border: 1px solid black;
  border-collapse: collapse;
}
.OverLoadChargeHaderBrooklyn {
  text-align: center;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 10px;
  background-color: rgb(254, 202, 198);
  font-weight: bold;
  border-bottom-width: 1px;
  border-color: black;
  border-bottom-color: black;
  vertical-align: middle;
  padding: 0px;
  border: 1px solid black;
  border-collapse: collapse;
}

.OverLoadChargeHaderCasaCity {
  text-align: center;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 10px;
  background-color:
      rgb(255,242,204);
  font-weight: bold;
  border-bottom-width: 1px;
  border-color: black;
  border-bottom-color: black;
  vertical-align: middle;
  padding: 0px;
  border: 1px solid black;
  border-collapse: collapse;
}

.mainbody {
  max-width: 60%;
  margin-left: auto;
  margin-right: auto;
  vertical-align: middle;
  font-size : 10px,
  border-bottom-width: 1px !important;
  border-color: black;
  border-bottom-color: black;
  border: 1px solid black;
}
    .Table {
      border: 1px solid black;
      vertical-align: middle;
      padding: 0px;
    }
    .TableRowHeader {  
      border: 1px solid black;
      vertical-align: middle;
      padding: 0px;
      border-collapse: collapse;
      margin-left: auto;
      margin-right: auto;
      border-bottom-color: black;
  }

  .TableRowData {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 0px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
  .headerTable {
    color: black;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 7px;
    text-transform: uppercase;
    text-align: center;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    border: 1px solid black;
}
.headerTable5 {
  margin-bottom: auto;
  margin-top: auto;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 7px;
  text-transform: uppercase;
  text-align: center;
  width: 90%;
}
    .MixDesingTable {
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      color: black;
      font-size: 7px !important;
      margin-left: auto;
      margin-right: auto;
      border: 1px solid black;
      margin-top: auto;
      width: 80.5%;
      border-collapse: collapse;
    }
  .MixDesingTableBody {
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 7px !important;
    border: 1px solid black;
}
.casalogo{
  width: 70px;
  height: 40px;
  margin-left:27px;
}
.casaAddress {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 8px;
  float: right;
  margin-right: 35px;
}
.brooklynAddress{
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 8px;
  float: right;
  margin-right: 35px;
}
.citylogo {
  text-align: left;
  font-style: italic;
  font-size: 30px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color: rgb(47, 84, 150);
  margin-left: 60px;
  padding-bottom: auto;
  margin-right: auto;
}
.logoheader {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: auto;
}
.cityAddress {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: .85rem;
  margin: 0px;
}
.cityphone {
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color: rgb(47, 84, 150);
  margin-left: 60px;
  padding-bottom: auto;
  margin-right: auto;
  font-size: 10px;
}
.cityAdd{
  margin-left: 60px;
}

.cityinfo {
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 10px;
  color: rgb(47, 84, 150);
  margin-left: 60px;
}
.termsHeader {
  text-align: center;
  color: black;
  font-size: 12px;
}

.termsDetails {
  font-size: 7px;
  text-align: justify;
  margin-bottom: auto;
  width: 98.1%;
}

.termsDetailsSpan {
  text-decoration: underline;
  font-style: italic;
  font-size: 8px;
  text-align: justify;
}
.ExtraChargeTable {
  color: black;
  font-size: 8px;
  vertical-align: middle;
  border: 1px solid black;
  width: 98.2%;
  marginLeft: auto;
  marginRight: auto;
  border-collapse: collapse;
}

.ExtraChargeTableHader {
  text-align: center;
  background-color:
      rgb(247, 202, 172);
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  vertical-align: middle;
  padding: 0px;
  border: 1px solid black;
}

.PremiumRatesRows {
  background-color:
      rgb(255, 242, 204);
  font-size: 7px;
  vertical-align: middle;
  padding: 0px;
  border: 1px solid black;
  
}

.ExtraChargeTableRow {
  text-align: center;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  background-color: rgb(247, 202, 172);
  border: 1px solid black;
}

.ExtraChargeTableBody {
  text-align: center;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 7px;
  border: 1px solid black;
}
.footerBody1 {
    text-align: left;
    color: black;
    font-size: 7px;
    marging-top : 5px;
    marging-bottom : 5px;
    width: 92.2%;
    margin-left: 39px;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
.signatureContainer {
  margin : 0px
}

.footerBody2 {
    text-align: left;
    color: black;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 7px;
    marging-top : 2px;
    marging-bottom : 2px;
    width: 92.2%;
    margin-left: 39px;
}

.footerHr1 {
    margin: auto;
    margin-bottom: 1px;
    border: 1px solid black;
}

.footerHr2 {
    margin: 0px;
    margin-bottom: auto;
    border-color: black;
}

.footersignature {
    text-align: left;
    padding: 100px;
    color: black;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 7px;

}

.footerSignature2 {
    padding: 90px;
    padding-right: 50px;
    font-size: 7px;
    color: black;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

.footerPrintName {
    padding-right: 150px;
    color: black;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 7px;
}

.footerDate {
    padding-right: 100px;
    color: black;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 7px;
}

.footerDate2 {
    padding-left: 20px;
    padding-right: 50px;
    color: black;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 6px;
}

.footerTitle {
    color: black;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 7px;
}

.footerTitle2 {
    padding: 90px;
    padding-right: 10px;
    color: black;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 6px;
}

.footerEndContent {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 7px;
  text-align: justify;
  margin : 0px;
    
}

.footerEndSpan {
    text-decoration: underline;
    font-weight: bold;
    text-align: justify;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-style: italic;
    font-size: 7px;
}

.brooklynFooterBody1{
    text-align: left;
    color: black;
    font-size: 10px;
    margin-top : 5px;
    margin-bottom : 1px;
    width: 92.2%;
    margin-left: 39px;
    font-weight: bold;
    background-color: rgb(255,255,204);
    opacity: 0.8;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

.brooklynFooterBody2{
  text-align: left;
    color: black;
    font-size: 10px;
    margin-top : 5px;
    width: 92.2%;
    font-weight: bold;
    margin-left: 39px;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

.brooklynFooterBody3{
  font-weight: bold;
  text-align: left;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 7px;
  margin-bottom: 1px;
  width: 92.2%;
  margin-left: 39px;
}

.brooklynFooterHr2{
  margin-top: auto;
  margin-bottom: 1px;
  color: black;
  margin-left: 35px;
  margin-right: 20px;
  width: 92.2%;
  border: 1px solid black; 
}

.brooklynSignature{
  font-weight: bold;
  font-size: 7px;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  margin-bottom: 1px;
  width: 92.2%;
  margin-left: 39px;
}

.brooklynPrintName{
  text-align: left;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 10px;
  width: 92.2%;
  margin-left: 39px;
  margin-top: auto;
  margin-bottom: 1px;
}

.brooklynDate{
  text-align: left;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 10px;
  width: 92.2%;
  margin-left: 39px;
}

.PremiumRateColor {
  background-color: rgb(255, 242, 204);
  border: 1px solid black;
  border-collapse: collapse;
}

.PremiumRateColor1 {
  background-color: rgb(217, 226, 243);
  border: 1px solid black;
  border-collapse: collapse;
}

.shortLoadColor {
  background-color: rgb(247, 202, 172);
  font-weight: bold;
}

.shortLoadColor1 {
  background-color: rgb(180,198,231);
  font-weight: bold;
}
.extraHeader{
  text-align: center;
}
.projectSummary{
  text-align: center;
  text-decoration: underline;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: bold;
  font-size: 10px;
}
.improvement{ 
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 10px;
  margin-bottom: 1px;
  margin-right: 60px;
}
.note{
  font-size: 10px;
  width: 92.2%;
  text-align: left;
  margin-top:5px;
}
a.note{
  text-decoration: underline;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 10px;
}
a.privateNote{
  text-decoration: underline;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 10px;
}
.customerTable{
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  width: 92.2%;
  text-align: left;
  font-size: 10px;
  
}
p.customerTable{
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 10px;
}
.customerTable .ownerSpan{
  text-decoration: underline;
  margin-left: 85px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 10px;
}
.customerTable .yard{
  margin-left: 50px;
  font-size: 10px;
}
.customerTable .public{
  text-decoration: underline;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: bold;
  width: 92.2%;
  margin-top: 10px;
  font-size: 10px;
}
.customerTable .telephone{
  margin-left: 20%;
  font-size: 10px;
}
.customerTable .person{
  margin-left: 35%;
  font-size: 10px;
}
.customerTable .privateNote{
  text-align:justify;
  font-size: 10px;
  margin-top:5px;
}
.mainSummary{
  text-align: center;
  margin: 0 auto;
  margin-left:auto !important;
  margin-right:auto !important;
  position: absolute;
  font-size: 10px;
}
.summaryCasaAddress{
  text-align: center;
}
.casalogoProject{
  height: 90px;
  margin-left: center;
}
.citylogoProject {
  text-align: center;
  font-style: italic;
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color: rgb(47, 84, 150);
  margin-left: 60px;
  margin-right: auto;
  margin-bottom: 1px;
}
.cityAddressProject {
  margin-top: 0px;
  font-size: 10px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-style: italic;
}
.brooklynAddressProject{
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 11px;
  text-align: center;
}
.brooklynTable{
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  width:  95%;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid black;
  font-size: 10px;
}
.brooklynHereby{
  text-align: left;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  margin-bottom: 1px;
  margin-top:5px;
  width: 95%;
  margin-left: 30px;
  background-color: rgb(254, 202, 198);
  text-decoration: underline;
  font-size: 10px;
}
div.container {
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  font-size: 10px;
}


</style> `

const style = {
  customStyle
}

export { style }