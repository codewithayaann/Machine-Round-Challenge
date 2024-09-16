const puppeteer = require('puppeteer');
const schedule = require("node-schedule");

const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const getTitleAndPrice = async (url) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    return page.evaluate(() => {
        const title = document.querySelector('.VU-ZEz')?.textContent;
        const price = document.querySelector('.CxhGGd')?.textContent;
        return {
            title,
            price
        }
    })
}

const comparePrice = (currentPrice, threasholdPrice, url) => {
    const price = +currentPrice.slice(1).split(",").join("");
    if (price < threasholdPrice) {
        // email
        const mailerSend = new MailerSend({
            apiKey: "YOUR_API_KEY",
        });

        const sentFrom = new Sender("MS_mUENVf@trial-v69oxl5kp1kl785k.mlsender.net", "TRIAL");

        const recipients = [
            new Recipient("codewithayaan01@gmail.com", "Ayaan")
        ];


        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setSubject("Price Drop")
            .setHtml(`<strong>Price has been dropped to ${currentPrice}
                <a href="${url}" target="_blank">Link to purchase</a>
                </strong>`)

        mailerSend.email
            .send(emailParams)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        console.log("Yohuuu, Amount reduced please purchase your product")
    }
}

schedule.scheduleJob('*/1 * * * *', async () => {
    const url = 'https://www.flipkart.com/apple-2020-macbook-air-m1-16-gb-256-gb-ssd-mac-os-big-sur-mgn63hn-a/p/itm81ebc91ac5348?pid=COMH2SZFDTJZFD94&lid=LSTCOMH2SZFDTJZFD94Z0M86Y&marketplace=FLIPKART&q=macbook&store=6bo%2Fb5g&srno=s_1_2&otracker=search&otracker1=search&fm=organic&iid=b821bbba-8294-4af7-914e-97dc5e0768d5.COMH2SZFDTJZFD94.SEARCH&ppt=pp&ppn=pp&ssid=uzbeestcqo0000001726382933326&qH=864faee128623e2f'
    const { price } = await getTitleAndPrice(url)
    const threasholdPrice = 110_000;
    comparePrice(price, threasholdPrice, url)
})