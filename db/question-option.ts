import { PrimaryKey, Entity, Property, ManyToOne } from "@mikro-orm/core";
import { nanoid } from 'nanoid';
import { PollQuestion } from "./questions.entity";

@Entity()
export class PollOption {
    @PrimaryKey()
    id: string = nanoid();

    @Property()
    option!: string;

    @Property({ default: 0 })
    count: number = 0;

    @ManyToOne('PollQuestion', { onDelete: 'cascade', eager: false })
    pollQuestion!: PollQuestion;
}