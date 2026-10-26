function parseGoogleDate(val) {
    if (!val) return '';
    const str = String(val);
    // Google Sheets gviz mengembalikan format tanggal "Date(YYYY,MM,DD)"
    const match = str.match(/Date\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const year = match[1];
      // Bulan di Google gviz dimulai dari 0 (Jan = 0), jadi perlu ditambah 1
      const month = String(Number(match[2]) + 1).padStart(2, '0');
      const day = String(match[3]).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return str;
  }
  
  export async function getVendorContracts() {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID wajib diisi di .env');
    }
  
    // Menggunakan endpoint publik Google Sheets (Tanpa Google Cloud Console / API Key)
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=Vendors`;
  
    const response = await fetch(url);
    const text = await response.text();
  
    // Membersihkan format respons Google Visualization API menjadi JSON murni
    const jsonString = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const result = JSON.parse(jsonString);
  
    const rows = result.table.rows || [];
  
    // Mapping baris spreadsheet ke bentuk Object JSON dengan pembersih tanggal
    return rows.map((row) => {
      const cols = row.c || [];
      return {
        id: cols[0]?.v ? String(cols[0].v) : '',
        name: cols[1]?.v ? String(cols[1].v) : '',
        service: cols[2]?.v ? String(cols[2].v) : '',
        endDate: parseGoogleDate(cols[3]?.v),
        contactEmail: cols[4]?.v ? String(cols[4].v) : '',
        status: cols[5]?.v ? String(cols[5].v) : '',
      };
    });
  }