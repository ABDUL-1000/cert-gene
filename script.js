let serialCounter = 1000; // Starting point for serial numbers
const certificates = {}; // Stores certificates

document.getElementById("generateBtn").addEventListener("click", () => {
  const studentName = document.getElementById("studentName").value;
  const description = document.getElementById("description").value;
  const serialNumber = `CERT-${serialCounter++}`; // Generate a new serial number

  // Update certificate text in the preview
  document.getElementById("certStudentName").innerText = studentName;
  document.getElementById("certDescription").innerText = description;
  document.getElementById("certSerialNumber").innerText = serialNumber;

  // Save certificate data for retrieval
  certificates[serialNumber] = { studentName, description, serialNumber };

  // Show preview modal
  $('#previewModal').modal('show');
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  html2canvas(document.getElementById("certificateContainer"), { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF('landscape');
    const imgWidth = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    pdf.save("certificate.pdf");
  });
});

function fetchCertificate() {
  const serialNumber = document.getElementById("searchSerial").value;
  const certificate = certificates[serialNumber];

  if (certificate) {
    // Populate the preview with retrieved certificate data
    document.getElementById("certStudentName").innerText = certificate.studentName;
    document.getElementById("certDescription").innerText = certificate.description;
    document.getElementById("certSerialNumber").innerText = certificate.serialNumber;

    // Show preview modal with retrieved data
    $('#previewModal').modal('show');
  } else {
    document.getElementById("certificateDetails").innerText = "Certificate not found.";
  }
}
