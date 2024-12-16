export interface User {
    profile : Profile;
    token : string;
}

export interface Profile extends ProfileCreate{
    profileId : number;
}

export interface ProfileCreate{
    firstName : string;
    lastName : string | undefined;
    tag : string;
    bio : string | undefined
}

export interface UserLogin{
    email: string ;
    password: string;
}

export interface UserRegister {
    user: UserLogin;
    profile : ProfileCreate;
}