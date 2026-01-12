import ParticlePortrait from "../components/ParticlePortrait";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

function ShowMe() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8
                 bg-[radial-gradient(ellipse_at_top,_#0f2027,_#020617_70%)]
                 overflow-hidden text-slate-200"
    >
      {/* Glow frame */}
      <div className="relative">
        {/* outer glow */}
        <div
          className="absolute inset-0 rounded-2xl
                     bg-cyan-400/25 blur-2xl"
        />

        {/* glass card */}
        <div
          className="relative rounded-2xl p-4
                     bg-white/5 backdrop-blur
                     border border-white/10
                     shadow-[0_0_60px_rgba(56,189,248,0.2)]
                     animate-[float_6s_ease-in-out_infinite]"
        >
          <ParticlePortrait />
        </div>
      </div>

      {/* Text section */}
      <div className="text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-400/80">
          Creator
        </p>

        <h1 className="text-2xl md:text-3xl font-semibold">
          Basant
        </h1>

        <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
          Building things. Breaking limits.  
          Learning in public.
        </p>
      </div>

      {/* Social icons */}
      <div className="flex items-center gap-6 pt-2">
        <a
          href="https://www.instagram.com/basant__bansal/"
          target="_blank"
          rel="noreferrer"
          className="text-slate-400 hover:text-pink-500
                     transition transform hover:scale-110"
        >
          <FaInstagram className="text-2xl" />
        </a>

        <a
          href="https://github.com/basantbansal"
          target="_blank"
          rel="noreferrer"
          className="text-slate-400 hover:text-white
                     transition transform hover:scale-110"
        >
          <FaGithub className="text-2xl" />
        </a>

        <a
          href="https://www.linkedin.com/in/basant-bansal-22066036b/"
          target="_blank"
          rel="noreferrer"
          className="text-slate-400 hover:text-blue-500
                     transition transform hover:scale-110"
        >
          <FaLinkedin className="text-2xl" />
        </a>

        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="text-slate-400 hover:text-sky-400
                     transition transform hover:scale-110"
        >
          <FaTwitter className="text-2xl" />
        </a>
      </div>
    </div>
  );
}

export default ShowMe;
