import Link from "next/link";
import { GetServerSideProps, NextPage } from "next/types";
import { PollQuestion } from "~types";

// 6ruCTUbOPemCSkAMjKq_l
interface QuestionDetailsProps {
    question: PollQuestion;
}

const QuestionDetails: NextPage<QuestionDetailsProps> = ({ question }: QuestionDetailsProps) => {
    if (!question) {
        return <p></p>
    }
    const doShare = (): void => {
        if ('share' in navigator) {
            navigator.share({
                title: question.question,
                text: 'Participate on a poll',
                url: `https://poliette.vercel.app/${question.id}`,
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        }
    }
    return (
        <section className="h-screen">
            <div className="container mx-auto text-center h-full">
                <div className="flex flex-col h-full">
                    <h1 className="p-3 text-4xl md:text-2xl font-bold mb-5">{question.question}</h1>
                    <div className="questions flex flex-col gap-5">
                        {question.pollOptions.slice(0, 35).map((option, index) => {
                            const shortcuts = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                            return (
                                <div className="flex justify-center text-lg" key={`option-${option.id}`}>
                                    <button className="rounded border-2 border-primary4 bg-primary2 hover:bg-primary2/90 text-white px-5 py-2  shadow-lg">{shortcuts[index]}&nbsp; &mdash; &nbsp;{option.option}</button>
                                </div>
                            );
                        })}
                    </div>
                    <div className="my-5">
                        <Link href={`/${question.id}/results`}>
                            <a className="hover:underline hover:decoration-wavy">View results</a>
                        </Link>
                    </div>
                    <div className="my-5">
                        <button className="bg-primary1 hover:bg-primary1/90 text-white hover:font-bold px-5 py-3 shadow-lg rounded" onClick={doShare}>Share</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const questionId = context.params?.id;
    try {
        const request = await fetch(`https://poliette.vercel.app/api/questions/${questionId}`);
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