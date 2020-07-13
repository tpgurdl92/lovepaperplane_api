import { prisma } from "../../../../generated/prisma-client";

export default {
    Query :{
        login:async(_,args)=>{
            console.log("im in1");
            const {machineId} = args;
            console.log(machineId);
            try{
                const user = await prisma.user({machineId});
                if(user){
                    return true;
                }else{
                    return false;
                }
            }catch(e){
                console.log(e);
                throw Error("failed to require machineId");
            } 
        
        }
    }
}

