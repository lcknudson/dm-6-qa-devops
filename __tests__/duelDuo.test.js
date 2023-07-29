const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });
});

describe("Draw button functionality", () => {
  test("clicking the Draw button displays the div with id = 'choices'", async () => {
    await driver.get("http://localhost:8000");

    // Click the Draw button
    const drawButton = await driver.findElement(By.id("draw"));
    await drawButton.click();

    // Check if the div with id 'choices' is displayed
    const choicesDiv = await driver.findElement(By.id("choices"));
    const isDisplayed = await choicesDiv.isDisplayed();
    expect(isDisplayed).toBe(true);
  });
});

describe("Add to Duo button functionality", () => {
  test("clicking an 'Add to Duo' button displays the div with id = 'player-duo'", async () => {
    await driver.get("http://localhost:8000");

    // Click the Draw button to get some bots
    const drawButton = await driver.findElement(By.id("draw"));
    await drawButton.click();

    // Find and click the "Add to Duo" button for the first bot
    const addToDuoButtons = await driver.findElements(By.className("bot-btn"));
    if (addToDuoButtons.length > 0) {
      const firstAddToDuoButton = addToDuoButtons[0];
      await firstAddToDuoButton.click();

      // Check if the div with id 'player-duo' is displayed
      const playerDuoDiv = await driver.findElement(By.id("player-duo"));
      const isDisplayed = await playerDuoDiv.isDisplayed();
      expect(isDisplayed).toBe(true);
    } else {
      // If no bot available, the test will fail
      throw new Error("No bot available to add to Duo.");
    }
  });
});

describe("Remove from Duo button functionality", () => {
  test("when a bot is 'Removed from Duo', it goes back to 'choices'", async () => {
    await driver.get("http://localhost:8000");

    // Click the Draw button to get some bots
    const drawButton = await driver.findElement(By.id("draw"));
    await drawButton.click();

    // Find and click the "Add to Duo" button for the first bot
    const addToDuoButtons = await driver.findElements(By.className("bot-btn"));
    if (addToDuoButtons.length > 0) {
      const firstAddToDuoButton = addToDuoButtons[0];
      await firstAddToDuoButton.click();

      // Check if the div with id 'player-duo' is displayed
      const playerDuoDiv = await driver.findElement(By.id("player-duo"));
      const isPlayerDuoDisplayed = await playerDuoDiv.isDisplayed();
      expect(isPlayerDuoDisplayed).toBe(true);

      // Find and click the "Remove from Duo" button for the first bot in 'player-duo'
      const removeFromDuoButtons = await driver.findElements(By.xpath("//div[@id='player-duo']//button[contains(text(), 'Remove from Duo')]"));
      if (removeFromDuoButtons.length > 0) {
        const firstRemoveFromDuoButton = removeFromDuoButtons[0];
        await firstRemoveFromDuoButton.click();

        // Check if the bot is removed and back to 'choices'
        const choicesDiv = await driver.findElement(By.id("choices"));
        const isChoicesDisplayed = await choicesDiv.isDisplayed();
        expect(isChoicesDisplayed).toBe(true);
      } else {
        // If no bot available to remove, the test will fail
        throw new Error("No bot available to remove from Duo.");
      }
    } else {
      // If no bot available to add to Duo, the test will fail
      throw new Error("No bot available to add to Duo.");
    }
  });
});


