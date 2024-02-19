-- CreateTable
CREATE TABLE "Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL
);
