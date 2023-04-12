
export const reducerData = {
    masterKey: null,
    userLogin: false,
    userName: "",
    messages: [],
    contacts: [],
    userOnline: false
}

export const updateReducer = (state, action) => {
    switch (action.type) {
        case "update_login":
            return {
                ...state,
                userLogin: action.userLogin
            }

        case "update_userName":
            return {
                ...state,
                userName: action.userName
            }

        case "update_contacts":
            
            return {
                ...state,
                contacts: [
                    ...state.contacts,
                    action.newContact
                ]
            }

        case "update_masterKey":
            return {
                ...state,
                masterKey: action.masterKey
            }


        case "update_messages":
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.newMessage
                ]
            }

        case "full_update":
            return {
                ...state,
                ...action.allData
            }

        default:
            return state;
    }
}

