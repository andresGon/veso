-- Empty all tables
TRUNCATE TABLE order_items, orders, cart_items, carts, products, profiles RESTART IDENTITY CASCADE;

-- Insert products
insert into products
  (slug, title, gender, category_men, price, discount, stock, images, tags)
values
  -- Previous products
  ('biker-cuero-vegano', 'Biker de cuero vegano', 'women', 'jackets', 120.00, 0, 30, '{"/images/no_image.png"}', '{"cuero vegano", "biker", "chaqueta", "ykk"}'),
  
  -- New products from the table
  ('denim-bomber-hybrid', 'Denim & Bomber Hybrid', 'men', 'jackets', 129.00, 15.00, 20, '{"https://res.cloudinary.com/dzlg5jcqj/image/upload/v1750794306/Biker_de_cuero_vegano_01_aac089.png", "https://res.cloudinary.com/dzlg5jcqj/image/upload/v1750794306/Biker_de_cuero_vegano_02_j5ude4.png"}', '{"denim", "bomber", "hibrida", "chaqueta"}'),
  ('parka-ligera-impermeable', 'Parka ligera impermeable', 'men', 'jackets', 165.00, 0, 25, '{"/images/no_image.png"}', '{"parka", "impermeable", "ligera", "rip-stop"}'),
  ('blazer-casual-desestructurado', 'Blazer casual desestructurado', 'men', 'jackets', 145.00, 0, 18, '{"/images/no_image.png"}', '{"blazer", "casual", "lino", "algodon"}'),
  ('abrigo-largo-lana-premium', 'Abrigo largo de lana premium', 'men', 'jackets', 219.00, 25.00, 10, '{"/images/no_image.png"}', '{"abrigo", "lana", "merino", "cashmere", "premium"}');

-- Note: Descriptions were not added as there is no 'description' column in the 'products' table.
-- Placeholder values have been used for stock and images.
