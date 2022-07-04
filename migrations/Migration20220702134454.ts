import { Migration } from '@mikro-orm/migrations';

export class Migration20220702134454 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "poll_question" ("id" varchar(255) not null, "question" varchar(255) not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null);');
    this.addSql('alter table "poll_question" add constraint "poll_question_pkey" primary key ("id");');
  }

}
