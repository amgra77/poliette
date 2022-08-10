import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import { useState } from 'react'

interface NewPageProps {
    backendUrl: string;
}

const New: NextPage<NewPageProps> = ({backendUrl}:NewPageProps) => {
    const [pollOptionsList, setpollOptionsList] = useState<string[]>([]);
    const router = useRouter();

    const createPoll = async () => {
        const question = document?.querySelector('#newPollQuestion') as HTMLInputElement;
        if (question?.value.length > 2 && pollOptionsList.length > 1) {
            const payload = {
                question: question.value,
                options: pollOptionsList
            }
            try {
                const createNewPoll = await fetch(`${backendUrl}/api/questions/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })

                if (createNewPoll.status === 200) {
                    const newPoll = await createNewPoll.json();
                    router.push(`/${newPoll?.id}`);
                } else {
                    console.log('error');
                }

            } catch (error) {
                console.error(error);
                alert('Oh no something went wrong. Please try again');
            }
        }
    };

    const addPollOption = () => {
        const option = document?.querySelector('#newPollOption') as HTMLInputElement;
        if (option.value !== "") {
            setpollOptionsList([...pollOptionsList, option.value]);
            option.value = '';
            option.focus();
        }
    };

    const removePollOption = (option: string, index: number) => {
        console.log(option, index);
        const temp = pollOptionsList.filter((val, i) => {
            return i !== index;
        })
        setpollOptionsList([...temp]);

    }

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
                                            <textarea rows={5} className="block w-6/12 m-auto px-4 py-3 mb-4 border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none" id="newPollQuestion" name="newPollQuestion" />
                                            <h1 className='p-3 text-4xl md:text-2xl font-bold mb-5'>Add the poll options</h1>
                                            <div className="my-3">
                                                <input type="text" onKeyDown={(e) => { if (e.code === 'Enter') { addPollOption() } }} placeholder="Add option" className="border border-primary1/20 w-1/2 p-4 rounded focus:outline-none focus-visible:ring focus-visible:ring-primary1 focus-within:shadow-lg" id="newPollOption" name="newPollOption" />
                                                <button type="button" className="bg-primary1 py-3 px-6 rounded-lg text-white shadow-lg ml-4 " onClick={addPollOption}>Add</button>

                                            </div>

                                            <div className="text-lg my-4">
                                                {
                                                    pollOptionsList.length > 0 && pollOptionsList.map((option, index) => {
                                                        return (

                                                            <div className='w-full' key={index}>
                                                                <div className='flex justify-center mb-3'>
                                                                    <span className="bg-primary2 text-white px-5 py-2 shadow-lg">{index + 1}&nbsp; &mdash; &nbsp;{option}</span>
                                                                    <button type="button" className="bg-primary4 py-3 px-6 rounded-lg text-white shadow-lg ml-4" onClick={() => { removePollOption(option, index) }}>Delete</button>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}

                                            </div>
                                        </div>
                                        <button type="button" className="bg-primary1 py-3 px-6 rounded-lg text-white shadow-lg ml-4 my-20" onClick={createPoll}>Create poll</button>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    let backendUrl = "http://localhost:3001";
    if (process.env?.NEXT_PUBLIC_VERCEL_ENV === 'production') {
        backendUrl = "https://poliette.vercel.app";
    }
    else if (process.env?.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
        backendUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    }
    return {
        props: {
            backendUrl: backendUrl,
        },
    }
}

export default New
