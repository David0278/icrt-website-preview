const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const scenario = data.get("scenario") || "自动化";
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();
  const subject = encodeURIComponent(`ICRT 官网询盘：${scenario}`);
  const body = encodeURIComponent(
    [
      `姓名 / 公司：${name}`,
      `邮箱：${email}`,
      `应用场景：${scenario}`,
      "",
      "需求描述：",
      message,
    ].join("\n"),
  );

  window.location.href = `mailto:davidzh0278@sina.com?subject=${subject}&body=${body}`;
  formStatus.textContent = "已尝试打开邮件应用，请在邮件应用中确认并发送。如未打开，可直接发邮件至 davidzh0278@sina.com；已填写内容会保留。";
});
