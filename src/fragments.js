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
        createdAt 
        updatedAt
    }
`;

export const MESSAGE_FRAGMENT = `
    fragment MessagePart on Message{
        id
        type
        to{
            id
            nickname
        }
        from{
            id
            nickname
        }
        data
        room{
            id
        }
        isChecked
        createdAt
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
