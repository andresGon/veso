-- 1. ENUMs
create type gender         as enum ('men','women');
create type category_men   as enum ('jackets','accessories');
create type category_women as enum ('jackets','footwear');
create type cart_status    as enum ('active','ordered');

-- 2. Tabla de perfiles (1-1 con auth.users)
create table profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  avatar_url text,
  address    jsonb,
  created_at timestamptz default now()
);

-- 3. Productos
create table products (
  id          bigint generated always as identity primary key,
  slug        text unique,
  title       text,
  gender      gender,
  category_men   category_men,
  category_women category_women,
  price       numeric(10,2),
  discount    numeric(5,2) default 0,
  rating      numeric(2,1) default 0 check (rating <= 5),
  stock       int check (stock >= 0),
  images      text[],
  tags        text[],
  created_at  timestamptz default now()
);

-- Índices para filtros veloces
create index products_gender_cat_men   on products (gender, category_men)
  where gender = 'men';
create index products_gender_cat_women on products (gender, category_women)
  where gender = 'women';
create index products_tags on products using gin(tags);

-- 4. Carrito
create table carts (
  id         bigint generated always as identity primary key,
  user_id    uuid references auth.users(id),
  status     cart_status default 'active',
  created_at timestamptz default now()
);
create index carts_user_status on carts (user_id, status);

create table cart_items (
  id          bigint generated always as identity primary key,
  cart_id     bigint references carts(id) on delete cascade,
  product_id  bigint references products(id),
  qty         int check (qty > 0),
  unit_price  numeric(10,2),
  unique (cart_id, product_id)
);

-- 5. Órdenes
create table orders (
  id            bigint generated always as identity primary key,
  user_id       uuid references auth.users(id),
  cart_id       bigint references carts(id),
  amount        numeric(10,2),
  payment_intent text,
  created_at    timestamptz default now()
);

create table order_items (
  id          bigint generated always as identity primary key,
  order_id    bigint references orders(id) on delete cascade,
  product_id  bigint references products(id),
  qty         int,
  unit_price  numeric(10,2)
);
