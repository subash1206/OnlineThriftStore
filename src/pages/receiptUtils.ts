import jsPDF from 'jspdf';

export const generateReceipt = (contentRef: React.RefObject<HTMLDivElement>) => {
  const doc = new jsPDF();
  if (contentRef.current) {
    doc.html(contentRef.current, {
      callback: () => {
        doc.save('receipt.pdf');
      },
    });
  } else {
    console.error('Content reference is missing.');
  }
};
