const sidebar = document.querySelector(".sidebar");
const sidebarTogglebtn = document.querySelectorAll(".sidebar_toggle");
const themeTogglebtn = document.querySelector(".theme_toggle");
const themeIcon = themeTogglebtn.querySelector(".theme_icon");
const searchForm = document.querySelector(".search_form");


const updateThemeIcon = () => {
  const isDark = document.body.classList.contains("dark_theme");
  themeIcon.textContent = sidebar.classList.contains("collapsed") ? (isDark ? "light_mode" : "dark_mode") : "dark_mode";
};

// Aplica o tema escuro se estiver salvo nas preferências ou se o sistema do usuário indicar preferência por esse tema
const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme:dark)"
).matches;
const shouldUseDarkTheme =
  savedTheme === "dark" || (!savedTheme && systemPrefersDark);

document.body.classList.toggle("dark_theme", shouldUseDarkTheme);
updateThemeIcon();

// Alterna o estado (expandido/recolhido) da barra lateral ao clicar no botão correspondente
sidebarTogglebtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      updateThemeIcon();
    });
})

// Expande automaticamente a barra lateral quando o campo de pesquisa é selecionado
searchForm.addEventListener("click", () => {
    if(sidebar.classList.contains("collapsed")) {
        sidebar.classList.remove("collapsed");
        searchForm.querySelector("input").focus(); //focus the input
    }
})


// Alterna entre tema claro e escuro ao clicar no botão de troca de tema
themeTogglebtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark_theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon();
});


if(window.innerWidth > 768) sidebar.classList.add("collapsed")