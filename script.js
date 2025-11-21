const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwCneAjxWxMZYLM9uyAUMGe4OQXVx2eO8VIjfndLZL7_UTagxaD_NKZqNXkcfn9mXHX/exec'; 

async function kirimData() {
    const inputElement = document.getElementById('inputAngka');
    const hasilElement = document.getElementById('hasilCek');
    
    if (!inputElement || !hasilElement) {
        console.error("Error: Elemen HTML tidak ditemukan (id: inputAngka atau hasilCek)");
        return; 
    }
    
    const angka = inputElement.value;
    
    if (!angka) {
        hasilElement.textContent = "Mohon masukkan angka.";
        return;
    }

    hasilElement.textContent = "Sedang memproses...";
    
    // 💡 SOLUSI TERBAIK: Menggunakan Objek FormData
    const formData = new FormData();
    formData.append('angka', angka); // Kunci 'angka' harus sama dengan yang diakses di GAS
    
    try {
        const response = await fetch(GAS_ENDPOINT, {
            method: 'POST',
            mode: 'cors', 
            // TIDAK PERLU Header 'Content-Type'. fetch akan mengaturnya secara otomatis.
            body: formData, // Langsung kirim objek FormData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Penanganan respons dari GAS
        if (data.status === 'TERCATAT') {
            hasilElement.textContent = `✅ SUDAH TERCATAT: ${data.message}`;
        } else if (data.status === 'DICATAT_BARU') {
            hasilElement.textContent = `💾 BERHASIL DICATAT: ${data.message}`;
        } else {
            hasilElement.textContent = `⚠️ RESPON TAK DIKENAL: ${data.message}`;
        }

    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        hasilElement.textContent = `❌ Terjadi kesalahan saat berkomunikasi dengan server. Cek konsol.`;
    }
}
