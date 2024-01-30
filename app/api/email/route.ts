import { sendEmail } from "@/app/services/emailService";
import { NextRequest, NextResponse } from "next/server";

enum HttpMethod {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export async function POST(request: NextRequest) {
    if (request.method !== HttpMethod.POST) {
        return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
    }
    sendEmail({
        to: "haoyichiew@gmail.com",
        subject: "NextJS test email services",
        text: "this is test email"
    });
    return NoContent()
}

function NoContent() {
    return new Response(null, { status: 204 })
}