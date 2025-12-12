-- Create "Navoiyda Bugun" company and admin user
-- Password: navoiyda2024 (bcrypt hash)

-- Insert company
INSERT INTO companies (name, industry, region, plan, status, created_at, updated_at)
VALUES (
  'Navoiyda Bugun',
  'Media',
  'Navoiy',
  'premium',
  'active',
  NOW(),
  NOW()
)
ON CONFLICT DO NOTHING;

-- Get company ID
DO $$
DECLARE
  company_id_var BIGINT;
BEGIN
  SELECT id INTO company_id_var FROM companies WHERE name = 'Navoiyda Bugun' LIMIT 1;
  
  -- Insert admin user (password: navoiyda2024)
  INSERT INTO users (email, password_hash, name, role, company_id, created_at, updated_at)
  VALUES (
    'navoiyda@bugun.uz',
    '$2a$10$8AJEUMa7p43m/u16crKV6uhm7zZneRr7ZBwgACbZ2fFliadWS/i4K', -- navoiyda2024 (bcrypt)
    'Navoiyda Bugun Admin',
    'admin',
    company_id_var,
    NOW(),
    NOW()
  )
  ON CONFLICT (email) DO NOTHING;
END $$;

