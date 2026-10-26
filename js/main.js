const fallbackContent = {
  tagLine: 'Belajar coding dengan tenang, bertanya dengan nyaman, dan terus berkembang.',
  note: 'Buat yang baru terjun ke dunia pemrograman, sering-sering bertanya aja, nanti bakal dijawab. Jangan takut bertanya ya!',
  rules: [
    'Dilarang rasis dan diskriminasi.',
    'Dilarang konten sensitif (pornografi, pedofilia, dan sejenisnya).',
    'Promosi maksimal 1x sehari.',
    'Jangan menambahkan bot ke grup tanpa izin admin.',
    'Jangan cuekin orang yang lagi butuh bantuan.',
    'Utamakan sopan santun.'
  ],
  faq: [
    {
      question: 'Boleh gabung kalau belum bisa ngoding?',
      answer:
        'Boleh banget. CalmDev memang dibuat untuk pemula yang ingin belajar dari nol tanpa malu.'
    },
    {
      question: 'Mulai belajar dari mana?',
      answer:
        'Mulai dari dasar: HTML, CSS, JavaScript, lalu lanjut ke alat yang kamu butuhkan untuk belajar lebih lanjut.'
    },
    {
      question: 'Boleh nanya hal yang kelihatan sepele?',
      answer:
        'Boleh banget. Pertanyaan kecil sering jadi titik awal belajar yang paling penting.'
    },
    {
      question: 'Apakah gratis?',
      answer:
        'Iya, komunitas ini gratis dan fokus untuk membantu anggota belajar dengan tenang.'
    },
    {
      question: 'Bagaimana kalau ada member yang melanggar aturan?',
      answer:
        'Admin akan menegur dan mengambil tindakan yang sesuai agar semua anggota tetap nyaman.'
    }
  ],
  marquee: {
    languages: [
      { name: 'HTML5', icon: 'devicon-html5-plain' },
      { name: 'CSS3', icon: 'devicon-css3-plain' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain' },
      { name: 'Python', icon: 'devicon-python-plain' },
      { name: 'C++', icon: 'devicon-cplusplus-plain' },
      { name: 'Java', icon: 'devicon-java-plain' },
      { name: 'PHP', icon: 'devicon-php-plain' },
      { name: 'Go', icon: 'devicon-go-plain' },
      { name: 'Rust', icon: 'devicon-rust-original' }
    ],
    tools: [
      { name: 'GitHub', icon: 'devicon-github-original' },
      { name: 'Vercel', icon: 'devicon-vercel-original' },
      { name: 'Supabase', icon: 'devicon-supabase-plain' },
      { name: 'VS Code', icon: 'devicon-vscode-plain' },
      { name: 'Git', icon: 'devicon-git-plain' },
      { name: 'Node.js', icon: 'devicon-nodejs-plain' },
      { name: 'React', icon: 'devicon-react-original' },
      { name: 'Linux', icon: 'devicon-linux-plain' },
      { name: 'Figma', icon: 'devicon-figma-plain' },
      { name: 'Docker', icon: 'devicon-docker-plain' }
    ]
  }
};

async function loadContent() {
  try {
    const response = await fetch('data/content.json');
    if (!response.ok) {
      throw new Error('Fetch gagal');
    }

    return await response.json();
  } catch (error) {
    return fallbackContent;
  }
}

function buildMarqueeRow(items, rowName) {
  const row = document.querySelector(`[data-row="${rowName}"]`);
  if (!row) {
    return;
  }

  const duplicatedItems = [...items, ...items];
  const track = document.createElement('div');
  track.className = 'marquee-track';

  duplicatedItems.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'marquee-item';
    wrapper.title = item.name;
    wrapper.setAttribute('aria-label', item.name);
    wrapper.setAttribute('aria-hidden', index >= items.length ? 'true' : 'false');

    const icon = document.createElement('i');
    icon.className = `${item.icon}`;
    icon.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.className = 'tech-name';
    label.textContent = item.name;

    wrapper.appendChild(icon);
    wrapper.appendChild(label);
    track.appendChild(wrapper);
  });

  row.appendChild(track);

  const marqueeItems = row.querySelectorAll('.marquee-item');
  marqueeItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      const icon = item.querySelector('i');
      if (icon) {
        icon.classList.add('colored');
      }
    });

    item.addEventListener('mouseleave', () => {
      const icon = item.querySelector('i');
      if (icon) {
        icon.classList.remove('colored');
      }
    });
  });
}

function renderRules(rules) {
  const list = document.getElementById('rules-list');
  if (!list || !Array.isArray(rules)) {
    return;
  }

  list.innerHTML = rules
    .map(
      (rule) => `
        <li>${rule}</li>
      `
    )
    .join('');
}

function renderFaq(faq) {
  const container = document.getElementById('faq-list');
  if (!container || !Array.isArray(faq)) {
    return;
  }

  container.innerHTML = faq
    .map(
      (item, index) => `
        <details ${index === 0 ? 'open' : ''}>
          <summary>${item.question}</summary>
          <div class="faq-answer">${item.answer}</div>
        </details>
      `
    )
    .join('');
}

function initThemeToggle() {
  const toggleButton = document.querySelector('.theme-toggle');
  if (!toggleButton) {
    return;
  }

  const savedTheme = localStorage.getItem('calmdev-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    toggleButton.setAttribute('aria-pressed', 'true');
    toggleButton.innerHTML = '<span class="theme-icon theme-icon-sun" aria-hidden="true"></span>';
    toggleButton.setAttribute('aria-label', 'Aktifkan mode terang');
  } else {
    toggleButton.innerHTML = '<span class="theme-icon theme-icon-moon" aria-hidden="true"></span>';
    toggleButton.setAttribute('aria-label', 'Aktifkan mode gelap');
  }

  toggleButton.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    const nextMode = isDark ? 'dark' : 'light';
    localStorage.setItem('calmdev-theme', nextMode);
    toggleButton.setAttribute('aria-pressed', String(isDark));
    toggleButton.innerHTML = `<span class="theme-icon theme-icon-${isDark ? 'sun' : 'moon'}" aria-hidden="true"></span>`;
    toggleButton.setAttribute('aria-label', isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
  });
}

function initMobileNavigation() {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-navigation');

  if (!menuButton || !navigation) {
    return;
  }

  const closeMenu = () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Buka menu navigasi');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
      closeMenu();
    }
  });
}

function initScrollReveal() {
  const revealTargets = document.querySelectorAll('main > section');
  if (!revealTargets.length) {
    return;
  }

  document.body.classList.add('motion-ready');
  revealTargets.forEach((element) => element.classList.add('reveal-on-scroll'));

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((element) => observer.observe(element));
}

document.addEventListener('DOMContentLoaded', async () => {
  const content = await loadContent();

  initThemeToggle();
  initMobileNavigation();
  initScrollReveal();

  if (content?.marquee) {
    buildMarqueeRow(content.marquee.languages, 'languages');
    buildMarqueeRow(content.marquee.tools, 'tools');
  }

  renderRules(content?.rules || fallbackContent.rules);
  renderFaq(content?.faq || fallbackContent.faq);

  // Future form submit: tambahkan logika fetch atau submit ke backend di sini.
});
