
# Price Tracker and Email Notifier

This project scrapes the price of a product from an e-commerce website using Puppeteer and sends an email notification when the price drops below a specified threshold. The script is scheduled to run every minute using the Node Schedule library.

## Features

- Scrapes product title and price from a given URL.
- Compares the price with a specified threshold.
- Sends an email notification when the price drops below the threshold.
- Uses Puppeteer for web scraping and MailerSend for sending emails.
- Automates the price check every minute with Node Schedule.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (version 12 or higher)
- An active MailerSend account and API key.

## Setup Instructions

Follow these steps to set up the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/codewithayaann/Machine-Round-Challenge.git
cd day6-price-drop-alert
```

### 2. Install dependencies

Install the required Node.js packages by running:

```bash
npm install puppeteer node-schedule mailersend
```

### 3. Configure the script

- Open the `index.js` file.
- Replace the `apiKey` and `from email` with your MailerSend API key and sender details.
  
```javascript
const mailerSend = new MailerSend({
    apiKey: "YOUR_API_KEY",
});
```

- Update the `url` variable with the product URL you want to track and set your desired `thresholdPrice`:

```javascript
const url = 'https://www.flipkart.com/your-product-url';
const threasholdPrice = 110_000;
```

### 4. Run the Script

You can run the script manually by executing:

```bash
node index.js
```

### 5. Set Up Scheduled Price Checks

The script is already scheduled to run every minute using the Node Schedule library. To adjust the frequency, update the cron-like expression in this line:

```javascript
schedule.scheduleJob('*/1 * * * *', async () => {
    // your price tracking logic here
});
```

- `*/1` indicates the script will run every minute. You can adjust it as needed.

## How It Works

1. **Puppeteer** is used to launch a browser instance and visit the product page.
2. **Web Scraping**: It retrieves the product title and price by selecting specific HTML elements.
3. **Price Comparison**: It checks whether the current price is below a set threshold.
4. **Email Notification**: If the price drops below the threshold, it triggers an email using the MailerSend API with the product link.
5. **Scheduler**: The `Node Schedule` library ensures that the price check runs at regular intervals (e.g., every minute).

## Output

- If the price is lower than the threshold, an email like the one below is sent:

```
Subject: Price Drop
Message: Price has been dropped to ₹100,000.
Link to purchase: https://www.flipkart.com/your-product-url
```
