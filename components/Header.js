import Link from 'next/link'


const Header = () => {
  
  return (
    <header className="text-gray-600 body-font  bg-gray-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
        <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      
          <span className="text-4xl -ml-6 md:p-0 px-5">Platformable Open Banking Value Tool</span>
        </div>
        </Link>
  {/*       <Link href="/test">Test</Link> */}
         </div>
    </header>
  );
};

export default Header;
