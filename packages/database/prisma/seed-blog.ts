/**
 * Blog seed — populates BlogCategory, Tag, and BlogPost with realistic
 * Turkish content so the storefront `/blog` route renders something
 * meaningful in dev. Idempotent: every row is upserted by slug, so re-running
 * the script never duplicates content and lets editors safely tweak titles or
 * bodies in the admin panel without losing them on the next reseed.
 *
 * Run: pnpm --filter @akonbutik/database exec tsx prisma/seed-blog.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CategorySeed {
  slug: string;
  nameTr: string;
}

interface PostSeed {
  slug: string;
  titleTr: string;
  excerpt: string;
  bodyMd: string;
  coverUrl: string;
  categorySlug: string;
  tagSlugs: readonly string[];
  metaDescription: string;
  /** Days ago — clamped between 1 and 60. */
  publishedDaysAgo: number;
}

const CATEGORIES: readonly CategorySeed[] = [
  { slug: 'stil-rehberi', nameTr: 'Stil Rehberi' },
  { slug: 'koleksiyon', nameTr: 'Koleksiyon' },
  { slug: 'trend', nameTr: 'Trend' },
];

const TAGS: readonly { slug: string; name: string }[] = [
  { slug: 'koleksiyon', name: 'Koleksiyon' },
  { slug: 'trend', name: 'Trend' },
  { slug: 'kombin', name: 'Kombin' },
  { slug: 'bakim', name: 'Bakım' },
  { slug: 'lookbook', name: 'Lookbook' },
];

