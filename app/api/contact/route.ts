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
  from: `"${name}" <${email}>`, // sender ka name aur email
  to: process.env.MAIL_USER,   // tumhari email
  subject: `📬 New Contact Form Submission from ${name}`,
  html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #1a73e8;">🚀 New Contact Message Received</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p style="padding: 12px; background: #f4f4f4; border-radius: 6px;">${message}</p>
    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
    <p style="font-size: 0.85rem; color: #666;">
      This email was sent from your website AutomexaSolutions contact form.
    </p>
  </div>
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
