import AppConstants from "../constants/app_constants";

export const getStorageLink = (endpoint: string | null): string | null => {
    if (endpoint) {
        return AppConstants.base_url + endpoint
    }
    
    return null;
}