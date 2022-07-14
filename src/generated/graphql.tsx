import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Board = {
  __typename?: 'Board';
  backgroundImage?: Maybe<Scalars['String']>;
  cards?: Maybe<Array<Maybe<Card>>>;
  columns?: Maybe<Array<Maybe<Column>>>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Card = {
  __typename?: 'Card';
  assignedTo?: Maybe<User>;
  bgColor?: Maybe<Scalars['String']>;
  board?: Maybe<Board>;
  boardId?: Maybe<Scalars['String']>;
  column?: Maybe<Column>;
  columnId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  sequence?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type Column = {
  __typename?: 'Column';
  board?: Maybe<Board>;
  boardId?: Maybe<Scalars['String']>;
  boardName?: Maybe<Scalars['String']>;
  cards?: Maybe<Array<Maybe<Card>>>;
  columnName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  sequence?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard?: Maybe<Board>;
  createCard?: Maybe<Card>;
  createColumn?: Maybe<Column>;
  login?: Maybe<User>;
  signup?: Maybe<User>;
  updateBoard?: Maybe<Board>;
  updateCard?: Maybe<Card>;
  updateCardSequence?: Maybe<Card>;
  updateColumnName?: Maybe<Column>;
  updateColumnSequence?: Maybe<Board>;
};


export type MutationCreateBoardArgs = {
  name: Scalars['String'];
};


export type MutationCreateCardArgs = {
  boardId: Scalars['String'];
  columnId: Scalars['String'];
};


export type MutationCreateColumnArgs = {
  boardId: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginUserInput;
};


export type MutationSignupArgs = {
  input: CreateUserInput;
};


export type MutationUpdateBoardArgs = {
  backgroundImage?: InputMaybe<Scalars['String']>;
  boardId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateCardArgs = {
  input?: InputMaybe<UpdateCardInput>;
};


export type MutationUpdateCardSequenceArgs = {
  input?: InputMaybe<UpdateCardSequenceInput>;
};


export type MutationUpdateColumnNameArgs = {
  columnId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationUpdateColumnSequenceArgs = {
  columnId: Scalars['String'];
  sequence: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  board?: Maybe<Board>;
  boards?: Maybe<Array<Maybe<Board>>>;
  hello?: Maybe<Scalars['String']>;
  me?: Maybe<User>;
};


export type QueryBoardArgs = {
  boardId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateCardInput = {
  bgColor?: InputMaybe<Scalars['String']>;
  cardId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  sequence?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateCardSequenceInput = {
  cardId?: InputMaybe<Scalars['String']>;
  columnId: Scalars['String'];
  sequence: Scalars['Int'];
};

export type CreateBoardMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard?: { __typename?: 'Board', id?: string | null, name?: string | null, backgroundImage?: string | null, user?: { __typename?: 'User', id?: string | null, fullName?: string | null, email?: string | null } | null } | null };

export type BoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type BoardsQuery = { __typename?: 'Query', boards?: Array<{ __typename?: 'Board', id?: string | null, name?: string | null, backgroundImage?: string | null, user?: { __typename?: 'User', id?: string | null, fullName?: string | null, email?: string | null } | null } | null> | null };

export type BoardQueryVariables = Exact<{
  boardId: Scalars['String'];
}>;


export type BoardQuery = { __typename?: 'Query', board?: { __typename?: 'Board', id?: string | null, name?: string | null, backgroundImage?: string | null, user?: { __typename?: 'User', id?: string | null, fullName?: string | null, email?: string | null } | null, columns?: Array<{ __typename?: 'Column', id?: string | null, boardId?: string | null, boardName?: string | null, columnName?: string | null, sequence?: number | null } | null> | null, cards?: Array<{ __typename?: 'Card', id?: string | null, title?: string | null, boardId?: string | null, sequence?: number | null, description?: string | null, type?: string | null, bgColor?: string | null, columnId?: string | null, userId?: string | null, assignedTo?: { __typename?: 'User', id?: string | null, fullName?: string | null, email?: string | null } | null } | null> | null } | null };

export type UpdateBoardMutationVariables = Exact<{
  boardId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  backgroundImage?: InputMaybe<Scalars['String']>;
}>;


export type UpdateBoardMutation = { __typename?: 'Mutation', updateBoard?: { __typename?: 'Board', id?: string | null, name?: string | null, backgroundImage?: string | null, user?: { __typename?: 'User', email?: string | null, fullName?: string | null, id?: string | null } | null } | null };

export type CreateCardMutationVariables = Exact<{
  columnId: Scalars['String'];
  boardId: Scalars['String'];
}>;


export type CreateCardMutation = { __typename?: 'Mutation', createCard?: { __typename?: 'Card', id?: string | null, boardId?: string | null, title?: string | null, sequence?: number | null, description?: string | null, type?: string | null, bgColor?: string | null, columnId?: string | null, userId?: string | null, assignedTo?: { __typename?: 'User', id?: string | null, fullName?: string | null, email?: string | null } | null } | null };

export type UpdateCardMutationVariables = Exact<{
  input?: InputMaybe<UpdateCardInput>;
}>;


export type UpdateCardMutation = { __typename?: 'Mutation', updateCard?: { __typename?: 'Card', id?: string | null, boardId?: string | null, title?: string | null, type?: string | null, sequence?: number | null, bgColor?: string | null, description?: string | null, columnId?: string | null, userId?: string | null, assignedTo?: { __typename?: 'User', id?: string | null, fullName?: string | null, email?: string | null } | null } | null };

export type UpdateCardSequenceMutationVariables = Exact<{
  input?: InputMaybe<UpdateCardSequenceInput>;
}>;


export type UpdateCardSequenceMutation = { __typename?: 'Mutation', updateCardSequence?: { __typename?: 'Card', id?: string | null, boardId?: string | null, title?: string | null, type?: string | null, sequence?: number | null, bgColor?: string | null, description?: string | null, columnId?: string | null, userId?: string | null, assignedTo?: { __typename?: 'User', id?: string | null, fullName?: string | null, email?: string | null } | null } | null };

export type CreateColumnMutationVariables = Exact<{
  boardId: Scalars['String'];
}>;


export type CreateColumnMutation = { __typename?: 'Mutation', createColumn?: { __typename?: 'Column', id?: string | null, boardId?: string | null, boardName?: string | null, columnName?: string | null, sequence?: number | null, cards?: Array<{ __typename?: 'Card', id?: string | null, title?: string | null, sequence?: number | null, description?: string | null, type?: string | null, bgColor?: string | null, columnId?: string | null, userId?: string | null, boardId?: string | null } | null> | null } | null };

export type UpdateColumnNameMutationVariables = Exact<{
  name: Scalars['String'];
  columnId: Scalars['String'];
}>;


export type UpdateColumnNameMutation = { __typename?: 'Mutation', updateColumnName?: { __typename?: 'Column', id?: string | null, boardId?: string | null, boardName?: string | null, columnName?: string | null, sequence?: number | null, cards?: Array<{ __typename?: 'Card', id?: string | null, title?: string | null, sequence?: number | null, description?: string | null, type?: string | null, bgColor?: string | null, columnId?: string | null, userId?: string | null, boardId?: string | null } | null> | null } | null };

export type UpdateColumnSequenceMutationVariables = Exact<{
  columnId: Scalars['String'];
  sequence: Scalars['Int'];
}>;


export type UpdateColumnSequenceMutation = { __typename?: 'Mutation', updateColumnSequence?: { __typename?: 'Board', id?: string | null, name?: string | null, backgroundImage?: string | null, user?: { __typename?: 'User', id?: string | null, fullName?: string | null, email?: string | null } | null, columns?: Array<{ __typename?: 'Column', id?: string | null, boardId?: string | null, boardName?: string | null, columnName?: string | null, sequence?: number | null } | null> | null, cards?: Array<{ __typename?: 'Card', id?: string | null, title?: string | null, boardId?: string | null, sequence?: number | null, description?: string | null, type?: string | null, bgColor?: string | null, columnId?: string | null, userId?: string | null, assignedTo?: { __typename?: 'User', id?: string | null, fullName?: string | null, email?: string | null } | null } | null> | null } | null };

export type SignupMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'User', id?: string | null, fullName?: string | null, email?: string | null } | null };

export type LoginMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id?: string | null, fullName?: string | null, email?: string | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id?: string | null, fullName?: string | null, email?: string | null } | null };


export const CreateBoardDocument = gql`
    mutation CreateBoard($name: String!) {
  createBoard(name: $name) {
    id
    name
    backgroundImage
    user {
      id
      fullName
      email
    }
  }
}
    `;
export type CreateBoardMutationFn = Apollo.MutationFunction<CreateBoardMutation, CreateBoardMutationVariables>;

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateBoardMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, options);
      }
