'use client';

import { Star, ThumbsUp, CheckCircle, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

// Mock data generator for demo purposes
const MOCK_REVIEWS = [
    {
        id: 1,
        author: 'Carlos M.',
        rating: 5,
        date: 'Hace 2 días',
        content: 'Excelente producto. Llegó súper rápido a Tarapoto y la calidad es indiscutible. La atención por WhatsApp fue muy amable.',
        verified: true,
        helpful: 12
    },
    {
        id: 2,
        author: 'Ana P.',
        rating: 5,
        date: 'Hace 1 semana',
        content: 'Me encanta. Exactamente lo que buscaba. El empaque estaba muy bien cuidado.',
        verified: true,
        helpful: 8
    },
    {
        id: 3,
        author: 'Jorge L.',
        rating: 4,
        date: 'Hace 3 semanas',
        content: 'Muy bueno, aunque demoró un día más de lo esperado. Pero el producto funciona perfecto.',
        verified: true,
        helpful: 3
    }
];

export function ProductReviews() {
    const [reviews, setReviews] = useState(MOCK_REVIEWS);
    const averageRating = 4.8;
    const totalReviews = 124;

    return (
        <section className="py-12 border-t border-gray-100">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Reseñas de Clientes</h2>

            <div className="flex flex-col md:flex-row gap-12">
                {/* Summary / Stats */}
                <div className="w-full md:w-1/3 shrink-0">
                    <div className="bg-[#F5F5F5] p-8 text-center mb-6">
                        <div className="text-5xl font-black mb-2">{averageRating}</div>
                        <div className="flex justify-center gap-1 mb-2 text-black">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-5 h-5 fill-black" />
                            ))}
                        </div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Basado en {totalReviews} reseñas</p>
                    </div>

                    <div className="space-y-3">
                        {/* Fake Bars */}
                        {[5, 4, 3, 2, 1].map((rating, idx) => (
                            <div key={rating} className="flex items-center gap-3 text-xs">
                                <span className="font-bold w-3">{rating}</span>
                                <Star className="w-3 h-3 text-black fill-black" />
                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-black"
                                        style={{ width: idx === 0 ? '85%' : idx === 1 ? '10%' : '2%' }}
                                    ></div>
                                </div>
                                <span className="text-gray-400 w-8 text-right">{idx === 0 ? '85%' : idx === 1 ? '10%' : '2%'}</span>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-8 border-2 border-black text-black font-bold uppercase text-sm py-4 hover:bg-black hover:text-white transition-colors">
                        Escribir una reseña
                    </button>
                </div>

                {/* Review List */}
                <div className="flex-1 space-y-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-sm">{review.author}</h4>
                                        {review.verified && (
                                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                                <CheckCircle className="w-3 h-3" /> Verificado
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-0.5 text-black">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-black' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400 font-medium">{review.date}</span>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {review.content}
                            </p>

                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-black transition-colors">
                                    <ThumbsUp className="w-4 h-4" /> Es útil ({review.helpful})
                                </button>
                                <button className="text-gray-400 hover:text-black transition-colors ml-auto">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}

                    <button className="text-sm font-bold border-b-2 border-black pb-1 hover:opacity-70 mt-4">
                        Cargar más reseñas
                    </button>
                </div>
            </div>
        </section>
    );
}
