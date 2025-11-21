const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwCneAjxWxMZYLM9uyAUMGe4OQXVx2eO8VIjfndLZL7_UTagxaD_NKZqNXkcfn9mXHX/exec'; 

async function kirimData() {
    // 💡 PERBAIKAN: Deklarasikan variabel DOM di sini
    const inputElement = document.getElementById('inputAngka');
    const hasilElement = document.getElementById('hasilCek');
    
    // Pastikan elemen ditemukan sebelum digunakan
    if (!inputElement || !hasilElement) {
        console.error("Error: Elemen HTML tidak ditemukan (id: inputAngka atau hasilCek)");
        // 
        return; 
    }
    
    const angka = inputElement.value;
    
    // Validasi input
    if (!angka) {
        hasilElement.textContent = "Mohon masukkan angka.";
        return;
    }

    hasilElement.textContent = "Sedang memproses...";
    
    // SOLUSI CORS: Menggunakan URLSearchParams
    const params = new URLSearchParams();
    params.append('angka', angka);
    
    try {
        const response = await fetch(GAS_ENDPOINT, {
            method: 'POST',
            mode: 'cors', 
            body: params.toString(), 
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
