// Ganti dengan Web app URL GAS Anda!
const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwCneAjxWxMZYLM9uyAUMGe4OQXVx2eO8VIjfndLZL7_UTagxaD_NKZqNXkcfn9mXHX/exec'; 

async function kirimData() {
    const inputElement = document.getElementById('inputAngka');
    const angka = inputElement.value;
    const hasilElement = document.getElementById('hasilCek');
    
    // Validasi input
    if (!angka) {
        hasilElement.textContent = "Mohon masukkan angka.";
        return;
    }

    hasilElement.textContent = "Sedang memproses...";

    try {
        const response = await fetch(GAS_ENDPOINT, {
            method: 'POST',
            mode: 'cors', // Penting untuk komunikasi lintas domain
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ angka: angka }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // 4. Angka mengembalikan sudah tercatat / dicatat baru
        if (data.status === 'TERCATAT') {
            // 
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