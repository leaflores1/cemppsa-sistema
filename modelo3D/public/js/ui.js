// public/js/ui.js
export function initModal() {
  const $modal = document.getElementById('info-modal');
  const $title = document.getElementById('info-title');
  const $kind  = document.getElementById('info-kind');
  const $stat  = document.getElementById('info-status');
  const $last  = document.getElementById('info-last');
  const $pos   = document.getElementById('info-pos');
  const $note  = document.getElementById('info-note');
  const $close = document.getElementById('modal-close');

  const close = () => $modal.classList.add('hidden');
  $close.addEventListener('click', close);
  $modal.querySelector('[data-close]')?.addEventListener('click', close);
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });

  function fmt(n){ return typeof n === 'number' ? n.toFixed(2) : n; }

  function show(data = {}) {
    $title.textContent = data.name ?? 'Instrumento';
    $kind.textContent  = data.kind ?? '—';
    $stat.textContent  = data.status ?? '—';
    $last.textContent  = data.lastSeen ?? '—';
    if (data.position) {
      const { x, y, z } = data.position;
      $pos.textContent = `x:${fmt(x)}  y:${fmt(y)}  z:${fmt(z)}`;
    } else {
      $pos.textContent = '—';
    }
    $note.textContent = data.note ?? '—';
    $modal.classList.remove('hidden');
  }

  return { show, close };
}
