import type { NextPage } from 'next'


const New: NextPage = () => {
    
    return (
        <section>
            <main className="container md:p-0 mx-auto ">
                <section className="px-2 py-32 bg-white md:px-0">
                    <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
                        <div className="flex flex-wrap items-center sm:-mx-3">
                            <div className="w-full md:w-full md:px-3">
                                <div className="w-full pb-6 space-y-6 text-center ">
                                    <h1 className="text-4xl font-extrabold tracking-tight text-primary1 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                                        <span className="block xl:inline">New poll goes here</span>
                                    </h1>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>

             

            </main>

        </section>
    )
}

export default New