export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>;
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<CreateBoardMutation, CreateBoardMutationVariables>;
export const BoardsDocument = gql`
    query Boards {
  boards {
    id
    name
    backgroundImage
    user {
      id
      fullName
      email
    }
  }
}
    `;

/**
 * __useBoardsQuery__
 *
 * To run a query within a React component, call `useBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBoardsQuery(baseOptions?: Apollo.QueryHookOptions<BoardsQuery, BoardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BoardsQuery, BoardsQueryVariables>(BoardsDocument, options);
      }
export function useBoardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BoardsQuery, BoardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BoardsQuery, BoardsQueryVariables>(BoardsDocument, options);
        }
export type BoardsQueryHookResult = ReturnType<typeof useBoardsQuery>;
export type BoardsLazyQueryHookResult = ReturnType<typeof useBoardsLazyQuery>;
export type BoardsQueryResult = Apollo.QueryResult<BoardsQuery, BoardsQueryVariables>;
export const BoardDocument = gql`
    query Board($boardId: String!) {
  board(boardId: $boardId) {
    id
    name
    backgroundImage
    user {
      id
      fullName
      email
    }
    columns {
      id
      boardId
      boardName
      columnName
      sequence
    }
    cards {
      id
      title
      boardId
      sequence
      description
      type
      bgColor
      columnId
      userId
      assignedTo {
        id
        fullName
        email
      }
    }
  }
}
    `;

/**
 * __useBoardQuery__
 *
 * To run a query within a React component, call `useBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useBoardQuery(baseOptions: Apollo.QueryHookOptions<BoardQuery, BoardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BoardQuery, BoardQueryVariables>(BoardDocument, options);
      }
export function useBoardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BoardQuery, BoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BoardQuery, BoardQueryVariables>(BoardDocument, options);
        }
export type BoardQueryHookResult = ReturnType<typeof useBoardQuery>;
export type BoardLazyQueryHookResult = ReturnType<typeof useBoardLazyQuery>;
export type BoardQueryResult = Apollo.QueryResult<BoardQuery, BoardQueryVariables>;
export const UpdateBoardDocument = gql`
    mutation UpdateBoard($boardId: String!, $name: String, $backgroundImage: String) {
  updateBoard(boardId: $boardId, name: $name, backgroundImage: $backgroundImage) {
    id
    name
    backgroundImage
    user {
      email
      fullName
      id
    }
  }
}
    `;
export type UpdateBoardMutationFn = Apollo.MutationFunction<UpdateBoardMutation, UpdateBoardMutationVariables>;

/**
 * __useUpdateBoardMutation__
 *
 * To run a mutation, you first call `useUpdateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardMutation, { data, loading, error }] = useUpdateBoardMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      name: // value for 'name'
 *      backgroundImage: // value for 'backgroundImage'
 *   },
 * });
 */
export function useUpdateBoardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoardMutation, UpdateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(UpdateBoardDocument, options);
      }
export type UpdateBoardMutationHookResult = ReturnType<typeof useUpdateBoardMutation>;
export type UpdateBoardMutationResult = Apollo.MutationResult<UpdateBoardMutation>;
export type UpdateBoardMutationOptions = Apollo.BaseMutationOptions<UpdateBoardMutation, UpdateBoardMutationVariables>;
export const CreateCardDocument = gql`
    mutation CreateCard($columnId: String!, $boardId: String!) {
  createCard(columnId: $columnId, boardId: $boardId) {
    id
    boardId
    title
    sequence
    description
    type
    bgColor
    columnId
    userId
    assignedTo {
      id
      fullName
      email
    }
  }
}
    `;
export type CreateCardMutationFn = Apollo.MutationFunction<CreateCardMutation, CreateCardMutationVariables>;

/**
 * __useCreateCardMutation__
 *
 * To run a mutation, you first call `useCreateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCardMutation, { data, loading, error }] = useCreateCardMutation({
 *   variables: {
 *      columnId: // value for 'columnId'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useCreateCardMutation(baseOptions?: Apollo.MutationHookOptions<CreateCardMutation, CreateCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCardMutation, CreateCardMutationVariables>(CreateCardDocument, options);
      }
export type CreateCardMutationHookResult = ReturnType<typeof useCreateCardMutation>;
export type CreateCardMutationResult = Apollo.MutationResult<CreateCardMutation>;
export type CreateCardMutationOptions = Apollo.BaseMutationOptions<CreateCardMutation, CreateCardMutationVariables>;
export const UpdateCardDocument = gql`
    mutation UpdateCard($input: updateCardInput) {
  updateCard(input: $input) {
    id
    boardId
    title
    type
    sequence
    bgColor
    description
    columnId
    userId
    assignedTo {
      id
      fullName
      email
    }
  }
}
    `;
export type UpdateCardMutationFn = Apollo.MutationFunction<UpdateCardMutation, UpdateCardMutationVariables>;

/**
 * __useUpdateCardMutation__
 *
 * To run a mutation, you first call `useUpdateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCardMutation, { data, loading, error }] = useUpdateCardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCardMutation, UpdateCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCardMutation, UpdateCardMutationVariables>(UpdateCardDocument, options);
      }
export type UpdateCardMutationHookResult = ReturnType<typeof useUpdateCardMutation>;
export type UpdateCardMutationResult = Apollo.MutationResult<UpdateCardMutation>;
export type UpdateCardMutationOptions = Apollo.BaseMutationOptions<UpdateCardMutation, UpdateCardMutationVariables>;
export const UpdateCardSequenceDocument = gql`
    mutation UpdateCardSequence($input: updateCardSequenceInput) {
  updateCardSequence(input: $input) {
    id
    boardId
    title
    type
    sequence
    bgColor
    description
    columnId
    userId
    assignedTo {
      id
      fullName
      email
    }
  }
}
    `;
export type UpdateCardSequenceMutationFn = Apollo.MutationFunction<UpdateCardSequenceMutation, UpdateCardSequenceMutationVariables>;

/**
 * __useUpdateCardSequenceMutation__
 *
 * To run a mutation, you first call `useUpdateCardSequenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCardSequenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCardSequenceMutation, { data, loading, error }] = useUpdateCardSequenceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCardSequenceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCardSequenceMutation, UpdateCardSequenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCardSequenceMutation, UpdateCardSequenceMutationVariables>(UpdateCardSequenceDocument, options);
      }
export type UpdateCardSequenceMutationHookResult = ReturnType<typeof useUpdateCardSequenceMutation>;
export type UpdateCardSequenceMutationResult = Apollo.MutationResult<UpdateCardSequenceMutation>;
export type UpdateCardSequenceMutationOptions = Apollo.BaseMutationOptions<UpdateCardSequenceMutation, UpdateCardSequenceMutationVariables>;
export const CreateColumnDocument = gql`
    mutation CreateColumn($boardId: String!) {
  createColumn(boardId: $boardId) {
    id
    boardId
    boardName
    columnName
    sequence
    cards {
      id
      title
      sequence
      description
      type
      bgColor
      columnId
      userId
      boardId
    }
  }
}
    `;
export type CreateColumnMutationFn = Apollo.MutationFunction<CreateColumnMutation, CreateColumnMutationVariables>;

/**
 * __useCreateColumnMutation__
 *
 * To run a mutation, you first call `useCreateColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createColumnMutation, { data, loading, error }] = useCreateColumnMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useCreateColumnMutation(baseOptions?: Apollo.MutationHookOptions<CreateColumnMutation, CreateColumnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateColumnMutation, CreateColumnMutationVariables>(CreateColumnDocument, options);
      }
export type CreateColumnMutationHookResult = ReturnType<typeof useCreateColumnMutation>;
export type CreateColumnMutationResult = Apollo.MutationResult<CreateColumnMutation>;
export type CreateColumnMutationOptions = Apollo.BaseMutationOptions<CreateColumnMutation, CreateColumnMutationVariables>;
export const UpdateColumnNameDocument = gql`
    mutation UpdateColumnName($name: String!, $columnId: String!) {
  updateColumnName(name: $name, columnId: $columnId) {
    id
    boardId
    boardName
    columnName
    sequence
    cards {
      id
      title
      sequence
      description
      type
      bgColor
      columnId
      userId
      boardId
    }
  }
}
    `;
export type UpdateColumnNameMutationFn = Apollo.MutationFunction<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>;

/**
 * __useUpdateColumnNameMutation__
 *
 * To run a mutation, you first call `useUpdateColumnNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateColumnNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateColumnNameMutation, { data, loading, error }] = useUpdateColumnNameMutation({
 *   variables: {
 *      name: // value for 'name'
 *      columnId: // value for 'columnId'
 *   },
 * });
 */
