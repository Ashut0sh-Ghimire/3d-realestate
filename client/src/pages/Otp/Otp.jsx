// Screen:    Otp
// URL:       ROUTES.OTP  ("/verify")
// Owner:     M2  (see docs/TEAM.md)
// Wireframe: 3 Sign Up / Role
// Job:       6-digit OTP input + resend timer. Calls AUTH.VERIFY_OTP / AUTH.RESEND_OTP.
//
// Keep everything that only this screen uses inside this folder
// (e.g. pages/Otp/components/). Shared pieces go in src/components/.

export default function Otp() {
  return (
    <main className="page">
      <h1 className="page-title">Otp</h1>
      <p className="text-muted">
        Not built yet. 6-digit OTP input + resend timer. Calls AUTH.VERIFY_OTP / AUTH.RESEND_OTP.
      </p>
    </main>
  );
}
