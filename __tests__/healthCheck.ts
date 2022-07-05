import { gql } from '@apollo/client';
import { server } from '../src/lib/apolloServer';
import pactum from 'pactum';
// it("runs a health against our graphql schema", async () => {
//   let result = await server.executeOperation({
//     query: gql`
//       query {
//         test(bool: false)
//       }
//     `,
//   });
//   expect(result).toBeTruthy();
//   expect(result).toHaveProperty("data");
//   expect(result.errors).toBeFalsy();
//   expect(result.data?.test).toEqual(false);

//   result = await server.executeOperation({
//     query: gql`
//       query {
//         test(bool: invalidArgument)
//       }
//     `,
//   });
//   expect(result).toBeTruthy();
//   expect(result.errors).toBeTruthy();
// });

it('should validate user info correctly', async () => {
  const result = await server.executeOperation({
    query: gql`
      mutation {
        login(
          credentials: {
            email: "bob@gmail.com"
            username: "helloworld"
            password: ""
          }
        ) {
          username
        }
      }
    `,
  });
  expect(result).toBeTruthy();
  expect(result.errors).toBeTruthy();
});

it('post graphql mutation & variables', async () => {
  await pactum
    .spec()
    .post('http://localhost:3000/api/graphql')
    .withGraphQLQuery(
      `
        query HeroNameAndFriends($episode: Episode) {
          hero(episode: $episode) {
            name
            friends {
              name
            }
          }
        }
      `
    )
    .withGraphQLVariables({
      episode: 'JEDI',
    })
    .expectStatus(201);
});
