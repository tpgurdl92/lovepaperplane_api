export const USER_FRAGMENT = `
    fragment UserPart on User{
        id
        username
        birthDate
        gender
        rooms{
            id
            participantA{
                id
                username
            } 
            participantB{
                id
                username
            }
        }
        banningUser{
            id
        }
        location
        machineId
        availablePlane
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
            username
        }
        from{
            id
            username
        }
        data
        room{
            id
        }
        createdAt
    }
`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room{
        id
        participantA {
            id
            username
        }
        participantB{
            id
            username
        }
        messages{
            id
            data
            to{
                id
                username
            }
            from{
                id
                username
            }
            type
            createdAt 
            updatedAt
        }
        isAlive
        lastCheckTimeA
        lastCheckTimeB
        createdAt 
        updatedAt
    }
`;
