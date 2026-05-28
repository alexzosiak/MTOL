INSERT INTO admin_users (
  id,
  email,
  password_hash,
  role
)
VALUES (
  gen_random_uuid(),
  'admin@example.com',
  'temporary_hash',
  'SUPER_ADMIN'
)
ON CONFLICT (email) DO NOTHING;