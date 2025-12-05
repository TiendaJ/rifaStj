'use client';

import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { FileDown } from 'lucide-react';

interface Rifa {
    id: string;
    nombre: string;
    precio_producto: number | null;
    capacidad_maxima: number;
    imagen: string | null;
    _count: {
        participantes: number;
    };
}

export default function RifaReportButton({ rifas }: { rifas: Rifa[] }) {
    const generatePDF = async () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 10;
        const colGap = 10;
        const colWidth = (pageWidth - (margin * 2) - colGap) / 2;

        let x = margin;
        let y = margin;
        let colIndex = 0; // 0 or 1

        for (const rifa of rifas) {
            // Check if we need a new page
            if (y + 100 > pageHeight) { // Assuming each card takes ~100mm
                doc.addPage();
                y = margin;
                x = margin;
                colIndex = 0;
            }

            // Calculate X based on column
            x = margin + (colIndex * (colWidth + colGap));

            // Card Border (Optional, for visual guide)
            doc.setDrawColor(200, 200, 200);
            doc.rect(x, y, colWidth, 90); // Height 90mm

            // Image
            if (rifa.imagen) {
                try {
                    const img = await fetchImage(rifa.imagen);
                    if (img) {
                        // Maintain aspect ratio, fit within width
                        const imgProps = doc.getImageProperties(img);
                        const imgRatio = imgProps.width / imgProps.height;
                        let imgW = colWidth - 10;
                        let imgH = imgW / imgRatio;

                        if (imgH > 40) { // Max height 40mm
                            imgH = 40;
                            imgW = imgH * imgRatio;
                        }

                        // Center image
                        const imgX = x + (colWidth - imgW) / 2;
                        doc.addImage(img, 'JPEG', imgX, y + 5, imgW, imgH);
                    }
                } catch (e) {
                    console.error("Error loading image", e);
                }
            }

            // Text content starts below image area (approx 50mm from top of card)
            const textY = y + 50;

            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            // Split title if too long
            const titleLines = doc.splitTextToSize(rifa.nombre.toUpperCase(), colWidth - 10);
            doc.text(titleLines, x + 5, textY);

            const nextY = textY + (titleLines.length * 5) + 2;

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Valor ref: S/ ${rifa.precio_producto?.toFixed(2) || '0.00'}`, x + 5, nextY);

            doc.text(`CUPOS: ${rifa._count.participantes}/${rifa.capacidad_maxima}`, x + 5, nextY + 5);

            // QR Code
            try {
                const qrData = `https://jshop.pe/rifas/${rifa.id}`; // URL to the raffle
                const qrDataUrl = await QRCode.toDataURL(qrData);
                // Place QR code at bottom right of card
                doc.addImage(qrDataUrl, 'PNG', x + colWidth - 25, y + 60, 20, 20);
            } catch (e) {
                console.error("Error generating QR", e);
            }

            // Update column/row for next item
            colIndex++;
            if (colIndex > 1) {
                colIndex = 0;
                y += 100; // Move down for next row
            }
        }

        doc.save('reporte-rifas.pdf');
    };

    const fetchImage = (url: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = url;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) return reject('No context');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/jpeg'));
            };
            img.onerror = reject;
        });
    };

    return (
        <button
            onClick={generatePDF}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
            <FileDown size={20} />
            Descargar Reporte PDF
        </button>
    );
}
