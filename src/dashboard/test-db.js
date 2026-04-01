const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Checking User count...");
        const users = await prisma.user.count();
        console.log(`Users: ${users}`);

        console.log("Checking AuditLog metadata...");
        // This will throw if the field doesn't exist
        const log = await prisma.auditLog.findFirst({
            select: { id: true, userId: true, pendingApproval: true }
        });
        console.log("AuditLog Fields Check: SUCCESS");
        console.log("Sample Log:", log);
    } catch (err) {
        console.error("DIAGNOSTIC ERROR:", err.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
