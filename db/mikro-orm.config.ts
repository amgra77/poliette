import { Options } from "@mikro-orm/core";
import { PollOption } from "./question-option";
import { PollQuestion } from "./questions.entity";

const config: Options = {
    type: "postgresql",
    dbName: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    entities: [PollQuestion, PollOption],
    debug: true,
    migrations: {
        safe: true,
        disableForeignKeys: false,
    }
}

export default config;