import { CognitoIdentityProviderClient, AdminUpdateUserAttributesCommand, AdminUpdateUserAttributesCommandOutput, AdminSetUserPasswordCommand, AdminSetUserPasswordCommandOutput, AdminCreateUserCommand, AdminCreateUserCommandOutput, AdminDeleteUserCommand, AdminGetUserCommandOutput, AdminGetUserCommand, AdminAddUserToGroupCommand, AdminAddUserToGroupCommandOutput, AdminRemoveUserFromGroupCommand, AdminRemoveUserFromGroupCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { CognitoConfig } from "../data/cognito-config";
import { CognitoUpdateAttributesRequest } from "../request/cognito-update-attributes.request";
import { mapUserAttributesToCognitoAttributes } from "../mappers/cognito-user-attributes.mapper";

export class CognitoService {

    protected cognitoClient: CognitoIdentityProviderClient;

    constructor(private readonly config: CognitoConfig | null = null) {
        this.cognitoClient = new CognitoIdentityProviderClient(config || {});
    }

    async createUser(userPoolId: string, username: string, tempPassword: string, attributes: CognitoUpdateAttributesRequest): Promise<AdminCreateUserCommandOutput> {
        const adminCreateUserCommand = new AdminCreateUserCommand({
            UserPoolId: userPoolId,
            Username: username,
            MessageAction: 'SUPPRESS',
            TemporaryPassword: tempPassword,
            UserAttributes: mapUserAttributesToCognitoAttributes(attributes),
        });
        return await this.cognitoClient.send(adminCreateUserCommand);
    }

    async updatePassword(userPoolId: string, username: string, password: string, permanent: boolean): Promise<AdminSetUserPasswordCommandOutput> {
        const adminSetUserPasswordCommand = new AdminSetUserPasswordCommand({
            UserPoolId: userPoolId,
            Username: username,
            Permanent: permanent,
            Password: password,
        });
        return await this.cognitoClient.send(adminSetUserPasswordCommand);
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

    async deleteUser(userPoolId: string, username: string): Promise<void> {
        const command = new AdminDeleteUserCommand({
            UserPoolId: userPoolId,
            Username: username,
        });

        await this.cognitoClient.send(command);
    }
    async getUser(userPoolId: string, username: string): Promise<AdminGetUserCommandOutput> {
        const command = new AdminGetUserCommand({
            UserPoolId: userPoolId,
            Username: username,
        });

        return await this.cognitoClient.send(command);
    }
    async getUserAttributes(userPoolId: string, username: string): Promise<AdminGetUserCommandOutput> {
        const command = new AdminGetUserCommand({
            UserPoolId: userPoolId,
            Username: username,
        });

        return await this.cognitoClient.send(command);
    }
}
