import prisma from '@/prisma/client';
import { EmailRecord, Prisma } from '@prisma/client';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

enum EmailServiceType {
    GMAIL = 'gmail'
}

const fromEmail = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD

const transporter = nodemailer.createTransport({
    service: EmailServiceType.GMAIL,
    auth: {
        user: fromEmail,
        pass: password
    },
})

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function sendEmail(record: EmailRecord) {
    await delay(10000)
    const mailOptions = <Mail.Options>{
        from: fromEmail,
        to: record.receiver,
        subject: record.subject,
        text: record.content,
        date: record.submitAt
    }
    transporter.sendMail(mailOptions)
}

export async function saveEmailRecord(record: EmailRecord) {
    await delay(10000)
    let newRecord = PopulateRecordData(record)
    const MAX_RETRIES = 3
    let retries = 0
    let result
    while (retries < MAX_RETRIES) {
        try {
            result = await prisma.$transaction(
                [prisma.emailRecord.create({ data: newRecord })],
                { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
            )
            break
        } catch (error) {
            retries++
        } finally {
            return result
        }
    }
}

function PopulateRecordData(record: EmailRecord): EmailRecord {
    record.sender = fromEmail!
    return record;
}