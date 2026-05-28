import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { X } from "lucide-react";

function LoginModal({ onClose, onLogin }) {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    onLogin({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-stone-900 border border-white/10 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-white mb-2">Sign In</h2>
        <p className="text-slate-400 text-sm mb-6">to continue to MovieBaz</p>

        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.error("Login failed")}
          theme="filled_black"
          shape="rectangular"
          width="100%"
        />
      </div>
    </div>
  );
}

export default LoginModal;