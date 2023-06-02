import 'reflect-metadata'
import dataSource from './utils';
import { buildSchema } from 'type-graphql';
import { WilderResolver } from './resolver/wilder.resolver';
import { GradeResolver } from './resolver/grade.resolver';
import { SkillResolver } from './resolver/skill.resolver';
import { ApolloServer } from 'apollo-server';

const port = 5000;

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [WilderResolver, GradeResolver, SkillResolver]
  });
  const server = new ApolloServer({
    schema
  });
  
  try {
    const { url }: { url: string} = await server.listen({port})
    console.log(`Server ready at ${url}`)
  } catch(err) {
    console.log("Error starting the server")
  }
};

void start();