export const USER_FRAGMENT = `
    fragment UserPart on User{
        id
        username
        birthDate
        gender
        nickname
        banningUser{
            id
        }
        complainning{
            id
            from{
                id
                username
                
            }
            to{
                id
                username
               
            }
            messageId
            category
            comment
        }
        complainned{
            id
            from{
                id
                username
                nickname
            }
            to{
                id
                username
                nickname
            }
            messageId
            category
            comment
        }
        location
        machineId
        normalPlane
        goldPlane
        logicDelete
        createdAt 
        updatedAt
    }
`;
export const USER_FRAGMENT_WITHROOM = `
    fragment UserPart on User{
        id
        username
        birthDate
        gender
        nickname
        rooms{
            id
            participant {
                id
                username
                nickname
                birthDate
                gender
                location
                machineId
            }
        }
        banningUser{
            id
        }
        complainning{
            id
            from{
                id
                username
                
            }
            to{
                id
                username
               
            }
            messageId
            category
            comment
        }
        complainned{
            id
            from{
                id
                username
                nickname
            }
            to{
                id
                username
                nickname
            }
            messageId
            category
            comment
        }
        location
        machineId
        normalPlane
        goldPlane
        createdAt 
        updatedAt
    }
`;

export const MESSAGE_FRAGMENT = `
    fragment MessagePart on Message{
        id
        data
        type
        room{
            id
        }
        to {
          id
          nickname
          
        }
        from {
          id
          nickname
          
        }
        isChecked
        updatedAt
        createdAt
        updatedAt
    }
`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room{
        id
        participant {
            id
            username
            nickname
            birthDate
            gender
            location
            machineId
        }
        messages {
            id
            type
            data
            from {
                id
                nickname
            }
            to {
                id
                nickname
            }
            isChecked
            createdAt
            updatedAt
        }
        blockFlg{
            id
            fromId
            toId
            flag

        }
        readFlg{
            id
            room{
                id
            }
            fromId
            toId
            checkedTime
            createdAt
            updatedAt
        }
        isAlive
        createdAt
        updatedAt
    }
`;

export const COMPLAIN_FRAGMENT = `
    fragment ComplainParts on Complain{
        id
        from{
            id
        }
        to{
            id
        }
        messageId
        category
        comment
    }
`;