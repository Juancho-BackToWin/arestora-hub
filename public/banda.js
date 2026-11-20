/* Banda «Datos de hace X h» de los paneles privados del Hub (tareas y publicidad).
   Dice de un vistazo si lo que se ve está al día. La hora de referencia es la columna
   «actualizado» de hub_paneles, que pone la función hub_publicar al escribir.
   El texto se recalcula cada minuto sin volver a consultar Supabase; la consulta la
   decide cada página (como mucho una vez cada 5 minutos).
   Uso:  const banda = HubBanda.montar();   banda.fijar(actualizado, origen);   banda.fallo(); */
(function(){
  const LIMITE_H = 14;   // más de 14 h sin actualizar: algo no ha corrido (el vigilante pasa cada 12 h)
  const css = `
.banda{margin:0;padding:8px max(5vw,16px);font:500 13.5px/1.45 Poppins,system-ui,sans-serif;background:#EAEEF5;color:#5B6478;border-bottom:1px solid #DCE2EF;overflow-wrap:anywhere}
.banda.mal{background:#B8452F;color:#fff;border-bottom-color:#B8452F;font-weight:600}
.banda[hidden]{display:none}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const hora = d => d.toLocaleString("es-ES", {timeZone:"Europe/Madrid", hour:"2-digit", minute:"2-digit"});
  const dia  = d => d.toLocaleString("es-ES", {timeZone:"Europe/Madrid", day:"2-digit", month:"2-digit"});
  function hace(ms){
    const min = Math.max(0, ms) / 6e4, h = min / 60;
    if(h < 1)   return `${Math.max(1, Math.round(min))} min`;
    if(h <= 48) return `${Math.round(h)} h`;
    return `${Math.round(h / 24)} días`;
  }

  function montar(){
    let el = document.getElementById("banda");
    if(!el){
      el = document.createElement("p");
      el.id = "banda";
      document.body.insertBefore(el, document.body.firstChild);   // antes de cualquier otro contenido
    }
    el.className = "banda"; el.setAttribute("role", "status"); el.hidden = true;
    let cuando = null, origen = "", fallido = false;

    function pintar(){
      if(fallido){
        el.className = "banda mal"; el.hidden = false;
        el.textContent = "No se han podido leer los datos del panel";
        return;
      }
      if(!cuando) return;
      const ms = Date.now() - cuando.getTime();
      let t = `Datos de hace ${hace(ms)} · actualizados el ${dia(cuando)} a las ${hora(cuando)}${origen ? " por " + origen : ""}`;
      const viejo = ms > LIMITE_H * 36e5;
      if(viejo) t += " · El vigilante no ha actualizado este panel: revisa la tarea en el cuadro";
      el.className = "banda" + (viejo ? " mal" : ""); el.hidden = false;
      el.textContent = t;   // textContent: el origen lo escribe una tarea automática, nunca va como HTML
    }
    setInterval(pintar, 60 * 1000);

    return {
      /* actualizado: la columna de la fila (si faltara, la página pasa datos.ultima_revision o datos.actualizado). */
      fijar(actualizado, quien){
        const d = actualizado ? new Date(actualizado) : null;
        if(!d || isNaN(d)){ fallido = true; pintar(); return; }
        cuando = d; origen = String(quien || "").trim(); fallido = false; pintar();
      },
      fallo(){ fallido = true; pintar(); }
    };
  }

  /* Freno de consultas: true si toca consultar (la primera vez, o han pasado 5 min). */
  function puedeConsultar(estado){
    const ahora = Date.now();
    if(estado.ultima && ahora - estado.ultima < 5 * 60 * 1000) return false;
    estado.ultima = ahora; return true;
  }

  window.HubBanda = { montar, puedeConsultar };
})();
