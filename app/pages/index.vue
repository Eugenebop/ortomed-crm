<template>
  <div class="site">

    <!-- NAV -->
    <nav class="nav">
      <a href="/" class="nav-logo">
        <span class="logo-text">ORTOMED</span>
        <span class="logo-sub">ортопедический центр · Батуми</span>
      </a>
      <div class="nav-links">
        <a href="#services">Услуги</a>
        <a href="#team">Врачи</a>
        <a href="#prices">Цены</a>
        <a href="#contacts">Контакты</a>
      </div>
      <div class="nav-actions">
        <template v-if="user">
          <div class="user-menu" @click="menuOpen = !menuOpen">
            <span class="user-name">{{ patientName }}</span>
            <span class="chevron" :class="{ open: menuOpen }">&#8964;</span>
            <div class="dropdown" v-if="menuOpen">
              <a href="/lk">Личный кабинет</a>
              <button @click="logout">Выйти</button>
            </div>
          </div>
        </template>
        <template v-else>
          <a href="/login" class="btn-nav">Войти в кабинет</a>
        </template>
      </div>
      <button class="burger" @click="mobileOpen = !mobileOpen">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <!-- MOBILE MENU -->
    <div class="mobile-menu" :class="{ open: mobileOpen }">
      <a href="#services" @click="mobileOpen = false">Услуги</a>
      <a href="#team" @click="mobileOpen = false">Врачи</a>
      <a href="#prices" @click="mobileOpen = false">Цены</a>
      <a href="#contacts" @click="mobileOpen = false">Контакты</a>
      <a href="/login" class="btn-mobile">Личный кабинет</a>
    </div>

    <!-- HERO -->
    <section class="hero">
      <div class="hero-content">
        <p class="hero-tag">Батуми · Грузия</p>
        <h1 class="hero-title">Ортопедия<br><em>нового уровня</em></h1>
        <p class="hero-desc">Диагностика и лечение заболеваний опорно-двигательного аппарата. Индивидуальный подход к каждому пациенту.</p>
        <div class="hero-btns">
          <a href="https://wa.me/995599112233" class="btn-primary" target="_blank">Записаться на приём</a>
          <a href="#services" class="btn-ghost">Наши услуги</a>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-n">5+</span>
            <span class="stat-l">специалистов</span>
          </div>
          <div class="stat-div"></div>
          <div class="stat">
            <span class="stat-n">1000+</span>
            <span class="stat-l">пациентов</span>
          </div>
          <div class="stat-div"></div>
          <div class="stat">
            <span class="stat-n">10+</span>
            <span class="stat-l">лет опыта</span>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-circle">
          <img src="/images/hero-doctor.jpg" alt="Врач ортопед" class="hero-img" />
        </div>
        <div class="floating-card card-1">
          <span class="fc-icon">✓</span>
          <div>
            <p class="fc-title">Бесплатная консультация</p>
            <p class="fc-sub">при первом обращении</p>
          </div>
        </div>
        <div class="floating-card card-2">
          <span class="fc-icon">📋</span>
          <div>
            <a href="/login" class="fc-title fc-link">Личный кабинет</a>
