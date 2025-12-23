import { getProductoById } from '@/app/actions/productos';
import CheckoutClient from './CheckoutClient';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function CheckoutPage({ searchParams }: { searchParams: { productId?: string } }) {
    const { productId } = await searchParams; // Await searchParams as per Next.js 15/server components

    let product = null;
    if (productId) {
        product = await getProductoById(productId);
    }

    return (
        <CheckoutClient product={product} />
    );
}