const POSTS: readonly PostSeed[] = [
  {
    slug: 'kapsul-gardirop-rehberi',
    titleTr: 'Kapsül Gardırop Rehberi: Az Parça, Çok Kombin',
    excerpt:
      'Birbiriyle uyumlu az sayıda parça ile her sabah kombin derdine son veren kapsül gardırop yaklaşımı.',
    coverUrl: '/uploads/seed/blog-1.jpg',
    categorySlug: 'stil-rehberi',
    tagSlugs: ['kombin', 'koleksiyon'],
    metaDescription:
      'Akon Butik kapsül gardırop rehberi: zamansız parçalarla minimal ama güçlü bir vitrin nasıl kurulur.',
    publishedDaysAgo: 4,
    bodyMd: `Sezon değiştikçe gardırop büyüyor, kombin yapması ise giderek zorlaşıyor. Kapsül gardırop tam da bu yorgunluğa cevap olarak doğdu: birbiriyle konuşan, az sayıda ama çok yönlü parçadan oluşan, sade bir vitrin.

## Neden kapsül gardırop?

Aynı palet üzerinde çalışan parçalar; sabah aynanın önünde harcanan zamanı yarıya indirir, valiz hazırlamayı çocuk oyuncağına çevirir. Üstelik bilinçli alımlar sayesinde uzun vadede bütçe de korunur.

### Temel parça listesi

- Beyaz ve siyah, kaliteli pamuk t-shirt
- İyi oturan bir denim ve klasik kesim siyah pantolon
- Tek renk, kruvaze olmayan bir blazer
- Trençkot ya da nötr renk yün palto
- Beyaz spor ayakkabı ve klasik bir bot

## Renk paleti

Akon Butik koleksiyonlarında nötr renkler her zaman omurgayı kurar: bej, ekru, koyu kahve, lacivert ve elbette siyah. Bu beşliye sezona göre tek bir vurgu rengi eklemek, gardırobu donuk hissettirmeden yeniliyor.

## Kapsül gardırobu canlı tutmak

Kapsül gardırobun sırrı statik kalmamasında. Sezon başında listenin yarısını gözden geçirin; bir parçayı emekliye ayırırken yerine geçeceği parçanın hangi üç kombinde rol alacağını kafanızda canlandırın. Aklınızda canlandıramıyorsanız o parçayı almayın.`,
  },
  {
    slug: 'sonbahar-2026-trendleri',
    titleTr: 'Sonbahar 2026 Trendleri: Toprak Tonları Geri Döndü',
    excerpt:
      'Sonbahar 2026 koleksiyonlarımızda öne çıkan toprak tonları, oversize siluetler ve kadife dokular.',
    coverUrl: '/uploads/seed/blog-2.jpg',
    categorySlug: 'trend',
    tagSlugs: ['trend', 'koleksiyon'],
    metaDescription:
      'Sonbahar 2026 modasında öne çıkan trendler ve Akon Butik koleksiyonundan kombin önerileri.',
    publishedDaysAgo: 9,
    bodyMd: `Bu sonbahar gardıroplar yine doğaya dönüyor. Toprak tonları, kadife dokular ve geniş siluetler defileleri olduğu kadar sokak modasını da şekillendiriyor.

## Öne çıkan üç renk

### Yanmış Karamel

Etek, blazer ya da uzun palto — yanmış karamel bu sezon kahveyi yumuşatıyor, beji daha sıcak hissettiriyor. Krem ve fildişiyle eşleştirildiğinde zarif bir kontrast veriyor.

### Yosun Yeşili

Klasik haki yerini doğrudan yosun yeşiline bırakıyor. Tek başına da, lacivert ile katmanlı kombinlerde de güçlü duruyor.

### Pas Kırmızısı

Kahverengiye yakın, gün ışığında neredeyse turuncuya dönen pas kırmızısı; aksesuar ya da örgü kazak olarak küçük dozlarda gardıroba güç katıyor.

## Doku ve siluet

Kadife yeniden moda. Ceket yerine yumuşak bir kadife pantolon ya da rahat kesim bir gömlek, kombini anında akşam yemeğine hazır hale getiriyor. Oversize blazerlar, dökümlü kumaşlardan dikilen geniş paça pantolonlarla dengeleniyor.

## Akon Butik vitrini

Yeni gelen koleksiyonumuzda yanmış karamel oversize blazer, yosun yeşili kaşmir kazak ve kadife yüksek bel pantolonu birlikte ya da ayrı ayrı stillemek mümkün. Kombin önerilerimizi Lookbook sayfasında bulabilirsiniz.`,
  },
  {
    slug: 'kumas-bakimi-101',
    titleTr: 'Kumaş Bakımı 101: Sevdiğiniz Parçaları Yıllarca Yaşatın',
    excerpt: 'Yün, ipek ve pamuk parçaları yıllarca ilk günkü gibi kullanmanın püf noktaları.',
    coverUrl: '/uploads/seed/blog-3.jpg',
    categorySlug: 'stil-rehberi',
    tagSlugs: ['bakim'],
    metaDescription:
      'Yün, ipek, kaşmir ve pamuk kumaşların bakımı için Akon Butik atölyesinden pratik ipuçları.',
    publishedDaysAgo: 14,
    bodyMd: `İyi bir parçayı satın almak işin yarısı; onu yıllarca yaşatmak ise bambaşka bir disiplin. Atölyemizden derlediğimiz pratik bakım önerilerini paylaşıyoruz.

## Yün ve kaşmir

Yün doğal olarak kendini temizleyen bir kumaş; her giyimden sonra fırçalamak çoğu zaman yıkamadan daha etkili. Yıkamak zorundaysanız soğuk suda, özel yün şampuanıyla elde yıkayın. Asla makinede sıkmayın; havluyla yastıklayıp düz zeminde kurutun.

### Kaşmir için ekstra

- Sezon sonunda mutlaka yıkayıp dolaba kaldırın
- Pamuklu kılıflarda saklayın, naylon torba dokuyu boğar
- Pilingleri özel kaşmir tarakla nazikçe alın

## İpek

İpek ışıkla doğrudan teması sevmez. Dolaba kaldırırken katlayarak değil, dökümünü bozmadan asarak saklayın. Lekelerde önce soğuk su, sonra çok az pH-nötr sabun.

## Pamuk ve denim

Denimi sık yıkamak rengini ve formunu hızla yıpratır. Akon Butik denim koleksiyonunda fırçalama + havalandırma rutinini öneriyoruz; gerçek yıkama 6-8 giyimden bir.

## Atölyemizden son not

Şüphe duyduğunuz her ürünü atölyeden geçirmeden önce etiketteki bakım sembollerini kontrol edin. Etiket gitmiş olsa bile dokunarak kumaşın türünü tanımak, ömrünü uzatmanın ilk adımı.`,
  },
  {
    slug: 'marka-hikayemiz',
    titleTr: 'Akon Butik’in Hikayesi: Küçük Bir Atölyeden Bugüne',
    excerpt:
      'Akon Butik nasıl doğdu, hangi değerleri taşıyor ve bugün koleksiyonlarımızı şekillendiren felsefe ne?',
    coverUrl: '/uploads/seed/blog-4.jpg',
    categorySlug: 'koleksiyon',
    tagSlugs: ['koleksiyon'],
    metaDescription:
      'Akon Butik’in kuruluş hikayesi, atölye geleneği ve sürdürülebilir üretim yaklaşımı.',
    publishedDaysAgo: 22,
    bodyMd: `Akon Butik, üç kuşaktır kumaşla iç içe yaşayan bir ailenin İstanbul'un Beyoğlu sırtlarındaki küçük atölyesinde başladı. Hikaye sadece kıyafet üretmekle ilgili değil; iyi bir parçanın insanı nasıl değiştirdiğini görmekle ilgili.

## Başlangıç

İlk koleksiyonumuz sadece on iki parçadan oluşuyordu. Hepsi aynı hayalin etrafında dönüyordu: zamansız, doğru kumaştan, üzerinde uzun düşünülmüş kıyafetler.

## Atölye geleneği

Bugün hala her koleksiyonun ilk numunesi atölyede el ile dikiliyor. Beden cetvelimiz fast-fashion ölçüleriyle değil, bizimle yıllardır çalışan terzilerin tecrübesiyle şekilleniyor. İyi bir blazer, omuzları taşıdığı kadar omuzlara yumuşak inebilmeli.

## Sürdürülebilirlik

- Sezon başına aşırı stok üretmiyoruz
- Kumaşlarımız öncelikli olarak Türkiye'de dokunuyor
- Ürün kartlarında kumaşın hem üretildiği yer hem de bakım önerisi yer alıyor

## Bugün

Bugün online vitrinden ulaşabildiğiniz Akon Butik, yıllar içinde büyürken atölye disiplinini bırakmadı. Her ürünün arkasında bir tasarımcı, bir kalıpçı ve bir terzinin imzası var.

## Ve siz

Bizi bugüne taşıyan asıl özne ise siz oldunuz. Müşteri yorumları, geri dönen iadeler, atölyeye gelen tadilat istekleri — hepsi bir sonraki koleksiyona yön veriyor.`,
  },
  {
    slug: 'is-toplantisindan-aksam-yemegine',
    titleTr: 'İş Toplantısından Akşam Yemeğine: Tek Kombinle Geçiş',
    excerpt:
      'Sabahki sunumdan akşam yemeğine, valizinize ek parça koymadan stil değiştirmenin yolları.',
    coverUrl: '/uploads/seed/blog-5.jpg',
    categorySlug: 'stil-rehberi',
    tagSlugs: ['kombin', 'lookbook'],
    metaDescription:
      'Office to evening: sade bir kombini akşama hazırlamak için Akon Butik’ten pratik dokunuşlar.',
    publishedDaysAgo: 28,
    bodyMd: `Yoğun günlerde gün ortasında eve uğrayıp kıyafet değiştirmek lüks. İyi haber: doğru parçalarla kurulan bir günlük kombin, üç küçük dokunuşla akşamı karşılayabiliyor.

## Temel: nötr ve klasik

Sabah toplantısı için lacivert ya da kömür gri bir blazer, beyaz ipek bir gömlek ve düz kesim siyah pantolondan oluşan klasik üçlü en güvenli başlangıç. Bu üçlü hem profesyonel hem yola gelirken yorulmuyor.

## Akşama dönüşüm

### 1. Gömleği aç

Üç düğmeyi açıp manşetleri bilek üstünde toparlamak, hava değişiminin en hızlı yolu.

### 2. Aksesuarı değiştir

Sabah saatten akşam taşa geçen tek bir kolye ya da minimal bir bileklik, kombinin tonunu otomatik olarak ayarlıyor.

### 3. Ayakkabıyı yenile

Klasik bir loafer'dan ince topuklu siyah bir sandalete geçmek, valize tek bir çift ayakkabı koymanızı sağlıyor.

## Ekstra not

Çantanızda taşıyabileceğiniz katlı bir ipek fular her zaman cebinizde bir akşam dokunuşu. Akon Butik ipek fular koleksiyonu, klasik motiflerden yola çıkarak modern paletle yeniden yorumlandı.`,
  },
  {
    slug: 'koleksiyon-arkasi-bahar-yaz-2026',
    titleTr: 'Koleksiyon Arkası: Bahar/Yaz 2026 Nasıl Doğdu?',
    excerpt:
      'Bahar/Yaz 2026 koleksiyonumuzu şekillendiren ilhamlar, kumaş seçimleri ve atölye notları.',
    coverUrl: '/uploads/seed/blog-6.jpg',
    categorySlug: 'koleksiyon',
    tagSlugs: ['koleksiyon', 'lookbook'],
    metaDescription:
      'Akon Butik Bahar/Yaz 2026 koleksiyonunun arkasındaki ilham, renk paleti ve kumaş tercihleri.',
    publishedDaysAgo: 36,
    bodyMd: `Her koleksiyon, atölyenin duvarına asılan ilk taslakla başlar. Bahar/Yaz 2026 için duvarımızdaki ilk görsel, Ege'de erken sabah saatlerinde çekilmiş bir fotoğraftı: ışık, çakıllar, ve denizden esen kumaş hışırtısı.

## İlham

- Akdeniz boyunca kuruyan keten kumaşların hareketi
- 70'lerin İtalyan stili minimal ama dökümlü kesimleri
- Alacakaranlığın hemen öncesindeki sıcak nötr palet

## Renk paleti

Krem, kum, açık deniz mavisi, zeytin yaprağı ve tek vurgu olarak yanık portakal. Beş renkle on dört parça çıkardık; her parça en az diğer ikisiyle konuşuyor.

## Kumaş seçimleri

Bu sezon iki kumaşın üzerinde uzun durduk:

### Yıkanmış Keten

Türkiye'de dokunan, taş yıkamayla yumuşatılmış keten — buruşmayı bir kusur değil, bir karakter olarak konumlandırdık.

### Hafif Yün-Pamuk Karışımı

Akşam serininde de kullanılabilecek, dökümünü kaybetmeyen bir karışım. Özellikle blazerlarda terzi memnuniyetini yükseltti.

## Lookbook çekimi

Lookbook'u yine doğal ışıkta çektik. Modeller hareket halinde — kumaşların hışırtısını fotoğrafa taşıyabilmek için. Yakında sitedeki Lookbook sayfasında karelerin tamamı yer alacak.`,
  },
  {
    slug: 'aksesuar-secimi-rehberi',
    titleTr: 'Aksesuar Seçimi Rehberi: Az Eklemenin Sanatı',
    excerpt:
      'Bir kombini abartmadan tamamlayan aksesuar seçimi nasıl yapılır? Atölyeden pratik notlar.',
    coverUrl: '/uploads/seed/blog-7.jpg',
    categorySlug: 'stil-rehberi',
    tagSlugs: ['kombin', 'trend'],
    metaDescription:
      'Aksesuar seçiminde abartmadan etkili olmanın püf noktaları ve sezonun öne çıkan parçaları.',
    publishedDaysAgo: 44,
    bodyMd: `İyi bir aksesuar bir kombini tamamlar; abartılı bir aksesuar ise tüm kombini gölgede bırakır. Aradaki sınır ince ama öğrenilebilir.

## Temel kural: tek bir odak noktası

Bir kombinde sadece bir aksesuar dikkat çekmeli. Eğer küpe iddialıysa kolyeyi sadeleştirin. Eğer çantanız renkli ise ayakkabınızı nötr tutun.

## Saat ve takı

### Sade kombin için

Tek bir altın halka kolye ya da minimal bir saat. Klasik kombinlerde "az ama doğru" en güçlü kombinasyon.

### Maksimal kombin için

Sade bir t-shirt + denim üstüne katmanlı kolyeler ya da statement bir küpe; günlük bir kombini birden tarz hale getiriyor.

## Çanta seçimi

Çanta hem fonksiyon hem ifade. Kapsül gardırop için iki çanta yeterli: sığ kapasiteli klasik bir el çantası ve günlük kullanıma uygun yapılandırılmış bir omuz çantası.

## Sezonun öne çıkanları

Akon Butik aksesuar koleksiyonunda bu sezon hayvansal motifler azaldı, yerini yumuşak geometrik desenlere bıraktı. Klasik altın kaplamalar yerini matlaştırılmış pirinç ve fırçalanmış gümüşe bıraktı.

## Son ipucu

Çıkarken bir aksesuar daha eklemek istediğinizde aynaya bakıp bunun yerine bir tane çıkarın. Çoğu zaman kombin daha iyi gözükür.`,
  },
  {
    slug: 'dijital-vitrin-arkasi',
    titleTr: 'Dijital Vitrin Arkası: Akon Butik Online Mağazası Nasıl Çalışıyor?',
    excerpt: 'Sipariş, stok, kargo — bir Akon Butik siparişinin perde arkasını birlikte gezelim.',
    coverUrl: '/uploads/seed/blog-8.jpg',
    categorySlug: 'koleksiyon',
    tagSlugs: ['koleksiyon'],
    metaDescription:
      'Akon Butik online mağazasında bir siparişin perde arkası: stok, kalite kontrol ve kargo süreci.',
    publishedDaysAgo: 55,
    bodyMd: `Vitrindeki bir parçanın size ulaşmasının arkasında, çoğu zaman görmediğiniz hızlı ama özenli bir süreç var. Akon Butik dijital vitrini nasıl çalışıyor, perde arkasını anlatalım.

## Stok ve depo

Atölyeden çıkan her parça, depodaki rafta yerini almadan önce ikinci bir kalite kontrolünden geçiyor. İplik kaçığı, dikiş düzgünlüğü, ütü kalitesi — hiçbiri online vitrine göndermeden önce kaçırılmıyor.

### Anlık stok bilgisi

Site üzerinde gördüğünüz beden bilgisi gerçek zamanlı: rafta tek bir parça kalmışsa, sistem onu gösterir. Aynı parçayı eş zamanlı sepete ekleyen iki müşteri olduğunda, ödemeyi önce tamamlayan kazanır; diğerine "tükendi" bilgisi anında düşer.

## Kalite kontrol ve paketleme

- Her sipariş, kargoya verilmeden önce katlama masasına geliyor
- Kumaş türüne göre ipek kağıt veya pamuk torba seçiliyor
- Kutuya küçük bir el yazısı not iliştiriliyor

## Kargo

Şu anda Türkiye geneline 1-3 iş günü içinde teslimat yapıyoruz. Yurtdışı gönderilerinde DHL Express ile çalışıyoruz; gümrük takibi tarafımızdan yürütülüyor.

## İade ve değişim

İade sürecini kasıtlı olarak basit tuttuk: 14 gün içinde, etiketleri kopmamış parçalar için ücretsiz iade. Kargo etiketinizi profil sayfasından üretebiliyorsunuz.

## Geri bildiriminiz

Bu yazılar geri bildirimle besleniyor. Süreçte takıldığınız bir nokta olduğunda atölyeye yazın — bir sonraki güncelleme gerçekten sizinle birlikte yazılıyor.`,
  },
];

