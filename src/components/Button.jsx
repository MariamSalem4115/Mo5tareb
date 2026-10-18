const styles = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  outline: "border border-slate-200 bg-white text-brand hover:bg-brand-soft",
  white: "bg-white text-brand hover:bg-brand-soft",
  ghostWhite: "border border-white/50 text-white hover:bg-white/10",
  danger: "border border-slate-200 bg-white text-red-600 hover:bg-red-50",
};

// flip = mirror the icon in RTL (use for arrows)
export default function Button({ variant = "primary", icon: Icon, flip = false, className = "", children, ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${styles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} className={flip ? "rtl:-scale-x-100" : ""} />}
      {children}
    </button>
  );
}
