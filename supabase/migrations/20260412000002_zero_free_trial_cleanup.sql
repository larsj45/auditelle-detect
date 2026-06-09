-- Remove residual free-trial behavior after switching to pay-per-scan entry
UPDATE public.profiles
SET trial_ends_at = NULL,
    trial_reminder_days_sent = '{}',
    trial_ended_email_sent = TRUE
WHERE plan = 'free';

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
    NULL
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
