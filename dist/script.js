'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 651px)').addEventListener('change', closeMenu);

const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab, focus = false) {
  tabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  });
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectTab(tabs[next], true);
    }
  });
});

const dialog = document.querySelector('#collaboration-dialog');
const collaborationButton = document.querySelector('#open-collaboration');
collaborationButton.addEventListener('click', () => dialog.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});

document.querySelector('#collaboration-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const brief = [
    'EQUESTRIA AFTER DARK — COLLABORATION INTRODUCTION',
    '',
    `Name / alias: ${data.get('name').trim()}`,
    `Field: ${data.get('role')}`,
    `Contact / portfolio: ${data.get('contact').trim() || 'Not provided'}`,
    '',
    'ABOUT MY CONTRIBUTION',
    data.get('message').trim(),
    '',
    'Prepared on the Equestria After Dark project website.',
    'This introduction has not been sent. Share it directly with the project creator.'
  ].join('\r\n');
  const file = new Blob([brief], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'equestria-after-dark-introduction.txt';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  const status = document.querySelector('#form-status');
  status.hidden = false;
  status.textContent = 'Your introduction is ready. Share the downloaded file with the creator through the channel where you found the project.';
});

document.querySelector('#year').textContent = new Date().getFullYear();

// Links still open the original images when JavaScript is unavailable.
const galleryLinks = [...document.querySelectorAll('[data-gallery]')];
const galleryDialog = document.querySelector('#gallery-dialog');
const galleryImage = document.querySelector('#gallery-dialog-image');
let galleryIndex = 0;

function showGalleryImage(index) {
  galleryIndex = (index + galleryLinks.length) % galleryLinks.length;
  const link = galleryLinks[galleryIndex];
  galleryImage.src = link.href;
  galleryImage.alt = link.querySelector('img').alt;
  document.querySelector('#gallery-dialog-title').textContent = link.dataset.title;
  document.querySelector('#gallery-dialog-description').textContent = link.dataset.description;
  document.querySelector('#gallery-count').textContent = `${galleryIndex + 1} / ${galleryLinks.length}`;
}

galleryLinks.forEach((link, index) => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    showGalleryImage(index);
    galleryDialog.showModal();
  });
});
document.querySelector('.gallery-close').addEventListener('click', () => galleryDialog.close());
document.querySelector('#gallery-previous').addEventListener('click', () => showGalleryImage(galleryIndex - 1));
document.querySelector('#gallery-next').addEventListener('click', () => showGalleryImage(galleryIndex + 1));
galleryDialog.addEventListener('keydown', event => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  showGalleryImage(galleryIndex + (event.key === 'ArrowRight' ? 1 : -1));
});
galleryDialog.addEventListener('click', event => {
  if (event.target !== galleryDialog) return;
  const bounds = galleryDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) galleryDialog.close();
});
