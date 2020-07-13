import { prisma } from "../../../../generated/prisma-client";

export default {
    Query:{
        checkUsername:async(_,args)=>{
            const {username} = args;
            console.log("inbabay");
            try{
                const user=await prisma.user({username});
                if(user){
                    return false;
                }else{
                    return true;
                }
            }catch(e){
                console.log(e);
            }
        }
    }
}