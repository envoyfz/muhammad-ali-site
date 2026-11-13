"use strict";

document.documentElement.classList.add("js");

const progressBar = document.getElementById("progress-bar");
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
const navLinks = Array.from(document.querySelectorAll(".main-nav a"));
const backToTop = document.getElementById("back-to-top");

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = Math.min(100, Math.max(0, progress)) + "%";
  backToTop.classList.toggle("is-visible", window.scrollY > 550);
}
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

function closeMenu() {
  mainNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}
menuToggle.addEventListener("click", function () {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  mainNav.classList.toggle("is-open", open);
});
navLinks.forEach(function (link) { link.addEventListener("click", closeMenu); });
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeMenu();
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (item) { revealObserver.observe(item); });

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const current = "#" + entry.target.id;
      navLinks.forEach(function (link) {
        if (link.getAttribute("href") === current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  document.querySelectorAll("main section[id]").forEach(function (section) { sectionObserver.observe(section); });
} else {
  document.querySelectorAll(".reveal").forEach(function (item) { item.classList.add("is-visible"); });
}

const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const timelineItems = Array.from(document.querySelectorAll(".timeline-item"));
const timelineFeedback = document.getElementById("timeline-feedback");
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const filter = button.dataset.filter;
    let visibleCount = 0;
    filterButtons.forEach(function (candidate) {
      const selected = candidate === button;
      candidate.classList.toggle("is-active", selected);
      candidate.setAttribute("aria-pressed", String(selected));
    });
    timelineItems.forEach(function (item) {
      const matches = filter === "all" || item.dataset.category.split(" ").includes(filter);
      item.hidden = !matches;
      if (matches) {
        item.classList.add("is-visible");
        visibleCount += 1;
      }
    });
    timelineFeedback.textContent = filter === "all" ? "" : visibleCount + " acontecimentos exibidos.";
  });
});

document.querySelectorAll(".fact-card").forEach(function (card) {
  card.addEventListener("click", function () {
    const expanded = card.getAttribute("aria-expanded") === "true";
    card.setAttribute("aria-expanded", String(!expanded));
    const action = card.querySelector(".fact-action");
    action.firstChild.textContent = expanded ? "Toque para ler " : "Toque para recolher ";
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");
let previousFocus = null;

document.querySelectorAll(".gallery-open").forEach(function (button) {
  button.addEventListener("click", function () {
    previousFocus = button;
    const thumbnail = button.querySelector("img");
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = thumbnail ? thumbnail.alt : "";
    lightboxCaption.textContent = button.dataset.caption || (thumbnail ? thumbnail.alt : "");
    if (typeof lightbox.showModal === "function") lightbox.showModal();
    else window.open(button.dataset.full, "_blank", "noopener");
    lightboxClose.focus();
  });
});
function closeLightbox() {
  if (lightbox.open) lightbox.close();
}
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) closeLightbox();
});
lightbox.addEventListener("close", function () {
  lightboxImage.removeAttribute("src");
  if (previousFocus) previousFocus.focus();
});

const qrForm = document.getElementById("qrcode-form");
const qrInput = document.getElementById("public-url");
const qrStatus = document.getElementById("qr-status");
const qrOutput = document.getElementById("qrcode-output");
const qrContainer = document.getElementById("qrcode");
const qrDownload = document.getElementById("qr-download");
const qrClear = document.getElementById("qr-clear");
const QR_STORAGE_KEY = "muhammad-ali-site-public-url";

function setQrStatus(message, kind) {
  qrStatus.textContent = message;
  qrStatus.classList.toggle("is-error", kind === "error");
  qrStatus.classList.toggle("is-success", kind === "success");
}
function getQrFileUrl() {
  const canvas = qrContainer.querySelector("canvas");
  if (canvas) return canvas.toDataURL("image/png");
  const image = qrContainer.querySelector("img");
  if (image && image.src) return image.src;
  return "";
}
function renderQr(value) {
  if (typeof QRCode === "undefined") {
    qrOutput.hidden = true;
    setQrStatus("Não foi possível carregar a biblioteca de QR Code. Verifique sua conexão e tente novamente.", "error");
    return;
  }
  qrContainer.innerHTML = "";
  qrOutput.hidden = false;
  qrDownload.hidden = true;
  new QRCode(qrContainer, {
    text: value,
    width: 220,
    height: 220,
    colorDark: "#151515",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M
  });
  window.setTimeout(function () {
    const imageUrl = getQrFileUrl();
    if (imageUrl) {
      qrDownload.href = imageUrl;
      qrDownload.hidden = false;
    }
  }, 100);
  setQrStatus("QR Code pronto. Abra a câmera do celular para testar o endereço.", "success");
  qrClear.hidden = false;
}
function normalizePublicUrl(input) {
  let parsed;
  try { parsed = new URL(input.trim()); } catch (error) { return null; }
  if (parsed.protocol !== "https:") return null;
  const host = parsed.hostname.toLowerCase();
  if (host === "localhost" || host === "127.0.0.1" || host === "::1" || host.endsWith(".localhost") || !host.includes(".")) return null;
  parsed.hash = "";
  return parsed.toString();
}
qrForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const publicUrl = normalizePublicUrl(qrInput.value);
  if (!publicUrl) {
    qrOutput.hidden = true;
    qrDownload.hidden = true;
    setQrStatus("Informe um endereço público válido começando com https://. Endereços locais não podem ser usados.", "error");
    qrInput.focus();
    return;
  }
  try { localStorage.setItem(QR_STORAGE_KEY, publicUrl); } catch (error) { /* armazenamento opcional */ }
  renderQr(publicUrl);
});
qrClear.addEventListener("click", function () {
  try { localStorage.removeItem(QR_STORAGE_KEY); } catch (error) { /* armazenamento opcional */ }
  qrInput.value = "";
  qrContainer.innerHTML = "";
  qrOutput.hidden = true;
  qrDownload.hidden = true;
  qrClear.hidden = true;
  setQrStatus("Endereço removido. O QR Code só aparece depois de configurar um novo link.");
  qrInput.focus();
});
try {
  const savedUrl = localStorage.getItem(QR_STORAGE_KEY);
  if (savedUrl) {
    qrInput.value = savedUrl;
    qrClear.hidden = false;
    setQrStatus("Endereço público salvo neste navegador. Gere novamente para exibir o QR Code.");
  }
} catch (error) { /* armazenamento opcional */ }