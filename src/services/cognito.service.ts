import { CognitoIdentityProviderClient, AdminUpdateUserAttributesCommand, AdminUpdateUserAttributesCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { CognitoConfig } from "../data/cognito-config";
import { CognitoUpdateAttributesRequest } from "../request/cognito-update-attributes.request";
import { mapUserAttributesToCognitoAttributes } from "../mappers/cognito-user-attributes.mapper";

export class CognitoService {

    protected cognitoClient: CognitoIdentityProviderClient;

    constructor(private readonly config: CognitoConfig = null) {
        this.cognitoClient = new CognitoIdentityProviderClient(config || {});
    }

    async updateUserAttributes(userPoolId: string, username: string, attributes: CognitoUpdateAttributesRequest): Promise<AdminUpdateUserAttributesCommandOutput> {
        try {
            const command = new AdminUpdateUserAttributesCommand({
                UserPoolId: userPoolId,
                Username: username,
                UserAttributes: mapUserAttributesToCognitoAttributes(attributes),
            });

            return await this.cognitoClient.send(command);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
