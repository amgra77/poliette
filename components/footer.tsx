import Link from "next/link";

const FooterComponent = () => {
    return (
        <section className="sticky text-gray-700 bg-white body-font inset-x-0 bottom-0">
            <div className="container flex flex-col items-center px-8 py-8 mx-auto max-w-7xl sm:flex-row">
                <Link href="/">
                    <a className="text-xl font-bold text-primary1 leading-none select-none logo flex">
                        <span className="bg-primary1 w-4">&nbsp;</span>
                        <span className="bg-primary2 w-4">&nbsp;</span>
                        <span className="bg-primary3 w-4">&nbsp;</span>
                        <span className="bg-primary4 w-4">&nbsp;</span>
                        <span className="bg-primary5 w-4">&nbsp;</span>
                        <span className="w-4">&nbsp;</span>
                        Polliete
                    </a>
                </Link>
                <p className="mt-4 text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-200 sm:mt-0">&copy; 2022 Polliete</p>
                <p className="ml-5 text-third text-xs inline-flex justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start">By: deifos &amp; amgra77</p>
            </div>
        </section>
    )
}

export default FooterComponent;