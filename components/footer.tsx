const FooterComponent = () => {
    return (
        <section className="sticky text-gray-700 bg-white body-font inset-x-0 bottom-0">
            <div className="container flex flex-col items-center px-8 py-8 mx-auto max-w-7xl sm:flex-row">
                <a href="#_" className="text-xl font-black leading-none text-gray-900 select-none logo">Polliete<span className="text-indigo-600">.</span></a>
                <p className="mt-4 text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-200 sm:mt-0">&copy; 2022 Polliete</p>
                <p className="ml-5 text-third text-xs inline-flex justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start">By: deifos &amp; amgra77</p>
            </div>
        </section>
    )
}

export default FooterComponent;