'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function marcarGanador(inscripcionId: string, rifaId: string) {
    try {
        // 1. Verify the raffle exists and is active (or at least not already finalized?)
        // Actually, user might want to re-pick winner, so we allow if it's not disabled?
        // Let's just update it.

        // 2. Update the Rifa: set winner and status to finalized
        await prisma.rifa.update({
            where: { id: rifaId },
            data: {
                ganador_id: inscripcionId,
                estado: 'finalizada',
            },
        });

        // 3. Revalidate the page
        revalidatePath('/admin/inscripciones');
        return { success: true };
    } catch (error) {
        console.error("Error marking winner:", error);
        return { error: "Failed to mark winner" };
    }
}
