const apiKey = 'AIzaSyDRjh5bYH1i_RKB-JFMaDRBq4adE4C5oyw';
const sheetId = '1SbXg_VomcX8ndwjuUKz7BZ-DRPskfk6AzRIysCb694w';
const sheetName = 'Sheet1';
const range = `${sheetName}!B2:H`; // mulai dari kolom B sampai H

const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

let semuaData = []; // simpan semua data global

// Fungsi Ambil Data dari Sheet
function ambilData() {
  fetch(sheetUrl)
    .then(res => res.json())
    .then(data => {
      semuaData = data.values || [];
      tampilkanData(semuaData); // Tampilkan semua saat pertama kali
    })
    .catch(err => console.error('Gagal ambil data:', err));
}

// Fungsi Tampilkan Data ke Tabel
function tampilkanData(dataArray) {
  const tbody = document.querySelector('#sheet-data tbody');
  tbody.innerHTML = '';

  dataArray.forEach((row, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${row[0] || ''}</td>       <!-- Judul -->
      <td>${row[1] || ''}</td>       <!-- Tanggal -->
      <td>${row[2] || ''}</td>       <!-- Jurnal -->
      <td>${row[4] || ''}</td>       <!-- Deadline -->
      <td>${row[6] || ''}</td>       <!-- Status -->
    `;
    tbody.appendChild(tr);
  });
}

// Fungsi Filter Data berdasarkan Dropdown
function filterData() {
  const selectedStatus = document.getElementById('filterStatus').value;

  if (!selectedStatus) {
    tampilkanData(semuaData); // tampilkan semua jika tidak pilih status
  } else {
    const hasilFilter = semuaData.filter(row => (row[6] || '').toLowerCase() === selectedStatus.toLowerCase());
    tampilkanData(hasilFilter);
  }
}

// Jalankan saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', ambilData);
