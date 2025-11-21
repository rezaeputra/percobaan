// Ganti dengan Web app URL GAS Anda!
const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwCneAjxWxMZYLM9uyAUMGe4OQXVx2eO8VIjfndLZL7_UTagxaD_NKZqNXkcfn9mXHX/exec'; 

async function kirimData() {
    // ... (kode validasi input tetap sama) ...

    const angka = inputElement.value;
    
    // 💡 SOLUSI CORS: Menggunakan URLSearchParams untuk mengirim data
    // Ini mengubah format body menjadi application/x-www-form-urlencoded
    const params = new URLSearchParams();
    params.append('angka', angka);
    
    // Perhatikan: Kita TIDAK mengirim header 'Content-Type': 'application/json' lagi!

    try {
        const response = await fetch(GAS_ENDPOINT, {
            method: 'POST',
            mode: 'cors', 
            // Hapus bagian headers: { 'Content-Type': 'application/json' },
            body: params.toString(), // Kirim data dalam format string URL-encoded
        });

        // ... (kode penanganan response JSON tetap sama) ...
        
        // Catatan: Karena kita tidak mengirim JSON, kita harus mengubah cara GAS menerima data.
        const data = await response.json(); 
        
        // ... (lanjutan penanganan respons) ...

    } catch (error) {
        // ... (penanganan error) ...
    }
}

