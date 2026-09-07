/* ============================================================
   ХлебМясо — логика магазина
   Каталог · поиск · корзина · заказ в WhatsApp

   Важно: все обработчики вешаются на document ОДИН раз и в самом
   начале. Поэтому кнопки продолжают работать, даже если что-то
   другое на странице сломается.
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'hlebmyaso_cart_v1';

  /* ---------- если что-то упало — показать, а не молчать ---------- */
  window.addEventListener('error', function (e) {
    var box = document.getElementById('jsError');
    if (!box) return;
    box.style.display = 'block';
    box.textContent = 'Ошибка на странице: ' + (e.message || e.type) +
      ' — покажите это сообщение разработчику.';
  });

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* фотографии для галереи «Как у нас в магазине» */
  var GALLERY = [
    'assets/meat-counter.jpg', 'assets/bakery-shelf.jpg', 'assets/steak.jpg',
    'assets/chudu.jpg', 'assets/nuts.jpg', 'assets/simit.jpg',
    'assets/sujuk.jpg', 'assets/dumplings.jpg', 'assets/store-entrance.jpg',
    'assets/interior.jpg', 'assets/chakchak-brand.jpg', 'assets/lavash.jpg'
  ];

  /* ---------- состояние ---------- */
  var state = { cart: {}, cat: 'all', query: '', sort: 'default', mode: 'delivery' };

  var CAT_MAP = {};
  for (var i = 0; i < CATEGORIES.length; i++) CAT_MAP[CATEGORIES[i].id] = CATEGORIES[i];

  /* ---------- утилиты ---------- */
  function money(n) {
    return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ' + SHOP.currency;
  }
  function qtyText(q) { return q % 1 === 0 ? String(q) : q.toFixed(1).replace('.', ','); }
  function stepFor(p) { return p.unit === 'кг' ? 0.5 : 1; }
  function norm(s) { return String(s).toLowerCase().replace(/ё/g, 'е').trim(); }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }
  function getProduct(id) {
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
    return null;
  }
  function plural(n, one, few, many) {
    var a = Math.abs(n) % 100, b = a % 10;
    if (a > 10 && a < 20) return many;
    if (b > 1 && b < 5) return few;
    if (b === 1) return one;
    return many;
  }

  /* ---------- хранение корзины ---------- */
  function loadCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      var data = JSON.parse(raw), clean = {};
      for (var id in data) {
        var q = Number(data[id]);
        if (q > 0 && getProduct(id)) clean[id] = q;
      }
      return clean;
    } catch (e) { return {}; }
  }
  function saveCart() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart)); } catch (e) {}
  }

  /* ---------- расчёты ---------- */
  function cartLines() {
    var out = [];
    for (var id in state.cart) {
      var p = getProduct(id);
      if (p) out.push({ p: p, qty: state.cart[id], sum: p.price * state.cart[id] });
    }
    return out;
  }
  function cartSubtotal() {
    return cartLines().reduce(function (s, l) { return s + l.sum; }, 0);
  }
  function deliveryCost(subtotal) {
    if (!subtotal) return 0;
    return subtotal >= SHOP.delivery.freeFrom ? 0 : SHOP.delivery.price;
  }

  function setQty(id, qty) {
    var p = getProduct(id);
    if (!p) return;
    var step = stepFor(p);
    qty = Math.round(Math.round(qty / step) * step * 10) / 10;
    if (qty <= 0) delete state.cart[id];
    else state.cart[id] = Math.min(qty, 99);
    saveCart();
    renderAll();
  }
  function addToCart(id) {
    var p = getProduct(id);
    if (!p) return;
    setQty(id, (state.cart[id] || 0) + stepFor(p));
    toast('Добавлено: <b>' + escapeHtml(p.name) + '</b>');
  }
  function removeFromCart(id) {
    var p = getProduct(id);
    delete state.cart[id];
    saveCart();
    renderAll();
    if (p) toast('Удалено: ' + escapeHtml(p.name));
  }
  function clearCart() {
    if (!cartLines().length) return;
    if (!confirm('Очистить корзину полностью?')) return;
    state.cart = {};
    saveCart();
    renderAll();
    toast('Корзина очищена');
  }

  /* ---------- фильтр каталога ---------- */
  function visibleProducts() {
    var q = norm(state.query), list = PRODUCTS.slice();

    if (state.cat !== 'all') list = list.filter(function (p) { return p.cat === state.cat; });

    if (q) {
      var words = q.split(/\s+/).filter(Boolean);
      list = list.filter(function (p) {
        var cat = CAT_MAP[p.cat] ? CAT_MAP[p.cat].name : '';
        var hay = norm(p.name + ' ' + p.desc + ' ' + p.tags + ' ' + cat);
        return words.every(function (w) { return hay.indexOf(w) !== -1; });
      });
    }

    var rank = function (p) {
      return p.badge === 'хит' ? 0 : p.badge === 'новинка' ? 1 : p.badge === 'акция' ? 2 : 3;
    };
    if (state.sort === 'cheap') list.sort(function (a, b) { return a.price - b.price; });
    else if (state.sort === 'expensive') list.sort(function (a, b) { return b.price - a.price; });
    else if (state.sort === 'name') list.sort(function (a, b) { return a.name.localeCompare(b.name, 'ru'); });
    else list.sort(function (a, b) {
      var d = rank(a) - rank(b);
      return d !== 0 ? d : (b.img ? 1 : 0) - (a.img ? 1 : 0);
    });

    return list;
  }

  /* ---------- отрисовка: чипсы категорий ---------- */
  function renderCats() {
    var bar = $('#catbar');
    if (!bar) return;
    var all = [{ id: 'all', name: 'Все товары', icon: '🛍️' }].concat(CATEGORIES);
    bar.innerHTML = all.map(function (c) {
      var n = c.id === 'all' ? PRODUCTS.length
        : PRODUCTS.filter(function (p) { return p.cat === c.id; }).length;
      return '<button type="button" class="chip' + (state.cat === c.id ? ' is-active' : '') +
        '" data-cat="' + c.id + '"><span class="chip__icon">' + c.icon + '</span>' +
        escapeHtml(c.name) + ' <span class="chip__n">' + n + '</span></button>';
    }).join('');
  }

  /* ---------- отрисовка: плитки категорий ---------- */
  function renderTiles() {
    var box = $('#cattiles');
    if (!box) return;
    box.innerHTML = CATEGORIES.map(function (c) {
      var n = PRODUCTS.filter(function (p) { return p.cat === c.id; }).length;
      var media = c.photo
        ? '<img class="tile__img" src="' + c.photo + '" alt="' + escapeHtml(c.name) + '" loading="lazy">'
        : '';
      return '<button type="button" class="tile' + (c.photo ? '' : ' tile--plain') + '" data-cat="' + c.id + '">' +
        media +
        '<span class="tile__icon">' + c.icon + '</span>' +
        '<span class="tile__body"><span class="tile__name">' + escapeHtml(c.name) + '</span>' +
        '<span class="tile__n">' + n + ' ' + plural(n, 'товар', 'товара', 'товаров') + '</span></span>' +
        '</button>';
    }).join('');
  }

  /* ---------- отрисовка: галерея ---------- */
  function renderGallery() {
    var box = $('#galleryGrid');
    if (!box) return;
    box.innerHTML = GALLERY.map(function (src) {
      return '<a href="' + src + '" target="_blank" rel="noopener">' +
        '<img src="' + src + '" alt="Магазин ХлебМясо" loading="lazy"></a>';
    }).join('');
  }

  /* ---------- отрисовка: карточки товаров ---------- */
  function badgeHtml(p) {
    if (!p.badge) return '';
    var cls = p.badge === 'хит' ? 'badge--hit' : p.badge === 'новинка' ? 'badge--new' : 'badge--sale';
    return '<span class="card__badge ' + cls + '">' + p.badge + '</span>';
  }
  function mediaHtml(p) {
    if (p.img) {
      return '<img class="card__photo" src="' + p.img + '" alt="' + escapeHtml(p.name) + '" loading="lazy">' +
             '<span class="card__photo-mark">фото из магазина</span>';
    }
    return '<span class="card__emoji">' + p.emoji + '</span>';
  }
  function controlHtml(p) {
    var qty = state.cart[p.id];
    if (!qty) return '<button type="button" class="add" data-add="' + p.id + '" aria-label="Добавить в корзину">+</button>';
    return '<span class="stepper">' +
      '<button type="button" data-dec="' + p.id + '" aria-label="Меньше">−</button>' +
      '<span class="stepper__val">' + qtyText(qty) + '</span>' +
      '<button type="button" data-inc="' + p.id + '" aria-label="Больше">+</button></span>';
  }

  function renderGrid() {
    var grid = $('#grid');
    if (!grid) return;
    var list = visibleProducts();
    var cat = state.cat === 'all' ? null : CAT_MAP[state.cat];

    var title = $('#catTitle'), meta = $('#catMeta');
    if (title) title.textContent = state.query ? 'Результаты поиска' : (cat ? cat.name : 'Все товары');
    if (meta) {
      meta.textContent = state.query
        ? 'по запросу «' + state.query + '» — ' + list.length + ' ' + plural(list.length, 'товар', 'товара', 'товаров')
        : list.length + ' ' + plural(list.length, 'товар', 'товара', 'товаров') + ' в наличии';
    }

    if (!list.length) {
      grid.innerHTML = '<div class="empty"><div class="empty__emoji">🧐</div>' +
        '<h3 class="empty__title">Ничего не нашлось</h3>' +
        '<p>Попробуйте другое слово или напишите нам — привезём под заказ.</p>' +
        '<button type="button" class="btn btn--primary" data-action="reset-filters" style="margin-top:14px">Сбросить фильтры</button></div>';
      return;
    }

    grid.innerHTML = list.map(function (p) {
      return '<article class="card">' +
        '<div class="card__media">' + mediaHtml(p) + badgeHtml(p) + '</div>' +
        '<div class="card__body">' +
          '<span class="card__cat">' + escapeHtml(CAT_MAP[p.cat] ? CAT_MAP[p.cat].name : '') + '</span>' +
          '<h3 class="card__name">' + escapeHtml(p.name) + '</h3>' +
          '<p class="card__desc">' + escapeHtml(p.desc) + '</p>' +
          '<div class="card__foot">' +
            '<span class="card__price">' + money(p.price) +
              ' <span class="card__unit">/ ' + p.unit + '</span></span>' +
            controlHtml(p) +
          '</div></div></article>';
    }).join('');
  }

  /* ---------- отрисовка: корзина ---------- */
  function renderCart() {
    var lines = cartLines(), subtotal = cartSubtotal(), count = lines.length;

    var btn = $('.cart-btn'), cnt = $('#cartCount'), dcnt = $('#drawerCount');
    if (btn) btn.classList.toggle('has-items', count > 0);
    if (cnt) cnt.textContent = count;
    if (dcnt) dcnt.textContent = count ? '· ' + count + ' ' + plural(count, 'позиция', 'позиции', 'позиций') : '';

    var mobar = $('#mobar'), msum = $('#mobarSum');
    if (mobar) mobar.classList.toggle('is-visible', count > 0);
    if (msum) msum.textContent = money(subtotal);

    var body = $('#cartBody'), foot = $('#cartFoot');
    if (!body || !foot) return;

    if (!count) {
      foot.hidden = true;
      body.innerHTML = '<div class="empty"><div class="empty__emoji">🛒</div>' +
        '<h3 class="empty__title">Корзина пуста</h3>' +
        '<p>Добавьте товары из каталога — и отправьте заказ нам в WhatsApp одним нажатием.</p>' +
        '<button type="button" class="btn btn--primary" data-action="go-catalog" style="margin-top:16px">Перейти к каталогу</button></div>';
      return;
    }

    body.innerHTML = lines.map(function (l) {
      var media = l.p.img
        ? '<img src="' + l.p.img + '" alt="" loading="lazy">'
        : l.p.emoji;
      return '<div class="citem">' +
        '<div class="citem__media">' + media + '</div>' +
        '<div class="citem__main">' +
          '<p class="citem__name">' + escapeHtml(l.p.name) + '</p>' +
          '<p class="citem__meta">' + money(l.p.price) + ' / ' + l.p.unit + '</p>' +
          '<div class="citem__row"><span class="stepper stepper--sm">' +
            '<button type="button" data-dec="' + l.p.id + '">−</button>' +
            '<span class="stepper__val">' + qtyText(l.qty) + ' ' + l.p.unit + '</span>' +
            '<button type="button" data-inc="' + l.p.id + '">+</button></span>' +
            '<span class="citem__sum">' + money(l.sum) + '</span></div>' +
          '<button type="button" class="citem__del" data-del="' + l.p.id + '">Удалить</button>' +
        '</div></div>';
    }).join('');

    var d = SHOP.delivery, ship = deliveryCost(subtotal), hint;
    if (subtotal < d.minSum) {
      hint = '<div class="hint">До минимальной суммы доставки не хватает <b>' + money(d.minSum - subtotal) +
             '</b>. Самовывоз — без ограничений.</div>';
    } else if (subtotal < d.freeFrom) {
      hint = '<div class="hint">Добавьте ещё на <b>' + money(d.freeFrom - subtotal) + '</b> — и доставка бесплатная.</div>';
    } else {
      hint = '<div class="hint hint--ok">🎉 Доставка бесплатная</div>';
    }

    foot.hidden = false;
    foot.innerHTML = hint +
      '<div class="totals">' +
        '<div class="totals__row"><span>Товары (' + count + ')</span><span>' + money(subtotal) + '</span></div>' +
        '<div class="totals__row"><span>Доставка</span><span>' + (ship ? money(ship) : 'бесплатно') + '</span></div>' +
        '<div class="totals__row totals__row--big"><span>Итого</span><span>' + money(subtotal + ship) + '</span></div>' +
      '</div>' +
      '<button type="button" class="btn btn--wa btn--lg btn--block" data-action="checkout">💬 Оформить заказ в WhatsApp</button>' +
      '<button type="button" class="btn btn--ghost btn--block" data-action="clear-cart" style="margin-top:8px;height:40px">Очистить корзину</button>';
  }

  function renderAll() {
    renderCats();
    renderGrid();
    renderCart();
    var m = $('#modal');
    if (m && m.classList.contains('is-open')) renderSummary();
  }

  /* ---------- открытие / закрытие ---------- */
  function lockScroll(on) { document.body.style.overflow = on ? 'hidden' : ''; }
  function openCart() {
    $('#drawer').classList.add('is-open');
    $('#overlay').classList.add('is-open');
    lockScroll(true);
  }
  function closeCart() {
    $('#drawer').classList.remove('is-open');
    $('#overlay').classList.remove('is-open');
    if (!$('#modal').classList.contains('is-open')) lockScroll(false);
  }
  function openModal() {
    if (!cartLines().length) { toast('Корзина пуста'); return; }
    closeCart();
    renderSummary();
    $('#modal').classList.add('is-open');
    lockScroll(true);
    setTimeout(function () { $('#fName').focus(); }, 260);
  }
  function closeModal() {
    $('#modal').classList.remove('is-open');
    lockScroll(false);
  }
  function goCatalog() {
    closeCart();
    var el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ block: 'start' });
  }

  /* ---------- форма заказа ---------- */
  function setMode(mode) {
    state.mode = mode;
    $$('.seg').forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-mode') === mode); });
    var f = $('#addressField');
    if (f) f.style.display = mode === 'delivery' ? '' : 'none';
    renderSummary();
  }

  function renderSummary() {
    var box = $('#orderSummary');
    if (!box) return;
    var lines = cartLines(), subtotal = cartSubtotal();
    var ship = state.mode === 'delivery' ? deliveryCost(subtotal) : 0;

    box.innerHTML = lines.map(function (l) {
      return '<div class="summary__row"><span>' + escapeHtml(l.p.name) + ' · ' + qtyText(l.qty) + ' ' +
        l.p.unit + '</span><span>' + money(l.sum) + '</span></div>';
    }).join('') +
    (state.mode === 'delivery'
      ? '<div class="summary__row"><span>Доставка</span><span>' + (ship ? money(ship) : 'бесплатно') + '</span></div>'
      : '<div class="summary__row"><span>Самовывоз</span><span>0 ' + SHOP.currency + '</span></div>') +
    '<div class="summary__row summary__row--total"><span>Итого</span><span>' + money(subtotal + ship) + '</span></div>';
  }

  function validate() {
    var ok = true;
    function check(id, cond) {
      var el = $('#' + id), field = el.closest('.field');
      field.classList.toggle('has-error', !cond);
      el.classList.toggle('is-error', !cond);
      if (!cond) ok = false;
    }
    check('fName', $('#fName').value.trim().length >= 2);
    check('fPhone', ($('#fPhone').value.match(/\d/g) || []).length >= 10);
    if (state.mode === 'delivery') check('fAddress', $('#fAddress').value.trim().length >= 5);
    else $('#fAddress').closest('.field').classList.remove('has-error');
    return ok;
  }

  /* ---------- сообщение для WhatsApp ---------- */
  function buildMessage() {
    var lines = cartLines(), subtotal = cartSubtotal();
    var ship = state.mode === 'delivery' ? deliveryCost(subtotal) : 0;
    var L = [];

    L.push('🧾 *НОВЫЙ ЗАКАЗ — сайт ХлебМясо*');
    L.push('');
    L.push('👤 Имя: ' + $('#fName').value.trim());
    L.push('📞 Телефон: ' + $('#fPhone').value.trim());
    if (state.mode === 'delivery') L.push('🛵 Доставка по адресу: ' + $('#fAddress').value.trim());
    else L.push('🏪 Самовывоз: ' + SHOP.address);
    L.push('⏰ Когда: ' + $('#fTime').value);
    L.push('💳 Оплата: ' + $('#fPay').value);
    L.push('');
    L.push('🛒 *Состав заказа:*');
    lines.forEach(function (l, i) {
      L.push((i + 1) + '. ' + l.p.name + ' — ' + qtyText(l.qty) + ' ' + l.p.unit +
             ' × ' + money(l.p.price) + ' = ' + money(l.sum));
    });
    L.push('');
    L.push('Товары: ' + money(subtotal));
    if (state.mode === 'delivery') L.push('Доставка: ' + (ship ? money(ship) : 'бесплатно'));
    L.push('*ИТОГО: ' + money(subtotal + ship) + '*');

    var c = $('#fComment').value.trim();
    if (c) { L.push(''); L.push('💬 Комментарий: ' + c); }

    L.push('');
    L.push('_Заказ сформирован автоматически на сайте._');
    return L.join('\n');
  }

  function waUrl(text) {
    return 'https://wa.me/' + SHOP.whatsapp + '?text=' + encodeURIComponent(text);
  }
  function openWa(text) {
    var w = window.open(waUrl(text), '_blank');
    if (!w) location.href = waUrl(text);   // если браузер заблокировал новое окно
  }

  function sendOrder() {
    if (!validate()) { toast('Проверьте отмеченные поля'); return; }
    openWa(buildMessage());
    closeModal();
    toast('Открываем WhatsApp — осталось нажать «Отправить»');
  }

  /* ---------- тост ---------- */
  var toastTimer = null;
  function toast(html) {
    var el = $('#toast'), t = $('#toastText');
    if (!el || !t) return;
    t.innerHTML = html;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-visible'); }, 2200);
  }

  /* ---------- поиск ---------- */
  var searchTimer = null;
  function applySearch(value) {
    var box = $('#searchBox');
    if (box) box.classList.toggle('is-filled', value.length > 0);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      state.query = value.trim();
      if (state.query) state.cat = 'all';
      renderCats();
      renderGrid();
    }, 150);
  }
  function clearSearch() {
    var input = $('#searchInput');
    if (input) { input.value = ''; input.focus(); }
    state.query = '';
    var box = $('#searchBox');
    if (box) box.classList.remove('is-filled');
    renderCats();
    renderGrid();
  }

  function selectCat(id) {
    state.cat = id;
    state.query = '';
    var input = $('#searchInput');
    if (input) input.value = '';
    var box = $('#searchBox');
    if (box) box.classList.remove('is-filled');
    renderCats();
    renderGrid();
    goCatalog();
  }

  /* ============================================================
     ОБРАБОТЧИКИ — вешаются первыми и только на document
     ============================================================ */
  document.addEventListener('click', function (e) {
    var t = e.target;

    var el;
    if ((el = t.closest('[data-add]'))) { addToCart(el.getAttribute('data-add')); return; }
    if ((el = t.closest('[data-inc]'))) {
      var pi = getProduct(el.getAttribute('data-inc'));
      if (pi) setQty(pi.id, (state.cart[pi.id] || 0) + stepFor(pi));
      return;
    }
    if ((el = t.closest('[data-dec]'))) {
      var pd = getProduct(el.getAttribute('data-dec'));
      if (pd) setQty(pd.id, (state.cart[pd.id] || 0) - stepFor(pd));
      return;
    }
    if ((el = t.closest('[data-del]'))) { removeFromCart(el.getAttribute('data-del')); return; }
    if ((el = t.closest('[data-cat]'))) { selectCat(el.getAttribute('data-cat')); return; }

    el = t.closest('[data-action]');
    if (!el) return;
    var action = el.getAttribute('data-action');

    if (action === 'open-cart')     { openCart(); }
    else if (action === 'close-cart')    { closeCart(); }
    else if (action === 'checkout')      { openModal(); }
    else if (action === 'close-modal')   { closeModal(); }
    else if (action === 'clear-cart')    { clearCart(); }
    else if (action === 'go-catalog')    { goCatalog(); }
    else if (action === 'clear-search')  { clearSearch(); }
    else if (action === 'reset-filters') { state.cat = 'all'; clearSearch(); }
    else if (action === 'mode')          { setMode(el.getAttribute('data-mode')); }
    else if (action === 'wa-chat')       {
      e.preventDefault();
      openWa('Здравствуйте! Пишу с сайта ХлебМясо, хочу уточнить по товарам.');
    }
  });

  document.addEventListener('input', function (e) {
    if (e.target.id === 'searchInput') { applySearch(e.target.value); return; }
    if (['fName', 'fPhone', 'fAddress'].indexOf(e.target.id) !== -1) {
      e.target.classList.remove('is-error');
      var f = e.target.closest('.field');
      if (f) f.classList.remove('has-error');
    }
  });

  document.addEventListener('change', function (e) {
    if (e.target.id === 'sort') { state.sort = e.target.value; renderGrid(); }
  });

  document.addEventListener('submit', function (e) {
    if (e.target.id === 'orderForm') { e.preventDefault(); sendOrder(); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if ($('#modal').classList.contains('is-open')) closeModal();
    else if ($('#drawer').classList.contains('is-open')) closeCart();
    else if (document.activeElement && document.activeElement.id === 'searchInput') clearSearch();
  });

  /* ============================================================
     КОНТАКТЫ ИЗ config.js
     ============================================================ */
  function fillShopInfo() {
    var tel = 'tel:' + SHOP.phoneHref;
    function set(sel, fn) { var el = $(sel); if (el) fn(el); }

    set('#topPhone', function (el) { el.href = tel; el.querySelector('span').textContent = SHOP.phone; });
    set('#headPhone', function (el) { el.href = tel; el.textContent = SHOP.phone; });
    set('#footPhone', function (el) { el.href = tel; el.textContent = SHOP.phone; });

    set('#topAddress', function (el) { el.href = SHOP.mapUrl; el.querySelector('span').textContent = SHOP.address; });
    set('#topHours', function (el) { el.querySelector('span').textContent = SHOP.hours; });

    set('#footAddress', function (el) { el.textContent = '📍 ' + SHOP.address; });
    set('#footHours', function (el) { el.textContent = '🕗 ' + SHOP.hours; });
    set('#footZone', function (el) { el.textContent = '🛵 ' + SHOP.delivery.zone; });
    set('#footMap', function (el) { el.href = SHOP.mapUrl; });
    set('#galleryMap', function (el) { el.href = SHOP.mapUrl; });

    set('#perkDelivery', function (el) {
      el.textContent = SHOP.delivery.zone + '. Бесплатно от ' + money(SHOP.delivery.freeFrom) + '.';
    });
    set('#segDeliveryNote', function (el) {
      el.textContent = 'от ' + money(SHOP.delivery.minSum) + ', бесплатно от ' + money(SHOP.delivery.freeFrom);
    });
    set('#factCount', function (el) { el.textContent = PRODUCTS.length + '+'; });
    set('#year', function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ============================================================
     СТАРТ
     ============================================================ */
  state.cart = loadCart();
  state.mode = 'delivery';

  try { fillShopInfo(); } catch (e) { /* контакты не критичны для работы каталога */ }
  renderTiles();
  renderGallery();
  renderAll();
  setMode('delivery');
})();
