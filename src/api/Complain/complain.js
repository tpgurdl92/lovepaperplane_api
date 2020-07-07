import { prisma } from "../../../generated/prisma-client";

export default {
    Mutation:{
        complain:async(_,args)=>{
            const {myId,toId,roomId,messageId,category,comment} = args;
            try{
                const complain = await prisma.createComplain(
                    {
                        from:{connect:{id:myId}},
                        to:{connect:{id:toId}},
                        message:{connect:{id:messageId}},
                        category:category,
                        comment:comment
                });
                if(!complain){
                    throw error('failed to make complainment');
                }
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
                return false;
            }
        }
    }
}