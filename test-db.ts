import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DIRECT_URL,
        },
    },
})

async function main() {
    console.log('Testing connection to:', process.env.DIRECT_URL)
    try {
        await prisma.$connect()
        console.log('Successfully connected to database!')
        const count = await prisma.rifa.count()
        console.log('Rifa count:', count)
    } catch (e) {
        console.error('Connection failed:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
