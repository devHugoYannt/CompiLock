# CompiLock

Controle de estoque (entrada/saída) de materiais de construção. PWA instalável,
funciona offline e sincroniza com o Supabase (plano gratuito).

## 1. Nuvem (Supabase)
1. Crie um projeto em supabase.com.
2. SQL Editor → cole `supabase/schema.sql` → Run.
3. Authentication → Users → **Add user** (e-mail e senha do seu avô).
4. Authentication → Sign In / Providers → **desative** "Allow new users to sign up".
5. Project Settings → API → copie a URL e a chave `anon`.

## 2. Rodar no computador
```
npm install
cp .env.example .env     # preencha as duas variáveis
npm run dev
```

## 3. Publicar (HTTPS grátis, necessário para instalar no celular)
Cloudflare Pages, Vercel ou Netlify: conecte o repositório, build `npm run build`,
pasta de saída `dist`, e cadastre as duas variáveis `VITE_...` no painel.

## 4. Instalar no celular do vô
- Android: abrir o link no Chrome → menu → **Instalar app**.
- iPhone: abrir no Safari → Compartilhar → **Adicionar à Tela de Início**.

## 5. Manter o Supabase ativo
Cadastre `SUPABASE_URL` e `SUPABASE_ANON_KEY` nos *secrets* do GitHub; o workflow
`keepalive.yml` evita a pausa por inatividade do plano gratuito.

## Estrutura
- `src/lib/local.js`: banco local (IndexedDB) + fila de envio; `registrarMovimento`, `desfazerMovimento`, `saldo`.
- `src/lib/sync.js`: sobe a fila e baixa o estado da nuvem (automático ao voltar a internet).
- `src/lib/image.js`: reduz fotos antes de enviar.
- `src/App.jsx`: login + status de sincronização (as telas do protótipo entram aqui).

## Próximos passos
Telas: prateleiras → subclasses → produtos → cadastro com foto → saída/entrada → histórico → exportar CSV.
