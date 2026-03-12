export type MemberType = {
    id : number,
    transaction_id : string,
    fullname : string,
    picture : string,
    logs : {
        timestamp : string,
        activity : string,
    },
    session : {
        id : number,
        paid_at : string,
        paid_amount : number,
        session_price : number,
        session_count : number,
        session_description : string,
        session_start_date : string,
        session_end_date : string,
        session_is_expired : boolean,
    }

}