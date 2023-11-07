import Link from "next/link";

const Header = () => {
  return (
    <header id="header" className="body-font">
      <div className="container mx-auto flex flex-wrap py-5 flex-col md:flex-row md:justify-between items-center text-[var(--purple-medium)]">
        <Link href="/">
          <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img
              src="/Platformable-logo.png"
              alt="Platformable logo"
              width={250}
              height={70}
            />
            {/* <span className="text-4xl -ml-6 md:p-0 px-5">Platformable Open Banking Value Tool</span> */}
          </div>
        </Link>
        <div className="flex items-center gap-x-10 text-lg">
        <Link href="https://platformable.com/blog/open-banking-value-tool">
          <span className="font-bold">How to guide</span>
        </Link>
        <Link href="https://platformable.com">
          
        <span className="font-bold">Main Website</span></Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
