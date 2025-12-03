import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('dmin123*?', 10);

    const admin = await prisma.participante.upsert({
        where: { dni: '00000000' },
        update: {},
        create: {
            dni: '00000000',
            telefono: '000000000',
            nombre: 'Administrador',
            password,
            estado_cuenta: 'activo',
        },
    });

    console.log({ admin });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
