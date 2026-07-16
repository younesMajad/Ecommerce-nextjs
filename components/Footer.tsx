import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="flex md:flex-row items-start justify-between px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 bg-black text-white">
        <div className="">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold text-[#fce3c7]"> Store</h1>
          </Link>

        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-[#fce3c7] mb-5">storeNet</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link className="hover:underline transition" href="/">
                  Home
                </Link>
              </li>

              <li>
                <Link className="hover:underline transition" href="/shop">
                  Shop
                </Link>
              </li>

              <li>
                <Link className="hover:underline transition" href="/about">
                  About us
                </Link>
              </li>

              <li>
                <Link className="hover:underline transition" href="/favorites">
                  Favorites
                </Link>
              </li>

              <li>
                <Link className="hover:underline transition" href="/contact">
                  contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
