const { should } = require("chai");
const puppeteer = require("puppeteer");
const expect = require("chai").expect;
const assert = require("chai").assert;

describe("Testing Login form", () => {
    it("------ Front end testing ----- ", async () => {

        const browser = await puppeteer.launch({

            headless: false,

            slowMo: 1,

            defaultViewport: null,

        });

        const page = await browser.newPage();

        await page.goto("http://localhost:3001/login");

        await page.waitForSelector('#Username')

        await page.click('#Username')

        await page.click('#Password')

        heading = await page.$eval('span', heading => heading.innerText);

        expect(heading).is.eql("Login | ")

        await page.type("#Username", "smarakcode@gmail.com", { delay: 70 });

        await page.type("#Password", "123456789", { delay: 10 });

        await page.click("#login-button");

        await page.waitForTimeout(5000);

        const mainMenuItemSelector = '#userManagement';
        await page.waitForSelector(mainMenuItemSelector);

        await page.click(mainMenuItemSelector);

        const subMenuItemSelector = '#user';
        await page.waitForSelector(subMenuItemSelector);

        await page.click(subMenuItemSelector);


        await page.waitForTimeout(2000);

        await page.click("#add-button")

        await page.waitForTimeout(5000)

        await page.type('#user_username', `test@test${Math.floor(Math.random() * 100) + 1}.com`)
        await page.type('#user_password', `test@test${Math.floor(Math.random() * 100) + 1}.com`)
        await page.type('#user_firstName', `John${Math.floor(Math.random() * 100) + 1}`)
        await page.type('#user_lastName', "Doe")
        await page.type('#user_contactNo', `981861060${Math.floor(Math.random() * 100) + 1}`)
        await page.type('#user_address', "Alberta, US")
        await page.type('#user_alternateNo', "9696969696")
        await page.type('#user_defaultCompanyId', "1")
        await page.type('#user_city', "Newyork")
        await page.type('#user_state', "Testing")
        await page.type('#user_zipcode', "122001")

        const filePath = '../sample-files/bird-thumbnail.jpg';
        // Handle file input
        const uploadFile = async (fileInput, filePath) => {
            const [fileChooser] = await Promise.all([
                page.waitForFileChooser(),
                fileInput.click(),
            ]);
            await fileChooser.accept([filePath]);
        };

        // Wait for the file input element to be available
        const fileInput = await page.waitForSelector('#user_avatar');
        await uploadFile(fileInput, filePath);

        // Click the upload button
        await page.click('#uploadButton');

        await page.waitForSelector('#response');
        const responsePath = await page.$eval('#response', el => el.innerText);

        await page.waitForSelector('.ant-modal-content');

        console.log('Modal found:', await page.$eval('.ant-modal-content', el => el.textContent));

        await page.waitForSelector('.ant-modal-footer .ant-btn-primary');
        console.log('Modal found:', await page.$eval('.ant-modal-footer .ant-btn-primary', el => el.textContent));
        await page.click('.ant-modal-footer .ant-btn-primary');

        await page.waitForTimeout(4000)

        await page.waitForSelector('.ant-table-tbody');
        console.log('Modal found:', await page.$eval('.ant-table-tbody', el => el.textContent));

        const rowIndex = 2;
        const columnIndex = 5;

        const tableCells = await page.$$('.ant-table-tbody');
        console.log('tableCells.length:', tableCells.length);

        const getTableData = async () => {
            const rows = await page.$$('.ant-table-tbody tr');
            const tableData = [];

            for (const row of rows) {
                const rowData = await row.$$eval('td', tds => tds.map(td => td.textContent));
                tableData.push(rowData);
            }

            return tableData;
        };

        // Fetch the table data
        const tableData = await getTableData();

        console.log('Table Data:', tableData);

        // await tableData[2].click();

        // Prompt for new data to update the cell
        const newData = '1212121212'; // Replace with the new data you want to set
        await page.evaluate((cell, newData) => {
            cell.textContent = newData;
        }, tableCells[2], newData);

        console.log(`Cell at row ${rowIndex}, column ${columnIndex} has been updated with "${newData}".`);


        await browser.close()


    }).timeout(500000);

});


