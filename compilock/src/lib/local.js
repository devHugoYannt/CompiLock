// Banco local (IndexedDB): o app lê e grava aqui, mesmo sem internet.
// Tudo o que é gravado também entra na fila "outbox" para subir ao Supabase.
import Dexie from 'dexie';

export const db = new Dexie('compilock');
db.version(1).stores({
  pastas: 'id',
  subclasses: 'id, pasta_id',
  produtos: 'id, subclasse_id',
  fotos: 'id, produto_id',
  movimentos: 'id, produto_id, criado_em',
  outbox: '++seq'
});

export const novoId = () => crypto.randomUUID();

export async function salvar(tabela, registro, blob = null) {
  await db.transaction('rw', [db[tabela], db.outbox], async () => {
    await db[tabela].put(registro);
    await db.outbox.add({ tabela, registro, blob });
  });
}

export async function registrarMovimento({ produto_id, tipo, quantidade, observacao }) {
  const m = {
    id: novoId(),
    produto_id,
    tipo, // 'entrada' | 'saida'
    quantidade,
    observacao: observacao || null,
    desfeito: false,
    criado_em: new Date().toISOString()
  };
  await salvar('movimentos', m);
  return m;
}

export async function desfazerMovimento(id) {
  const m = await db.movimentos.get(id);
  if (m) await salvar('movimentos', { ...m, desfeito: true });
}

export async function saldo(produto_id) {
  const ms = await db.movimentos.where('produto_id').equals(produto_id).toArray();
  return ms.reduce(
    (total, m) => (m.desfeito ? total : total + (m.tipo === 'entrada' ? m.quantidade : -m.quantidade)),
    0
  );
}

export async function salvarFoto(produto_id, blob) {
  const id = novoId();
  await salvar('fotos', { id, produto_id, caminho: `${produto_id}/${id}.jpg` }, blob);
  return id;
}
