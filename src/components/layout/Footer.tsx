import Image from "next/image";
import logo from '@public/next.svg';

export default function Footer() {
  return (
    <footer
      className="text-srk-blue-6 w-full shadow-lg bg-[#FFFFFF]  pb-6 lg:pb-16">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div
          className="w-10/12 flex flex-col-reverse lg:flex-row mx-auto pt-0 lg:pt-8 items-start lg:items-start">
          <div className=" lg:w-2/6 mt-10 lg:mt-0 pt-0 lg:pt-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 relative">
                <Image
                  src={logo}
                  alt="app Logo"
                  fill
                  style={{objectFit: "contain"}}
                  priority={true}
                />
              </div>
              <div
                className="text-2xl font-bold">
                TodoList
              </div>
            </div>
            <div className="mt-5 text-sm">
              © {new Date().getFullYear()} mm projects. All rights
              reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
