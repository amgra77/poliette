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
                    <h1 className="text-2xl font-bold text-blue-800">
                        Polliette
                    </h1>
                </div>
            </header>

            <main className="container md:p-0 mx-auto ">
                <div className="flex flex-col gap-2">
                    <div className="text-center p-5 ">
                        <h1 className="py-5 font-bold text-2xl">Welcome to vote</h1>
                        <a href="/new" className="dialogButton bg-primary hover:bg-primary/80 text-white">Create a poll</a>
                    </div>
                    <div className="p-5 flex flex-col items-center justify-evenly border-t-2 border-gray-100 ">
                        <h1 className="py-5 font-bold text-2xl">Vote on an existing poll</h1>
                        <div className="flex gap-5">
                            <div className="flex flex-col items-center gap-3">
                                <input type="text" placeholder="Poll number" className="border border-primary/40 hover:border-primary/90  rounded p-1" onChange={e => setId(e.target.value)} />
                                <input type="text" placeholder="Poll password" className="border border-primary/40 hover:border-primary/90 rounded p-1" onChange={e => setPassword(e.target.value)} />
                                <button type="button" className="dialogButton bg-primary disabled:opacity-50 hover:bg-primary/80 text-white" onClick={goToPoll} disabled={!(id && password)}>Enter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                Footer
            </footer>
        </section>
    )
}

export default Home
