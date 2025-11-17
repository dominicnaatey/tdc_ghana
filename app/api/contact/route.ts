import nodemailer from "nodemailer"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const name = String(data?.name || "").trim()
    const email = String(data?.email || "").trim()
    const phone = String(data?.phone || "").trim()
    const subject = String(data?.subject || "").trim()
    const message = String(data?.message || "").trim()

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: "missing_fields" }), { status: 400 })
    }

    const host = String(process.env.SMTP_HOST || "").trim()
    const port = Number(process.env.SMTP_PORT || 0)
    const user = String(process.env.SMTP_USER || "").trim()
    const pass = String(process.env.SMTP_PASS || "").trim()
    const to = String(process.env.CONTACT_TO || user).trim()
    const from = String(process.env.CONTACT_FROM || user).trim()

    if (!host || !port || !user || !pass || !to || !from) {
      return new Response(JSON.stringify({ ok: false, error: "misconfigured" }), { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "",
      subject ? `Subject: ${subject}` : "",
      "",
      message,
    ].filter(Boolean).join("\n")

    const html = `
      <div style="font-family:Segoe UI,Arial,sans-serif;font-size:14px;color:#111">
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
        ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
        <hr/>
        <pre style="white-space:pre-wrap">${escapeHtml(message)}</pre>
      </div>
    `

    const mailSubject = subject || `New inquiry from ${name}`

    // Optional: verify credentials before sending
    try {
      await transporter.verify()
    } catch (e: any) {
      return new Response(JSON.stringify({ ok: false, error: "smtp_verify_failed", detail: String(e?.message || e) }), { status: 500 })
    }

    await transporter.sendMail({
      from,
      to,
      replyTo: email || from,
      subject: mailSubject,
      text,
      html,
    })

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "server_error", detail: String((e as any)?.message || e) }), { status: 500 })
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"]{1}/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string))
}