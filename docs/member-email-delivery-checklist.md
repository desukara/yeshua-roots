# Member email confirmation launch checklist

The frontend cannot fix Supabase Auth project URL settings or the hosted email service's sending quota.

## Supabase dashboard — project umngheuvqudwqksqzfch

1. Open Authentication → URL Configuration.
2. Set **Site URL** to `https://yeshuaroots.com` (not localhost or a temporary deployment URL).
3. Add exact **Redirect URLs**:
   - `https://yeshuaroots.com/members`
   - `https://www.yeshuaroots.com/members`
   - `https://yeshuaroots.com/members/reset-password`
   - `https://www.yeshuaroots.com/members/reset-password`
4. Under Authentication → Providers → Email, verify email confirmation is enabled as intended.
5. Under Authentication → Email Templates, inspect the **Confirm signup** and **Reset password** links. The default Supabase branding and project URL may appear until a branded sender and templates are configured. Never put a plain application URL in place of the token-bearing confirmation link.
6. Configure a verified, custom SMTP provider for dependable production email sending, and review the project's Auth rate limits. Supabase's default email service is limited and intended for testing, not a production ministry launch. Do not solve rate limits by repeatedly pressing signup.
7. Test with a **new** email address: create account → see pending confirmation → receive email → click confirmation → land on `/members` → sign in → sign out → request password reset → open reset email → set new password → sign in. Also test an expired link and a repeated submission.

Do not mark signup as production-verified until this full test passes. No email credentials should be committed to GitHub or exposed through NEXT_PUBLIC variables.

Reference: https://supabase.com/docs/guides/auth/redirect-urls and https://supabase.com/docs/guides/auth/auth-smtp
