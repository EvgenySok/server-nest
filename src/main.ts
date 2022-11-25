import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConnectionServiceClient } from '@google-cloud/bigquery-connection';
import { BigQuery } from '@google-cloud/bigquery';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const client = new ConnectionServiceClient();
  const project = process.env.GOOGLE_PROJECT; // Project to list connections for.

  const parent = `projects/${project}/locations/US`;
  async function listConnections() {
    const [connections] = await client.listConnections({
      parent: parent,
    });

    console.info(`found ${connections.length} connections:`);
    console.info(connections);
  }
  await listConnections();

  async function createDataset() {
    // Creates a client
    const bigqueryClient = new BigQuery();

    // Create the dataset
    const [dataset] = await bigqueryClient.createDataset('users');
    console.log(`Dataset ${dataset.id} created.`);
  }
  await createDataset();

  await app.listen(3000);
}
bootstrap();
