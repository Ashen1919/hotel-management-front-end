import axios from "axios"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

export default function AdminFeedback(){
    const [feedbacks, setFeedbacks] = useState([])
    const [feedbackIsLoading, setFeedbackIsLoading] = useState(false)
    const toast = useRef(null);

    useEffect(()=>{
        if(!feedbackIsLoading){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/feedback")
            .then((res)=>{
                setFeedbacks(res.data.feedbacks)
                setFeedbackIsLoading(true)
            }).catch((err)=>{
                console.error("Failed to load feedbacks:", err);
            })
        }
    }, [feedbackIsLoading])

    function deleteItem(feedbackId) {
        const confirmDialogOptions = {
            message: 'Are you sure you want to reject this feedback?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'reject',
            accept: () => {
                axios
                    .delete(`${import.meta.env.VITE_BACKEND_URL}/api/feedback/${feedbackId}`)
                    .then(() => {
                        setFeedbacks(prev => prev.filter(feedback => feedback.feedbackId !== feedbackId));
                        toast.current.show({
                            severity: 'info',
                            summary: 'Rejected',
                            detail: 'The feedback has been rejected',
                            life: 3000,
                        });
                    })
                    .catch(err => {
                        console.error('Failed to reject feedback:', err);
                    });
            },
            reject: () => {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Action Cancelled',
                    detail: 'Feedback rejection cancelled',
                    life: 3000,
                });
            },
        };
    
        confirmDialog(confirmDialogOptions);
    }
    

    return(
        <div className="p-4 w-full">
            <table className="w-full bg-white border text-black border-gray-400 text-left">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border border-gray-300">Name</th>
                        <th className="p-2 border border-gray-300">Rating</th>
                        <th className="p-2 border border-gray-300">Occupation</th>
                        <th className="p-2 border border-gray-300">Comment</th>
                        <th className="p-2 border border-gray-300">Date</th>
                        <th className="p-2 border border-gray-300">Approved/Rejected</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((feedback)=>{
                        return(
                            <tr key={feedback.feedbackId} className="hover:bg-gray-100">
                                <td className="p-2 border border-gray-300">{feedback.name}</td>
                                <td className="p-2 border border-gray-300">{feedback.rating}</td>
                                <td className="p-2 border border-gray-300">{feedback.occupation}</td>
                                <td className="p-2 border border-gray-300">{feedback.comment}</td>
                                <td className="p-2 border border-gray-300">{feedback.timeStamp}</td>
                                <td className="p-2 border border-gray-300 ">{
                                    <div className="flex space-x-4">
                                        <button className="bg-blue-500 p-1 text-white rounded-sm hover:bg-blue-600 w-20 ">Approve</button>
                                        <button className="bg-red-500 p-1 text-white rounded-sm hover:bg-red-600 w-20 " onClick={() => deleteItem(feedback.feedbackId)}>Reject</button>
                                    </div>
                                    }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}