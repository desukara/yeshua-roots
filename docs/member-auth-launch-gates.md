# Member authentication launch gates

This is a launch checklist, not a claim that registration works.

- [ ] Confirm Supabase email confirmation and redirect allowlist for https://yeshuaroots.com and www.
- [ ] Integrate pinned @supabase/supabase-js and @supabase/ssr versions with committed lockfile.
- [ ] Configure public project URL and publishable key through deployment environment; never expose service-role or secret keys.
- [ ] Implement server-verified sessions, sign-up, login, logout, email confirmation, and password recovery.
- [ ] Test unauthorized users cannot access member-only pages.
- [ ] Security-review proposed migration in supabase/migrations/20261018000100_private_prayer_foundation.sql before applying it.
- [ ] Apply migration only through an authorized reviewed process; verify RLS as anonymous, member A, and member B.
- [ ] Decide who, if anyone, can read prayer requests besides the submitter; do not silently give ministry administrators access.
- [ ] Establish retention, withdrawal/deletion, emergency disclaimer, safeguarding, and privacy notices.
- [ ] Rate-limit and abuse-test submissions before opening the form.
- [ ] Confirm the entire member and prayer experience works in both English and Hebrew.

Current state: registration and prayer submissions are NOT open. No member/prayer tables have been applied to the Yeshua Roots database.
