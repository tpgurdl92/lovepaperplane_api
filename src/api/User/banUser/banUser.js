import { prisma } from "../../../../generated/prisma-client"

export default {
    Mutation:{
        banUser:async(_,args)=>{
            const {myId,toId,roomId} = args;
            try{
                const user= await prisma.updateUser({
                    data:{
                        banningUser:{connect:{id:toId}},
                    },
                    where:{id:myId}
                });
                if(!user){
                    throw error('failed to ban user');
                }
                const room =await prisma.updateRoom({data:{isAlive:false},where:{id:roomId}});
                if(!room){
                    throw error('failed to disable room');    
                }
                return true;
            }catch(e){
                console.log(e);
                return false;
            }  
        }
    }

}