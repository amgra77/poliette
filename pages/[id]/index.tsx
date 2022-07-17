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
    DatasetChartOptions,
    ChartOptions,
} from 'chart.js';
import { Bar } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// 6ruCTUbOPemCSkAMjKq_l
interface QuestionDetailsProps {
    question: PollQuestion;
}

const QuestionDetails: NextPage<QuestionDetailsProps> = ({ question }: QuestionDetailsProps) => {
    const [showResults, setShowResults] = useState<boolean>(false);
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
                url: `https://poliette.vercel.app/${question.id}`,
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
                                            <button className={` bg-primary${(index % 5) + 1} text-white px-5 py-2 shadow-lg`}>{shortcuts[index]}&nbsp; &mdash; &nbsp;{option.option}</button>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    }
                    <div className="my-5">
                        <div className="hover:underline hover:decoration-wavy" role="button" onClick={() => setShowResults(currentValue => !currentValue)}>
                            {!showResults && <span>Show Results</span>}
                            {showResults && <span>Hide Results</span>}
                        </div>
                    </div>
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
    try {
        const request = await fetch(`${process.env.VERCEL_URL ?? 'http://localhost:3000'}/api/questions/${questionId}`);
        if (request.status === 200) {
            const question: PollQuestion = await request.json();
            return {
                props: {
                    question: JSON.parse(JSON.stringify(question))
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