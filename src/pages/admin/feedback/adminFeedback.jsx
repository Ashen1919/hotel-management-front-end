import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"; // Import the ConfirmDialog and confirmDialog
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminFeedback() {
  const token = localStorage.getItem("token");

  if (token == null) {
    window.location.href = "/login";
  }
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackIsLoading, setFeedbackIsLoading] = useState(false);
  const toastRef = useRef(null);

  useEffect(() => {
    if (!feedbackIsLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/feedback")
        .then((res) => {
          setFeedbacks(res.data.feedbacks);
          setFeedbackIsLoading(true);
        })
        .catch((err) => {
          console.error("Failed to load feedbacks:", err);
        });
    }
  }, [feedbackIsLoading]);

  const deleteItem = (feedbackId) => {
    if(
        window.confirm("Do you want to reject this feedback?")
    ){
        axios
        .delete(import.meta.env.VITE_BACKEND_URL + "/api/feedback/" + feedbackId, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          toast.success("Feedback rejected successfully");
          setFeedbackIsLoading(false);
        })
        .catch((err) => {
          toast.error("Failed to reject feedback");
          console.log(err.message)
        });
    }
  };

  const getApprove = (feedbackId) => {
    if(
      window.confirm("Do you want to accept this feedback?")
    ){
      axios.put(import.meta.env.VITE_BACKEND_URL + "/api/feedback/" + feedbackId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res)=>{
        toast.success("Feedback accepted successfully");
        setFeedbackIsLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to accept feedback");
        console.log(err.message)
      });
    }
  };

  return (
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
          {feedbacks.map((feedback) => (
            <tr key={feedback.feedbackId} className="hover:bg-gray-100">
              <td className="p-2 border border-gray-300">{feedback.name}</td>
              <td className="p-2 border border-gray-300">{feedback.rating}</td>
              <td className="p-2 border border-gray-300">
                {feedback.occupation}
              </td>
              <td className="p-2 border border-gray-300">{feedback.comment}</td>
              <td className="p-2 border border-gray-300">
                {feedback.timeStamp}
              </td>
              <td className="p-2 border border-gray-300">
                <div className="flex space-x-4">
                  <button 
                    className="bg-blue-500 p-1 text-white rounded-sm hover:bg-blue-600 w-20 "
                    onClick={()=> getApprove(feedback.feedbackId)}
                    >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 p-1 text-white rounded-sm hover:bg-red-600 w-20"
                    onClick={() => deleteItem(feedback.feedbackId)}
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmDialog />
    </div>
  );
}
