import { getRequestUrl } from "./apiUrl"

type getSessionsRecordsParamType = {
    sessionKey : string,
    memberId : number,
    startDate : string,
    endDate : string, 
}

export type SessionRecordType = {
    timestamp : string,
    activity_status : 'approved' | 'rejected' | 'pending',
    coach : string,
    session_name : string,
}




export async function getSessionsRecords( sessionRecord : getSessionsRecordsParamType ) {
    const baseUrl = await getRequestUrl();
    try {
        const url = `${baseUrl}api/v2/app/coach/gym/session/record/range/?session_key=${sessionRecord.sessionKey}&member_id=${sessionRecord.memberId}&start_date=${sessionRecord.startDate}&end_date=${sessionRecord.endDate}`;
        // const formData = new FormData();
        console.log("Form Data:", sessionRecord); 
        const response = await fetch(url, {
            method: 'GET', 
        });
        console.log("Error:", response);
        if (response.ok) {
            const result = await response.json();
            console.log("Result:", result);
            const data : SessionRecordType[] = result?.data ?? [];
            return [ data, true ];
        } 
    } catch (error) {
        console.log(error); 
    }

    return [ [] , false ];
}