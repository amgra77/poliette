import type { NextPage } from 'next'


const New: NextPage = () => {

    return (
        <section>
            <main className="container md:p-0 mx-auto ">
                <section className="px-2 py-12 bg-white md:px-0">
                    <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
                        <div className="flex flex-wrap items-center sm:-mx-3">
                            <div className="w-full md:w-full md:px-3">
                                <div className="w-full pb-6 space-y-8 text-center ">
                                    <h1 className="text-4xl font-extrabold tracking-tight text-primary1 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                                        <span className="block xl:inline">Create a new poll</span>
                                    </h1>
                                    <div className="container mx-auto text-center h-full">
                                        <div className="flex flex-col h-full">
                                            <h1 className="p-3 text-4xl md:text-2xl font-bold mb-5"> Enter your question</h1>
                                            <textarea rows={5} className="block w-6/12 m-auto px-4 py-3 mb-4 border border-primary1/20 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-primary1 focus-within:shadow-lg" />
                                            <h1 className='p-3 text-4xl md:text-2xl font-bold mb-5'>Add the Options</h1>
                                            <div className="my-3">
                                                <input type="text" placeholder="Add option" className="border border-primary1/20 w-1/2 p-4 rounded focus:outline-none focus-visible:ring focus-visible:ring-primary1 focus-within:shadow-lg" />
                                                <button type="button" className="bg-primary1 py-3 px-6 rounded-lg text-white shadow-lg ml-4 ">Add</button>
                                            </div>

                                            <div className="flex justify-center text-lg my-4">
                                                <span className="bg-primary2 text-white px-5 py-2 shadow-lg">This is option 1</span>
                                                <button type="button" className="bg-primary4 py-3 px-6 rounded-lg text-white shadow-lg ml-4 ">Delete</button>
                                            </div>
                                        </div>
                                        <button type="button" className="bg-primary1 py-3 px-6 rounded-lg text-white shadow-lg ml-4 my-20">Create poll</button>
                                    </div>
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
