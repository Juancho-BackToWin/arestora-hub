/* Sesión del Arestora Hub.
   Mismo método y mismas cuentas que Radar Arestora: Supabase (proyecto captacion-arestora),
   usuario y contraseña, sin correos. Aquí solo va la clave PÚBLICA (anon): lo que cada
   cuenta puede ver lo decide la base de datos con RLS (tabla hub_paneles, solo
   administradores activos), no esta página.
   Los datos privados nunca pasan por el service worker ni se guardan en localStorage. */
(function(){
  const URL_SB = "https://delrtxytlntzpwobycad.supabase.co";
  const CLAVE_PUBLICA = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbHJ0eHl0bG50enB3b2J5Y2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNDkzMTksImV4cCI6MjEwMzkyNTMxOX0.Us56HyAjrDWI2e6BzmlXGHbP51ovKc4Ww5ekO6t4lsY";
  const CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js";
  const LLAVE = "sb-delrtxytlntzpwobycad-auth-token";
  let cli = null, cargando = null;

  function cargarLib(){
    if(window.supabase && window.supabase.createClient) return Promise.resolve();
    if(cargando) return cargando;
    cargando = new Promise((ok, mal) => {
      const s = document.createElement("script");
      s.src = CDN; s.async = true; s.crossOrigin = "anonymous";
      s.onload = () => ok(); s.onerror = () => { cargando = null; mal(new Error("No se pudo cargar el inicio de sesión")); };
      document.head.appendChild(s);
    });
    return cargando;
  }
  async function cliente(){
    if(cli) return cli;
    await cargarLib();
    cli = window.supabase.createClient(URL_SB, CLAVE_PUBLICA, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storageKey: LLAVE }
    });
    return cli;
  }
  // Pista barata, sin red: ¿hay una sesión guardada en este navegador? No prueba que sea válida.
  function quizaConSesion(){ try{ return !!localStorage.getItem(LLAVE); }catch(e){ return false; } }
  async function sesion(){
    const c = await cliente();
    const { data } = await c.auth.getSession();
    return data && data.session ? data.session : null;
  }
  function irAEntrar(){
    const volver = location.pathname.replace(/^\//, "") + location.search;
    location.replace("entrar.html?volver=" + encodeURIComponent(volver || "hub.html"));
  }
  // Para las páginas privadas: sin sesión, a entrar.html; con sesión, devuelve el cliente.
  async function exigir(){
    const s = await sesion();
    if(!s){ irAEntrar(); return null; }
    return cliente();
  }
  // Lee un panel. Devuelve {datos, actualizado, origen}, null si la cuenta no puede verlo
  // o aún no existe, y lanza error si falla la conexión.
  async function leerPanel(clave){
    const c = await cliente();
    const { data, error } = await c.from("hub_paneles").select("datos,actualizado,origen").eq("clave", clave).maybeSingle();
    if(error) throw error;
    return data || null;
  }
  async function entrar(usuario, clave){
    const id = String(usuario || "").trim().toLowerCase();
    const email = id.includes("@") ? id : id + "@grupoarestora.com";
    const c = await cliente();
    const { error } = await c.auth.signInWithPassword({ email, password: clave });
    if(error) throw error;
  }
  async function salir(){
    try{ const c = await cliente(); await c.auth.signOut(); }catch(e){}
    try{ localStorage.removeItem(LLAVE); localStorage.removeItem("hub_tareas"); }catch(e){}
    location.href = "hub.html";
  }
  window.HubSesion = { cliente, sesion, exigir, leerPanel, entrar, salir, quizaConSesion, irAEntrar };
})();
