import Social from "@/components/social";

const LinkGroup = ({ children, header }: { children: React.ReactNode, header: string }) => {
  return (
    <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
      <div className="mb-10 w-full">
        <h3 className="mb-9 text-lg font-semibold text-dark dark:text-white">
          {header}
        </h3>
        <ul className="space-y-3">{children}</ul>
      </div>
    </div>
  );
};

const NavLink = ({ link, label }: { link: string, label: string }) => {
  return (
    <li>
      <a
        href={link}
        target="_blank"
        className="inline-block hover:text-primary font-inter text-base font-light text-gray-500"
      >
        {label}
      </a>
    </li>
  );
};

const Footer = () => {
  return (
    <footer className="relative z-10 bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 sm:w-2/3 lg:w-3/12">
            <div className="mb-10 w-full">
              <p className="mb-10">Suno Music Generator</p>

              <p className="font-inter text-base font-light text-gray-500">
                Generate captivating music with AI, empowered by suno.ai's cutting-edge technology. 
              </p>
            </div>
          </div>

          <LinkGroup header="Friends">
            <NavLink link="https://vnorange.com" label="vnorange" />
            <NavLink link="https://vnshares.com" label="vnshares" />
            <NavLink link="https://ai.vnorange.com" label="VN AI" />
          </LinkGroup>
          <LinkGroup header="Contact">
            <NavLink link="mailto:alvin.lm.liu@gmail.com" label="alvin.lm.liu@gmail.com" />
            <NavLink link="https://github.com/Alvin-Liu" label="Github" />
          </LinkGroup>
          <LinkGroup header="Quick Links">
            <NavLink link="https://www.suno.ai" label="Suno AI" />
          </LinkGroup>

          <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
            <div className="mb-10 w-full">
              <h3 className="mb-9 text-lg font-semibold text-dark dark:text-white">
                Follow Me On
              </h3>
              <div className="mb-6">
                <Social />
              </div>
              <p className="font-inter text-base font-light text-gray-500">
                &copy; 2024 Suno Music Generator. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <span className="absolute bottom-0 left-0 z-[-1]">
          <svg
            width={217}
            height={229}
            viewBox="0 0 217 229"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-64 140.5C-64 62.904 -1.096 1.90666e-05 76.5 1.22829e-05C154.096 5.49924e-06 217 62.904 217 140.5C217 218.096 154.096 281 76.5 281C-1.09598 281 -64 218.096 -64 140.5Z"
              fill="url(#paint0_linear_1179_5)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1179_5"
                x1="76.5"
                y1={281}
                x2="76.5"
                y2="1.22829e-05"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3056D3" stopOpacity="0.08" />
                <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="absolute right-10 top-10 z-[-1]">
          <svg
            width={75}
            height={75}
            viewBox="0 0 75 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.5 -1.63918e-06C58.2107 -2.54447e-06 75 16.7893 75 37.5C75 58.2107 58.2107 75 37.5 75C16.7893 75 -7.33885e-07 58.2107 -1.63918e-06 37.5C-2.54447e-06 16.7893 16.7893 -7.33885e-07 37.5 -1.63918e-06Z"
              fill="url(#paint0_linear_1179_4)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1179_4"
                x1="-1.63917e-06"
                y1="37.5"
                x2={75}
                y2="37.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#13C296" stopOpacity="0.31" />
                <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
