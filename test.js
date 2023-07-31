const puppeteer = require("puppeteer");
const expect = require("chai").expect;

describe("Testing Login form", () => {
    it("Frontend Testing", async () => {
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
        // await page.waitForTimeout(5000);
        // const mainMenuItemSelector = '#userManagement';
        // await page.waitForSelector(mainMenuItemSelector);
        // await page.click(mainMenuItemSelector);
        // const subMenuItemSelector = '#user';
        // await page.waitForSelector(subMenuItemSelector);
        // await page.click(subMenuItemSelector);
        await page.waitForTimeout(2000);
        // Click on Add button
        // await page.click("#add-button")
        // await page.waitForTimeout(5000)
        // // Type the form
        // await page.type('#user_username', `test@test${Math.floor(Math.random() * 100) + 1}.com`)
        // await page.type('#user_password', `test@test${Math.floor(Math.random() * 100) + 1}.com`)
        // await page.type('#user_firstName', `John${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#user_lastName', "Doe")
        // await page.type('#user_contactNo', `981861060${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#user_address', "Alberta, US")
        // await page.type('#user_alternateNo', "9696969696")
        // await page.type('#user_defaultCompanyId', "1")
        // await page.type('#user_city', "Newyork")
        // await page.type('#user_state', "Testing")
        // await page.type('#user_zipcode', "122001")

        // const filePath = '../sample-files/bird-thumbnail.jpg';
        // // Handle file input
        // const uploadFile = async (fileInput, filePath) => {
        //     const [fileChooser] = await Promise.all([
        //         page.waitForFileChooser(),
        //         fileInput.click(),
        //     ]);
        //     await fileChooser.accept([filePath]);
        // };

        // // Wait for the file input element to be available
        // const fileInput = await page.waitForSelector('#user_avatar');
        // await uploadFile(fileInput, filePath);

        // // Click the upload button
        // await page.click('#uploadButton');

        // await page.waitForSelector('#response');
        // const responsePath = await page.$eval('#response', el => el.innerText);

        // await page.waitForSelector('.ant-modal-content');

        // await page.waitForSelector('.ant-modal-footer .ant-btn-primary');
        // await page.click('.ant-modal-footer .ant-btn-primary');

        // await page.waitForTimeout(4000)

        // await page.waitForSelector('.ant-table-tbody tr')
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-space-item');
        // await page.click('.ant-space-item')
        // await page.waitForTimeout(4000)
        // await page.focus('#user_address');
        // await page.keyboard.down('Control');
        // await page.keyboard.press('A');
        // await page.keyboard.up('Control');
        // await page.keyboard.press('Backspace');
        // await page.waitForTimeout(3000)
        // await page.type('#user_address', "Newyork, United States")
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-modal-content');

        // await page.waitForSelector('.ant-modal-footer .ant-btn-primary');
        // await page.click('.ant-modal-footer .ant-btn-primary');
        // await page.waitForTimeout(4000)

        // await page.waitForSelector('.ant-table-tbody tr')
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-space-item');
        // await page.click('.ant-space-item')
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-modal-close')
        // await page.click('.ant-modal-close')
        // await page.waitForTimeout(4000)
        // await page.waitForSelector(mainMenuItemSelector);
        // await page.click(mainMenuItemSelector);
        // const subMenuItemSelectorRole = '#role';
        // await page.waitForSelector(subMenuItemSelectorRole);
        // await page.click(subMenuItemSelectorRole);
        // await page.waitForTimeout(2000);
        // const mainMenuItemSelectorClientMaster = '#clientMaster';
        // await page.waitForSelector(mainMenuItemSelectorClientMaster);
        // await page.click(mainMenuItemSelectorClientMaster);
        // const subMenuItemSelectorCientMasterCC = '#constructionCompany';
        // await page.waitForSelector(subMenuItemSelectorCientMasterCC);
        // await page.click(subMenuItemSelectorCientMasterCC);
        // await page.waitForTimeout(8000)

        // // Click on Add button
        // await page.click("#add-button")
        // await page.waitForTimeout(5000)

        // // Type the form
        // await page.type('#cc_name', `Construction Company ${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#cc_email', `constructioncomppany${Math.floor(Math.random() * 100) + 1}@gmail.com`)
        // await page.type('#cc_contact_no', `9999876534${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#cc_contact_person_name', `John Doe ${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#cc_alternate_no', `786789${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#cc_address', `Sample Address ${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#cc_city', "Alberta, US")
        // await page.type('#cc_state', "Alberta")
        // await page.type('#cc_zipcode', "122002")
        // await page.type('#cc_notes', `This is a sample note:${Math.floor(Math.random() * 100) + 1}`)
        // await page.waitForSelector('.ant-modal-footer .ant-btn-primary');
        // await page.click('.ant-modal-footer .ant-btn-primary');

        // await page.waitForTimeout(4000)

        // await page.waitForSelector('.ant-table-tbody tr')
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-space-item');
        // await page.click('.ant-space-item')
        // await page.waitForTimeout(4000)
        // await page.focus('#cc_address');
        // await page.keyboard.down('Control');
        // await page.keyboard.press('A');
        // await page.keyboard.up('Control');
        // await page.keyboard.press('Backspace');
        // await page.waitForTimeout(3000)
        // await page.type('#cc_address', "Newyork, United States")
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-modal-content');
        // await page.waitForSelector('.ant-modal-footer .ant-btn-primary');
        // await page.click('.ant-modal-footer .ant-btn-primary');
        // await page.waitForTimeout(4000)

        // await page.waitForSelector('.ant-table-tbody tr')
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-space-item');
        // await page.click('.ant-space-item')
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-modal-close')
        // await page.click('.ant-modal-close')

        // await page.waitForTimeout(2000);
        // await page.waitForSelector(mainMenuItemSelectorClientMaster);
        // await page.click(mainMenuItemSelectorClientMaster);
        // const subMenuItemSelectorCientMasterPM = '#projectManager';
        // await page.waitForSelector(subMenuItemSelectorCientMasterPM);
        // await page.click(subMenuItemSelectorCientMasterPM);
        // await page.waitForTimeout(8000)

        // // Click on Add button
        // await page.click("#add-button")
        // await page.waitForTimeout(5000)

        // // Type the form
        // await page.waitForSelector('.ant-select');
        // // Click on the Select component to open the dropdown menu
        // await page.click('.ant-select');
        // // Wait for the dropdown menu to appear
        // await page.waitForSelector('.ant-select-dropdown');
        // await page.click('.ant-select-item');
        // await page.type('#pm_name', `Mark ${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#pm_contact_no', `9999876534${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#pm_cell_phone', `786789${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#pm_email', `pm${Math.floor(Math.random() * 100) + 1}@gmail.com`)
        // await page.type('#pm_alternate_email', `pmalt${Math.floor(Math.random() * 100) + 1}@gmail.com`)
        // await page.type('#pm_address', "Alberta, US")
        // await page.type('#pm_city', "Alberta")
        // await page.type('#pm_state', "Newyork")
        // await page.type('#pm_zipcode', "122001")
        // await page.type('#pm_notes', `This is a sample note:${Math.floor(Math.random() * 100) + 1}`)
        // await page.waitForSelector('.ant-modal-footer .ant-btn-primary');
        // await page.click('.ant-modal-footer .ant-btn-primary');

        // await page.waitForTimeout(4000)

        // await page.waitForSelector('.ant-table-tbody tr')
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-space-item');
        // await page.click('.ant-space-item')
        // await page.waitForTimeout(4000)
        // await page.focus('#pm_cell_phone');
        // await page.keyboard.down('Control');
        // await page.keyboard.press('A');
        // await page.keyboard.up('Control');
        // await page.keyboard.press('Backspace');
        // await page.waitForTimeout(3000)
        // await page.type('#pm_cell_phone', `786789${Math.floor(Math.random() * 100) + 1}`)
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-modal-content');
        // await page.waitForSelector('.ant-modal-footer .ant-btn-primary');
        // await page.click('.ant-modal-footer .ant-btn-primary');
        // await page.waitForTimeout(4000)

        // await page.waitForSelector('.ant-table-tbody tr')
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-space-item');
        // await page.click('.ant-space-item')
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-modal-close')
        // await page.click('.ant-modal-close')
        // await page.waitForTimeout(4000)

        const mainMenuItemSelectorExtraCharges = '#extraCharges';
        await page.waitForSelector(mainMenuItemSelectorExtraCharges);
        await page.click(mainMenuItemSelectorExtraCharges);
        // const subMenuItemSelectorCientMasterExtraCharges = '#ec';
        // await page.waitForSelector(subMenuItemSelectorCientMasterExtraCharges);
        // await page.click(subMenuItemSelectorCientMasterExtraCharges);
        // await page.waitForTimeout(8000)

        // // Click on Add button
        // await page.click("#add-button")
        // await page.waitForTimeout(5000)

        // // Type the form
        // // Type the form
        // await page.waitForSelector('.ant-select');
        // // Click on the Select component to open the dropdown menu
        // await page.click('.ant-select');
        // // Wait for the dropdown menu to appear
        // await page.waitForSelector('.ant-select-dropdown');
        // await page.click('.ant-select-item');

        // await page.type('#ec_title', `Extra Charges ${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#ec_price', `${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#ec_unit', `${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#ec_notes', `Sample Notes ${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#ec_description', `Sample Description ${Math.floor(Math.random() * 100) + 1}`)
        // await page.waitForSelector('.ant-modal-footer .ant-btn-primary');
        // await page.click('.ant-modal-footer .ant-btn-primary');

        // await page.waitForTimeout(4000)

        // await page.waitForSelector('.ant-table-tbody tr')
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-space-item');
        // await page.click('.ant-space-item')
        // await page.waitForTimeout(4000)
        // await page.focus('#ec_price');
        // await page.keyboard.down('Control');
        // await page.keyboard.press('A');
        // await page.keyboard.up('Control');
        // await page.keyboard.press('Backspace');
        // await page.waitForTimeout(3000)
        // await page.type('#ec_price', "200")
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-modal-content');
        // await page.waitForSelector('.ant-modal-footer .ant-btn-primary');
        // await page.click('.ant-modal-footer .ant-btn-primary');
        // await page.waitForTimeout(4000)

        // await page.waitForSelector('.ant-table-tbody tr')
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-space-item');
        // await page.click('.ant-space-item')
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-modal-close')
        // await page.click('.ant-modal-close')

        // await page.waitForTimeout(4000)

        // await page.waitForSelector(mainMenuItemSelectorExtraCharges);
        // await page.click(mainMenuItemSelectorExtraCharges);
        // const subMenuItemSelectorCientMasterOTF = '#otf';
        // await page.waitForSelector(subMenuItemSelectorCientMasterOTF);
        // await page.click(subMenuItemSelectorCientMasterOTF);
        // await page.waitForTimeout(8000)

        // // Click on Add button
        // await page.click("#add-button")
        // await page.waitForTimeout(5000)

        // // // Type the form
        // await page.waitForSelector('.ant-select');
        // // Click on the Select component to open the dropdown menu
        // await page.click('.ant-select');
        // // Wait for the dropdown menu to appear
        // await page.waitForSelector('.ant-select-dropdown');
        // await page.click('.ant-select-item');
        // await page.type('#otf_title', `Overtime Fees ${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#otf_price', `${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#otf_unit', `${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#otf_notes', `Sample Notes ${Math.floor(Math.random() * 100) + 1}`)
        // await page.type('#otf_description', `Sample Description ${Math.floor(Math.random() * 100) + 1}`)
        // await page.waitForSelector('.ant-modal-footer .ant-btn-primary');
        // await page.click('.ant-modal-footer .ant-btn-primary');

        // await page.waitForTimeout(4000)

        // await page.waitForSelector('.ant-table-tbody tr')
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-space-item');
        // await page.click('.ant-space-item')
        // await page.waitForTimeout(4000)
        // await page.focus('#otf_description');
        // await page.keyboard.down('Control');
        // await page.keyboard.press('A');
        // await page.keyboard.up('Control');
        // await page.keyboard.press('Backspace');
        // await page.waitForTimeout(3000)
        // await page.type('#otf_description', "This is updated sample description")
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-modal-content');
        // await page.waitForSelector('.ant-modal-footer .ant-btn-primary');
        // await page.click('.ant-modal-footer .ant-btn-primary');
        // await page.waitForTimeout(4000)

        // await page.waitForSelector('.ant-table-tbody tr')
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-space-item');
        // await page.click('.ant-space-item')
        // await page.waitForTimeout(4000)
        // await page.waitForSelector('.ant-modal-close')
        // await page.click('.ant-modal-close')


        //slc
        await page.waitForSelector(mainMenuItemSelectorExtraCharges);
        await page.click(mainMenuItemSelectorExtraCharges);
        const subMenuItemSelectorCientMasterSLC = '#slc';
        await page.waitForSelector(subMenuItemSelectorCientMasterSLC);
        await page.click(subMenuItemSelectorCientMasterSLC);
        await page.waitForTimeout(8000)

        // Click on Add button
        await page.click("#add-button")
        await page.waitForTimeout(5000)

        // // Type the form
        await page.waitForSelector('.ant-select');
        // Click on the Select component to open the dropdown menu
        await page.click('.ant-select');
        // Wait for the dropdown menu to appear
        await page.waitForSelector('.ant-select-dropdown');
        await page.click('.ant-select-item');
        await page.type('#slc_title', `Short Load Charges ${Math.floor(Math.random() * 100) + 1}`)
        await page.type('#slc_notes', `Sample Notes ${Math.floor(Math.random() * 100) + 1}`)
        await page.type('#slc_description', `Sample Description ${Math.floor(Math.random() * 100) + 1}`)
        await page.waitForSelector('.ant-modal-footer .ant-btn-primary');
        await page.click('.ant-modal-footer .ant-btn-primary');

        await page.waitForTimeout(4000)

        await page.waitForSelector('.ant-table-tbody tr')
        await page.waitForTimeout(4000)
        await page.waitForSelector('.ant-space-item');
        await page.click('.ant-space-item')
        await page.waitForTimeout(4000)
        await page.focus('#slc_description');
        await page.keyboard.down('Control');
        await page.keyboard.press('A');
        await page.keyboard.up('Control');
        await page.keyboard.press('Backspace');
        await page.waitForTimeout(3000)
        await page.type('#slc_description', "This is updated sample description")
        await page.waitForTimeout(4000)
        await page.waitForSelector('.ant-modal-content');
        await page.waitForSelector('.ant-modal-footer .ant-btn-primary');
        await page.click('.ant-modal-footer .ant-btn-primary');
        await page.waitForTimeout(4000)

        await page.waitForSelector('.ant-table-tbody tr')
        await page.waitForTimeout(4000)
        await page.waitForSelector('.ant-space-item');
        await page.click('.ant-space-item')
        await page.waitForTimeout(4000)
        await page.waitForSelector('.ant-modal-close')
        await page.click('.ant-modal-close')


        await browser.close()


    }).timeout(500000);

});


