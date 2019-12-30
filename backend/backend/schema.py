from graphene import ObjectType, Schema, String
from graphql_social_auth import SocialAuthJWT


class Query(ObjectType):
    hello = String(name=String(default_value="stranger"))
    goodbye = String()

    # our Resolver method takes the GraphQL context (root, info) as well as
    # Argument (name) for the Field and returns data for the query Response
    def resolve_hello(root, info, name):
        return f'Hello {name}!'

    def resolve_goodbye(root, info):
        return 'See ya!'


class Mutation(ObjectType):
    social_auth = SocialAuthJWT.Field()


schema = Schema(query=Query, mutation=Mutation)
