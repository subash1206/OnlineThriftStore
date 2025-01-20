import jsPDF from 'jspdf';

export const downloadReceipt = (receiptRef: React.RefObject<HTMLDivElement>) => {
  const doc = new jsPDF();
  if (receiptRef.current) {
    doc.html(receiptRef.current, {
      callback: () => {
        doc.save('receipt.pdf');
      },
    });
  } else {
    console.error('Receipt reference is missing.');
  }
};
