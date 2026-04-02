-- Add scan_credits column for pay-per-scan model
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS scan_credits INTEGER DEFAULT 0;

-- Zero out all free users: no more free scans
UPDATE profiles SET scan_credits = 0, monthly_limit = 0, scans_today = 0 WHERE plan = 'free';

-- Update signup trigger: new users get 0 credits (must pay)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, scan_credits, monthly_limit, trial_ends_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    0,
    0,
    NOW() + INTERVAL '30 days'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
