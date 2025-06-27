const url = "https://script.google.com/macros/s/AKfycbx4Mmd9ZpC3NsReKml9hxv3m4DXpVQ5r1MRlBCiePJjiLPJbw3gWyAu4GN4UDHMoKK4/exec";

let allRows = [];

fetch(url)
  .then(res => res.json())
  .then(data => {
    allRows = data.data;
    tampilkanData(""); // Default: semua data
  });

function tampilkanData(filterStatus) {
  const tbody = document.querySelector('#sheet-data tbody');
  const thead = document.querySelector('#sheet-data thead');
  tbody.innerHTML = "";
  thead.innerHTML = "";

  // Tentukan struktur header berdasarkan status
  let headers = [];
  switch (filterStatus) {
    case "Draft":
      headers = ["No", "Judul Artikel", "Deadline", "Catatan"];
      break;
    case "Siap Submit":
      headers = ["No", "Judul Artikel", "Jurnal", "Index", "Link Jurnal", "Author"];
      break;
    case "Submitted":
      headers = ["No", "Judul Artikel", "Jurnal", "Index", "Tanggal Submit", "Author"];
      break;
    case "Review":
      headers = ["No", "Judul Artikel", "Jurnal", "Index", "Author"];
      break;
    case "Revisi":
      headers = ["No", "Judul Artikel", "Jurnal", "Catatan", "Author"];
      break;
    case "Accepted":
    case "Published":
      headers = ["No", "Judul Artikel", "Jurnal", "Author"];
      break;
    case "Rejected":
      headers = ["No", "Judul Artikel", "Jurnal", "Catatan", "Author"];
      break;
    default:
      headers = ["No", "Judul Artikel", "Tanggal Submit", "Jurnal", "Index", "Link Jurnal", "Deadline", "Catatan", "Status", "Author"];
  }

  // Buat elemen <th> sesuai header
  const headerRow = document.createElement("tr");
  headers.forEach(h => {
    const th = document.createElement("th");
    th.textContent = h;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Filter data
  let filtered = allRows;
  if (filterStatus) {
    filtered = allRows.filter(row => row[8] === filterStatus);
  }

  // Tampilkan isi tabel
  filtered.forEach((row, i) => {
    const tr = document.createElement("tr");

    switch (filterStatus) {
      case "Draft":
        tr.innerHTML = `
          <td>${i + 1}</td>
          <td>${row[1] || ""}</td>
          <td>${row[6] || ""}</td>
          <td>${row[7] || ""}</td>`;
        break;

      case "Siap Submit":
        tr.innerHTML = `
          <td>${i + 1}</td>
          <td>${row[1] || ""}</td>
          <td>${row[3] || ""}</td>
          <td>${row[4] || ""}</td>
          <td><a href="${row[5] || "#"}" target="_blank">Lihat</a></td>
          <td>${row[9] || ""}</td>`;
        break;

      case "Submitted":
        tr.innerHTML = `
          <td>${i + 1}</td>
          <td>${row[1] || ""}</td>
          <td>${row[3] || ""}</td>
          <td>${row[4] || ""}</td>
          <td>${row[2] || ""}</td>
          <td>${row[9] || ""}</td>`;
        break;

      case "Review":
        tr.innerHTML = `
          <td>${i + 1}</td>
          <td>${row[1] || ""}</td>
          <td>${row[3] || ""}</td>
          <td>${row[4] || ""}</td>
          <td>${row[9] || ""}</td>`;
        break;

      case "Revisi":
        tr.innerHTML = `
          <td>${i + 1}</td>
          <td>${row[1] || ""}</td>
          <td>${row[3] || ""}</td>
          <td>${row[7] || ""}</td>
          <td>${row[9] || ""}</td>`;
        break;

      case "Accepted":
      case "Published":
        tr.innerHTML = `
          <td>${i + 1}</td>
          <td>${row[1] || ""}</td>
          <td>${row[3] || ""}</td>
          <td>${row[9] || ""}</td>`;
        break;

      case "Rejected":
        tr.innerHTML = `
          <td>${i + 1}</td>
          <td>${row[1] || ""}</td>
          <td>${row[3] || ""}</td>
          <td>${row[7] || ""}</td>
          <td>${row[9] || ""}</td>`;
        break;

      default:
        tr.innerHTML = `
          <td>${i + 1}</td>
          <td>${row[1] || ""}</td>
          <td>${row[2] || ""}</td>
          <td>${row[3] || ""}</td>
          <td>${row[4] || ""}</td>
          <td><a href="${row[5] || "#"}" target="_blank">Lihat</a></td>
          <td>${row[6] || ""}</td>
          <td>${row[7] || ""}</td>
          <td>${row[8] || ""}</td>
          <td>${row[9] || ""}</td>`;
        break;
    }

    tbody.appendChild(tr);
  });
}

function filterData() {
  const status = document.getElementById("filterStatus").value;
  tampilkanData(status);
}
