import { Migration } from '@mikro-orm/migrations';

export class Migration20220706114725 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "poll_question" ("id" varchar(255) not null, "question" varchar(255) not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null);');
    this.addSql('alter table "poll_question" add constraint "poll_question_pkey" primary key ("id");');

    this.addSql('create table "poll_option" ("id" varchar(255) not null, "option" varchar(255) not null, "count" int not null default 0, "poll_question_id" varchar(255) not null);');
    this.addSql('alter table "poll_option" add constraint "poll_option_pkey" primary key ("id");');

    this.addSql('alter table "poll_option" add constraint "poll_option_poll_question_id_foreign" foreign key ("poll_question_id") references "poll_question" ("id") on update cascade on delete cascade;');
  }

}
