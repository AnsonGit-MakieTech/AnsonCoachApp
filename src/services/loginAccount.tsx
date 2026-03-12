import { getRequestUrl } from './apiUrl';

type ErrorItemType = {
    title: string,
    message: string,
    type: 'error' | 'success' | 'neutral',
}


export async function loginAccount( account_key : string , password : string): Promise<[ErrorItemType | any , boolean]>{

    try{
        const requestUrl = await getRequestUrl();
        const formData = new FormData();
        formData.append('account_key', account_key);
        formData.append('password', password);
        const url = `${requestUrl}api/v2/app/coach/login/`;
        const response = await fetch( url, {
            method: 'POST',
            body: formData,
        });
        console.log("Response:", response);
        const data = await response.json(); 
        console.log("Data:", data);
        if (response.ok) {
            return [data , true];
        } else {
            return [data , false];
        }

    } catch(error){ 
        console.log("Error:", error);
        return [{
            'title': 'Something went wrong',
            'message': 'Please check your internet connection and try again',
            'type': 'error',
        } , false];
    }


}

