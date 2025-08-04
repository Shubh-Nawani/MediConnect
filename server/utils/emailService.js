const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Create email transporter
const createTransporter = () => {
  // For development, you can use Gmail or any SMTP service
  // For production, consider using services like SendGrid, AWS SES, etc.
  return nodemailer.createTransport({
    service: 'gmail', // You can change this to your preferred service
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

// Send email with PDF attachment
const sendReportEmail = async (patientEmail, patientName, testName, pdfPath, bookingId) => {
  try {
    const transporter = createTransporter();

    // Email template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏥 MediConnect</h1>
            <h2>Your Lab Report is Ready!</h2>
          </div>
          <div class="content">
            <p>Dear ${patientName},</p>
            
            <p>We hope this email finds you in good health. Your lab test results for <strong>${testName}</strong> are now available.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3>📋 Test Details:</h3>
              <p><strong>Test Name:</strong> ${testName}</p>
              <p><strong>Booking ID:</strong> ${bookingId}</p>
              <p><strong>Report Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <p>📎 <strong>Your detailed lab report is attached to this email as a PDF file.</strong></p>
            
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4>📋 Important Notes:</h4>
              <ul>
                <li>Please review your results carefully</li>
                <li>Consult with your healthcare provider for interpretation</li>
                <li>Keep this report for your medical records</li>
                <li>Contact us if you have any questions about your results</li>
              </ul>
            </div>
            
            <p>If you have any questions about your test results, please don't hesitate to contact our team or consult with your healthcare provider.</p>
            
            <p>Thank you for choosing MediConnect for your healthcare needs.</p>
            
            <p>Best regards,<br>
            <strong>The MediConnect Team</strong><br>
            📧 support@mediconnect.com<br>
            📞 +1 (555) 123-4567</p>
          </div>
          <div class="footer">
            <p>© 2025 MediConnect. All rights reserved.</p>
            <p>This email contains confidential medical information. Please handle with care.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: {
        name: 'MediConnect Lab',
        address: process.env.EMAIL_USER || 'your-email@gmail.com'
      },
      to: patientEmail,
      subject: `🏥 Your Lab Report is Ready - ${testName} | MediConnect`,
      html: htmlTemplate,
      attachments: [
        {
          filename: `Lab_Report_${bookingId}.pdf`,
          path: pdfPath,
          contentType: 'application/pdf'
        }
      ]
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };

  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send notification email (without attachment)
const sendNotificationEmail = async (patientEmail, patientName, subject, message) => {
  try {
    const transporter = createTransporter();

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏥 MediConnect</h1>
            <h2>${subject}</h2>
          </div>
          <div class="content">
            <p>Dear ${patientName},</p>
            <p>${message}</p>
            <p>Best regards,<br>
            <strong>The MediConnect Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 MediConnect. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: {
        name: 'MediConnect Lab',
        address: process.env.EMAIL_USER || 'your-email@gmail.com'
      },
      to: patientEmail,
      subject: `🏥 ${subject} | MediConnect`,
      html: htmlTemplate
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };

  } catch (error) {
    console.error('Error sending notification email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendReportEmail,
  sendNotificationEmail
};
