import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const configId = '90052e41-964e-44ed-831a-bc26c383dad7';
    const newToken = 'EAAblTVbhiH0BRLfZAEHWmRczWbUi3mSGopPVytAUglT0mtSwetody4qt6GbZANtqmoesbDKqSVYcrEROCoUuYdlsyruZCiDwBNibEkRV9ojpmc7tyri5JdJzcwivZCwj2cLbEBHpmkZAnBiikSHdZAp8ef2KpdJI3ZBQkYeeK2oPjLoIq8UuhzadZAyojZC9L1Pah6AZDZD';

    console.log(`Updating token for config: ${configId}`);

    await prisma.productConfig.update({
        where: { id: configId },
        data: {
            whatsappToken: newToken,
            whatsappPhoneId: '880774405122197' // Ensuring the ID is also synced
        }
    });

    console.log('Successfully updated whatsappToken in database.');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
