import { test } from "../../lib/BaseTest.js";
import { config } from "../../config/testConfig.js";

const LOCATION = "Automated Location";
const USER = "f13 13";
const MESSAGE = "Automated text message sent by Icon";

test.describe("Template Messages", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.visit();
    await loginPage.login(config.credentials.username1, config.credentials.password);
  });

  test("can add a new template", async ({ templatesPage }) => {
    const at = Date.now();
    const templateName = `Automated Name ${at}`;
    const templateDesc = `Automated Description${at}`;

    await templatesPage.gotoTemplatesTab();
    await templatesPage.gotoAddTemplateTab();
    await templatesPage.addGeneralInfo(templateName, templateDesc, LOCATION);
    await templatesPage.next();
    await templatesPage.selectDistributionList(USER);
    await templatesPage.verifySelectedUser(USER);
    await templatesPage.next();
    await templatesPage.addTextMessageContent(MESSAGE);
    await templatesPage.saveTemplate();
    await templatesPage.verifySuccessAlert();
    await templatesPage.verifyTemplateData(templateName, templateDesc);
  });
});
