-- CreateTable
CREATE TABLE "Rsvp" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "attending" BOOLEAN NOT NULL,
    "intolerances" TEXT,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rsvp_pkey" PRIMARY KEY ("id")
);