async function main(): Promise<void> {
  console.log('Seeding blog content…');

  for (const cat of CATEGORIES) {
    await prisma.blogCategory.upsert({
      where: { slug: cat.slug },
      create: { slug: cat.slug, nameTr: cat.nameTr },
      update: { nameTr: cat.nameTr },
    });
  }

  for (const tag of TAGS) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      create: { slug: tag.slug, name: tag.name },
      update: { name: tag.name },
    });
  }

  for (const post of POSTS) {
    const category = await prisma.blogCategory.findUnique({
      where: { slug: post.categorySlug },
      select: { id: true },
    });
    if (!category) {
      throw new Error(`Seed referenced missing category: ${post.categorySlug}`);
    }

    const publishedAt = new Date(Date.now() - post.publishedDaysAgo * 24 * 60 * 60 * 1000);

    const tagConnect = await Promise.all(
      post.tagSlugs.map(async (slug) =>
        prisma.tag.upsert({
          where: { slug },
          create: { slug, name: slug },
          update: {},
          select: { id: true },
        }),
      ),
    );

    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      create: {
        slug: post.slug,
        titleTr: post.titleTr,
        excerpt: post.excerpt,
        bodyMd: post.bodyMd,
        coverUrl: post.coverUrl,
        metaDescription: post.metaDescription,
        publishedAt,
        category: { connect: { id: category.id } },
        tags: { connect: tagConnect.map((t) => ({ id: t.id })) },
      },
      update: {
        titleTr: post.titleTr,
        excerpt: post.excerpt,
        bodyMd: post.bodyMd,
        coverUrl: post.coverUrl,
        metaDescription: post.metaDescription,
        publishedAt,
        category: { connect: { id: category.id } },
        // `set` clears the join table first so re-running the seed never
        // accumulates stale tags from earlier revisions.
        tags: { set: tagConnect.map((t) => ({ id: t.id })) },
      },
    });
  }

  const total = await prisma.blogPost.count();
  console.log(
    `Blog seed done — ${String(CATEGORIES.length)} categories, ${String(TAGS.length)} tags, ${String(POSTS.length)} posts. Total posts in db: ${String(total)}.`,
  );
}

main()
  .catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
