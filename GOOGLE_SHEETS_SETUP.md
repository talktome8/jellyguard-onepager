# Google Sheets Contact Form Integration

## ✅ Complete Setup Guide

This guide will help you connect the JellyGuard contact form to Google Sheets with automatic email notifications.

---

## 📋 Prerequisites

- Google Account (for Google Sheets & Apps Script)
- Access to the `.env.local` file
- The Google Apps Script deployment URL

---

## 🔧 Step-by-Step Setup

### **Step 1: Create Google Sheet**

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it: **"JELLYGUARD ONE PAGER"**
4. In row 1, add these headers (exactly as shown):

```
Timestamp | Name | Organization | Role | Email | Phone | Region | Message | Page | UserAgent | IP
```

**Result**: You should have 11 columns with headers in row 1.

---

### **Step 2: Create Google Apps Script**

1. In your spreadsheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy **ALL** the code from: `scripts/google-apps-script.js`
4. Paste it into the Apps Script editor
5. Click **Save** (💾 icon) and name the project: "JellyGuard Contact Form"

---

### **Step 3: Deploy as Web App**

1. In Apps Script, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure deployment settings:
   - **Description**: "JellyGuard Contact Form Endpoint"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
5. Click **Deploy**
6. **Authorize access**:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to JellyGuard Contact Form (unsafe)**
   - Click **Allow**
7. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/ABC.../exec`)

---

### **Step 4: Update Environment Variables**

1. Open `.env.local` in your project root
2. The file should already contain:

```bash
GAS_CONTACT_URL=https://script.google.com/macros/s/AKfycbyI9NBRI9zhFfmBk2ErkMH4mxzEhm7s5SFkvIw-oiwRu-rJPvtyFusvFij1eWuD20or/exec
```

3. **Verify the URL matches** your deployment URL from Step 3
4. If different, **replace** with your actual deployment URL
5. Save the file

---

### **Step 5: Test the Integration**

#### **Option A: Test via Apps Script (Recommended)**

1. In Apps Script editor, select **testSubmission** from the function dropdown
2. Click **Run** (▶️)
3. Check your Google Sheet - a test row should appear
4. Check your email (tomraz8@gmail.com) - you should receive a notification

#### **Option B: Test via Website**

1. Make sure dev server is running:
```bash
npm run dev
```

2. Visit: http://localhost:3000/en#contact
3. Fill out the contact form with test data
4. Click "Send Message"
5. You should see: "Thanks — we'll get back to you shortly."
6. Check your Google Sheet for the new row
7. Check email for notification

---

## 📊 Google Sheet Structure

After submissions, each row will contain:

| Column | Description | Example |
|--------|-------------|---------|
| **Timestamp** | Auto-generated date/time | 11/4/2025 14:30:00 |
| **Name** | Contact name | John Smith |
| **Organization** | Company/institution | Mediterranean Water Co. |
| **Role** | Job title | Operations Manager |
| **Email** | Contact email | john@example.com |
| **Phone** | Phone number (optional) | +1 234 567 8900 |
| **Region** | Geographic region (optional) | Mediterranean |
| **Message** | Full message text | We're interested in... |
| **Page** | Page URL where submitted | /en |
| **UserAgent** | Browser/device info | Mozilla/5.0... |
| **IP** | User's IP address | 203.0.113.42 |

---

## 📧 Email Notifications

Every submission sends an automatic email to: **tomraz8@gmail.com**

**Email includes:**
- ✅ All contact information
- ✅ Full message text
- ✅ Submission timestamp (IST timezone)
- ✅ Metadata (page, IP, user agent)
- ✅ Direct link to Google Sheet
- ✅ Professional HTML formatting

---

## 🔒 Security Features

### **1. Server-Side Proxy**
- ✅ Google Apps Script URL **never exposed** to client
- ✅ Stored securely in `.env.local`
- ✅ Proxied through `/api/contact` endpoint

### **2. Rate Limiting**
- ✅ Max 5 requests per minute per IP
- ✅ Token bucket algorithm
- ✅ Prevents spam/abuse

### **3. Honeypot Spam Protection**
- ✅ Hidden field catches bots
- ✅ Silent rejection for spam
- ✅ No database pollution

### **4. Input Validation**
- ✅ Client-side validation (instant feedback)
- ✅ Server-side validation (Zod schema)
- ✅ Type-safe with TypeScript

---

## 🧪 Testing Checklist

- [ ] Google Sheet created with correct headers
- [ ] Apps Script code deployed as web app
- [ ] `.env.local` contains correct URL
- [ ] Test submission via Apps Script works
- [ ] Email notification received
- [ ] Form submission from website works
- [ ] Data appears in Google Sheet
- [ ] All fields captured correctly
- [ ] Rate limiting prevents spam
- [ ] Honeypot catches bot submissions

---

## 🐛 Troubleshooting

### **"Server configuration error"**
- **Cause**: `GAS_CONTACT_URL` not set in `.env.local`
- **Fix**: Add the environment variable and restart dev server

### **"We couldn't send your message"**
- **Cause**: Google Apps Script endpoint returned error
- **Fix**: 
  1. Check Apps Script logs (View → Logs)
  2. Verify spreadsheet name is exactly "JELLYGUARD ONE PAGER"
  3. Ensure headers match exactly (11 columns)
  4. Re-deploy the web app

### **Form submits but no email**
- **Cause**: Email quota exceeded or email address incorrect
- **Fix**:
  1. Verify recipient email in Apps Script: `tomraz8@gmail.com`
  2. Check Google Apps Script quotas
  3. Verify MailApp permissions granted

### **Data not appearing in sheet**
- **Cause**: Wrong sheet selected or permissions issue
- **Fix**:
  1. Ensure sheet is the active/first sheet
  2. Check Apps Script execution permissions
  3. Try running `testSubmission()` function

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] `.env.local` has correct `GAS_CONTACT_URL`
- [ ] Environment variable added to hosting platform (Vercel/Netlify)
- [ ] Test form submission on staging
- [ ] Verify email notifications work
- [ ] Check Google Sheet receives data
- [ ] Rate limiting tested
- [ ] Error messages display correctly
- [ ] Success messages display correctly
- [ ] Both EN and HE forms tested

---

## 📝 Environment Variables for Deployment

**For Vercel:**
```bash
vercel env add GAS_CONTACT_URL
# Paste the Google Apps Script URL when prompted
```

**For Netlify:**
1. Go to Site Settings → Build & Deploy → Environment
2. Add variable:
   - **Key**: `GAS_CONTACT_URL`
   - **Value**: Your Google Apps Script URL

**For other platforms:**
Add environment variable in platform settings with:
- **Name**: `GAS_CONTACT_URL`
- **Value**: `https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec`

---

## 🔄 Updating the Script

If you need to modify the Google Apps Script:

1. Make changes in Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click ✏️ (edit) on your deployment
4. Change **Version** to "New version"
5. Add description of changes
6. Click **Deploy**
7. **URL stays the same** - no need to update `.env.local`

---

## 📊 Data Management

### **Viewing Submissions**
- Access sheet directly: [JELLYGUARD ONE PAGER](https://docs.google.com/spreadsheets/)
- Email notifications include direct link
- Filter/sort by timestamp, organization, region, etc.

### **Exporting Data**
- **File** → **Download** → **CSV** or **Excel**
- Use for analysis, CRM import, reporting

### **Data Retention**
- Google Sheets: No automatic deletion
- Consider archiving old submissions periodically
- Export monthly for backup

---

## ✅ Summary

**What's Connected:**
1. ✅ Contact form → `/api/contact` (server proxy)
2. ✅ Server → Google Apps Script (secure)
3. ✅ Apps Script → Google Sheet (data storage)
4. ✅ Apps Script → Email (tomraz8@gmail.com)

**Security:**
- ✅ Google Script URL hidden from client
- ✅ Rate limiting prevents abuse
- ✅ Honeypot catches bots
- ✅ Server-side validation

**User Experience:**
- ✅ Instant feedback
- ✅ Clear success/error messages
- ✅ Bilingual support (EN/HE)
- ✅ Accessible form (WCAG AA)

---

## 📞 Support

**Issues?**
1. Check Apps Script logs
2. Verify `.env.local` configuration
3. Test with `testSubmission()` function
4. Check email spam folder

**Questions?**
- Review this guide
- Check `scripts/google-apps-script.js` comments
- Inspect `/app/api/contact/route.ts` code

---

**Setup Date**: November 4, 2025  
**Integration Status**: ✅ Ready for Testing  
**Next Step**: Run test submission!
