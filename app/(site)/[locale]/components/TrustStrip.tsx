export default function TrustStrip() {
  return (
    <div className="w-full bg-gradient-to-r from-teal/5 via-teal/10 to-teal/5 py-4 border-y border-teal/20">
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-navy">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Pilot kit ready</span>
          </div>
          <span className="text-teal/40">•</span>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Rapid deployment</span>
          </div>
          <span className="text-teal/40">•</span>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span>Field-tested technology</span>
          </div>
        </div>
      </div>
    </div>
  );
}
