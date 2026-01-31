import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content Section */}
        <div className="flex flex-col items-center gap-8 mb-8">
          {/* Left: Logo, Social, Download */}
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="mb-6">
              <img
                src="https://cdn.prod.website-files.com/682b2da9ef522c285ba6550a/68862a9bff23fbbaeaff68a9_45fe333406b1b154ec4ad5fe99f902b2_Group%201321315612.png"
                srcSet="https://cdn.prod.website-files.com/682b2da9ef522c285ba6550a/68862a9bff23fbbaeaff68a9_45fe333406b1b154ec4ad5fe99f902b2_Group%201321315612-p-500.png 500w, https://cdn.prod.website-files.com/682b2da9ef522c285ba6550a/68862a9bff23fbbaeaff68a9_45fe333406b1b154ec4ad5fe99f902b2_Group%201321315612-p-800.png 800w, https://cdn.prod.website-files.com/682b2da9ef522c285ba6550a/68862a9bff23fbbaeaff68a9_45fe333406b1b154ec4ad5fe99f902b2_Group%201321315612.png 1266w"
                sizes="(max-width: 1266px) 100vw, 1266px"
                alt="Billions"
                className="h-auto w-auto max-w-[200px]"
                loading="lazy"
              />
            </div>

            {/* Social Media Icons - Blue circles with white icons */}
            <div className="flex items-center gap-3 mb-6">
              <a
                href="https://x.com/billions_ntwk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Twitter/X"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"></path>
                </svg>
              </a>
              <a
                href="https://t.co/R3vtB8wtI5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Discord"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                  <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"></path>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/billions-ntwk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"></path>
                </svg>
              </a>
              <a
                href="https://github.com/0xPolygonID"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"></path>
                </svg>
              </a>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.billions.app.mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="https://cdn.prod.website-files.com/682b2da9ef522c285ba6550a/682b4bcf04f485b7c768d5ec_Google%20Play.png"
                  srcSet="https://cdn.prod.website-files.com/682b2da9ef522c285ba6550a/682b4bcf04f485b7c768d5ec_Google%20Play-p-500.png 500w, https://cdn.prod.website-files.com/682b2da9ef522c285ba6550a/682b4bcf04f485b7c768d5ec_Google%20Play.png 525w"
                  sizes="(max-width: 525px) 100vw, 525px"
                  alt="Download on Google Play"
                  className="h-12 w-auto"
                  loading="lazy"
                />
              </a>
              <a
                href="https://apps.apple.com/es/app/billions/id6742451067"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="https://cdn.prod.website-files.com/682b2da9ef522c285ba6550a/682b4bcf09f2995c82cf533b_App%20Store.png"
                  srcSet="https://cdn.prod.website-files.com/682b2da9ef522c285ba6550a/682b4bcf09f2995c82cf533b_App%20Store-p-500.png 500w, https://cdn.prod.website-files.com/682b2da9ef522c285ba6550a/682b4bcf09f2995c82cf533b_App%20Store.png 519w"
                  sizes="(max-width: 519px) 100vw, 519px"
                  alt="Download on the App Store"
                  className="h-12 w-auto"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          {/* Right: Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-black uppercase">
            <Link href="/blog" className="hover:text-gray-600 transition-colors">
              Blog
            </Link>
            <span className="text-gray-400">-</span>
            <a
              href="https://signup.billions.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              Join Network
            </a>
            <span className="text-gray-400">-</span>
            <a
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              Terms of Use
            </a>
            <span className="text-gray-400">-</span>
            <a
              href="https://billions.network/aideeptrust"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              DEEP TRUST PAPER
            </a>
            <span className="text-gray-400">-</span>
            <a
              href="https://privado-id.notion.site/billions-brand-assets2025"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              Brand Assets
            </a>
            <span className="text-gray-400">-</span>
            <a href="mailto:hello@billions.network" className="hover:text-gray-600 transition-colors">
              Contact
            </a>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Footer Row 2: Copyright */}
        <div className="flex flex-col items-center gap-4 text-sm text-gray-600 text-center">
          <div className="flex items-center gap-2">
            <span>© 2025,</span>
            <img
              src="https://cdn.prod.website-files.com/682b2da9ef522c285ba6550a/68862a9bff23fbbaeaff68a9_45fe333406b1b154ec4ad5fe99f902b2_Group%201321315612.png"
              srcSet="https://cdn.prod.website-files.com/682b2da9ef522c285ba6550a/68862a9bff23fbbaeaff68a9_45fe333406b1b154ec4ad5fe99f902b2_Group%201321315612-p-500.png 500w, https://cdn.prod.website-files.com/682b2da9ef522c285ba6550a/68862a9bff23fbbaeaff68a9_45fe333406b1b154ec4ad5fe99f902b2_Group%201321315612-p-800.png 800w, https://cdn.prod.website-files.com/682b2da9ef522c285ba6550a/68862a9bff23fbbaeaff68a9_45fe333406b1b154ec4ad5fe99f902b2_Group%201321315612.png 1266w"
              sizes="(max-width: 1266px) 100vw, 1266px"
              alt="Billions"
              className="h-5 w-auto"
              loading="lazy"
            />
          </div>
          <div className="text-xs md:text-sm">
            By using our services you agree to Billions Network&apos;s{" "}
            <a
              href="https://billions.network/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </a>
            ,{" "}
            <a
              href="https://billions.network/cookie-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-900 transition-colors"
            >
              Cookie Policy
            </a>
            , and{" "}
            <a
              href="https://billions.network/wallet-terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-900 transition-colors"
            >
              Terms of Use
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  )
}
