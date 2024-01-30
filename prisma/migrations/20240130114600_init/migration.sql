-- CreateTable
CREATE TABLE "EmailRecord" (
    "id" SERIAL NOT NULL,
    "sender" TEXT[],
    "receiver" TEXT[],
    "content" TEXT NOT NULL,
    "submitAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailRecord_pkey" PRIMARY KEY ("id")
);
