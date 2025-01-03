
export interface User {
    id: string;     
    name: string;   
    email: string;  
}


export interface Journal {
    _id: string;
    userId: string;
    content: string;
    createdAt: string;
}
