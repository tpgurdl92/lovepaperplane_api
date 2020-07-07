import { prisma } from "../../../../generated/prisma-client";
import {MESSAGE_FRAGMENT} from "../../../fragments";
export default {
    Subscription:{
        newMessage:{
            subscribe:async(_,args,)=>{
                console.log("sub");
                const {myId} = args;
                return prisma.$subscribe.message({AND:[
                    {mutation_in:["CREATED"]},
                    {
                        node:{
                            OR:[ 
                                    {to:{id:myId}}
                                ]
                        }    
                    }
                    ]}).node().$fragment(MESSAGE_FRAGMENT);
                    

            },
            resolve: (payload,args) =>{
                console.log(payload);
                const {myId} = args;
                if(payload.to.id===myId){
                    payload.to.itsMe =true;
                    payload.from.itsMe=false;
                }else if(payload.from.id===myId){
                    payload.to.itsMe =false;
                    payload.from.itsMe=true;
                }else{
                    throw ('message classify error');
                }
                console.log(payload);
                return payload
            },
        }
    }
}