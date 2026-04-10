// import { assets, footerLinks } from "../assets/assets";

// const Footer = () => {

//     return (
//         <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
//             <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
//                 <div>
//                     <img className="w-34 md:w-32" src={assets.logo} alt="logo" />
//                     <p className="max-w-[410px] mt-6">
//                         We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.</p>
//                 </div>
//                 <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
//                     {footerLinks.map((section, index) => (
//                         <div key={index}>
//                             <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
//                             <ul className="text-sm space-y-1">
//                                 {section.links.map((link, i) => (
//                                     <li key={i}>
//                                         <a href={link.url} className="hover:underline transition">{link.text}</a>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
//                 Copyright {new Date().getFullYear()} © DesiBazar All Right Reserved.
//             </p>
//         </div>
//     );
// };

// export default Footer
























import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
  return (
    <div className="relative mt-24 rounded-t-[2rem] border-t border-white/50 bg-white/80 px-6 pb-8 backdrop-blur-none max-md:pb-24 md:bg-white/50 md:backdrop-blur-md md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col items-start justify-between gap-10 border-b border-emerald-200/30 py-10 text-slate-600 md:flex-row">
        
        {/* LEFT */}
        <div>
          <img className="w-34 md:w-32" src={assets.logo} alt="logo" />
          <p className="max-w-[410px] mt-6">
            We deliver fresh groceries and snacks straight to your door.
            Trusted by thousands, we aim to make your shopping experience
            simple and affordable.
          </p>
        </div>

        {/* LINKS */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>

              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="/"
                      onClick={(e) => e.preventDefault()}   // 🔴 CLICK DISABLED
                      className="cursor-default text-gray-500"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright {new Date().getFullYear()} © DesiBazar All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
