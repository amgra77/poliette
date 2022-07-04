import { PrimaryKey, Entity, Property, ManyToOne } from "@mikro-orm/core";
import { nanoid } from 'nanoid';
import { PollQuestion } from "./questions.entity";

@Entity()
export class PollOption {
    @PrimaryKey()
    id!: string;

    @Property()
    option!: string;

    @Property({ default: 0 })
    count: number = 0;

    @ManyToOne('PollQuestion', 'pollOptions')
    pollQuestion!: PollQuestion;

    constructor(option: string) {
        this.id = nanoid();
        this.option = option;
    }
}