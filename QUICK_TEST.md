# Google Sheets Contact Form - Quick Test Guide

## 🧪 Quick Test (5 minutes)

### **1. Test Form Submission**

1. Open: http://localhost:3001/en#contact
2. Fill out the form:
   - **Name**: Test User
   - **Organization**: Test Company
   - **Role**: Developer
   - **Email**: your-email@example.com
   - **Phone**: +1 234 567 8900
   - **Region**: Mediterranean
   - **Message**: This is a test message to verify the contact form integration.

3. Click "Send Message"
4. You should see: **"Thanks — we'll get back to you shortly."**

---

### **2. Verify Google Sheet**

1. Open your Google Sheet: "JELLYGUARD ONE PAGER"
2. Check row 2 (first data row after headers)
3. Verify all fields are populated:
   - ✅ Timestamp (current time)
   - ✅ Name, Organization, Role, Email, Phone, Region
   - ✅ Message text
   - ✅ Page (/en)
   - ✅ UserAgent (browser info)
   - ✅ IP (your IP)

---

### **3. Check Email Notification**

1. Check inbox: **tomraz8@gmail.com**
2. Look for email with subject: **"🐙 New JellyGuard Contact Form Submission"**
3. Verify email contains:
   - ✅ All form fields
   - ✅ Formatted message
   - ✅ Timestamp in IST
   - ✅ Link to Google Sheet

---

### **4. Test Error Handling**

Try submitting with invalid data:

- **Empty email**: Should show validation error
- **Short message** (< 10 chars): Should show validation error
- **Multiple rapid submissions**: Should hit rate limit after 5

---

### **5. Test Both Languages**

**English**: http://localhost:3001/en#contact  
**Hebrew**: http://localhost:3001/he#contact

Both should work identically!

---

## ✅ Success Checklist

- [ ] Form submits successfully
- [ ] Success message displays
- [ ] Data appears in Google Sheet
- [ ] Email notification received
- [ ] All 11 columns populated
- [ ] Timestamp is correct
- [ ] Both EN/HE forms work
- [ ] Rate limiting works (after 5 submissions)
- [ ] Validation prevents bad data

---

## 🎯 Expected Results

**Success Response:**
```json
{
  "success": true,
  "message": "Thanks — we'll get back to you shortly."
}
```

**Google Sheet Row:**
```
2025-11-04 14:30:00 | Test User | Test Company | Developer | test@example.com | +1 234... | Mediterranean | This is a test... | /en | Mozilla/5.0... | 127.0.0.1
```

**Email Subject:**
```
🐙 New JellyGuard Contact Form Submission
```

---

## 🐛 If Something Fails

1. **Check browser console** for errors
2. **Check terminal** for API route errors
3. **Verify `.env.local`** exists and has correct URL
4. **Check Apps Script logs** (View → Logs)
5. **Review setup**: `GOOGLE_SHEETS_SETUP.md`

---

**Ready?** Fill out the form and submit! 🚀
