export default function VerifyEmail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleVerify = async () => {
    try {
      setLoading(true);
      await authService.verifyAccount({ email: state?.email, otp: otp.join("") });
      navigate("/login");
    } catch (err) {
      setErrors({ otp: "Invalid or expired OTP" });
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... UI with OTP inputs using authService.verifyAccount
    <div className="p-8">
      <h1>Verify Email</h1>
      <p>Enter the code sent to {state?.email}</p>
      {/* ... OTP inputs ... */}
      <button onClick={handleVerify} disabled={loading}>{loading ? "Verifying..." : "Verify"}</button>
    </div>
  );
}
