import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react';
import { ValueContext } from '../context/valueContext';

const Header = () => {
  
  return (
    <header className="text-gray-600 body-font border-b border-russian-violet">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-btn-russian-violet rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">OVG Tool</span>
        </a>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5"><Link href="/" className="mr-5 hover:text-gray-900">Home</Link></a>
          <a className="mr-5"><Link href="/tool" className="mr-5 hover:text-gray-900">About</Link></a>
          <a className="mr-5 hover:text-gray-900">The Tool</a>
          <a href=""></a>
        </nav>
        <a
          href="https://platformable.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="">
            <Image src="https://platformable.com/static/5319a443d00bd1eee2efee3fa63ac32c/bc86d/logo.webp" alt="Platformable Logo" width={125} height={21} />
          </span>
        </a>      </div>
    </header>
  );
};

export default Header;
