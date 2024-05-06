import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-clients"
import { useAppContext } from "../Contexts/AppContext";
const SignOutButton= ()=>{

    const queryClient = useQueryClient();

    const {showToast} = useAppContext();

    const mutation= useMutation(apiClient.signout, {
        onSuccess: async ()=>{
            showToast({message: "Signed Out Successfully", type: "SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
        },
        onError: (error: Error)=>{
            showToast({message: error.message, type:"ERROR"});
        }
    })

    const handleClick= ()=> {
        mutation.mutate();
    }
    return(
        <button onClick={handleClick} className="bg-white text-blue-600 font-bold px-2 hover:bg-gray-100">
            Sign Out
        </button>
    )
}

export default SignOutButton;