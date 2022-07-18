import Link from "next/link";
import { GetServerSideProps, NextPage } from "next/types";
import { useEffect, useState } from "react";
import { PollQuestion } from "~types";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import { PollOption } from "~db/question-option";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// 317f
interface QuestionDetailsProps {
    question: PollQuestion;
    backendUrl: string;
}

const QuestionDetails: NextPage<QuestionDetailsProps> = ({ question: _question, backendUrl }: QuestionDetailsProps) => {
    const [question, setQuestion] = useState<PollQuestion>(_question);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [votedAlready, setVotedAlready] = useState<boolean>(false);
    const [hasShareCapabilities, setHasShareCapabilities] = useState<boolean>(false);

    useEffect(() => {
        if ('share' in navigator) {
            setHasShareCapabilities(true);
        }
    }, []);

    if (!question) {
        return <p>No question details available...</p>
    }

    const doShare = (): void => {
        if (hasShareCapabilities) {
            navigator.share({
                title: question.question,
                text: 'Participate on a poll',
                url: `${backendUrl}/${question.id}`,
            });
        }
    }

    const availableColors = ['#0F4C5C','#E36414','#FB8B24','#9A031E','#5F0F40'];

    const data:ChartData<"bar", number[], string> = {
        labels: ["Oprions"],
        datasets: question.pollOptions.map((one, index) => {
            return {
                label: one.option,
                data: [one.count],
                borderRadius: 10,
                backgroundColor: availableColors[(index%5)+1],
            };
        })
    };

    const options:ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Results of poll',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                title: {
                    text: "Question Options",
                    display: true,
                    font: {
                        weight: "bold"
                    },
                }
            },
            y: {
                grid: {
                    display: true,
                },
                title: {
                    text: "Votes",
                    display: true,
                    font: {
                        weight: "bold"
                    },
                },
                ticks: {
                    stepSize: 1,
                }
            }
        }
    };

    const vote = async (optionId: string) => {
        try {
            const voted = await fetch(`${backendUrl}/api/option/${optionId}/vote`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
            });
            if (voted.status === 200) {
                const newCounter = await voted.json() as PollOption;
                setQuestion(q => {
                    console.log(q);
                    q.pollOptions.map(o => {
                        if (o.id === optionId) {
                            o.count = newCounter.count;
                        }
                        return o;
                    });
                    return q;
                });
                setShowResults(true);
                setVotedAlready(true);
            }
            else {
                alert('There was a problem voting');
            }
        } catch (error) {
            console.error(error);
            alert('There was a problem voting');
        }
    };

    return (
        <section className="h-screen">
            <div className="container mx-auto text-center h-full">
                <div className="flex flex-col h-full">
                    <h1 className="p-3 text-4xl md:text-2xl font-bold mb-5">{question.question}</h1>
                    {!showResults &&
                        <>
                            <div className="questions flex flex-col gap-5">
                                {question.pollOptions.map((option, index) => {
                                    const shortcuts = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                                    return (
                                        <div className="flex justify-center text-lg" key={`option-${option.id}`}>
                                            <button className={`bg-primary${(index % 5) + 1} text-white px-5 py-2 shadow-lg`} onClick={() => vote(option.id) }>{shortcuts[index]}&nbsp; &mdash; &nbsp;{option.option}</button>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    }
                    {!votedAlready && 
                        <div className="my-5">
                            <div className="hover:underline hover:decoration-wavy" role="button" onClick={() => setShowResults(currentValue => !currentValue)}>
                                {!showResults && <span>Show Results</span>}
                                {showResults && <span>Hide Results</span>}
                            </div>
                        </div>
                    }
                    {showResults &&
                        <div className="h-40">
                            <Bar data={data} options={options} />
                        </div>
                    }
                    {hasShareCapabilities &&
                        <div className="my-5">
                            <button className="bg-primary1 hover:bg-primary1/90 text-white hover:font-bold px-5 py-3 shadow-lg rounded" onClick={doShare}>Share</button>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const questionId = context.params?.id;
    let backendUrl = "http://localhost:3000";
    if (process.env?.NEXT_PUBLIC_VERCEL_ENV === 'production') {
        backendUrl = "https://poliette.vercel.app";
    }
    else if (process.env?.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
        backendUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    }
    try {
        const request = await fetch(`${backendUrl}/api/questions/${questionId}`);
        if (request.status === 200) {
            const question: PollQuestion = await request.json();
            return {
                props: {
                    question: JSON.parse(JSON.stringify(question)),
                    backendUrl: backendUrl,
                },
            }
        }

    } catch (error) {
        console.error(`[Error] fetching ${questionId}:::`, error);
    }
    return {
        notFound: true
    };
}

export default QuestionDetails;