import { PrimaryKey, Entity, Property, Collection, OneToMany, Cascade, QueryOrder } from "@mikro-orm/core";
import { nanoid } from 'nanoid';
import { PollOption } from "./question-option";

@Entity()
export class PollQuestion {
    @PrimaryKey()
    id: string = nanoid();

    @Property()
    question!: string;

    @OneToMany('PollOption', 'pollQuestion', { orphanRemoval: true, nullable: true, cascade: [Cascade.ALL] })
    pollOptions = new Collection<PollOption>(this);

    @Property({ onCreate: () => new Date() })
    created: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updated: Date = new Date();

}