import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        editUser:async(_,args) =>{
            const {userId, username, age, location} =args;
            try{
                const editUser =await prisma.updateUser( { where: {id:userId},
                    data: {
                        username:username,
                        age:age,
                        location:location
                    }
                });
                if(!editUser){
                    //if user was not updated
                    console.log("failure");
                }
                return editUser;
            }catch(e){
                console.log(e);
            }
        }
    }
}