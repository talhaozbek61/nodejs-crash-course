import crypto from "crypto";

// createHash()
// const hash = crypto.createHash("sha256");
// hash.update("password1234");
// console.log(hash.digest("hex"));

// randomBytes()
// crypto.randomBytes(16, (err, buf) => {
//   if (err) throw err;
//   console.log(buf.toString("hex"));
// });

// createCipheriv() && createDecipheriv()
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);

const cryptedText = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  console.log(encrypted);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  console.log(decrypted);
};

cryptedText("What up?");

// // fixed by chatgpt
// const algorithm = "aes-256-cbc"; // AES-256-CBC algoritması
// const key = crypto.randomBytes(32); // 32 byte (256 bit) anahtar, AES-256 için uygun
// // IV'yi her seferinde rastgele oluşturuyoruz
// const cryptedText = (text) => {
//   // 16 byte (128 bit) uzunluğunda IV
//   const iv = crypto.randomBytes(16);

//   // Şifreleme işlemi
//   const cipher = crypto.createCipheriv(algorithm, key, iv);
//   let encrypted = cipher.update(text, "utf8", "hex");
//   encrypted += cipher.final("hex");

//   console.log("Encrypted text:", encrypted);

//   // Şifrelenmiş metni ve IV'yi birlikte saklayalım
//   // Genelde IV'yi şifreli veriye ekleyerek saklamak yaygındır
//   const encryptedData = iv.toString("hex") + ":" + encrypted;

//   console.log("Encrypted data with IV:", encryptedData);

//   // Şifre çözme işlemi
//   // IV'yi ve şifreyi ayırıyoruz
//   const [ivHex, encryptedText] = encryptedData.split(":");
//   const ivBuffer = Buffer.from(ivHex, "hex");

//   const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
//   let decrypted = decipher.update(encryptedText, "hex", "utf8");
//   decrypted += decipher.final("utf8");

//   console.log("Decrypted text:", decrypted);
// };

// cryptedText("What up?");

// Yapılan İyileştirmeler:
// IV'nin Her Seferinde Rastgele Üretilmesi:
// Her şifreleme işleminde farklı bir IV kullanmak için crypto.randomBytes(16) kullanıyoruz.
// Şifreli Veriyi ve IV'yi Birlikte Saklamak:
// IV'yi, şifrelenmiş metnin başına ekleyerek birlikte saklıyoruz. Bu, çözme işlemi için gereklidir. Şifreli veri ve IV'yi : ile ayırarak birleştiriyoruz (bu sadece bir yöntem, başka formatlar da kullanılabilir).
// Şifre Çözme Esnasında IV'nin Ayrılması:
// Şifreli veriyi ve IV'yi ayırmak için split(':') kullanıyoruz. Bu sayede IV'yi şifrelenmiş veriden çıkarıp çözme işleminde kullanabiliriz.
// Güvenlik:
// Bu kodda, IV ve şifreli veriyi birbirinden ayırıp saklamak daha güvenlidir çünkü IV şifreleme algoritması için kritik bir parametredir. Eğer IV sabit kalırsa, saldırganlar aynı veriyi tekrar şifrelediğinde her zaman aynı çıktıyı elde edebilirler.
// Çıktı:
// Bu kod çalıştırıldığında, şifrelenmiş veri ve çözülmüş metinler şöyle görünebilir:

// plaintext
// Kodu kopyala
// Encrypted text: 7b5c7e90d407d99136c138d1a5878554
// Encrypted data with IV: f24d2fd86adf3e8769537f2e1e7cbf12:7b5c7e90d407d99136c138d1a5878554
// Decrypted text: What up?
// Şifreli veri: Şifrelenmiş metin (bu örnekte "7b5c7e90d407d99136c138d1a5878554") ve IV ("f24d2fd86adf3e8769537f2e1e7cbf12") birlikte saklanır.
// Şifre çözüldükten sonra: "What up?" metni doğru şekilde çözülür.
// Ekstra Güvenlik Dikkat Edilmesi Gerekenler:
// Anahtarın Güvenliği: Bu örnekte anahtar (key) rastgele üretiliyor. Gerçek dünyada, şifreleme anahtarlarının güvenli bir şekilde saklanması ve yönetilmesi gerekir. Genellikle anahtarlar bir gizli ortam değişkeninde (environment variable) veya bir anahtar yönetim sistemi (KMS) gibi güvenli bir sistemde saklanır.
// Geri Dönüşüm ve IV'nin Yönetimi: IV'yi her seferinde rastgele üretmek, güvenlik için iyidir. Ancak, IV'yi veritabanında veya iletişim sırasında güvenli bir şekilde saklamalısınız.
// Bu iyileştirmelerle birlikte, şifreleme ve çözme işlemleri daha güvenli hale gelir ve uygulamanızda sağlam bir güvenlik altyapısı sağlanmış olur.
