import { GetServerSideProps, NextPage } from "next/types";
import { PollQuestion } from "../../types";

// 6ruCTUbOPemCSkAMjKq_l
interface QuestionDetailsProps {
    question: PollQuestion;
}

const QuestionDetails: NextPage<QuestionDetailsProps> = ({ question }: QuestionDetailsProps) => {
    if (!question) {
        return <p></p>
    }
    return (
        <section>
            <div className="container mx-auto px-10 text-center">
                <div className="flex flex-col">
                    <h1 className="p-3 text-4xl md:text-2xl font-bold">{question.question}</h1>
                    {question.pollOptions.slice(0,35).map((option, index) => {
                        const shortcuts = ['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                        return (
                            <div className="flex justify-center gap-2 mb-2 text-lg" key={`option-${option.id}`}>
                                <div className="">{shortcuts[index]}</div>
                                <div className="">{option.option}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Get country
    const questionId = context.params?.id;
    try {
        const request = await fetch(`http://localhost:3000/api/questions/${questionId}`);
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