export function useUpdateColumnNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>(UpdateColumnNameDocument, options);
      }
export type UpdateColumnNameMutationHookResult = ReturnType<typeof useUpdateColumnNameMutation>;
export type UpdateColumnNameMutationResult = Apollo.MutationResult<UpdateColumnNameMutation>;
export type UpdateColumnNameMutationOptions = Apollo.BaseMutationOptions<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>;
export const UpdateColumnSequenceDocument = gql`
    mutation UpdateColumnSequence($columnId: String!, $sequence: Int!) {
  updateColumnSequence(columnId: $columnId, sequence: $sequence) {
    id
    name
    backgroundImage
    user {
      id
      fullName
      email
    }
    columns {
      id
      boardId
      boardName
      columnName
      sequence
    }
    cards {
      id
      title
      boardId
      sequence
      description
      type
      bgColor
      columnId
      userId
      assignedTo {
        id
        fullName
        email
      }
    }
  }
}
    `;
export type UpdateColumnSequenceMutationFn = Apollo.MutationFunction<UpdateColumnSequenceMutation, UpdateColumnSequenceMutationVariables>;

/**
 * __useUpdateColumnSequenceMutation__
 *
 * To run a mutation, you first call `useUpdateColumnSequenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateColumnSequenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateColumnSequenceMutation, { data, loading, error }] = useUpdateColumnSequenceMutation({
 *   variables: {
 *      columnId: // value for 'columnId'
 *      sequence: // value for 'sequence'
 *   },
 * });
 */
export function useUpdateColumnSequenceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateColumnSequenceMutation, UpdateColumnSequenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateColumnSequenceMutation, UpdateColumnSequenceMutationVariables>(UpdateColumnSequenceDocument, options);
      }
export type UpdateColumnSequenceMutationHookResult = ReturnType<typeof useUpdateColumnSequenceMutation>;
export type UpdateColumnSequenceMutationResult = Apollo.MutationResult<UpdateColumnSequenceMutation>;
export type UpdateColumnSequenceMutationOptions = Apollo.BaseMutationOptions<UpdateColumnSequenceMutation, UpdateColumnSequenceMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($input: createUserInput!) {
  signup(input: $input) {
    id
    fullName
    email
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: loginUserInput!) {
  login(input: $input) {
    id
    fullName
    email
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    fullName
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;