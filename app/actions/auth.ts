'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { encrypt, getSession } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';



export async function googleLogin(userData: { email: string; id: string; nombre: string }) {
    const { email, id: supabase_id, nombre } = userData;

    if (!email) return { error: "No email provided" };

    // Upsert user in Prisma
    let participante = await prisma.participante.findUnique({
        where: { email },
    });

    if (!participante) {
        participante = await prisma.participante.findUnique({
            where: { supabase_id },
        });
    }

    if (!participante) {
        participante = await prisma.participante.create({
            data: {
                email,
                supabase_id,
                nombre,
                estado_cuenta: 'activo',
            },
        });
    } else {
        if (!participante.supabase_id) {
            await prisma.participante.update({
                where: { id: participante.id },
                data: { supabase_id },
            });
        }
    }

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const sessionPayload = {
        id: participante.id,
        email: participante.email,
        role: 'user',
        expires,
    };

    const token = await encrypt(sessionPayload);
    (await cookies()).set('session', token, { expires, httpOnly: true, path: '/' });

    return { success: true };
}

export async function checkAuth() {
    const session = await getSession();
    return !!session;
}

const loginSchema = z.object({
    identifier: z.string().min(1, "DNI o Teléfono es requerido"),
    password: z.string().min(1, "Contraseña es requerida"),
});

const registerSchema = z.object({
    dni: z.string().length(8, "DNI debe tener 8 dígitos"),
    telefono: z.string().min(9, "Teléfono inválido"),
    nombre: z.string().optional(),
    password: z.string().min(6, "Mínimo 6 caracteres"),
});

export async function login(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validated = loginSchema.safeParse(rawData);

    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors };
    }

    const { identifier, password } = validated.data;

    // Find user by DNI or Phone
    const user = await prisma.participante.findFirst({
        where: {
            OR: [
                { dni: identifier },
                { telefono: identifier }
            ]
        }
    });

    if (!user) {
        return { error: { root: ["Credenciales inválidas"] } };
    }

    if (!user.password) {
        return { error: { root: ["Esta cuenta usa inicio de sesión con Google"] } };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return { error: { root: ["Credenciales inválidas"] } };
    }

    if (user.estado_cuenta !== 'activo') {
        return { error: { root: ["Cuenta bloqueada o inactiva"] } };
    }

    // Create session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const sessionData = {
        id: user.id,
        dni: user.dni,
        nombre: user.nombre,
        role: user.dni === '00000000' ? 'admin' : 'client',
        expires,
    };

    const token = await encrypt(sessionData);

    (await cookies()).set('session', token, { expires, httpOnly: true });

    // Redirect based on role
    if (sessionData.role === 'admin') {
        redirect('/admin/rifas');
    } else {
        redirect('/mis-inscripciones');
    }
}

export async function register(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validated = registerSchema.safeParse(rawData);

    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors };
    }

    const { dni, telefono, nombre, password } = validated.data;

    // Check duplicates
    const existing = await prisma.participante.findFirst({
        where: {
            OR: [{ dni }, { telefono }]
        }
    });

    if (existing) {
        return { error: { root: ["El DNI o Teléfono ya está registrado"] } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.participante.create({
        data: {
            dni,
            telefono,
            nombre,
            password: hashedPassword,
        }
    });

    // Auto login or redirect to login
    redirect('/login?registered=true');
}



export async function logout() {
    (await cookies()).delete('session');
    redirect('/login');
}
