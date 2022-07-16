import type { NextPage } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Home: NextPage = () => {
    const router = useRouter();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const goToPoll = () => {
        router.push(`/${id}/${password}`)
    }
    return (
        <section>
            <Head>
                <title>Polliette</title>
                <meta name="description" content="Vote on a poll or create new poll" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <div className="p-5">
                    <h1 className="text-2xl font-bold text-primary2">
                        Polliette
                    </h1>
                </div>
            </header>

            <main className="container md:p-0 mx-auto ">
                <section className="px-2 py-32 bg-white md:px-0">
                    <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
                        <div className="flex flex-wrap items-center sm:-mx-3">
                            <div className="w-full md:w-1/2 md:px-3">
                                <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                                    <h1 className="text-4xl font-extrabold tracking-tight text-primary1 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                                        <span className="block xl:inline">Just vote!</span>
                                    </h1>
                                    <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">Use our app &apos;Polliette&apos; to create polls quickly and have results right away, you will see stats live.</p>
                                    <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                                        <a href="/new" className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-primary1 rounded-md sm:mb-0 hover:bg-opacity-90 sm:w-auto">
                                            Create new poll
                                        </a>
                                        <a href="#existing-poll" className="flex items-center px-6 py-3 text-primary1 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
                                            Vote on existing one
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="w-full h-auto overflow-hidden">
                                    <svg id="chart" width="600" height="400" viewBox="0 0 660 400" xmlns="http://www.w3.org/2000/svg" >
                                        <path d="M0,334   h102.4  v-198.25759591220123  q0,-4 -4,-4  h-94.4  q-4,0 -4,4  Z" fill="#0F4C5C" />
                                        <path d="M128,334 h102.4  v-177.34937895800743  q0,-4 -4,-4  h-94.4  q-4,0 -4,4  Z" fill="#E36414" />
                                        <path d="M256,334 h102.4  v-291.8489218009009  q0,-4 -4,-4  h-94.4  q-4,0 -4,4  Z" fill="#FB8B24" />
                                        <path d="M384,334 h102.4  v-63.776925708062834  q0,-4 -4,-4  h-94.4  q-4,0 -4,4  Z" fill="#9A031E" />
                                        <path d="M512,334 h102.4  v-273.5776956996987  q0,-4 -4,-4  h-94.4  q-4,0 -4,4  Z" fill="#5F0F40" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="p-5 border-t-2 border-gray-100"></div>

                <section id="existing-poll">
                    <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
                        <div className="flex flex-wrap items-center sm:-mx-3">
                            <div className="w-full md:w-1/2 md:px-3">
                                <img alt="person-voting" src="https://cdn.devdojo.com/images/december2020/designs3d.png" className="object-cover mt-3 mr-5 h-80 lg:h-96" />
                            </div>
                            <div className="w-full md:w-1/2 md:px-3">
                                <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                                    <h1 className="text-lg font-extrabold tracking-tight text-primary1 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                                        <span className="block xl:inline">Do you have a poll number?</span>
                                    </h1>
                                    <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">If you were invited to vote on an existing poll, just go to the URL you were provided and vote now.</p>
                                </div>
                            </div>
                            <div className="w-full py-5 mt-8">
                                <div className="flex flex-row justify-center gap-5">
                                    <input type="text" placeholder="Poll number" className="border border-primary1/20 p-4 rounded focus:outline-none focus-visible:ring focus-visible:ring-primary1 focus-within:shadow-lg" onChange={e => setId(e.target.value)} />
                                    <input type="text" placeholder="Poll password" className="border border-primary1/20 p-4 rounded focus:outline-none focus-visible:ring focus-visible:ring-primary1 focus-within:shadow-lg" onChange={e => setPassword(e.target.value)} />
                                    <button type="button" className="bg-primary1 py-3 px-6 rounded-lg text-white shadow-lg disabled:bg-primary1/50 disabled:cursor-not-allowed" onClick={goToPoll} disabled={!(id && password)}>Enter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <footer>
                Footer
            </footer>
        </section>
    )
}

export default Home
