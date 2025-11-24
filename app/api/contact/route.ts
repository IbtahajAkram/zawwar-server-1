import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, company, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json(
        { success: false, message: "Required fields missing." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // App password
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.MAIL_USER, // Your email
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("MAIL ERROR:", error);
    return Response.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
