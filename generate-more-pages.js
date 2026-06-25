// Генератор 100+ SEO страниц под конкретные запросы
const fs = require('fs');
const path = require('path');
const targetUrl = 'https://it-lager-almaty.vercel.app';
const phone = '+7 747 070 1495';

const queries = [
  'летний лагерь для детей алматы',
  'детский лагерь алматы лето',
  'городской лагерь для детей алматы',
  'дневной лагерь для детей алматы',
  'летний лагерь для подростков алматы',
  'куда отдать ребенка летом в алматы',
  'чем занять ребенка летом в алматы',
  'чем занять подростка летом',
  'развивающий лагерь для детей алматы',
  'образовательный лагерь для детей алматы',
  'лагерь для школьников алматы',
  'летний лагерь для школьников алматы',
  'детский лагерь без ночевки алматы',
  'лагерь с питанием для детей алматы',
  'безопасный детский лагерь алматы',
  'лагерь для детей 8 лет алматы',
  'лагерь для детей 9 лет алматы',
  'лагерь для детей 10 лет алматы',
  'лагерь для детей 11 лет алматы',
  'лагерь для детей 12 лет алматы',
  'лагерь для детей 13 лет алматы',
  'лагерь для подростков 14 лет алматы',
  'лагерь для подростков 15 лет алматы',
  'лагерь для подростков 16 лет алматы',
  'лагерь для подростков 17 лет алматы',
  'it лагерь для детей алматы',
  'айти лагерь для детей алматы',
  'it лагерь алматы',
  'айти лагерь алматы',
  'компьютерный лагерь для детей алматы',
  'технологический лагерь для детей алматы',
  'лагерь программирования для детей алматы',
  'программирование для детей летом алматы',
  'курсы программирования для детей летом',
  'летние курсы программирования для детей алматы',
  'программирование для подростков алматы лето',
  'coding camp almaty',
  'it camp almaty kids',
  'tech camp for kids almaty',
  'summer camp almaty kids',
  'ai лагерь для детей алматы',
  'ии лагерь для детей алматы',
  'лагерь искусственного интеллекта для детей',
  'лагерь нейросетей для детей алматы',
  'нейросети для детей алматы',
  'обучение нейросетям для детей алматы',
  'chatgpt для детей алматы',
  'курсы chatgpt для детей',
  'искусственный интеллект для детей алматы',
  'ai для подростков алматы',
  'ии для подростков алматы',
  'ai camp almaty',
  'лагерь с искусственным интеллектом алматы',
  'лагерь по нейросетям летом',
  'курсы ai для школьников алматы',
  'робототехника лагерь алматы',
  'летний лагерь робототехника алматы',
  'робототехника для детей летом алматы',
  'gamedev лагерь для детей алматы',
  'game development для детей алматы',
  'создание игр для детей алматы',
  'лагерь по созданию игр алматы',
  'python для детей летом алматы',
  'python лагерь для детей алматы',
  'figma для детей алматы',
  'дизайн лагерь для детей алматы',
  'креативный лагерь для детей алматы',
  'медиа лагерь для детей алматы',
  'лагерь по созданию контента для детей',
  'видеомонтаж для детей алматы лето',
  'дизайн мышление для детей алматы',
  'стартап лагерь для детей алматы',
  'предпринимательский лагерь для детей алматы',
  'бизнес лагерь для подростков алматы',
  'стартапы для школьников алматы',
  'лагерь где дети делают проекты',
  'проектный лагерь для детей алматы',
  'лагерь с mvp для подростков',
  'лагерь где ребенок создаст приложение',
  'лагерь где ребенок создаст игру',
  'лагерь с защитой проекта для детей',
  'demo day для детей алматы',
  'публичные выступления для детей алматы',
  'soft skills лагерь для детей алматы',
  'лидерский лагерь для подростков алматы',
  'лагерь развития уверенности у детей',
  'профориентационный лагерь для подростков алматы',
  'профориентация для детей летом алматы',
  'профессии будущего для детей алматы',
  'как выбрать профессию ребенку',
  'как развить сильные стороны ребенка',
  'куда отдать ребенка если он любит компьютер',
  'ребенок много сидит в телефоне что делать',
  'как заинтересовать ребенка программированием',
  'как ребенку попробовать it',
  'полезный лагерь для подростка',
  'летние активности для детей алматы',
  'кружки для детей летом алматы',
  'летняя школа для детей алматы',
  'летняя академия для детей алматы',
];

