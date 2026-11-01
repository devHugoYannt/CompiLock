import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { db } from './lib/local';
import { iniciarSyncAutomatico, sincronizar } from './lib/sync';

// Ponto de partida: login + sincronização. As telas do protótipo entram aqui.
export default function App() {
  const [sessao, setSessao] = useState(null);
  const [pronto, setPronto] = useState(false);
  const [erro, setErro] = useState('');
  const [pendentes, setPendentes] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSessao(data.session);
      setPronto(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSessao(s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!sessao) return;
    iniciarSyncAutomatico();
    const t = setInterval(async () => setPendentes(await db.outbox.count()), 2000);
    return () => clearInterval(t);
  }, [sessao]);

  async function entrar(e) {
    e.preventDefault();
    const f = new FormData(e.target);
    const { error } = await supabase.auth.signInWithPassword({
      email: f.get('email'),
      password: f.get('senha')
    });
    setErro(error ? 'E-mail ou senha incorretos.' : '');
  }

  if (!pronto) return null;

  if (!sessao) {
    return (
      <form onSubmit={entrar} style={{ padding: 24, display: 'grid', gap: 16 }}>
        <h1>CompiLock</h1>
        <input className="campo" name="email" type="email" placeholder="E-mail" required />
        <input className="campo" name="senha" type="password" placeholder="Senha" required />
        {erro && <p style={{ color: 'var(--alerta)' }}>{erro}</p>}
        <button className="botao">Entrar</button>
      </form>
    );
  }

  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <h1>CompiLock</h1>
      <p style={{ color: 'var(--suave)' }}>
        {pendentes === 0 ? 'Tudo sincronizado.' : `${pendentes} registro(s) aguardando internet.`}
      </p>
      <button className="botao" onClick={sincronizar}>Sincronizar agora</button>
    </main>
  );
}
