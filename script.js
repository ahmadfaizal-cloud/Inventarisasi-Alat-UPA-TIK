// Data inventaris statis (sebagai contoh database awal)
let inventoryData = [
    { id: 'K001', name: 'Kunci Pas Set', status: 'Tersedia', borrower: '' },
    { id: 'L005', name: 'Laptop Unit 5', status: 'Dipinjam', borrower: 'Budi' },
    { id: 'P010', name: 'Proyektor Epson', status: 'Tersedia', borrower: '' }
];

const tableBody = document.getElementById('inventory-body');

function renderTable() {
    tableBody.innerHTML = ''; // Kosongkan tabel
    
    inventoryData.forEach(item => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = item.id;
        row.insertCell().textContent = item.name;
        row.insertCell().textContent = item.status;
        row.insertCell().textContent = item.borrower;
        
        const actionCell = row.insertCell();
        const button = document.createElement('button');
        
        if (item.status === 'Tersedia') {
            button.textContent = 'KELUAR';
            button.onclick = () => logOut(item.id);
        } else {
            button.textContent = 'MASUK';
            button.onclick = () => logIn(item.id);
        }
        actionCell.appendChild(button);
    });
}

function logOut(id) {
    const item = inventoryData.find(i => i.id === id);
    if (!item) return;

    const borrowerName = prompt(`Masukkan nama peminjam untuk alat ${item.name}:`);
    if (borrowerName) {
        item.status = 'Dipinjam';
        item.borrower = borrowerName;
        // Opsional: Simpan ke LocalStorage di sini
        renderTable();
        alert(`Alat ${item.name} berhasil dikeluarkan oleh ${borrowerName}.`);
    }
}

function logIn(id) {
    const item = inventoryData.find(i => i.id === id);
    if (!item) return;

    const confirmIn = confirm(`Konfirmasi: Apakah alat ${item.name} sudah masuk kembali?`);
    if (confirmIn) {
        item.status = 'Tersedia';
        item.borrower = '';
        // Opsional: Simpan ke LocalStorage di sini
        renderTable();
        alert(`Alat ${item.name} berhasil dimasukkan kembali.`);
    }
}

// Inisialisasi tampilan saat halaman dimuat
renderTable();
