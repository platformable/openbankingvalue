import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react';
import { ValueContext } from '../context/valueContext';

const Header = () => {
  
  return (
    <header className="text-gray-600 body-font  bg-gray-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      
          <span className="text-xl -ml-6">Platformable Open Banking Value Tool</span>
        </a>
        </Link>
      {/*   <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5"><Link href="/" className="mr-5 hover:text-gray-900">Home</Link></a>
          <a className="mr-5"><Link href="/tool" className="mr-5 hover:text-gray-900">About</Link></a>
          <a className="mr-5 hover:text-gray-900">The Tool</a>
          <a href=""></a>
        </nav> */}
         </div>
    </header>
  );
};

export default Header;
