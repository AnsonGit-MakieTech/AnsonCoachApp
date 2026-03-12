

// class CoachRequestRemarkSerializer(serializers.Serializer): 

import { getRequestUrl } from "./apiUrl";

//     coach_remarks = serializers.CharField(required=True, allow_blank=False)
//     member = serializers.PrimaryKeyRelatedField(queryset=GymMember.objects.all(), required=True, allow_null=False)
//     coach = serializers.PrimaryKeyRelatedField(queryset=Coach.objects.all(), required=True, allow_null=False)
//     member_paid_session_plan = serializers.PrimaryKeyRelatedField(queryset=MemberPaidSessionPlan.objects.all(), required=True, allow_null=False)

type SubmitRecordsProps = {
    remarks : string,
    sessionKey : string,
    memberId : number,
    coachId : number,
    sessionId : number,
}

type SubmitRecordsResponse = {
    title: string,
    message: string,
    type: 'error' | 'success' | 'neutral',
}


export async function submitRecords(data : SubmitRecordsProps) : Promise<[SubmitRecordsResponse , boolean]> {
    const baseUrl = await getRequestUrl();

    try {
        const url = `${baseUrl}api/v2/app/coach/gym/session/record/create/?session_key=${data.sessionKey}`
        const formData = new FormData();
        formData.append('coach_remarks', data.remarks);
        formData.append('member', `${data.memberId}`);
        formData.append('coach', `${data.coachId}`);
        formData.append('member_paid_session_plan', `${data.sessionId}`);

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            const result = await response.json();
            console.log("Result:", result);
            return [ {
                'title' : 'Successfully Submitted',
                'message' : result?.message ?? 'Your remarks have been submitted successfully, Please wait for the admin to approve your remarks.',
                'type' : 'success',
            } , true ];
        } else {
            const result = await response.json();
            console.log("Result:", result);
            return [ {
                'title' : 'Something went wrong',
                'message' : result?.message ?? 'Please check your internet connection and try again.',
                'type' : 'error',
            } , false ];
        }

    } catch (error) {
        console.log("Error:", error);
    } 
    return [ {
        'title' : 'Something went wrong',
        'message' : "There was an error submitting your remarks. Please try again later.",
        'type' : 'error',
    } , false ];
}