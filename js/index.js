"use strict";
function init() {
  const form = document.querySelector("form");
  form &&
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = e.target[0];
      const datahora = new Date(input.value);
      window.localStorage.setItem("timestamp", datahora.getTime());
      window.location = "/contador.html";
    });
  const btnReiniciar = document.querySelector("#btnReiniciar");
  btnReiniciar &&
    btnReiniciar.addEventListener("click", (e) => {
      window.history.back();
    });
  const tempo = document.querySelector(".tempo");
  if (tempo) {
    let alertouFinal = false;
    const segundosFinal =
      new Date(+window.localStorage.getItem("timestamp")).getTime() / 1000;
    setInterval(() => {
      const segundosAgora = new Date().getTime() / 1000;

      const eSegundos = document.querySelector(".segundos>p");
      const eMinutos = document.querySelector(".minutos>p");
      const eHoras = document.querySelector(".horas>p");
      const eDias = document.querySelector(".dias>p");

      const diferencaSegundos = segundosFinal - segundosAgora;

      const dias = Math.floor(diferencaSegundos / 60 / 60 / 24);
      const horas = Math.floor(diferencaSegundos / 60 / 60);
      const minutos = Math.floor(diferencaSegundos / 60);
      const segundos = Math.floor(diferencaSegundos);

      if (
        dias < 0 &&
        horas < 0 &&
        minutos < 0 &&
        segundos < 0 &&
        !alertouFinal
      ) {
        alertouFinal = true;
        eSegundos.classList.remove("brilha");
        const h2 = document.querySelector("h2");
        h2.innerHTML = "Fim";
        h2.style.color = "red";
      }
      if (!alertouFinal) {
        eDias.innerHTML = dias < 0 ? "00" : dias.toString().padStart(2, "0");
        eHoras.innerHTML = (horas - 24 * dias).toString().padStart(2, "0");
        eMinutos.innerHTML = (minutos - 60 * horas).toString().padStart(2, "0");
        eSegundos.innerHTML = (segundos - 60 * minutos)
          .toString()
          .padStart(2, "0");
        if (dias <= 0 && horas <= 0 && minutos <= 0)
          eSegundos.classList.add("brilha");
      }
    }, 1000);
  }
}
init();
