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
            }
            createdAt
            updatedAt
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
<<<<<<< HEAD
=======
            username
>>>>>>> 33eb9298149da3e76f7d2bb915e7dc5a8174f879
            nickname
        }
        from{
            id
<<<<<<< HEAD
=======
            username
>>>>>>> 33eb9298149da3e76f7d2bb915e7dc5a8174f879
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
        itsMe
      }
      messages {
        id
        type
        data
        from {
          id
          nickname
          itsMe
        }
        to {
          id
          nickname
          itsMe
        }
        createdAt
        updatedAt
      }
      isAlive
      isChecked
      createdAt
      updatedAt
    }
`;
