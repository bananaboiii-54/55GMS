function applyTheme() {
  const mode = localStorage.getItem('themeMode') || 'original';
  const customColor = localStorage.getItem('customColor');
  const html = document.documentElement;

  // Remove all theme classes
  html.classList.remove('meatworm', 'galaxy');

  // Remove existing theme styles
  const existingThemeStyles = document.querySelectorAll('style[data-theme-style]');
  existingThemeStyles.forEach(style => style.remove());

  // Apply the selected theme
  if (mode === 'meatworm') {
    html.classList.add('meatworm');
    const st = document.createElement('style');
    st.setAttribute('data-theme-style', 'true');
    st.innerHTML = 'body{background-color:#fff!important;color:#000!important}.navbar{background:#fff!important}.navbar a{color:#000!important}a{color:#0033cc!important}';
    document.head.appendChild(st);
    const nav = document.getElementById('nav-title');
    if (nav) nav.textContent = 'Evil Meatworm Games';
    if (!localStorage.getItem('tab')) {
      document.title = 'Evil Meatworm Games';
    }
  } else if (mode === 'custom' && customColor) {
    const c = customColor.replace('#', '');
    const r = parseInt(c.substr(0, 2), 16);
    const g = parseInt(c.substr(2, 2), 16);
    const b = parseInt(c.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const st = document.createElement('style');
    st.setAttribute('data-theme-style', 'true');
    const txt = brightness > 128 ? '#000' : '#fff';
    const lnk = brightness > 128 ? '#0033cc' : '#f1a727';
    st.innerHTML = 'body{background-color:' + customColor + '!important;color:' + txt + '!important}a{color:' + lnk + '!important}';
    document.head.appendChild(st);
  } else if (mode === 'galaxy') {
    html.classList.add('galaxy');
  }
  // 'original' doesn't need any special styling
}

// Run theme on page load if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyTheme);
} else {
  applyTheme();
}
