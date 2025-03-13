alter table "public"."profiles" add column "description" text;

alter table "public"."profiles" add constraint "profiles_description_check" CHECK ((length(description) <= 50)) not valid;

alter table "public"."profiles" validate constraint "profiles_description_check";


