/* Autoescola Prime: script.js (JavaScript puro, sem dependências) */

/* ===== CONFIGURAÇÃO DO WHATSAPP =====
   ATENÇÃO: o número abaixo é FICTÍCIO.
   Antes de publicar, troque pelo número autorizado do cliente:
   código do país + DDD + número, só dígitos (exemplo: 5511999999999). */
var WHATSAPP_NUMERO = "5500000000000";
var MENSAGEM_INICIAL = "Olá! Gostaria de conhecer os serviços e as condições para tirar minha habilitação.";

(function () {
  "use strict";
  var i;

  /* Links do WhatsApp: data-wa vazio usa a mensagem inicial;
     data-wa="Serviço" pergunta as condições daquele serviço. */
  var links = document.querySelectorAll("[data-wa]");
  for (i = 0; i < links.length; i++) {
    var servico = links[i].getAttribute("data-wa");
    var texto = servico ? "Olá! Gostaria de saber as condições de: " + servico + "." : MENSAGEM_INICIAL;
    links[i].href = "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(texto);
    links[i].target = "_blank";
    links[i].rel = "noopener noreferrer";
  }

  /* Menu do celular: abre e fecha pelo botão, ao clicar num link ou com a tecla Esc */
  var nav = document.getElementById("nav");
  var botao = document.getElementById("mb");
  function menu(abrir) {
    nav.classList.toggle("open", abrir);
    botao.setAttribute("aria-expanded", abrir ? "true" : "false");
    botao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
  }
  botao.addEventListener("click", function () {
    menu(!nav.classList.contains("open"));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) { menu(false); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) { menu(false); botao.focus(); }
  });

  /* Fecha o menu ao clicar fora dele ou ao girar/aumentar a tela */
  document.addEventListener("click", function (e) {
    if (nav.classList.contains("open") && !e.target.closest(".top")) { menu(false); }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024 && nav.classList.contains("open")) { menu(false); }
  });

  /* Animação de entrada: mostra cada bloco .rv quando ele aparece na tela */
  var blocos = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (itens) {
      itens.forEach(function (item) {
        if (item.isIntersecting) {
          item.target.classList.add("on");
          obs.unobserve(item.target);
        }
      });
    }, { threshold: 0.15 });
    blocos.forEach(function (b) { obs.observe(b); });
  } else {
    blocos.forEach(function (b) { b.classList.add("on"); });
  }

  /* Ano do rodapé */
  document.getElementById("ano").textContent = new Date().getFullYear();
})();
