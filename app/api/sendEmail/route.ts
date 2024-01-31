import { HttpMethod } from "@/app/enum/HttpMethod";
import { saveEmailRecord, sendEmail } from "@/app/services/emailService";
import { emailRecordSchema } from "@/app/services/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    if (request.method !== HttpMethod.POST) {
        return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
    }
    const emailContent = await request.json();
    const validation = emailRecordSchema.safeParse(emailContent)
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }
    sendEmail(emailContent);
    saveEmailRecord(emailContent)
    return NoContent()
}

function NoContent() {
    return new Response(null, { status: 204 })
}