import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const usePrintElement = () => {
  // Reference to the DOM element you want to print
  const pdfRef = useRef<HTMLDivElement>(null);

  const generatePdf = async () => {
    const element = pdfRef.current;

    if (!element) {
      throw new Error("Element reference is null. Cannot generate PDF.");
    }

    // Generate a high-resolution canvas of the element
    const canvas = await html2canvas(element, {
      scale: 2, // Improves image quality by doubling the resolution
      useCORS: true, // Handles cross-origin images if present
      logging: false, // Suppress console logs for html2canvas
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4", // A4 size in px (595.28 x 841.89 at 72 DPI)
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const pageCanvasHeight = (pdfHeight * canvasWidth) / pdfWidth;

    let currentPosition = 0;

    while (currentPosition < canvasHeight) {
      const canvasSlice = document.createElement("canvas");
      canvasSlice.width = canvasWidth;
      canvasSlice.height = Math.min(
        pageCanvasHeight,
        canvasHeight - currentPosition
      );

      const ctx = canvasSlice.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to create 2D context for canvas slicing.");
      }

      ctx.drawImage(
        canvas,
        0,
        currentPosition,
        canvasWidth,
        canvasSlice.height,
        0,
        0,
        canvasWidth,
        canvasSlice.height
      );

      const imageData = canvasSlice.toDataURL("image/png");
      pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);

      if (currentPosition + pageCanvasHeight < canvasHeight) {
        pdf.addPage();
      }

      currentPosition += pageCanvasHeight;
    }

    return pdf;
  };

  const downloadPdfFile = async (fileName: string = "document.pdf") => {
    try {
      const pdf = await generatePdf();
      pdf.save(fileName);
    } catch (error) {
      console.error("Error while generating PDF:", error);
    }
  };

  const openPdfFile = async () => {
    try {
      const pdf = await generatePdf();
      const pdfBlob = pdf.output("bloburl");
      window.open(pdfBlob, "_blank");
    } catch (error) {
      console.error("Error while opening PDF:", error);
    }
  };

  return {
    pdfRef,
    downloadPdfFile,
    openPdfFile,
  };
};