// Transliteration map
const tr = {
  'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'y',
  'к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f',
  'х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',
  ' ':'-','?':'','!':'','"':'',',':'','.':'',':':''
};

function slugify(text) {
  let s = text.toLowerCase();
  let r = '';
  for (const c of s) r += tr[c] || c;
  r = r.replace(/-+/g, '-').replace(/^-|-$/g, '');
  // Remove any remaining non-latin/non-digit/non-hyphen chars (soft signs etc.)
  r = r.replace(/[^a-z0-9-]/g, '');
  return r.replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function makeTitle(query) {
  // Capitalize first letter
  return query.charAt(0).toUpperCase() + query.slice(1);
}

// Generate descriptions based on query keywords
function makeDesc(query) {
  const q = query.toLowerCase();
  if (q.includes('летний лагерь') || q.includes('детский лагерь')) {
    return `🏕️ ${query.charAt(0).toUpperCase() + query.slice(1)}. IT-лагерь Jedai Creative Academy: программирование, AI, робототехника. 2 недели, питание, присмотр. Запись через WhatsApp ${phone}.`;
  }
  if (q.includes('ai') || q.includes('ии') || q.includes('искусственный') || q.includes('нейросет') || q.includes('chatgpt')) {
    return `🤖 ${query.charAt(0).toUpperCase() + query.slice(1)}. IT-лагерь Jedai Creative Academy: AI, нейросети, ChatGPT, Midjourney для детей 8–17 лет. Запись через WhatsApp ${phone}.`;
  }
  if (q.includes('программирова') || q.includes('python') || q.includes('coding') || q.includes('it camp') || q.includes('айти')) {
    return `💻 ${query.charAt(0).toUpperCase() + query.slice(1)}. Jedai Creative Academy: обучение программированию, создание проектов. Для детей 8–17 лет в Алматы. Запись через WhatsApp ${phone}.`;
  }
  if (q.includes('робототех') || q.includes('tech')) {
    return `🔧 ${query.charAt(0).toUpperCase() + query.slice(1)}. Jedai Creative Academy: робототехника, Arduino, STEM. Для детей 8–17 лет в Алматы. Запись через WhatsApp ${phone}.`;
  }
  if (q.includes('игр') || q.includes('gamedev') || q.includes('game')) {
    return `🎮 ${query.charAt(0).toUpperCase() + query.slice(1)}. Jedai Creative Academy: создание игр на Unity и Godot. Для детей 8–17 лет в Алматы. Запись через WhatsApp ${phone}.`;
  }
  if (q.includes('старта') || q.includes('бизнес') || q.includes('предпринима') || q.includes('mvp')) {
    return `🚀 ${query.charAt(0).toUpperCase() + query.slice(1)}. Jedai Creative Academy: стартапы, предпринимательство, создание MVP. Для подростков в Алматы. Запись через WhatsApp ${phone}.`;
  }
  if (q.includes('дизайн') || q.includes('figma') || q.includes('креатив') || q.includes('медиа') || q.includes('контент') || q.includes('видеомонтаж')) {
    return `🎨 ${query.charAt(0).toUpperCase() + query.slice(1)}. Jedai Creative Academy: дизайн, Figma, медиа, креатив. Для детей 8–17 лет в Алматы. Запись через WhatsApp ${phone}.`;
  }
  if (q.includes('профориента') || q.includes('професс') || q.includes('выбрать професси') || q.includes('сильные стороны')) {
    return `🎯 ${query.charAt(0).toUpperCase() + query.slice(1)}. Jedai Creative Academy: профориентация, карта профессий будущего, soft skills assessment. Запись через WhatsApp ${phone}.`;
  }
  if (q.includes('куда отдать') || q.includes('чем занять') || q.includes('компьютер') || q.includes('телефон') || q.includes('заинтересовать')) {
    return `❓ ${query.charAt(0).toUpperCase() + query.slice(1)}. IT-лагерь Jedai Creative Academy в Алматы: полезный досуг, программирование, AI, новые друзья. Запись через WhatsApp ${phone}.`;
  }
  if (q.includes('лагерь для') && (q.includes('8 лет') || q.includes('9 лет') || q.includes('10 лет') || q.includes('11 лет') || q.includes('12 лет') || q.includes('13 лет'))) {
    return `👶 ${query.charAt(0).toUpperCase() + query.slice(1)}. IT-лагерь Jedai Creative Academy: программирование, AI, творчество. Безопасно, питание, присмотр. Запись через WhatsApp ${phone}.`;
  }
  if (q.includes('подростк') || q.includes('14 лет') || q.includes('15 лет') || q.includes('16 лет') || q.includes('17 лет')) {
    return `🧑 ${query.charAt(0).toUpperCase() + query.slice(1)}. IT-лагерь Jedai Creative Academy: стартапы, AI, профориентация. Для подростков в Алматы. Запись через WhatsApp ${phone}.`;
  }
  if (q.includes('soft skills') || q.includes('публич') || q.includes('лидер') || q.includes('уверен')) {
    return `🌟 ${query.charAt(0).toUpperCase() + query.slice(1)}. Jedai Creative Academy: soft skills, публичные выступления, лидерство. Для детей 8–17 лет в Алматы. Запись через WhatsApp ${phone}.`;
  }
  return `✅ ${query.charAt(0).toUpperCase() + query.slice(1)}. IT-лагерь Jedai Creative Academy для детей 8–17 лет в Алматы. Программирование, AI, проекты. Запись через WhatsApp ${phone}.`;
}

function makeKeywords(query) {
  const slug = slugify(query);
  // Build keywords from the query itself plus generics
  const parts = query.split(' ');
  const kw = [query];
  // Add shorter variants
  if (parts.length > 2) {
    kw.push(parts.slice(0, 3).join(' '));
    kw.push(parts.slice(-3).join(' '));
  }
  kw.push(query.replace('алматы', 'в алматы'));
  kw.push(`it ${query}`);
  kw.push(`jedai ${query}`);
  return [...new Set(kw)].join(', ');
}

const dir = path.dirname(process.argv[1]);

queries.forEach((q, i) => {
  const slug = slugify(q);
  const title = makeTitle(q);
  const desc = makeDesc(q).replace(/^[^\s]+\s/, ''); // strip emoji prefix
  const kw = makeKeywords(q);

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Jedai Creative Academy</title>
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="${kw}" />
  <link rel="canonical" href="${targetUrl}" />
  <meta name="robots" content="index, follow" />
  <meta name="geo.region" content="KZ-ALA" />
  <meta name="geo.placename" content="Almaty" />
  <meta name="format-detection" content="telephone=yes" />
  <meta property="og:locale" content="ru_KZ" />
  <meta property="og:site_name" content="Jedai Creative Academy" />
  <meta property="og:url" content="${targetUrl}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta http-equiv="refresh" content="0; url=${targetUrl}" />
  <script>location.href="${targetUrl}"</script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Jedai Creative Academy — ${title}",
    "description": "${desc}",
    "provider": {
      "@type": "Organization",
      "name": "Jedai Creative Academy",
      "telephone": "+77470701495",
      "areaServed": "Almaty, Kazakhstan"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Almaty",
      "addressCountry": "KZ"
    }
  }
  </script>
</head>
<body>
  <p>Jedai Creative Academy — ${title}. Перейдите на <a href="${targetUrl}">главную страницу</a>.</p>
  <p>Запись через WhatsApp: <a href="https://wa.me/77470701495?text=Здравствуйте!%20Хочу%20записать%20ребёнка%20в%20Jedai%20Creative%20Academy">${phone}</a></p>
</body>
</html>`;

  const filePath = path.join(dir, slug + '.html');
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`[${i+1}/${queries.length}] ${slug}.html`);
});

console.log(`\n✅ ${queries.length} pages generated!`);
