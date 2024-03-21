import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function FooterCom() {
  return (
    <Footer container className="bg-gray-800 text-white p-4 text-center border-t border-gray-600 sticky bottom-0">
      <div className="w-full text-center">
        <div className="w-full flex flex-col items-center">
          <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Tech
            </span>
            Trekker
          </Link>
          <Footer.LinkGroup className='text-white mt-3 md:gap-10 text-lg'>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="TechTrekker" year={2024} className='text-white' />
      </div>
    </Footer>
  );
}
