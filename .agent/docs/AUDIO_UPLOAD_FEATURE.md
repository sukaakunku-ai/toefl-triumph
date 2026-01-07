# Feature: Upload Audio untuk Teks Soal Listening

## Ringkasan Perubahan

Telah ditambahkan fitur untuk mengupload file .mp3 khusus untuk teks soal pada soal Listening Comprehension di halaman Admin TOEFL Triumph.

## File yang Dimodifikasi

### 1. `/src/data/questions.ts`
- **Perubahan**: Menambahkan field `question_audio_url?: string` pada interface `Question`
- **Tujuan**: Menyimpan URL audio untuk teks soal (berbeda dari `audio_url` yang untuk passage/listening material umum)

### 2. `/src/services/questionService.ts`
- **Perubahan**:
  1. Fungsi `uploadQuestionAudio()` sekarang menerima parameter tambahan `type?: 'passage' | 'question'`
     - Jika `type === 'question'`, audio akan disimpan di folder `audio_question_text/`
     - Jika `type === 'passage'` atau tidak diisi, audio akan disimpan di folder `audio_questions/`
  
  2. Fungsi `deleteQuestionAudio()` diupdate untuk mendukung penghapusan dari kedua folder
     - Regex pattern diupdate: `/(audio_questions|audio_question_text)\/[^?]+/`
  
  3. Fungsi `getQuestionsByCategory()` diupdate untuk mengambil field `question_audio_url`

- **Tujuan**: Memisahkan penyimpanan audio passage dan audio teks soal agar lebih terorganisir

### 3. `/src/pages/Admin.tsx`
- **Perubahan**:
  1. State `questionForm` ditambahkan field `question_audio_url: ""`
  
  2. Fungsi `handleAddQuestion()` dan `handleEditQuestion()` diupdate untuk menangani `question_audio_url`
  
  3. Fungsi `handleSaveQuestion()` diupdate untuk menyimpan `question_audio_url` ke database
  
  4. **UI Baru**: Ditambahkan section audio upload untuk teks soal (hanya muncul untuk soal Listening)
     - **Lokasi**: Antara textarea "Teks Soal" dan section "Pilihan Jawaban"
     - **Fitur**:
       - Input URL untuk Google Drive atau direct MP3 link
       - Button upload file MP3 (.mp3, audio/*)
       - Preview audio player
       - Button hapus audio (khusus untuk file yang diupload ke Firebase Storage)
       - Badge indikator: "Uploaded" (Firebase) atau "G-Drive" (Google Drive)
       - Progress indicator saat upload

- **Tujuan**: Memberikan UI yang user-friendly untuk admin mengupload audio untuk teks soal

## Cara Penggunaan

1. **Login ke Admin Panel**
2. **Buka Tab "Kelola Soal"**
3. **Klik "Tambah Soal" atau Edit soal yang sudah ada**
4. **Pilih Kategori "Listening Comprehension"**
5. **Isi teks soal seperti biasa**
6. **Section "Audio untuk Teks Soal (Opsional)" akan muncul di bawah textarea teks soal**
7. **Pilih salah satu:**
   - **Upload file .mp3** dari komputer Anda
   - **Atau paste URL** dari Google Drive atau link direct MP3
8. **Preview audio** akan muncul setelah upload/paste URL berhasil
9. **Klik "Simpan"** untuk menyimpan soal

## Catatan Teknis

### Storage Structure
```
Firebase Storage:
├─ audio_questions/          # Audio untuk passage/listening material
│  └─ {questionId}_{timestamp}_{filename}.mp3
└─ audio_question_text/      # Audio untuk teks soal
   └─ {questionId}_{timestamp}_{filename}.mp3
```

### Database Schema
```typescript
Question {
  id: number;
  category: 'structure' | 'reading' | 'listening';
  question_text: string;
  passage?: string;
  audio_url?: string;              // Audio untuk passage
  question_audio_url?: string;     // Audio untuk teks soal (BARU)
  options: string[];
  correct_answer: number;
  explanation: string;
}
```

## Testing Checklist

- [ ] Upload file .mp3 untuk teks soal listening berhasil
- [ ] Preview audio berfungsi dengan baik
- [ ] Hapus audio berhasil (untuk file dari Firebase Storage)
- [ ] Paste URL Google Drive berhasil dikonversi dan bisa diplay
- [ ] Data tersimpan dengan benar di database
- [ ] Audio loading tidak menggangu UI
- [ ] Section audio hanya muncul untuk kategori Listening
- [ ] Edit soal yang sudah ada tetap menampilkan audio yang tersimpan

## Future Improvements

1. Validasi ukuran file maksimal
2. Kompresi audio otomatis
3. Multi-file upload
4. Audio waveform preview
5. Batch upload untuk multiple questions
