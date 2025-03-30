import { CognitoNameValue } from "../data/cognito-name-value";
import { CognitoUpdateAttributesRequest } from "../request/cognito-update-attributes.request";

export function mapUserAttributesToCognitoAttributes(userAttributes: CognitoUpdateAttributesRequest): CognitoNameValue[] {
    return Object.entries(userAttributes).map(([key, value]) => {
        const cognitoNameValue = new CognitoNameValue();
        cognitoNameValue.Name = key;
        cognitoNameValue.Value = value;
        return cognitoNameValue;
    });
}