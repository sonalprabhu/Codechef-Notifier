# CodeChef Notifier - Chrome Extension  

A Chrome extension that automates the process of tracking submission verdicts on **CodeChef**. Instead of manually checking the submission page, this extension captures the submission ID, pings the CodeChef REST API for updates, and notifies the user through desktop notifications when the verdict is available.  

## 📌 Features  
- **Automated Submission Tracking**: Captures the unique submission ID and continuously checks for verdict updates.  
- **Desktop Notifications**: Notifies the user once the verdict is available.  
- **Problem Details Extraction**: Retrieves problem name and code from CodeChef problem pages.  
- **Chrome Extensions API Integration**: Uses background scripts for real-time tracking.  

## 📂 Project Structure  
```
├── jquery.min.js          # jQuery library for DOM manipulation
├── manifest.json          # Chrome extension manifest file
├── notify.js              # Handles submission tracking and notifications
├── problemDetails.js      # Extracts problem details from CodeChef
```

## ⚙️ How It Works  
1. The extension listens for messages using `chrome.runtime.onMessage.addListener`.  
2. When triggered, it captures the submission ID from the submission request.  
3. The extension repeatedly pings the **CodeChef REST API** at intervals to check the submission status.  
4. Once a verdict is received, it sends a **desktop notification** to the user.  


## 🚀 Installation & Usage  
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/codechef-notifier.git
   cd codechef-notifier
   ```

2. **Load the Extension in Chrome**  
   - Open **chrome://extensions/** in your browser.
   - Enable **Developer mode** (toggle in the top right corner).
   - Click **Load unpacked** and select the cloned project folder.

3. **Start Using the Extension**  
   - Visit a **CodeChef problem page** to see problem details.  
   - Submit a solution, and the extension will track and notify you when the verdict is available.  

## 🔧 Future Improvements  
- Support for **multiple submissions tracking**.  
- Add **user-configurable polling intervals**.  
- Improve UI with a **popup dashboard** for tracking multiple submissions.  
