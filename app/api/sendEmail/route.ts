import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { subject, message, email } = data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_GMAIL_EMAIL_ADDRESS,
        pass: process.env.NEXT_GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOption = {
      from: email,
      to: process.env.NEXT_GMAIL_EMAIL_ADDRESS,
      replyTo: email,
      subject: 'Email From NextJS 13 App',
      html: `
      <h3>Hello Bartek!</h3>
      <p>Title: ${subject}</p>
      <p>Message: ${message}</p>
      <p>Message sender: ${email}</p> 
      `,
    };

    // await for response
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOption, function (err, info) {
        if (err) {
          console.error('Error mailOption:', err);
          reject(err);
        } else {
          console.log('Info mailOption:', info);
          resolve(info);
        }
      });
    });

    // if ok response
    return NextResponse.json(
      { message: 'Email Sent Successfully' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
