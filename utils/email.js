const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

const sendEmailLegacy = async options =>{
  //Using gmail service here...
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
    
  });

  const mailOptions = {
    from: 'Michael Tase <tasemgt@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  }


  await transporter.sendMail(mailOptions);
}

const sendEmail = async(to, message) =>{
  const from = {
    email: process.env.SENDER_EMAIL,
    name: process.env.SENDER_NAME
  }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {to, from, ...message};
  console.log(msg);
  try{
    const resp = await sgMail.send(msg);
    console.log('Email sent');
  }
  catch(err){
    console.error(err);
  }
}

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


// sendEmail('tasemgt@gmail.com', {subject: 'Hi people..', text: 'This is a message from fLC'});

// const msg = {
//   to: 'tasemgt@yahoo.com', // Change to your recipient
//   from: 'tasemgt@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>'
// }

module.exports = {
  sendEmailLegacy,
  sendEmail
};
