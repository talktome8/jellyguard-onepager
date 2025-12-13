/**
 * Google Apps Script for JellyGuard Contact Form
 * Handles CORS and form submissions
 */

const RECIPIENT = 'tomraz8@gmail.com';
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://*.vercel.app',
  'https://jellyguard.raztom.com'
];

// === CORS HANDLER ===
function corsHeaders_(origin) {
  const allow = ALLOWED_ORIGINS.some(p => {
    if (p.includes('*')) {
      const r = new RegExp('^' + p.replace('.', '\\.').replace('*', '[a-z0-9-]+') + '$');
      return r.test(origin || '');
    }
    return origin === p;
  });
  
  const h = { 'Content-Type': 'application/json' };
  if (allow) {
    h['Access-Control-Allow-Origin'] = origin;
    h['Vary'] = 'Origin';
  }
  h['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
  h['Access-Control-Allow-Headers'] = 'Content-Type';
  return h;
}

function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(corsHeaders_(e.parameter.origin || (e && e.postData && e.postData.type)));
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.name || '',
      data.organization || '',
      data.role || '',
      data.email || '',
      data.phone || '',
      data.region || '',
      data.message || '',
      data.page || '',
      data.userAgent || '',
      data.ip || ''
    ];
    
    sheet.appendRow(rowData);
    sendEmailNotification(data, timestamp);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully',
        timestamp: timestamp.toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(corsHeaders_(e.parameter.origin || (e && e.postData && e.postData.type)));
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(corsHeaders_(e.parameter.origin || (e && e.postData && e.postData.type)));
  }
}

function sendEmailNotification(data, timestamp) {
  const subject = '🐙 New JellyGuard Contact Form Submission';
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
      <div style="background-color: #1aa3a3; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0;">🐙 New Contact Form Submission</h2>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">JellyGuard One-Pager</p>
      </div>
      
      <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h3 style="color: #0b1b2b; margin-top: 0;">Contact Information</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Organization:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.organization}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Role:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.role}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}" style="color: #1aa3a3;">${data.email}</a></td>
          </tr>
          ${data.phone ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="tel:${data.phone}" style="color: #1aa3a3;">${data.phone}</a></td>
          </tr>
          ` : ''}
          ${data.region ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Region:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.region}</td>
          </tr>
          ` : ''}
        </table>
        
        <h3 style="color: #0b1b2b; margin-top: 30px;">Message</h3>
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #1aa3a3; border-radius: 4px;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
        
        <h3 style="color: #0b1b2b; margin-top: 30px;">Metadata</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #666;">
          <tr>
            <td style="padding: 5px 0;"><strong>Timestamp:</strong></td>
            <td style="padding: 5px 0;">${timestamp.toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' })} (IST)</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;"><strong>Page:</strong></td>
            <td style="padding: 5px 0;">${data.page || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;"><strong>IP:</strong></td>
            <td style="padding: 5px 0;">${data.ip || 'N/A'}</td>
          </tr>
        </table>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; text-align: center; color: #999; font-size: 12px;">
          <p>📊 View all submissions in <a href="${SpreadsheetApp.getActiveSpreadsheet().getUrl()}" style="color: #1aa3a3;">Google Sheets</a></p>
          <p>This is an automated notification from JellyGuard Contact Form</p>
        </div>
      </div>
    </div>
  `;
  
  const plainBody = `
New JellyGuard Contact Form Submission

CONTACT INFORMATION
-------------------
Name: ${data.name}
Organization: ${data.organization}
Role: ${data.role}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.region ? `Region: ${data.region}` : ''}

MESSAGE
-------
${data.message}

METADATA
--------
Timestamp: ${timestamp.toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' })} (IST)
Page: ${data.page || 'N/A'}
IP: ${data.ip || 'N/A'}

View spreadsheet: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
  `;
  
  MailApp.sendEmail({
    to: RECIPIENT,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody
  });
}
