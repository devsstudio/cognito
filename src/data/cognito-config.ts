import { CognitoCredentials } from "./cognito-credentials";

export class CognitoConfig {
    region!: string;
    credentials!: CognitoCredentials;
}