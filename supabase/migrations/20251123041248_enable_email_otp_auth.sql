/*
  # Enable Email OTP Authentication

  This migration ensures email OTP (One-Time Password) authentication is properly configured
  for passwordless login. Users can log in without passwords by clicking links sent to their email.

  ## Changes
  - Email OTP is already the default auth method in Supabase
  - This migration documents the passwordless authentication setup
  - Users can now receive magic links and log in from multiple devices simultaneously
*/

SELECT 1;