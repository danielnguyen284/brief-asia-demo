import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_countries_region" AS ENUM('southeast-asia', 'east-asia', 'south-asia');
  CREATE TABLE "countries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"region" "enum_countries_region" NOT NULL,
  	"description" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "newsletters" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"cadence" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"vertical_id" integer,
  	"active" boolean DEFAULT true,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "podcasts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"show" varchar NOT NULL,
  	"episode" varchar,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"duration" varchar NOT NULL,
  	"host" varchar NOT NULL,
  	"published_at" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "market_snapshots" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"country" varchar NOT NULL,
  	"market" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"change_pct" numeric NOT NULL,
  	"summary" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "articles" ADD COLUMN "country_id" integer;
  ALTER TABLE "articles" ADD COLUMN "engine_source_context" varchar;
  ALTER TABLE "articles" ADD COLUMN "translation_assisted" boolean DEFAULT false;
  ALTER TABLE "_articles_v" ADD COLUMN "version_country_id" integer;
  ALTER TABLE "_articles_v" ADD COLUMN "version_engine_source_context" varchar;
  ALTER TABLE "_articles_v" ADD COLUMN "version_translation_assisted" boolean DEFAULT false;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "countries_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "newsletters_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "podcasts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "market_snapshots_id" integer;
  ALTER TABLE "newsletters" ADD CONSTRAINT "newsletters_vertical_id_pillars_id_fk" FOREIGN KEY ("vertical_id") REFERENCES "public"."pillars"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "countries_name_idx" ON "countries" USING btree ("name");
  CREATE UNIQUE INDEX "countries_slug_idx" ON "countries" USING btree ("slug");
  CREATE INDEX "countries_updated_at_idx" ON "countries" USING btree ("updated_at");
  CREATE INDEX "countries_created_at_idx" ON "countries" USING btree ("created_at");
  CREATE UNIQUE INDEX "newsletters_name_idx" ON "newsletters" USING btree ("name");
  CREATE UNIQUE INDEX "newsletters_slug_idx" ON "newsletters" USING btree ("slug");
  CREATE INDEX "newsletters_vertical_idx" ON "newsletters" USING btree ("vertical_id");
  CREATE INDEX "newsletters_updated_at_idx" ON "newsletters" USING btree ("updated_at");
  CREATE INDEX "newsletters_created_at_idx" ON "newsletters" USING btree ("created_at");
  CREATE UNIQUE INDEX "podcasts_slug_idx" ON "podcasts" USING btree ("slug");
  CREATE INDEX "podcasts_updated_at_idx" ON "podcasts" USING btree ("updated_at");
  CREATE INDEX "podcasts_created_at_idx" ON "podcasts" USING btree ("created_at");
  CREATE INDEX "market_snapshots_created_at_idx" ON "market_snapshots" USING btree ("created_at");
  ALTER TABLE "articles" ADD CONSTRAINT "articles_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_country_id_countries_id_fk" FOREIGN KEY ("version_country_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletters_fk" FOREIGN KEY ("newsletters_id") REFERENCES "public"."newsletters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_podcasts_fk" FOREIGN KEY ("podcasts_id") REFERENCES "public"."podcasts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_market_snapshots_fk" FOREIGN KEY ("market_snapshots_id") REFERENCES "public"."market_snapshots"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "articles_country_idx" ON "articles" USING btree ("country_id");
  CREATE INDEX "_articles_v_version_version_country_idx" ON "_articles_v" USING btree ("version_country_id");
  CREATE INDEX "payload_locked_documents_rels_countries_id_idx" ON "payload_locked_documents_rels" USING btree ("countries_id");
  CREATE INDEX "payload_locked_documents_rels_newsletters_id_idx" ON "payload_locked_documents_rels" USING btree ("newsletters_id");
  CREATE INDEX "payload_locked_documents_rels_podcasts_id_idx" ON "payload_locked_documents_rels" USING btree ("podcasts_id");
  CREATE INDEX "payload_locked_documents_rels_market_snapshots_id_idx" ON "payload_locked_documents_rels" USING btree ("market_snapshots_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "countries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "newsletters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "podcasts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "market_snapshots" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "countries" CASCADE;
  DROP TABLE "newsletters" CASCADE;
  DROP TABLE "podcasts" CASCADE;
  DROP TABLE "market_snapshots" CASCADE;
  ALTER TABLE "articles" DROP CONSTRAINT "articles_country_id_countries_id_fk";
  
  ALTER TABLE "_articles_v" DROP CONSTRAINT "_articles_v_version_country_id_countries_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_countries_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_newsletters_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_podcasts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_market_snapshots_fk";
  
  DROP INDEX "articles_country_idx";
  DROP INDEX "_articles_v_version_version_country_idx";
  DROP INDEX "payload_locked_documents_rels_countries_id_idx";
  DROP INDEX "payload_locked_documents_rels_newsletters_id_idx";
  DROP INDEX "payload_locked_documents_rels_podcasts_id_idx";
  DROP INDEX "payload_locked_documents_rels_market_snapshots_id_idx";
  ALTER TABLE "articles" DROP COLUMN "country_id";
  ALTER TABLE "articles" DROP COLUMN "engine_source_context";
  ALTER TABLE "articles" DROP COLUMN "translation_assisted";
  ALTER TABLE "_articles_v" DROP COLUMN "version_country_id";
  ALTER TABLE "_articles_v" DROP COLUMN "version_engine_source_context";
  ALTER TABLE "_articles_v" DROP COLUMN "version_translation_assisted";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "countries_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "newsletters_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "podcasts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "market_snapshots_id";
  DROP TYPE "public"."enum_countries_region";`)
}
