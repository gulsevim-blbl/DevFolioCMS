import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: "admin@devfolio.com"
    }
  });

  if (existingUser) {
    console.log("Admin user already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin123*", 10);

  await prisma.user.create({
    data: {
      email: "admin@devfolio.com",
      password: hashedPassword
    }
  });

  console.log("Admin user created successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });