const fs = require('fs');
const PDFDocument = require('pdfkit');

const generatePDF = (data, filePath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(16).text('Lab Report', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Name: ${data.name}`);
  doc.text(`Test: ${data.test}`);
  doc.text(`Date: ${data.date}`);
  doc.text(`Result: ${data.result}`);
  
  doc.end();
};

module.exports = generatePDF;
