// =================== DOM READY ===================
document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     CUSTOM SELECT (ENHANCED + FIXED)
  ===================================================== */
  let hiddenSelect = null;
  let selectTrigger = null;
  let customOptions = [];

  document.querySelectorAll(".custom-select").forEach(select => {
    const trigger = select.querySelector(".custom-select-trigger");
    const options = select.querySelectorAll(".custom-option");
    const hiddenInput = select.querySelector('input[type="hidden"]');

    if (!trigger || !options.length || !hiddenInput) return;

    hiddenSelect = hiddenInput;
    selectTrigger = trigger;
    customOptions = options;

    let focusedIndex = -1;

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllCustomSelects(select);
      select.classList.toggle("open");
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        selectOption(option);
      });
      option.setAttribute("tabindex", "-1");
    });

    trigger.addEventListener("keydown", (e) => {
      if (!select.classList.contains("open")) {
        if (["ArrowDown", "Enter", " "].includes(e.key)) {
          e.preventDefault();
          closeAllCustomSelects(select);
          select.classList.add("open");
          focusedIndex = 0;
          options[0].focus();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          focusedIndex = (focusedIndex + 1) % options.length;
          options[focusedIndex].focus();
          break;

        case "ArrowUp":
          e.preventDefault();
          focusedIndex = (focusedIndex - 1 + options.length) % options.length;
          options[focusedIndex].focus();
          break;

        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0) selectOption(options[focusedIndex]);
          break;

        case "Escape":
          select.classList.remove("open");
          trigger.focus();
          break;
      }
    });

    function selectOption(option) {
      options.forEach(o => o.classList.remove("selected"));
      option.classList.add("selected");

      trigger.textContent = option.textContent;
      hiddenInput.value = option.dataset.value || "";

      select.classList.remove("open");
      trigger.focus();
    }
  });

  document.addEventListener("click", () => {
    closeAllCustomSelects();
  });

  function closeAllCustomSelects(except = null) {
    document.querySelectorAll(".custom-select.open").forEach(sel => {
      if (sel !== except) sel.classList.remove("open");
    });
  }

  /* =====================================================
     SIDEBAR FORM SWITCHING (LOGIN / SIGNUP / FORGOT)
     ✅ FIXED & WORKING
  ===================================================== */
  const menuLinks = document.querySelectorAll(".sidebar-menu a");
  const forms = document.querySelectorAll(".form-card");

  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetFormId = link.dataset.form;
      if (!targetFormId) return;

      // Remove active menu glow
      menuLinks.forEach(l => l.classList.remove("active"));

      // Hide all forms
      forms.forEach(form => form.classList.remove("active"));

      // Activate clicked menu
      link.classList.add("active");

      // Show selected form
      const targetForm = document.getElementById(targetFormId);
      if (targetForm) {
        targetForm.classList.add("active");
      }
    });
  });

  /* =====================================================
     CARD REVEAL ON SCROLL
  ===================================================== */
  const cards = document.querySelectorAll(".card");

  if (cards.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(card => observer.observe(card));
  }

});
