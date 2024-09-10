-- CreateTable
CREATE TABLE "PasswordResetLink" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetLink_pkey" PRIMARY KEY ("id")
);
