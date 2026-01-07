# 🔧 CARA MEMPERBAIKI ERROR UPLOAD AUDIO

## ❌ Error yang Terjadi
```
FirebaseError: Firebase Storage: User does not have permission to access 
'audio_question_text/1767769758637_1767769955675_31.mp3'. (storage/unauthorized)
```

## 🎯 Penyebab
Folder baru `audio_question_text/` belum diizinkan dalam Firebase Storage Rules.

## ✅ Solusi: Update Firebase Storage Rules

### Langkah-langkah:

#### 1️⃣ Buka Firebase Console
   - Pergi ke: https://console.firebase.google.com/
   - Pilih project: **kamus-online**

#### 2️⃣ Masuk ke Storage
   - Di sidebar kiri, klik **"Storage"**
   - Klik tab **"Rules"** (di bagian atas)

#### 3️⃣ Update Rules
   Ganti rules yang ada dengan kode berikut:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    
    // Allow authenticated users to upload to audio_questions folder
    match /audio_questions/{allPaths=**} {
      allow read: if true;  // Public read access
      allow write: if request.auth != null;  // Only authenticated users can upload
      allow delete: if request.auth != null;  // Only authenticated users can delete
    }
    
    // Allow authenticated users to upload to audio_question_text folder (NEW!)
    match /audio_question_text/{allPaths=**} {
      allow read: if true;  // Public read access
      allow write: if request.auth != null;  // Only authenticated users can upload
      allow delete: if request.auth != null;  // Only authenticated users can delete
    }
    
    // Default deny all other paths
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

#### 4️⃣ Publish Rules
   - Klik tombol **"Publish"** (di kanan atas)
   - Tunggu hingga muncul notifikasi "Rules published successfully"

#### 5️⃣ Test Upload
   - Refresh halaman Admin
   - Coba upload file .mp3 lagi untuk teks soal
   - Upload seharusnya berhasil! ✅

---

## 📝 Penjelasan Rules

### `audio_questions/` 
- Untuk audio passage/listening material umum
- Read: **Public** (semua orang bisa akses)
- Write/Delete: **Authenticated users only**

### `audio_question_text/` (BARU)
- Untuk audio teks soal khusus
- Read: **Public** (semua orang bisa akses)
- Write/Delete: **Authenticated users only**

---

## 🔐 Keamanan

Rules ini memastikan:
- ✅ Hanya admin yang sudah login dapat upload/delete
- ✅ Semua orang dapat membaca/mendengarkan audio (untuk siswa)
- ✅ Folder lain tidak dapat diakses (default deny)

---

## ⚠️ Troubleshooting

### Jika masih error setelah update rules:

1. **Clear cache browser** (Ctrl/Cmd + Shift + R)
2. **Logout dan login kembali** di admin panel
3. **Cek authentication** - pastikan Anda sudah login sebagai admin
4. **Tunggu beberapa detik** - Firebase kadang perlu waktu untuk propagate rules

### Jika tetap tidak bisa:

Cek di Firebase Console → Storage → Rules:
- Pastikan status rules adalah "**Published**"
- Tidak ada error/warning merah
- Timestamp terakhir update adalah baru

---

## 📞 Kontak

Jika masih ada masalah, screenshot error dan rules yang aktif di Firebase Console.
