const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const traditional = document.documentElement.lang === "zh-Hant";
const copy = traditional
  ? {
      open: "開啟導覽",
      close: "關閉導覽",
      fallback: "自動化",
      subject: "ICRT 官網詢盤：",
      name: "姓名／公司",
      email: "電子郵件",
      application: "應用場景",
      requirements: "需求描述",
      status: "已嘗試開啟郵件應用，請在該應用中確認並寄出。如未開啟，請直接寄信至 davidzh0278@sina.com；本頁已填寫的內容會保留。",
    }
  : {
      open: "Open navigation",
      close: "Close navigation",
      fallback: "Automation",
      subject: "ICRT website inquiry: ",
      name: "Name / Company",
      email: "Email",
      application: "Application",
      requirements: "Requirements",
      status: "Your email app has been requested to open. Please review and send the message there. If it does not open, email davidzh0278@sina.com directly. Your entries remain on this page.",
    };

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? copy.close : copy.open);
});

siteNav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", copy.open);
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const scenario = String(data.get("scenario") || copy.fallback);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();
  const subject = encodeURIComponent(copy.subject + scenario);
  const body = encodeURIComponent(
    [
      `${copy.name}: ${name}`,
      `${copy.email}: ${email}`,
      `${copy.application}: ${scenario}`,
      "",
      `${copy.requirements}:`,
      message,
    ].join("\n"),
  );

  window.location.href = `mailto:davidzh0278@sina.com?subject=${subject}&body=${body}`;
  formStatus.textContent = copy.status;
});
