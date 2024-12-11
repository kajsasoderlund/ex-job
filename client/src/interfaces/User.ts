export interface User {
    id: string;     
    name: string;   
    email: string;  
}

// journal
export interface Journal {
    _id: string;
    userId: string;
    content: string;
    createdAt: string;
}
