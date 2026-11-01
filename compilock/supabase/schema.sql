-- CompiLock: esquema do banco (Supabase / Postgres)
-- Cole tudo no SQL Editor do Supabase e execute uma vez.

create extension if not exists pgcrypto;

create table pastas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  ordem int not null default 0,
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);

create table subclasses (
  id uuid primary key default gen_random_uuid(),
  pasta_id uuid not null references pastas(id) on delete cascade,
  nome text not null,
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);

create table produtos (
  id uuid primary key default gen_random_uuid(),
  subclasse_id uuid not null references subclasses(id) on delete cascade,
  nome text not null,
  unidade text not null default 'un',          -- saco, metro, lata, un...
  estoque_minimo numeric not null default 0,   -- abaixo disso: "Estoque baixo"
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);

create table fotos (
  id uuid primary key default gen_random_uuid(),
  produto_id uuid not null references produtos(id) on delete cascade,
  caminho text not null,                       -- caminho dentro do bucket "fotos"
  criado_em timestamptz not null default now()
);

-- Cada entrada/saída é um registro. O id é gerado no celular (funciona offline
-- e não duplica se o envio for repetido). "Desfazer" marca desfeito = true.
create table movimentos (
  id uuid primary key,
  produto_id uuid not null references produtos(id) on delete cascade,
  tipo text not null check (tipo in ('entrada', 'saida')),
  quantidade numeric not null check (quantidade > 0),
  observacao text,
  desfeito boolean not null default false,
  criado_em timestamptz not null default now()
);
create index on movimentos (produto_id, criado_em desc);

-- Estoque atual = entradas - saídas (ignorando as desfeitas)
create view estoque_atual with (security_invoker = on) as
select p.id as produto_id,
       coalesce(sum(case when m.desfeito then 0
                         when m.tipo = 'entrada' then m.quantidade
                         else -m.quantidade end), 0) as saldo
from produtos p
left join movimentos m on m.produto_id = p.id
group by p.id;

-- Segurança (RLS): só usuário logado acessa. Depois de criar a conta do vô,
-- DESATIVE "Allow new users to sign up" em Authentication > Sign In / Providers.
do $$
declare t text;
begin
  foreach t in array array['pastas','subclasses','produtos','fotos','movimentos'] loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "acesso autenticado" on %I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

-- Fotos: bucket público para leitura, escrita só para logado
insert into storage.buckets (id, name, public) values ('fotos', 'fotos', true)
on conflict (id) do nothing;

create policy "fotos: enviar" on storage.objects for insert to authenticated
  with check (bucket_id = 'fotos');
create policy "fotos: atualizar" on storage.objects for update to authenticated
  using (bucket_id = 'fotos');
create policy "fotos: apagar" on storage.objects for delete to authenticated
  using (bucket_id = 'fotos');
