import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      appointmentType, 
      productInterest, 
      appointmentDate, 
      appointmentTime,
      subject,
      message,
      type // 'Appointment' or 'Inquiry'
    } = body;

    // Admin email address
    const adminEmail = "londonhattongarden@gmail.com";

    // Set up transporter
    // Note: To make this work, the user needs to provide EMAIL_USER and EMAIL_PASS
    // in their environment variables. For now, we'll implement the structure.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Construct Admin Email Content
    let adminContent = "";
    if (type === 'Appointment') {
      adminContent = `
        New Appointment Request Received:
        
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Type: ${appointmentType}
        Interest: ${productInterest || 'Not specified'}
        Date: ${appointmentDate}
        Time: ${appointmentTime}
      `;
    } else {
      adminContent = `
        New Inquiry Received:
        
        Name: ${firstName} ${lastName || ''}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `;
    }

    // 1. Send to Admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER || 'no-reply@hattongarden.com',
      to: adminEmail,
      subject: `[Hatton Garden] New ${type}: ${subject || firstName + ' ' + (lastName || '')}`,
      text: adminContent,
    };

    // 2. Send Confirmation to User
    const userMailOptions = {
      from: process.env.EMAIL_USER || 'no-reply@hattongarden.com',
      to: email,
      subject: `Confirmation: Your ${type} has been received`,
      text: `Hello ${firstName},\n\nThank you for reaching out to Hatton Garden London. We have received your ${type.toLowerCase()} and our team will get back to you shortly.\n\nBest regards,\nHatton Garden London`,
    };

    // In a real environment, you'd un-comment these:
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(adminMailOptions);
      await transporter.sendMail(userMailOptions);
    } else {
      console.log("Email environment variables not set. Printing email contents to console:");
      console.log("Admin Email:", adminMailOptions);
      console.log("User Email:", userMailOptions);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
