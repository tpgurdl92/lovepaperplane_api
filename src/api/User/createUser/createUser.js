import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        createUser:async(_,args) =>{
            const {username, age, gender} =args;
            try{
                const user =await prisma.createUser({...args});
                if(!user){
                    //if user was not created
                    console.log("failure");
                }
                return user;
            }catch(e){
                console.log(e);
            }
        }
    },
    Query: {
        empty: () => null
    }
}