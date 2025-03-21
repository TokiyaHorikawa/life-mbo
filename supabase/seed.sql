-- Enable the pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Delete existing test user if exists
DELETE FROM auth.users WHERE email = 'test@example.com';
DELETE FROM public.users WHERE id = 'd0d4e39c-4f1a-4d2d-9390-fade78932c3b';

-- Create a test user with email/password authentication
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'test@example.com') THEN
    INSERT INTO auth.users (
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      created_at,
      updated_at,
      confirmation_sent_at
    ) VALUES (
      'd0d4e39c-4f1a-4d2d-9390-fade78932c3b',
      'authenticated',
      'authenticated',
      'test@example.com',
      crypt('password123', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      false,
      now(),
      now(),
      now()
    );
  END IF;
END
$$;

-- Insert the corresponding profile
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = 'd0d4e39c-4f1a-4d2d-9390-fade78932c3b') THEN
    INSERT INTO public.users (id, name)
    VALUES (
      'd0d4e39c-4f1a-4d2d-9390-fade78932c3b',
      'Test User'
    );
  END IF;
END
$$;
