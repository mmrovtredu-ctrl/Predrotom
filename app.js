/* =========================================================
   PETOM TUR — reserva com calendário, avaliações Google e pacotes
   Sem dependências. Se o JS falhar, os botões continuam sendo
   links diretos para o WhatsApp.
   ========================================================= */
(function () {
  'use strict';

  var WHATS = '5598991021321';

  /* ---------- dados dos passeios (fonte única para reserva e pacotes) ---------- */
  var TOURS = {
    'buggy': {
      nome: 'Buggy – Pequenos Lençóis', curto: 'Buggy', preco: 449.99, unidade: 'veículo exclusivo',
      cobranca: 'veiculo', turnos: ['Manhã (09h00–13h30)', 'Tarde (14h30–18h30)'],
      foto: '/fotos/buggy-01.jpg'
    },
    'jardineira': {
      nome: 'Jardineira – Pequenos Lençóis', curto: 'Jardineira', preco: 139.99, unidade: 'por pessoa',
      cobranca: 'pessoa', info: 'Saída conforme formação de grupo.',
      foto: '/fotos/jardineira-01.jpg'
    },
    'circuito-rios': {
      nome: 'Circuito Rios – Jardineira', curto: 'Circuito Rios', preco: 169.99, unidade: 'por pessoa',
      cobranca: 'pessoa', info: 'Saída às 09h30, retorno por volta de 14h30.',
      foto: '/fotos/rios-01.jpg'
    },
    'lancha': {
      nome: 'Lancha – Delta & Revoada', curto: 'Lancha Delta & Revoada', preco: 169.99, unidade: 'por pessoa',
      cobranca: 'pessoa', info: 'Embarque às 14h no píer de Tutóia, retorno por volta de 18h30.',
      foto: '/fotos/lancha-01.jpg'
    },
    'quadriciclo': {
      nome: 'Quadriciclo – Com guia', curto: 'Quadriciclo', preco: 499.99, unidade: 'para duas pessoas',
      cobranca: 'dupla', foto: '/fotos/quadriciclo-01.jpg'
    }
  };

  var POUSADAS = [
    {
      nome: 'Pousada Chalé da Praia', foto: '/fotos/hospedagem/chale-da-praia-01.jpg',
      quartos: [
        { id: 'chale-2', nome: 'Chalé 2 casal, vista mar', meta: 'Café incluso • até 3 pessoas', cap: 3, diaria: 390 },
        { id: 'chale-1', nome: 'Chalé 1 com cozinha panorâmica, casal', meta: 'Café incluso • até 4 pessoas', cap: 4, diaria: 490 },
        { id: 'chale-3', nome: 'Chalé 3, sem cozinha', meta: 'Café incluso • até 4 pessoas', cap: 4, diaria: 400 }
      ]
    },
    {
      nome: 'Breezys Sport House', foto: '/fotos/hospedagem/breezy-ravenala-01.jpg',
      quartos: [
        { id: 'br-ravenala', nome: 'Chalé Ravenala', meta: 'Até 3 pessoas • cozinha, rooftop com vista mar', cap: 3, foto: '/fotos/hospedagem/breezy-ravenala-01.jpg' },
        { id: 'br-havai', nome: 'Chalé Havaí', meta: 'Até 3 pessoas • cozinha, rooftop com vista mar', cap: 3, foto: '/fotos/hospedagem/breezy-havai-01.jpg' },
        { id: 'br-leque', nome: 'Chalé Leque', meta: '7 a 8 pessoas • 3 quartos, 2 banheiros', cap: 8, foto: '/fotos/hospedagem/breezy-leque-01.jpg' },
        { id: 'br-buriti', nome: 'Suíte Buriti', meta: 'Casal • cama king, ar-condicionado', cap: 2, foto: '/fotos/hospedagem/breezy-buriti-01.jpg' },
        { id: 'br-carnauba', nome: 'Suíte Carnaúba', meta: 'Até 4 hóspedes • king + bicama', cap: 4, foto: '/fotos/hospedagem/breezy-carnauba-01.jpg' }
      ]
    }
  ];

  /* ---------- utilitários ---------- */
  var ICON = {
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.6-5.9c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5s0-.4 0-.5-.6-1.5-.8-2-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3A2.8 2.8 0 0 0 6.5 9c0 1.2.9 2.4 1 2.6s1.7 2.7 4.2 3.8c2.1.9 2.5.7 3 .7s1.5-.6 1.7-1.2.2-1.1.1-1.2-.3-.2-.6-.4z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>'
  };
  var DOW = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

  function brl(n) {
    return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/ /g, ' ');
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function dataCurta(d) { return DOW[d.getDay()] + ', ' + pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear(); }
  function dataLonga(d) {
    return d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
  function mesmoDia(a, b) { return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
  function addDias(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }
  function evento(nome, params) {
    if (typeof window.gtag === 'function') window.gtag('event', nome, params || {});
  }
  function abrirWhats(msg, numero) {
    var url = 'https://wa.me/' + (numero || WHATS) + '?text=' + encodeURIComponent(msg);
    var w = window.open(url, '_blank');
    if (w) { try { w.opener = null; } catch (e) { /* ignora */ } } else { window.location.href = url; }
  }
  function estimar(t, pessoas) {
    if (t.cobranca === 'pessoa') {
      return { valor: t.preco * pessoas, desc: pessoas + ' × ' + brl(t.preco) };
    }
    if (t.cobranca === 'dupla') {
      var q = Math.ceil(pessoas / 2);
      return { valor: t.preco * q, desc: q + ' quadriciclo' + (q > 1 ? 's' : '') + ' × ' + brl(t.preco) + ' (2 pessoas cada)' };
    }
    return { valor: t.preco, desc: '1 veículo exclusivo', obs: 'Grupos maiores podem precisar de mais de um buggy — a equipe confirma pelo WhatsApp.' };
  }

  /* =========================================================
     CALENDÁRIO — qualquer data a partir de hoje, sem limite
     ========================================================= */
  function Calendario(root, aoEscolher) {
    var hoje = new Date();
    this.hoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    this.sel = null;
    this.foco = this.hoje;
    this.view = new Date(this.hoje.getFullYear(), this.hoje.getMonth(), 1);
    this.aoEscolher = aoEscolher;
    this.root = root;
    root.classList.add('cal');
    root.innerHTML =
      '<div class="cal__head">' +
        '<button type="button" class="cal__nav" data-nav="-1" aria-label="Mês anterior">' + ICON.prev + '</button>' +
        '<span class="cal__month" aria-live="polite"></span>' +
        '<button type="button" class="cal__nav" data-nav="1" aria-label="Próximo mês">' + ICON.next + '</button>' +
      '</div>' +
      '<div class="cal__grid"></div>' +
      '<p class="cal__pick" aria-live="polite"></p>';
    this.mesEl = root.querySelector('.cal__month');
    this.grid = root.querySelector('.cal__grid');
    this.pick = root.querySelector('.cal__pick');
    this.btnPrev = root.querySelector('[data-nav="-1"]');
    var self = this;
    root.addEventListener('click', function (e) {
      var nav = e.target.closest('[data-nav]');
      if (nav) { self.mudarMes(+nav.getAttribute('data-nav')); return; }
      var b = e.target.closest('.cal__day');
      if (b && !b.disabled) self.escolher(new Date(+b.getAttribute('data-ts')));
    });
    this.grid.addEventListener('keydown', function (e) {
      var passo = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
      if (!passo) return;
      e.preventDefault();
      var alvo = addDias(self.foco, passo);
      if (alvo < self.hoje) return;
      self.foco = alvo;
      if (alvo.getMonth() !== self.view.getMonth() || alvo.getFullYear() !== self.view.getFullYear()) {
        self.view = new Date(alvo.getFullYear(), alvo.getMonth(), 1);
      }
      self.render(true);
    });
    this.render(false);
  }
  Calendario.prototype.mudarMes = function (delta) {
    var v = new Date(this.view.getFullYear(), this.view.getMonth() + delta, 1);
    if (v < new Date(this.hoje.getFullYear(), this.hoje.getMonth(), 1)) return;
    this.view = v;
    this.foco = (v.getMonth() === this.hoje.getMonth() && v.getFullYear() === this.hoje.getFullYear()) ? this.hoje : v;
    this.render(false);
  };
  Calendario.prototype.escolher = function (d) {
    this.sel = d;
    this.foco = d;
    this.render(true);
    if (this.aoEscolher) this.aoEscolher(d);
  };
  Calendario.prototype.limpar = function () {
    this.sel = null;
    this.foco = this.hoje;
    this.view = new Date(this.hoje.getFullYear(), this.hoje.getMonth(), 1);
    this.render(false);
  };
  Calendario.prototype.render = function (focar) {
    var v = this.view, ano = v.getFullYear(), mes = v.getMonth();
    var rot = v.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    this.mesEl.textContent = rot.charAt(0).toUpperCase() + rot.slice(1);
    this.btnPrev.disabled = (ano === this.hoje.getFullYear() && mes === this.hoje.getMonth());
    var html = '';
    ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].forEach(function (d) { html += '<span class="cal__dow" aria-hidden="true">' + d + '</span>'; });
    var inicio = new Date(ano, mes, 1).getDay();
    for (var i = 0; i < inicio; i++) html += '<span></span>';
    var dias = new Date(ano, mes + 1, 0).getDate();
    var focoNoMes = this.foco.getMonth() === mes && this.foco.getFullYear() === ano;
    for (var dia = 1; dia <= dias; dia++) {
      var d = new Date(ano, mes, dia);
      var passado = d < this.hoje;
      var tab = (focoNoMes && mesmoDia(d, this.foco)) || (!focoNoMes && dia === 1 && !passado) ? '0' : '-1';
      html += '<button type="button" class="cal__day' + (mesmoDia(d, this.hoje) ? ' is-today' : '') + '"' +
        ' data-ts="' + d.getTime() + '" tabindex="' + tab + '"' +
        ' aria-label="' + dataLonga(d) + '" aria-pressed="' + (mesmoDia(d, this.sel) ? 'true' : 'false') + '"' +
        (passado ? ' disabled' : '') + '>' + dia + '</button>';
    }
    this.grid.innerHTML = html;
    this.pick.textContent = this.sel ? 'Data escolhida: ' + dataLonga(this.sel) : '';
    if (focar) {
      var alvo = this.grid.querySelector('[tabindex="0"]');
      if (alvo) alvo.focus();
    }
  };

  /* stepper (− n +) */
  function Stepper(root, min, max, valor, aoMudar) {
    root.classList.add('step');
    root.innerHTML = '<button type="button" data-d="-1">−</button><output></output><button type="button" data-d="1">+</button>';
    var out = root.querySelector('output'), menos = root.querySelector('[data-d="-1"]'), mais = root.querySelector('[data-d="1"]');
    var rotulo = root.getAttribute('data-rotulo') || 'item';
    menos.setAttribute('aria-label', 'Diminuir ' + rotulo);
    mais.setAttribute('aria-label', 'Aumentar ' + rotulo);
    out.setAttribute('aria-live', 'polite');
    var self = this;
    this.valor = valor;
    function pinta() { out.textContent = self.valor; menos.disabled = self.valor <= min; mais.disabled = self.valor >= max; }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-d]');
      if (!b) return;
      self.set(self.valor + (+b.getAttribute('data-d')));
    });
    this.set = function (n) { self.valor = Math.max(min, Math.min(max, n)); pinta(); if (aoMudar) aoMudar(self.valor); };
    pinta();
  }

  /* =========================================================
     DIÁLOGO DE RESERVA DE PASSEIO
     ========================================================= */
  function setupReserva() {
    if (typeof HTMLDialogElement !== 'function') return; // mantém o link direto do WhatsApp
    var dlg, cal, pessoas, tour, dataSel = null;

    function montar() {
      dlg = document.createElement('dialog');
      dlg.className = 'bk';
      dlg.setAttribute('aria-labelledby', 'bk-title');
      dlg.innerHTML =
        '<form class="bk__form" novalidate>' +
          '<div class="bk__head"><div><p class="bk__title" id="bk-title"></p><p class="bk__price"></p></div>' +
          '<button type="button" class="bk__close" aria-label="Fechar">' + ICON.close + '</button></div>' +
          '<span class="bk__label" id="bk-dl">Escolha a data do passeio</span>' +
          '<div data-cal role="group" aria-labelledby="bk-dl"></div>' +
          '<p class="bk__err" data-err="data" hidden>Escolha a data no calendário.</p>' +
          '<div data-turnos-wrap><span class="bk__label" id="bk-tl">Turno</span><div class="bk__chips" role="radiogroup" aria-labelledby="bk-tl" data-turnos></div></div>' +
          '<p class="bk__note" data-info style="text-align:left"></p>' +
          '<span class="bk__label" id="bk-pl">Quantas pessoas?</span>' +
          '<div data-pessoas data-rotulo="pessoas" role="group" aria-labelledby="bk-pl"></div>' +
          '<label class="bk__label" for="bk-nome">Seu nome</label>' +
          '<input class="bk__input" id="bk-nome" name="nome" autocomplete="name" placeholder="Nome completo">' +
          '<p class="bk__err" data-err="nome" hidden>Informe seu nome.</p>' +
          '<div class="bk__est" data-est></div>' +
          '<button type="submit" class="btn-wa">' + ICON.wa + ' Enviar pelo WhatsApp</button>' +
          '<p class="bk__note">Você escolhe a data e a equipe da Petom Tur confirma pelo WhatsApp.<br>Pagamento: dinheiro, cartão ou Pix.</p>' +
        '</form>';
      document.body.appendChild(dlg);

      cal = new Calendario(dlg.querySelector('[data-cal]'), function (d) {
        dataSel = d;
        dlg.querySelector('[data-err="data"]').hidden = true;
      });
      pessoas = new Stepper(dlg.querySelector('[data-pessoas]'), 1, 40, 2, atualizarEstimativa);

      dlg.querySelector('.bk__close').addEventListener('click', function () { dlg.close(); });
      dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
      dlg.querySelector('form').addEventListener('submit', enviar);
    }

    function atualizarEstimativa() {
      if (!tour) return;
      var est = estimar(tour, pessoas.valor);
      var box = dlg.querySelector('[data-est]');
      box.innerHTML = '';
      box.appendChild(el('span', null, 'Estimativa: '));
      box.appendChild(el('strong', null, brl(est.valor)));
      box.appendChild(el('div', null, est.desc));
      if (est.obs) box.appendChild(el('div', 'bk__note', est.obs));
    }

    function abrir(id) {
      tour = TOURS[id];
      if (!tour) return false;
      if (!dlg) montar();
      tour.id = id;
      dataSel = null;
      cal.limpar();
      dlg.querySelector('.bk__title').textContent = tour.nome;
      dlg.querySelector('.bk__price').textContent = brl(tour.preco) + ' · ' + tour.unidade;
      var wrap = dlg.querySelector('[data-turnos-wrap]'), chips = dlg.querySelector('[data-turnos]');
      chips.innerHTML = '';
      if (tour.turnos && tour.turnos.length) {
        tour.turnos.forEach(function (t, i) {
          var lab = el('label', 'bk__chip');
          var inp = document.createElement('input');
          inp.type = 'radio'; inp.name = 'turno'; inp.value = t; inp.checked = i === 0;
          lab.appendChild(inp);
          lab.appendChild(el('span', null, t));
          chips.appendChild(lab);
        });
        wrap.hidden = false;
      } else {
        wrap.hidden = true;
      }
      var info = dlg.querySelector('[data-info]');
      info.textContent = tour.info || '';
      info.hidden = !tour.info;
      dlg.querySelectorAll('.bk__err').forEach(function (e) { e.hidden = true; });
      atualizarEstimativa();
      dlg.showModal();
      return true;
    }

    function enviar(e) {
      e.preventDefault();
      var nomeEl = dlg.querySelector('#bk-nome');
      var nome = nomeEl.value.trim();
      var ok = true;
      if (!dataSel) { dlg.querySelector('[data-err="data"]').hidden = false; ok = false; }
      if (!nome) { dlg.querySelector('[data-err="nome"]').hidden = false; ok = false; }
      if (!ok) {
        (dataSel ? nomeEl : dlg.querySelector('.cal__day:not([disabled])')).focus();
        return;
      }
      var turno = dlg.querySelector('input[name="turno"]:checked');
      var est = estimar(tour, pessoas.valor);
      var linhas = [
        'Olá, Petom Tur! Quero reservar pelo site:',
        '',
        '*' + tour.nome + '*',
        'Data: ' + dataCurta(dataSel)
      ];
      if (turno) linhas.push('Turno: ' + turno.value);
      linhas.push('Pessoas: ' + pessoas.valor);
      linhas.push('Valor: ' + brl(tour.preco) + ' (' + tour.unidade + ') — estimativa ' + brl(est.valor));
      linhas.push('Nome: ' + nome);
      linhas.push('');
      linhas.push('Pode confirmar a disponibilidade?');
      evento('generate_lead', { tipo: 'passeio', passeio: tour.nome, pessoas: pessoas.valor, value: Math.round(est.valor * 100) / 100, currency: 'BRL' });
      abrirWhats(linhas.join('\n'));
      dlg.close();
    }

    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-reserva]');
      if (!a) return;
      if (abrir(a.getAttribute('data-reserva'))) e.preventDefault();
    });
  }

  /* =========================================================
     AVALIAÇÕES DO GOOGLE — copiadas da ficha "Petom turismo"
     Para atualizar: edite NOTA, TOTAL e a lista abaixo.
     ========================================================= */
  var GOOGLE = {
    nota: 5.0,
    total: 10,
    avaliacoes: [
      { nome: 'Andre L.', texto: 'Atendimento totalmente fora da curva, muito atencioso, prestativo, bem diferenciado. O que chamou mais atenção foi como sempre ajudou e as melhores indicações para aproveitar melhor os passeios e locais para comer e etc.. quer conhecer Tutóia, super recomendo!!!' },
      { nome: 'Rosa F.', texto: 'Excelente! A cordialidade e o profissionalismo do João Pedro desde o primeiro contato foram determinantes para contratarmos o passeio. 👏👏👏' },
      { nome: 'Davi H.', texto: 'As indicações de passeio foram fantásticas, mas não melhor que o atendimento que recebamos. Saímos com a sensação de ter sido abençoados por ter a oportunidade de conhecer um lugar tão bonito sendo atendido por pessoas tão eficientes e gentis. Recomendo muito a agência Petom Turismo.' },
      { nome: 'Rosiane C.', texto: 'Muito bom o passeio, lugar encantador e o guia super dedicado.' },
      { nome: 'Claudia J.', texto: 'Petom Turismo - Credibilidade, Confiança, Presteza, Cordialidade! Tudo isso e algo a mais. O trabalho do Pedro com o cliente, excede as expectativas, dúvidas dirmidas ao máximo. Esgotando todas as prerrogativas SERVICO DE EXCELÊNCIA.' },
      { nome: 'Adriano B.', texto: 'Uma experiência de aventura e natureza , Recomento muito lindo' },
      { nome: 'Kleper J.', texto: 'Passeio muito bom , curtir demais , recomendo demais' },
      { nome: 'João G.', texto: 'Melhor passeio da cidade !!' },
      { nome: 'Gilmara G.', texto: 'Perfeito' }
    ]
  };
  var CORES_AVATAR = ['#1A73E8', '#D93025', '#188038', '#E37400', '#8E24AA', '#00897B', '#C2185B', '#5E35B1', '#6D4C41'];

  function estrelas(n) {
    var r = Math.round(n || 0), s = '';
    for (var i = 1; i <= 5; i++) s += i <= r ? '★' : '☆';
    return s;
  }
  function setupAvaliacoes() {
    var nota = GOOGLE.nota.toFixed(1).replace('.', ',');
    document.querySelectorAll('[data-reviews]').forEach(function (c) {
      var r = c.querySelector('[data-gr-rating]'); if (r) r.textContent = nota;
      var st = c.querySelector('[data-gr-stars]');
      if (st) { st.textContent = estrelas(GOOGLE.nota); st.setAttribute('aria-label', 'Nota ' + nota + ' de 5'); }
      var ct = c.querySelector('[data-gr-count]'); if (ct) ct.textContent = GOOGLE.total + ' avaliações';
      var lista = c.querySelector('[data-gr-list]');
      if (!lista) return;
      lista.innerHTML = '';
      GOOGLE.avaliacoes.forEach(function (a, i) {
        var card = el('article', 'gr-card');
        var top = el('div', 'gr-card__top');
        var ava = el('span', 'gr-ava', a.nome.charAt(0).toUpperCase());
        ava.style.background = CORES_AVATAR[i % CORES_AVATAR.length];
        ava.setAttribute('aria-hidden', 'true');
        var quem = el('div');
        quem.appendChild(el('p', 'gr-name', a.nome));
        quem.appendChild(el('p', 'gr-meta', 'Avaliação no Google'));
        top.appendChild(ava); top.appendChild(quem);
        card.appendChild(top);
        var st2 = el('div', 'gr__stars', estrelas(a.nota || 5));
        st2.setAttribute('aria-label', 'Nota ' + (a.nota || 5) + ' de 5');
        card.appendChild(st2);
        var txt = el('p', 'gr-text', a.texto);
        card.appendChild(txt);
        var mais = el('button', 'gr-more', 'Ler mais');
        mais.type = 'button'; mais.hidden = true;
        mais.addEventListener('click', function () {
          var aberto = card.classList.toggle('is-open');
          mais.textContent = aberto ? 'Ler menos' : 'Ler mais';
        });
        card.appendChild(mais);
        lista.appendChild(card);
        if (txt.scrollHeight > txt.clientHeight + 2) mais.hidden = false;
      });
    });
  }

  /* =========================================================
     MONTADOR DE PACOTES (página /pacotes)
     ========================================================= */
  function setupPacotes() {
    var root = document.getElementById('pk');
    if (!root) return;

    var tourIds = Object.keys(TOURS);
    var quartos = {};
    POUSADAS.forEach(function (p) { p.quartos.forEach(function (q) { q.pousada = p.nome; q.foto = q.foto || p.foto; quartos[q.id] = q; }); });

    function opt(tipo, nome, valor, img, titulo, meta, preco) {
      return '<label class="pk-opt"><input type="' + tipo + '" name="' + nome + '" value="' + valor + '">' +
        '<span class="pk-opt__box">' + (img ? '<img src="' + img + '" alt="" loading="lazy" width="54" height="54">' : '') +
        '<span class="pk-opt__txt"><span class="pk-opt__name">' + titulo + '</span><span class="pk-opt__meta">' + meta + '</span></span>' +
        (preco ? '<span class="pk-opt__price">' + preco + '</span>' : '') +
        '<span class="pk-opt__mark">' + ICON.check + '</span></span></label>';
    }

    var html = '<fieldset><legend><b>1</b> Escolha os passeios</legend><div class="pk-opts">';
    tourIds.forEach(function (id) {
      var t = TOURS[id];
      html += opt('checkbox', 'passeio', id, t.foto, t.nome, t.unidade, brl(t.preco));
    });
    html += '</div></fieldset>';

    html += '<fieldset><legend><b>2</b> Escolha a hospedagem</legend><div class="pk-opts">';
    html += opt('radio', 'quarto', '', null, 'Sem hospedagem', 'Já tenho onde ficar', '');
    POUSADAS.forEach(function (p) {
      html += '<p class="pk-group">' + p.nome + '</p>';
      p.quartos.forEach(function (q) {
        html += opt('radio', 'quarto', q.id, q.foto, q.nome, q.meta, q.diaria ? brl(q.diaria) + '<br><small>diária</small>' : '<small>sob<br>consulta</small>');
      });
    });
    html += '</div></fieldset>';

    html += '<fieldset><legend><b>3</b> Datas e pessoas</legend>' +
      '<span class="bk__label" id="pk-dl" style="margin-top:0">Data de chegada</span>' +
      '<div data-cal role="group" aria-labelledby="pk-dl"></div>' +
      '<div class="pk-row" style="margin-top:14px">' +
        '<div data-noites-wrap><span class="bk__label" id="pk-nl">Noites</span><div data-noites data-rotulo="noites" role="group" aria-labelledby="pk-nl"></div></div>' +
        '<div><span class="bk__label" id="pk-pl">Pessoas</span><div data-pessoas data-rotulo="pessoas" role="group" aria-labelledby="pk-pl"></div></div>' +
      '</div><p class="pk-warn" data-warn aria-live="polite"></p></fieldset>';

    html += '<fieldset><legend><b>4</b> Seu nome</legend>' +
      '<input class="bk__input" id="pk-nome" autocomplete="name" placeholder="Nome completo" aria-label="Seu nome"></fieldset>';

    html += '<div class="pk-sum" aria-live="polite"><h3>Resumo do pacote</h3><ul data-linhas></ul>' +
      '<div class="pk-sum__total"><span>Estimativa</span><strong data-total>R$ 0,00</strong></div>' +
      '<small data-nota>Estimativa com base nos valores do site. A Petom Tur confirma disponibilidade, valor final e a ordem dos passeios pelo WhatsApp. Pagamento em dinheiro, cartão ou Pix.</small>' +
      '<p class="bk__err" data-err hidden></p>' +
      '<button type="submit" class="btn-wa">' + ICON.wa + ' Enviar pacote pelo WhatsApp</button></div>';

    root.innerHTML = html;
    root.querySelector('input[name="quarto"][value=""]').checked = true;

    var chegada = null;
    var cal = new Calendario(root.querySelector('[data-cal]'), function (d) { chegada = d; atualizar(); });
    var noites = new Stepper(root.querySelector('[data-noites]'), 1, 30, 2, atualizar);
    var pessoas = new Stepper(root.querySelector('[data-pessoas]'), 1, 40, 2, atualizar);

    function selecionados() {
      return Array.prototype.map.call(root.querySelectorAll('input[name="passeio"]:checked'), function (i) { return i.value; });
    }
    function quartoSel() {
      var r = root.querySelector('input[name="quarto"]:checked');
      return r && r.value ? quartos[r.value] : null;
    }

    function calcular() {
      var itens = [], total = 0, consulta = false;
      selecionados().forEach(function (id) {
        var t = TOURS[id], est = estimar(t, pessoas.valor);
        itens.push({ titulo: t.nome, desc: est.desc, valor: est.valor });
        total += est.valor;
      });
      var q = quartoSel();
      if (q) {
        if (q.diaria) {
          var v = q.diaria * noites.valor;
          itens.push({ titulo: q.pousada + ' — ' + q.nome, desc: noites.valor + (noites.valor > 1 ? ' noites' : ' noite') + ' × ' + brl(q.diaria), valor: v });
          total += v;
        } else {
          itens.push({ titulo: q.pousada + ' — ' + q.nome, desc: noites.valor + (noites.valor > 1 ? ' noites' : ' noite') + ' · valor sob consulta', valor: null });
          consulta = true;
        }
      }
      return { itens: itens, total: total, consulta: consulta, quarto: q };
    }

    function atualizar() {
      var c = calcular();
      root.querySelector('[data-noites-wrap]').hidden = !c.quarto;
      var ul = root.querySelector('[data-linhas]');
      ul.innerHTML = '';
      if (!c.itens.length) ul.appendChild(el('li', null, 'Escolha pelo menos um passeio ou uma hospedagem.'));
      c.itens.forEach(function (it) {
        var li = el('li');
        var a = el('span'); a.appendChild(el('span', null, it.titulo)); a.appendChild(el('br')); a.appendChild(el('small', null, it.desc));
        li.appendChild(a);
        li.appendChild(el('span', null, it.valor == null ? 'consultar' : brl(it.valor)));
        ul.appendChild(li);
      });
      if (chegada) {
        var li = el('li');
        li.appendChild(el('span', null, 'Chegada' + (c.quarto ? ' / saída' : '')));
        li.appendChild(el('span', null, dataCurta(chegada).slice(5) + (c.quarto ? ' → ' + dataCurta(addDias(chegada, noites.valor)).slice(5) : '')));
        ul.appendChild(li);
      }
      root.querySelector('[data-total]').textContent = (c.consulta ? 'a partir de ' : '') + brl(c.total);
      root.querySelector('[data-warn]').textContent = c.quarto && pessoas.valor > c.quarto.cap
        ? 'A acomodação ' + c.quarto.nome + ' comporta até ' + c.quarto.cap + ' pessoas. A equipe pode sugerir outra acomodação.'
        : '';
    }

    root.addEventListener('change', atualizar);

    root.addEventListener('submit', function (e) {
      e.preventDefault();
      var c = calcular(), err = root.querySelector('[data-err]');
      var nome = root.querySelector('#pk-nome').value.trim();
      var falta = [];
      if (!c.itens.length) falta.push('escolha um passeio ou hospedagem');
      if (!chegada) falta.push('escolha a data de chegada');
      if (!nome) falta.push('informe seu nome');
      if (falta.length) {
        err.textContent = 'Falta: ' + falta.join(', ') + '.';
        err.hidden = false;
        return;
      }
      err.hidden = true;
      var linhas = ['Olá, Petom Tur! Quero montar um pacote pelo site:', ''];
      var passeios = selecionados();
      if (passeios.length) {
        linhas.push('*Passeios*');
        passeios.forEach(function (id) {
          var t = TOURS[id], est = estimar(t, pessoas.valor);
          linhas.push('• ' + t.nome + ' — ' + est.desc + ' = ' + brl(est.valor));
        });
        linhas.push('');
      }
      if (c.quarto) {
        linhas.push('*Hospedagem*');
        linhas.push('• ' + c.quarto.pousada + ' — ' + c.quarto.nome);
        linhas.push('  ' + noites.valor + (noites.valor > 1 ? ' noites' : ' noite') + (c.quarto.diaria ? ' × ' + brl(c.quarto.diaria) + ' = ' + brl(c.quarto.diaria * noites.valor) : ' (valor sob consulta)'));
        linhas.push('');
      }
      linhas.push('Chegada: ' + dataCurta(chegada));
      if (c.quarto) linhas.push('Saída: ' + dataCurta(addDias(chegada, noites.valor)));
      linhas.push('Pessoas: ' + pessoas.valor);
      linhas.push('Estimativa: ' + (c.consulta ? 'a partir de ' : '') + brl(c.total));
      linhas.push('Nome: ' + nome);
      linhas.push('');
      linhas.push('Pode confirmar disponibilidade e valor final?');
      evento('generate_lead', { tipo: 'pacote', passeios: passeios.join(','), hospedagem: c.quarto ? c.quarto.nome : 'nenhuma', pessoas: pessoas.valor, value: Math.round(c.total * 100) / 100, currency: 'BRL' });
      abrirWhats(linhas.join('\n'));
    });

    /* roteiros prontos: botões [data-preset] e ?p=buggy,lancha&n=2 */
    function aplicar(lista, n) {
      root.querySelectorAll('input[name="passeio"]').forEach(function (i) { i.checked = lista.indexOf(i.value) !== -1; });
      if (n) noites.set(n);
      atualizar();
    }
    document.querySelectorAll('[data-preset]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        aplicar(b.getAttribute('data-preset').split(','), +b.getAttribute('data-noites') || 0);
        root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    try {
      var qs = new URLSearchParams(window.location.search);
      if (qs.get('p')) aplicar(qs.get('p').split(',').filter(function (id) { return TOURS[id]; }), +qs.get('n') || 0);
    } catch (e2) { /* navegador antigo */ }

    atualizar();
  }

  function setupCliquesWhats() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href*="wa.me/"]');
      if (!a || a.hasAttribute('data-reserva')) return;
      evento('contato_whatsapp', { origem: a.className || 'link' });
    });
    document.addEventListener('submit', function (e) {
      if (e.target.classList && e.target.classList.contains('room__form')) evento('generate_lead', { tipo: 'pousada' });
    }, true);
  }

  /* =========================================================
     AVISO DE COOKIES (LGPD) — o Analytics só carrega após "Aceitar"
     ========================================================= */
  function setupCookies() {
    var CHAVE = 'petom_cookies', banner = null;
    function ler() { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } }
    function gravar(v) { try { localStorage.setItem(CHAVE, v); } catch (e) { /* sem storage: vale só nesta visita */ } }
    function fechar() { if (banner) { banner.remove(); banner = null; } }
    function apagarCookiesGA() {
      var partes = location.hostname.split('.');
      document.cookie.split(';').forEach(function (c) {
        var nome = c.split('=')[0].trim();
        if (!/^_ga/.test(nome)) return;
        document.cookie = nome + '=; Max-Age=0; path=/';
        for (var i = 0; i < partes.length - 1; i++) {
          document.cookie = nome + '=; Max-Age=0; path=/; domain=.' + partes.slice(i).join('.');
        }
      });
    }
    function aceitar() {
      gravar('aceito');
      if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: 'granted' });
      if (typeof window.petomGA === 'function') window.petomGA();
      fechar();
    }
    function recusar() {
      gravar('recusado');
      if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: 'denied' });
      apagarCookiesGA();
      fechar();
    }
    function mostrar() {
      if (banner) return;
      banner = el('div', 'ck');
      banner.setAttribute('role', 'region');
      banner.setAttribute('aria-label', 'Aviso de cookies');
      banner.innerHTML =
        '<p class="ck__txt"><strong>Cookies</strong>Usamos cookies do Google Analytics para medir as visitas e melhorar o site. Eles só são ativados se você aceitar.' +
        '<span>Você pode mudar sua escolha quando quiser em “Preferências de cookies”, no rodapé.</span></p>' +
        '<div class="ck__btns"><button type="button" class="ck__btn ck__btn--no">Recusar</button>' +
        '<button type="button" class="ck__btn ck__btn--ok">Aceitar</button></div>';
      banner.querySelector('.ck__btn--ok').addEventListener('click', aceitar);
      banner.querySelector('.ck__btn--no').addEventListener('click', recusar);
      document.body.appendChild(banner);
    }
    if (!ler()) mostrar();
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-cookies]')) { e.preventDefault(); mostrar(); }
    });
  }

  function iniciar() {
    setupCookies();
    setupCliquesWhats();
    setupReserva();
    setupAvaliacoes();
    setupPacotes();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
