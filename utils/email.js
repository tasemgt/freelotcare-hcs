const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

// Set API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send email using nodemailer (for local development)
const sendLocal = async options =>{
  //Using gmail service here...
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER, // GMAIL USERNAME
      pass: process.env.GMAIL_PASS // GMAIL PASSWORD
    }
  });
  
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: options.message
  }

  await transporter.sendMail(mailOptions);
}

//SendGrid, Mailgun
const sendProd = async options =>{
  const htmlMessage = options.message.replace(/\n/g, '<br>'); // Convert newlines to HTML line breaks
  const msg = {
    from: process.env.FROM_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: htmlMessage || `<p>${options.message}</p>`,
  };

  try {
    const response = await sgMail.send(msg);
    console.log('✅ Email sent successfully');
    return response;
  } catch (error) {
    console.error('❌ Error sending email:', error.response?.body || error.message);
    throw error;
  }

}

const sendEmail = process.env.NODE_ENV === 'production' ? sendProd : sendLocal;

module.exports = sendEmail;