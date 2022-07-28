import type { NextApiRequest, NextApiResponse } from 'next';
import { PollQuestion } from '~db/questions.entity';
import withORM from '~db/withORM';
import getEM from '~db/getEM';
import { ErrorMessage, PollQuestionCreate } from '~types';
import { PollOption } from '~db/question-option';
import { nanoid } from 'nanoid';

const MAX_LENGTH:number = 4;
const MAX_RETRY:number = 10;

async function getUniqueId() {
    const em = getEM();
    let retry:number = 0;
    let success:boolean | null = null;
    let id:string;
    let _found:PollQuestion | null = null;
    do {
        retry++;
        id = nanoid(MAX_LENGTH);
        try {
            _found = await em.findOneOrFail(PollQuestion, { id });
        } catch (error) {
            success = true;
        }
    } while (!success && retry<MAX_RETRY);
    if (success) {
        return id;
    }
    else {
        console.warn(`MAX_RETRY of ${MAX_RETRY} reached, dispatching next length of ${MAX_LENGTH+1}`);
        return nanoid(MAX_LENGTH+1);
    }
}

async function handler(req: NextApiRequest, res: NextApiResponse<PollQuestion | ErrorMessage>) {
    console.log('creating new poll');
    const em = getEM();
    if (req.method === 'POST') {
        try {
            const { question: questionContent, options: questionOptions } = req.body as PollQuestionCreate;
            const questionDTO = new PollQuestion();
            questionDTO.id = await getUniqueId();
            questionDTO.question = questionContent;

            const questionRepository = em.getRepository(PollQuestion);
            const newQuestion = questionRepository.create(questionDTO);

            if (questionOptions && questionOptions.length) {
                const optionRepository = em.getRepository(PollOption);

                questionOptions.forEach(oneOption => {
                    const newOptionDTO = new PollOption();
                    newOptionDTO.option = oneOption;
                    const newOption = optionRepository.create(newOptionDTO);
                    newQuestion.pollOptions.add(newOption);
                });
            }

            await questionRepository.persistAndFlush(newQuestion);
            return res.status(200).json(newQuestion);
        } catch (error) {
            console.error('error ', error);
            return res.status(500).json({ message: "There was a problem processing your request" });
        }
    }
    else {
        return res.status(405).json({ message: `Method ${req.method} not supported` })
    }
}

export default withORM(handler);