<!--            <p class="fc-title">Личный кабинет</p>-->
            <p class="fc-sub">онлайн-запись и история</p>
          </div>
        </div>
      </div>
    </section>

    <!-- УСЛУГИ -->
    <section class="services" id="services">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Что мы лечим</span>
          <h2>Услуги клиники</h2>
        </div>
        <div class="services-grid">
          <div class="service-card" v-for="s in services" :key="s.title">
            <div class="service-icon">{{ s.icon }}</div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
            <a href="https://wa.me/995599112233" class="service-link" target="_blank">Записаться →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ПОЧЕМУ МЫ -->
    <section class="why">
      <div class="container">
        <div class="why-grid">
          <div class="why-text">
            <span class="section-tag">Наш подход</span>
            <h2>Почему выбирают Ortomed</h2>
            <p class="why-desc">Мы объединяем современные методы диагностики с индивидуальным подходом к каждому пациенту.</p>
          </div>
          <div class="why-items">
            <div class="why-item" v-for="w in whys" :key="w.title">
              <span class="why-num">{{ w.num }}</span>
              <div>
                <h4>{{ w.title }}</h4>
                <p>{{ w.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- КОМАНДА -->
    <section class="team" id="team">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Профессионалы</span>
          <h2>Наши специалисты</h2>
        </div>
        <div class="team-grid">
          <div class="team-card" v-for="t in team" :key="t.name">
            <div class="team-photo-wrap">
              <img :src="t.photo" :alt="t.name" class="team-photo" />
            </div>
            <div class="team-info">
              <h3>{{ t.name }}</h3>
              <p class="team-role">{{ t.role }}</p>
              <p class="team-desc">{{ t.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ЦЕНЫ -->
    <section class="prices" id="prices">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Прозрачно и честно</span>
          <h2>Цены на услуги</h2>
        </div>
        <div class="prices-table">
          <div class="price-row" v-for="p in prices" :key="p.name">
            <div class="price-info">
              <p class="price-name">{{ p.name }}</p>
              <p class="price-sub" v-if="p.sub">{{ p.sub }}</p>
            </div>
            <span class="price-val">{{ p.price }}</span>
          </div>
        </div>
        <div class="prices-note">
          Точная стоимость уточняется на консультации. Первый визит — бесплатно.
        </div>
      </div>
    </section>

    <!-- КОНТАКТЫ -->
    <section class="contacts" id="contacts">
      <div class="container">
        <div class="contacts-grid">
          <div class="contacts-info">
            <span class="section-tag">Найти нас</span>
            <h2>Контакты</h2>
            <div class="contact-items">
              <div class="contact-item">
                <span class="ci-icon">📍</span>
                <div>
                  <p class="ci-label">Адрес</p>
                  <p class="ci-val">Батуми, ул. Селима Химшиашвили, 40</p>
                </div>
              </div>
              <div class="contact-item">
                <span class="ci-icon">📞</span>
                <div>
                  <p class="ci-label">Телефон</p>
                  <a href="tel:+995 557 134 342" class="ci-val ci-link">+995 591 155 993</a>
                </div>
              </div>
              <div class="contact-item">
                <span class="ci-icon">🕐</span>
                <div>
                  <p class="ci-label">Часы работы</p>
                  <p class="ci-val">Пн–Сб: 10:00 – 19:00</p>
                  <p class="ci-val">Воскресенье — выходной</p>
                </div>
              </div>
              <div class="contact-item">
                <span class="ci-icon">💬</span>
                <div>
                  <p class="ci-label">WhatsApp</p>
                  <a href="https://wa.me/995591155993" class="ci-val ci-link" target="_blank">Написать сообщение</a>
                </div>
              </div>
            </div>
            <a href="https://wa.me/995591155993" class="btn-primary" target="_blank" style="margin-top: 2rem; display: inline-block;">
              Записаться онлайн
            </a>
          </div>
          <div class="map-wrap">
            <iframe
                src="https://maps.app.goo.gl/VTeYifr6DjFBtNbv9"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container footer-inner">
        <div>
          <p class="footer-logo">ORTOMED</p>
          <p class="footer-sub">Ортопедический центр · Батуми</p>
        </div>
        <div class="footer-links">
          <a href="#services">Услуги</a>
          <a href="#team">Врачи</a>
          <a href="#prices">Цены</a>
          <a href="#contacts">Контакты</a>
          <a href="/login">Личный кабинет</a>
        </div>
        <p class="footer-copy">© 2024 Ortomed. Все права защищены.</p>
      </div>
    </footer>

  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const patientName = ref('')
const menuOpen = ref(false)
const mobileOpen = ref(false)

onMounted(async () => {
  if (user.value) {
    const { data } = await supabase
        .from('patients')
        .select('name')
        .eq('user_id', user.value.id)
        .single()
    if (data) patientName.value = data.name.split(' ')[0]
  }
})

async function logout() {
  await supabase.auth.signOut()
  menuOpen.value = false
}

const services = [
  {
    icon: '🦴',
    title: 'Приём травматолога-ортопеда',
    desc: 'Консультация специалиста по заболеваниям опорно-двигательного аппарата. Диагностика и план лечения.',
  },
  {
    icon: '👣',
    title: 'Диагностика состояния стоп',
    desc: 'Плантоскопия, анализ походки, выявление деформаций. Рекомендации по коррекции.',
  },
  {
    icon: '🏃',
    title: 'Диагностика осанки',
    desc: 'Оценка состояния позвоночника у детей и взрослых. Раннее выявление нарушений.',
  },
  {
    icon: '🧒',
    title: 'Коррекция нарушений осанки у детей',
    desc: 'Индивидуальные программы лечебной физкультуры и физиотерапии для детей всех возрастов.',
  },
  {
    icon: '🛠️',
    title: 'Индивидуальные ортопедические стельки',
    desc: 'Изготовление стелек по слепку стопы с учётом особенностей биомеханики конкретного пациента.',
  },
  {
    icon: '💅',
    title: 'Лечебный педикюр',
    desc: 'Медицинский педикюр при вросшем ногте, мозолях, трещинах и грибковых поражениях.',
  },
]

const whys = [
  {
    num: '01',
    title: 'Первичная консультация бесплатно',
    text: 'Вы можете прийти на первичный приём и получить заключение специалиста без оплаты.',
  },
  {
    num: '02',
    title: 'Высокая квалификация',
    text: 'Наши врачи имеют профессиональные сертификаты и постоянно повышают квалификацию.',
  },
  {
    num: '03',
    title: 'Тёплая атмосфера',
    text: 'Мы работаем так, чтобы каждый пациент чувствовал себя комфортно и получал нужную помощь.',
  },
  {
    num: '04',
    title: 'Добросовестность',
    text: 'Мы не назначаем лишних процедур. Только необходимое лечение с обоснованием.',
  },
]

const team = [
  {
    name: 'Илхом Шаропов',
    role: 'Травматолог-ортопед',
    desc: 'Специализируется на профилактике, диагностике и лечении патологий опорно-двигательного аппарата у детей и взрослых.',
    photo: '/images/ilkhom.jpg',
  },
  {
    name: 'Ирина Цивцивадзе',
    role: 'Специалист',
    desc: 'Работает с нарушениями осанки и реабилитацией после травм. Индивидуальный подход к каждому пациенту.',
    photo: '/images/irina.jpg',
  },
  {
    name: 'Юлия Шапкина',
    role: 'Специалист',
    desc: 'Занимается лечебной физкультурой и коррекцией нарушений у детей. Имеет большой практический опыт.',
    photo: '/images/yulia.jpg',
  },
  {
    name: 'Джульетта Хачатурян',
    role: 'Специалист',
    desc: 'Физиотерапия, массаж, работа с хроническими заболеваниями опорно-двигательного аппарата.',
    photo: '/images/julietta.jpg',
  },
]

const prices = [
  { name: 'Приём травматолога-ортопеда Шаропова Илхома', sub: 'Консультация', price: '50 ₾' },
  { name: 'Диагностика состояния осанки', sub: null, price: '30 ₾' },
  { name: 'Диагностика состояния стоп', sub: null, price: 'от 0 ₾' },
  { name: 'Коррекция нарушений осанки у детей', sub: null, price: '50–100 ₾' },
  { name: 'Изготовление индивидуальных ортопедических стелек', sub: null, price: '200–500 ₾' },
  { name: 'Лечебный педикюр', sub: null, price: '30–40 ₾' },
]
</script>

<style scoped>
/* ─── BASE ─────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.site {
  font-family: 'Georgia', serif;
  color: #1a1a1a;
  background: #fafaf8;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ─── NAV ─────────────────────────────────── */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 3rem;
  background: rgba(250, 250, 248, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.nav-logo {
  display: flex;
  flex-direction: column;
  text-decoration: none;
}

.logo-text {
  font-family: 'Georgia', serif;
  font-size: 1.4rem;
  letter-spacing: 0.15em;
  color: #1a1a1a;
  font-weight: 400;
}

.logo-sub {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: #777;
  font-family: sans-serif;
  margin-top: 1px;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
}

.nav-links a {
  text-decoration: none;
  color: #444;
  font-family: sans-serif;
  font-size: 0.875rem;
  letter-spacing: 0.03em;
  transition: color 0.2s;
}

.nav-links a:hover { color: #2d6a4f; }

.btn-nav {
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-decoration: none;
  border: 1px solid #2d6a4f;
  color: #2d6a4f;
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  transition: all 0.2s;
}

.btn-nav:hover {
  background: #2d6a4f;
  color: #fff;
}

.user-menu {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: sans-serif;
  font-size: 0.875rem;
}

.chevron { font-size: 1.2rem; transition: transform 0.2s; }
.chevron.open { transform: rotate(180deg); }

.dropdown {
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 12px;
  padding: 0.5rem;
  min-width: 180px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
}

.dropdown a, .dropdown button {
  display: block;
  width: 100%;
  padding: 0.6rem 1rem;
  text-decoration: none;
  color: #333;
  font-size: 0.875rem;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  border-radius: 8px;
  transition: background 0.15s;
  font-family: sans-serif;
}

.dropdown a:hover, .dropdown button:hover { background: #f5f5f3; }

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.burger span {
  display: block;
  width: 24px;
  height: 2px;
  background: #333;
  border-radius: 2px;
  transition: all 0.3s;
}

/* ─── MOBILE MENU ─────────────────────────── */
.mobile-menu {
  display: none;
  position: fixed;
  top: 70px; left: 0; right: 0;
  z-index: 99;
  background: #fff;
  padding: 1.5rem 2rem;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  transform: translateY(-10px);
  opacity: 0;
  transition: all 0.3s;
  pointer-events: none;
}
.mobile-menu.open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}
.mobile-menu a {
  text-decoration: none;
  color: #333;
  font-family: sans-serif;
  font-size: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0ee;
}
.btn-mobile {
  margin-top: 0.5rem;
  display: inline-block;
  background: #2d6a4f;
  color: #fff !important;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  text-align: center;
}

/* ─── HERO ────────────────────────────────── */
.hero {
  min-height: 100vh;
  padding-top: 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
}

.hero-tag {
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  color: #2d6a4f;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: #111;
}

.hero-title em {
  font-style: italic;
  color: #2d6a4f;
}

.hero-desc {
  font-family: sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  max-width: 480px;
  margin-bottom: 2.5rem;
}

.hero-btns {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.btn-primary {
  font-family: sans-serif;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  text-decoration: none;
  background: #2d6a4f;
  color: #fff;
  padding: 0.85rem 2rem;
  border-radius: 50px;
  transition: all 0.2s;
  display: inline-block;
}
.btn-primary:hover { background: #1b4332; transform: translateY(-1px); }

.btn-ghost {
  font-family: sans-serif;
  font-size: 0.875rem;
  text-decoration: none;
  color: #333;
  padding: 0.85rem 2rem;
  border-radius: 50px;
  border: 1px solid rgba(0,0,0,0.2);
  transition: all 0.2s;
}
.btn-ghost:hover { border-color: #2d6a4f; color: #2d6a4f; }

.hero-stats {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.stat { display: flex; flex-direction: column; }
.stat-n {
  font-size: 1.6rem;
  font-weight: 400;
  color: #111;
}
.stat-l {
  font-family: sans-serif;
  font-size: 0.75rem;
  color: #888;
  letter-spacing: 0.03em;
}
.stat-div {
  width: 1px;
  height: 40px;
  background: rgba(0,0,0,0.15);
}

.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 540px;
}

.hero-circle {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  overflow: hidden;
  background: #e8f4f0;
  border: 1px solid rgba(45,106,79,0.2);
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.floating-card {
  position: absolute;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 16px;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.07);
  font-family: sans-serif;
}

.card-1 { bottom: 60px; left: -20px; }
.card-2 { top: 60px; right: -20px; }

.fc-icon { font-size: 1.5rem; }
.fc-title { font-size: 0.85rem; font-weight: 600; color: #222; }
.fc-sub { font-size: 0.75rem; color: #888; margin-top: 2px; }

/* ─── SECTION COMMONS ─────────────────────── */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-tag {
  display: inline-block;
  font-family: sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #2d6a4f;
  margin-bottom: 0.75rem;
}

.section-header h2 {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 400;
  color: #111;
}

/* ─── SERVICES ────────────────────────────── */
.services {
  padding: 7rem 0;
  background: #fff;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.service-card {
  padding: 2rem;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 20px;
  background: #fafaf8;
  transition: all 0.3s;
}
.service-card:hover {
  border-color: rgba(45,106,79,0.3);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.06);
}

.service-icon { font-size: 2.5rem; margin-bottom: 1.25rem; }

.service-card h3 {
  font-size: 1.1rem;
  font-weight: 400;
  margin-bottom: 0.75rem;
  color: #111;
}

.service-card p {
  font-family: sans-serif;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1.5rem;
}

.service-link {
  font-family: sans-serif;
  font-size: 0.85rem;
  color: #2d6a4f;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 0.02em;
}

/* ─── WHY ─────────────────────────────────── */
.why {
  padding: 7rem 0;
  background: #f0f7f4;
}

.why-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 6rem;
  align-items: start;
}

.why-text h2 {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 400;
  color: #111;
  margin: 0.75rem 0 1.25rem;
}

.why-desc {
  font-family: sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  color: #666;
}

.why-items { display: flex; flex-direction: column; gap: 2rem; }

.why-item {
  display: flex;
  gap: 1.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
.why-item:last-child { border-bottom: none; padding-bottom: 0; }

.why-num {
  font-size: 1.5rem;
  color: rgba(45,106,79,0.3);
  font-style: italic;
  flex-shrink: 0;
  line-height: 1;
  padding-top: 4px;
}

.why-item h4 {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0.4rem;
  color: #111;
}

.why-item p {
  font-family: sans-serif;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #666;
}

/* ─── TEAM ────────────────────────────────── */
.team {
  padding: 7rem 0;
  background: #fff;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.team-card {
  text-align: center;
}

.team-photo-wrap {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1.25rem;
  background: #e8f4f0;
  border: 3px solid rgba(45,106,79,0.15);
}

.team-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-card h3 {
  font-size: 1.05rem;
  font-weight: 400;
  margin-bottom: 0.25rem;
  color: #111;
}

.team-role {
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  color: #2d6a4f;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.team-desc {
  font-family: sans-serif;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #777;
}

/* ─── PRICES ──────────────────────────────── */
.prices {
  padding: 7rem 0;
  background: #1b4332;
}

.prices .section-tag { color: rgba(255,255,255,0.6); }
.prices .section-header h2 { color: #fff; }

.prices-table {
  max-width: 700px;
  margin: 0 auto;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  gap: 2rem;
}

.price-name {
  font-size: 1rem;
  color: #fff;
  font-weight: 400;
}

.price-sub {
  font-family: sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.5);
  margin-top: 0.2rem;
}

.price-val {
  font-family: sans-serif;
  font-size: 1.1rem;
  color: #52b788;
  font-weight: 600;
  white-space: nowrap;
}

.prices-note {
  font-family: sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.4);
  text-align: center;
  margin-top: 3rem;
}

/* ─── CONTACTS ────────────────────────────── */
.contacts {
  padding: 7rem 0;
  background: #fafaf8;
}

.contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
}

.contacts-info h2 {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 400;
  color: #111;
  margin: 0.75rem 0 2rem;
}

.contact-items { display: flex; flex-direction: column; gap: 1.5rem; }

.contact-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.ci-icon { font-size: 1.5rem; flex-shrink: 0; }
.ci-label { font-family: sans-serif; font-size: 0.75rem; letter-spacing: 0.1em; color: #aaa; text-transform: uppercase; margin-bottom: 0.25rem; }
.ci-val { font-size: 1rem; color: #222; }
.ci-link { text-decoration: none; color: #2d6a4f; }
.ci-link:hover { text-decoration: underline; }

.map-wrap {
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.08);
}

/* ─── FOOTER ──────────────────────────────── */
.footer {
  background: #111;
  padding: 3rem 0;
}

.footer-inner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2rem;
}

.footer-logo {
  font-family: 'Georgia', serif;
  font-size: 1.2rem;
  letter-spacing: 0.15em;
  color: #fff;
}

.footer-sub {
  font-family: sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: #666;
  margin-top: 4px;
}

.footer-links {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.footer-links a {
  font-family: sans-serif;
  font-size: 0.8rem;
  color: #666;
  text-decoration: none;
  letter-spacing: 0.03em;
  transition: color 0.2s;
}
.footer-links a:hover { color: #fff; }

.footer-copy {
  font-family: sans-serif;
  font-size: 0.75rem;
  color: #444;
}

/* ─── RESPONSIVE ──────────────────────────── */
@media (max-width: 900px) {
  .nav-links, .nav-actions { display: none; }
  .burger { display: flex; }
  .mobile-menu { display: flex; }

  .hero {
    grid-template-columns: 1fr;
    padding-top: 100px;
    padding-bottom: 4rem;
    text-align: center;
  }
  .hero-desc { margin-left: auto; margin-right: auto; }
  .hero-btns { justify-content: center; }
  .hero-stats { justify-content: center; }
  .hero-visual { display: none; }

  .services-grid { grid-template-columns: 1fr; }
  .why-grid { grid-template-columns: 1fr; gap: 3rem; }
  .team-grid { grid-template-columns: 1fr 1fr; }
  .contacts-grid { grid-template-columns: 1fr; }
  .map-wrap { height: 300px; }

  .footer-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .footer-links { justify-content: center; }

  .nav { padding: 1rem 1.5rem; }
}

@media (max-width: 600px) {
  .team-grid { grid-template-columns: 1fr; }
  .hero-stats { flex-direction: column; gap: 1rem; }
  .stat-div { width: 40px; height: 1px; }
}
</style>