import zod from 'zod'

export const emailRecordSchema = zod.object({
    receiver: zod.array(zod.string()),
    subject: zod.string().min(1, 'Subject is required'),
    content: zod.string().min(1, 'Content is required'),
    submitAt: zod.string().transform((x) => new Date(x)),
});