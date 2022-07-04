import { Migration } from '@mikro-orm/migrations';

export class Migration20220703121416 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "poll_option" ("id" varchar(255) not null, "option" varchar(255) not null, "count" int not null default 0, "poll_question_id" varchar(255) not null);');
    this.addSql('alter table "poll_option" add constraint "poll_option_pkey" primary key ("id");');

    this.addSql('alter table "poll_option" add constraint "poll_option_poll_question_id_foreign" foreign key ("poll_question_id") references "poll_question" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "poll_option" cascade;');
  }

}
