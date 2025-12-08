'use client';

import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { FileDown } from 'lucide-react';

interface Rifa {
    id: string;
    nombre: string;
    precio_producto: number | null;
    monto: number;
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
        const margin = 15;
        const colGap = 10;
        const colWidth = (pageWidth - (margin * 2) - colGap) / 2;

        // Title
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text("Catálogo de Rifas - Jshop", pageWidth / 2, 20, { align: 'center' });

        let x = margin;
        let y = 35; // Start below title
        let colIndex = 0;

        for (const rifa of rifas) {
            const cardHeight = 110; // Increased height for larger images

            // Check if we need a new page
            if (y + cardHeight > pageHeight) {
                doc.addPage();
                y = margin;
                x = margin;
                colIndex = 0;
            }

            // Calculate X based on column
            x = margin + (colIndex * (colWidth + colGap));

            // Image
            if (rifa.imagen) {
                try {
                    const img = await fetchImage(rifa.imagen);
                    if (img) {
                        const imgProps = doc.getImageProperties(img);
                        const imgRatio = imgProps.width / imgProps.height;
                        let imgW = colWidth; // Full width
                        let imgH = imgW / imgRatio;

                        // Max height constraint (increased to 60mm)
                        if (imgH > 60) {
                            imgH = 60;
                            imgW = imgH * imgRatio;
                        }

                        // Center image
                        const imgX = x + (colWidth - imgW) / 2;
                        doc.addImage(img, 'JPEG', imgX, y, imgW, imgH);
                    }
                } catch (e) {
                    console.error("Error loading image", e);
                }
            }

            // Text content starts below image area
            const textY = y + 65;

            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            const titleLines = doc.splitTextToSize(rifa.nombre.toUpperCase(), colWidth);
            doc.text(titleLines, x, textY);

            let nextY = textY + (titleLines.length * 6) + 4;

            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(220, 38, 38); // Red color for price
            doc.text(`PRECIO RIFA: S/ ${rifa.monto.toFixed(2)}`, x, nextY);
            doc.setTextColor(0, 0, 0); // Reset color

            nextY += 6;
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Valor ref: S/ ${rifa.precio_producto?.toFixed(2) || '0.00'}`, x, nextY);

            nextY += 5;
            doc.text(`CUPOS: ${rifa._count.participantes}/${rifa.capacidad_maxima}`, x, nextY);

            // QR Code
            try {
                const qrData = `https://jshop.pe/rifas/${rifa.id}`;
                const qrDataUrl = await QRCode.toDataURL(qrData);
                // Place QR code at bottom right relative to text
                doc.addImage(qrDataUrl, 'PNG', x + colWidth - 25, textY, 25, 25);
            } catch (e) {
                console.error("Error generating QR", e);
            }

            // Update column/row for next item
            colIndex++;
            if (colIndex > 1) {
                colIndex = 0;
                y += cardHeight + 10; // Move down for next row with gap
            }
        }

        doc.save('catalogo-rifas.pdf');
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
            Descargar PDF
        </button>
    );
}
