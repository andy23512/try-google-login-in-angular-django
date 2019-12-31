from graphene import ObjectType, Schema, String
from graphql_social_auth import SocialAuthJWT
from graphql_jwt import ObtainJSONWebToken, Verify, Refresh
from graphql_jwt.decorators import login_required


class Query(ObjectType):
    hello = String(name=String(default_value="stranger"))
    goodbye = String()

    # our Resolver method takes the GraphQL context (root, info) as well as
    # Argument (name) for the Field and returns data for the query Response
    @login_required
    def resolve_hello(root, info, name):
        return f'Hello {name}!'

    @login_required
    def resolve_goodbye(root, info):
        return 'See ya!'


class Mutation(ObjectType):
    social_auth = SocialAuthJWT.Field()
    token_auth = ObtainJSONWebToken.Field()
    verify_token = Verify.Field()
    refresh_token = Refresh.Field()


schema = Schema(query=Query, mutation=Mutation)
