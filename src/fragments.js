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
            nickname
        }
        from{
            id
            username
            nickname
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
        nickname
        birthDate
        gender
        location
        machineId
      }
      participantB {
        id
        username
        nickname
        birthDate
        gender
        location
        machineId
      }
      lastCheckTimeA
      lastCheckTimeB
      messages {
        id
        type
        data
        from {
          id
          username
          nickname
        }
        to {
          id
          username
          nickname
        }
        createdAt
        updatedAt
      }
      isAlive
      createdAt
      updatedAt
    }
`;
