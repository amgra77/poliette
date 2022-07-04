import { PrimaryKey, Entity, Property, Collection, OneToMany, Cascade } from "@mikro-orm/core";
import { nanoid } from 'nanoid';
import { PollOption } from "./question-option";

@Entity()
export class PollQuestion {
    @PrimaryKey()
    id!: string;

    @Property()
    question!: string;

    @OneToMany('PollOption', 'pollQuestion')
    pollOptions = new Collection<PollOption>(this);

    @Property()
    created: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updated: Date = new Date();

    constructor(question: string) {
        this.id = nanoid();
        this.question = question;
    }
}