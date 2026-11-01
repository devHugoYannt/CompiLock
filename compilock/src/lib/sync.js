import { supabase } from './supabase';
import { db } from './local';

const TABELAS = ['pastas', 'subclasses', 'produtos', 'fotos', 'movimentos'];
let rodando = false;

// 1) sobe a fila (o que foi feito offline)  2) baixa o estado atual da nuvem
export async function sincronizar() {
  if (rodando) return { ok: true, motivo: 'ja-rodando' };
  if (!navigator.onLine) return { ok: false, motivo: 'offline' };
  rodando = true;
  try {
    await enviar();
    if ((await db.outbox.count()) === 0) await baixar();
    return { ok: true };
  } catch (e) {
    return { ok: false, motivo: e.message };
  } finally {
    rodando = false;
  }
}

async function enviar() {
  const fila = await db.outbox.orderBy('seq').toArray();
  for (const item of fila) {
    if (item.blob) {
      const { error } = await supabase.storage
        .from('fotos')
        .upload(item.registro.caminho, item.blob, { upsert: true, contentType: 'image/jpeg' });
      if (error) throw error;
    }
    const { error } = await supabase.from(item.tabela).upsert(item.registro);
    if (error) throw error;
    await db.outbox.delete(item.seq);
  }
}

async function baixar() {
  for (const t of TABELAS) {
    const linhas = [];
    for (let de = 0; ; de += 1000) {
      const { data, error } = await supabase.from(t).select('*').range(de, de + 999);
      if (error) throw error;
      linhas.push(...data);
      if (data.length < 1000) break;
    }
    await db.transaction('rw', db[t], async () => {
      await db[t].clear();
      await db[t].bulkPut(linhas);
    });
  }
}

export function iniciarSyncAutomatico() {
  window.addEventListener('online', sincronizar);
  setInterval(sincronizar, 60_000);
  sincronizar();
}
